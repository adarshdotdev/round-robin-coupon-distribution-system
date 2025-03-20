import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { createHash } from "crypto";
import { cookies } from "next/headers";
import { v4 as uuidv4 } from "uuid";

const prisma = new PrismaClient();
const TIME = 200000;

export async function POST(req: NextRequest) {
  // Get client IP properly
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0] || "unknown";

  const cookieStore = await cookies();
  const cookie = await cookieStore.get("coupon-cookie");
  const cookieId = cookie ? cookie.value : uuidv4();

  // Hash sensitive data
  const ipHash = createHash("sha256").update(ip).digest("hex");
  const cookieHash = createHash("sha256").update(cookieId).digest("hex");

  // Check recent claims
  const oneHourAgo = new Date(Date.now() - TIME);

  const existingClaim = await prisma.claim.findFirst({
    where: {
      OR: [{ ipHash }, { cookieHash }],
      claimedAt: { gte: oneHourAgo },
    },
  });

  if (existingClaim) {
    return NextResponse.json(
      {
        error: `Try again in ${Math.ceil(
          (existingClaim.claimedAt.getTime() + TIME - Date.now()) / 60000
        )} minutes`,
      },
      { status: 429 }
    );
  }

  // Round-robin coupon assignment
  const availableCoupons = await prisma.coupon.findMany({
    where: { used: false },
    orderBy: { id: "asc" },
  });

  if (availableCoupons.length === 0) {
    return NextResponse.json(
      { error: "No coupons available" },
      { status: 404 }
    );
  }

  const selectedCoupon = availableCoupons[0];

  // Transaction to mark coupon as used and create claim
  await prisma.$transaction([
    prisma.coupon.update({
      where: { id: selectedCoupon.id },
      data: { used: true },
    }),
    prisma.claim.create({
      data: {
        ipHash,
        cookieHash,
        couponId: selectedCoupon.id,
      },
    }),
  ]);

  // Set persistent cookie
  const response = NextResponse.json({ coupon: selectedCoupon.code });
  response.cookies.set("coupon-cookie", cookieId, {
    maxAge: 3600,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  });

  return response;
}
