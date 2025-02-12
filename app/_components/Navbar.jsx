"use client";

import {
  UserButton,
  SignOutButton,
  useUser,
  SignInButton,
} from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "../../components/ui/button";

const Navbar = () => {
  const { user } = useUser();
  return (
    <>
      <div className="flex border-b-2 h-18 w-screen max-w-screen items-center justify-between overflow-y-hidden pl-8 pr-8 max-sm:pl-2 max-sm:pr-2">
        <Link href={"/"} className="flex items-center">
          <img
            src="/images/logo1.png"
            alt="Logo"
            
            className="w-16 p-1 h-16"
          /><h1 className="flex items-center text-4xl max-sm:text-2xl text-[rgb(232,93,4)] font-extrabold">LogoGen</h1>
        </Link>
        <div className="flex items-center justify-between gap-4">
          {user ? (
            <>
              <Link href={"/dashboard"}>
                <Button
                  variant="outline"
                  className="rounded font-semibold px-4 py-2"
                >
                  Dashboard
                </Button>
              </Link>
              <UserButton />
            </>
          ) : (
            <>
              <SignInButton mode="model">
                <Button className=" rounded text-lg font-semibold px-4 py-2">
                  login
                </Button>
              </SignInButton>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
