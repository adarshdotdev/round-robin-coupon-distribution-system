import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";


const prisma =  new PrismaClient()

export async function POST(req:NextRequest){
    try{
        const {code} = await req.json()

        if(!code || typeof code !== 'string'){
            return NextResponse.json({
                error: 'Coupon code is required and must be a string'
            },{status:400})
        }

        const existingCoupon = await prisma.coupon.findUnique({
            where:{code},
        })
        
    if (existingCoupon) {
        return NextResponse.json(
          { error: 'Coupon with this code already exists' },
          { status: 409 }
        );
      }
        const newCoupon = await prisma.coupon.create({
            data:{code, used:false}
        })

        return NextResponse.json({
            message:"Coupon added successfully", coupon:newCoupon
        },{status:281})
    }catch(error){
        console.error("Error adding coupon: ", error);
        return NextResponse.json(
            {error:"Failed to add coupon"},
            {status:500}
        )
    }
}