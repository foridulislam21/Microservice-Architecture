import React from "react";
import { AiFillCar } from "react-icons/ai";

export default function NavBar() {
  return (
    <header className="sticky top-0 z-50 flex justify-between bg-white items-center p-5 text-gray-800 shadow-md">
      <div className="flex items-center gap-2 text-3xl font-semibold text-red-500">
        <AiFillCar />
        <div>Car Auctions</div>
      </div>
      <div>Search</div>
      <div>Login</div>
    </header>
  );
}
