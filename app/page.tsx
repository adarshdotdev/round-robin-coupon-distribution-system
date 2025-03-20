"use client";

import { useState } from "react";
import Button from "./component/Button";
import Card from "./component/Card";
import Copy from "./component/Copy";

export default function Home() {
  const [message, setMessage] = useState<{
    text: string;
    type: "success" | "error";
  } | null>(null); // Initialize with null to avoid undefined issues

  const [updating, setUpdating] = useState<boolean>(false);

  const handleClaimCoupon = async () => {
    try {
      setUpdating(true);
      const response = await fetch("/api/claim", {
        method: "POST",
      });

      // Parse the response
      const data = await response.json();

      // Handle errors
      if (!response.ok) {
        throw new Error(data.error || "Failed to claim coupon");
      }

      // Display success message
      setMessage({ text: data.coupon, type: "success" });
    } catch (error: unknown) {
      setUpdating(false);
      // Display error message
      setMessage({ text: error.message, type: "error" });
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <Card>
        <h1 className="text-4xl mb-8">Claim Your Coupon</h1>
        <Button disable={updating} onClick={handleClaimCoupon}>
          Get Coupon
        </Button>

        {/* Corrected Conditional Rendering */}
        {message &&
          (message.type === "success" ? (
            <div className="bg-green-200 flex gap-3 items-center justify-center text-green-700 p-4 mt-4 rounded">
              <p className="font-bold text-lg  ">{message.text}</p>
              <Copy code={message.text} />
            </div>
          ) : (
            <div className="bg-red-200 text-red-500 p-4 mt-4 rounded">
              <p className=" uppercase font-bold  ">{message.text}</p>
            </div>
          ))}
      </Card>
    </div>
  );
}
