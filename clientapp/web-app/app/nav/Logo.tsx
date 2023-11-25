"use client";
import { useParamsStore } from "@/hooks/useParamStore";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { AiFillCar } from "react-icons/ai";

export default function Logo() {
  const router = useRouter();
  const pathName = usePathname();
  const reset = useParamsStore((state) => state.reset);
  function doReset() {
    if (pathName !== "/") router.push("/");
    reset();
  }
  return (
    <div
      onClick={doReset}
      className="flex items-center gap-2 text-3xl font-semibold cursor-pointer text-red-500"
    >
      <AiFillCar />
      <div>Car Auctions</div>
    </div>
  );
}
