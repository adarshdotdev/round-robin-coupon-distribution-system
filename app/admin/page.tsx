"use client";
import { useState } from "react";
import Button from "../component/SecondaryBtn";
import Card from "../component/secondaryCard";
import Input from "../component/Input";
export default function AdminPage() {
  const [code, setCode] = useState("");
  const [message, setMessage] = useState<{
    text: string;
    type: "success" | "error";
  }>();
  const [updating, setUpdating] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setUpdating(true);
      const response = await fetch("/api/add-coupon", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to add coupon");
      }

      setMessage({ text: data.message, type: "success" });
      setCode(""); // Clear the input field
    } catch (error) {
      let errorMessage = "An unknown error occurred";

      if (error instanceof Error) {
        errorMessage = error.message;
      }

      setMessage({ text: errorMessage, type: "error" });
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center  ">
      <Card>
        <form onSubmit={handleSubmit} className="p-10 flex flex-col gap-5">
          <h1 className="text-2xl bold text-white ">Add Coupon</h1>

          <Input value={code} setCode={setCode} />
          <Button disabled={updating}>Add</Button>
          {message && (
            <div
              className={`mt-4 p-4 rounded-md ${
                message.type === "success"
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {message.text}
            </div>
          )}
        </form>
      </Card>
    </div>
  );
}
