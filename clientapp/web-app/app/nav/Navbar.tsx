import React from "react";
import Search from "./Search";
import Logo from "./Logo";

export default function NavBar() {
  return (
    <header className="sticky top-0 z-50 flex justify-between bg-white items-center p-5 text-gray-800 shadow-md">
      <Logo />
      <Search />
      <div>Login</div>
    </header>
  );
}
