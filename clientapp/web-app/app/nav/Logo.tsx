"use client";
import { useParamsStore } from "@/hooks/useParamStore";
import React from "react";
import { AiFillCar } from "react-icons/ai";

export default function Logo() {
  const reset = useParamsStore((state) => state.reset);
  return (
    <div
      onClick={reset}
      className="flex items-center gap-2 text-3xl font-semibold cursor-pointer text-red-500"
    >
      <AiFillCar />
      <div>Car Auctions</div>
    </div>
  );
}
