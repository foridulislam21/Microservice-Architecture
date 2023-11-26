"use client";
import { Button, Dropdown } from "flowbite-react";
import { User } from "next-auth";
import { signOut } from "next-auth/react";
import Link from "next/link";
import React, { use } from "react";
import { AiFillCar, AiFillTrophy, AiOutlineLogout } from "react-icons/ai";
import { HiCog, HiUser } from "react-icons/hi2";

type Props = {
  user: Partial<User>;
};
export default function UserActions({ user }: Props) {
  return (
    <Dropdown label={`Welcome ${user.name}`} inline>
      <Dropdown.Item icon={HiUser}>
        <Link href="/">My Actions</Link>
      </Dropdown.Item>
      <Dropdown.Item icon={AiFillTrophy}>
        <Link href="/">Actions Won</Link>
      </Dropdown.Item>
      <Dropdown.Item icon={AiFillCar}>
        <Link href="/">Sell MY Car</Link>
      </Dropdown.Item>
      <Dropdown.Item icon={HiCog}>
        <Link href="/session">Session (Dev Only)</Link>
      </Dropdown.Item>
      <Dropdown.Divider />
      <Dropdown.Item
        icon={AiOutlineLogout}
        onClick={() => signOut({ callbackUrl: "/" })}
      >
        Sign Out
      </Dropdown.Item>
    </Dropdown>
  );
}