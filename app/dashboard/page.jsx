"use client"

import React, { useContext } from "react";
import { UserDetailContex } from "../_context/UserDetailContext";
import LogoList from './_components/LogoList'
import Link from "next/link";

const dashboard = () => {
    const { userDetail, setUserDetail } = useContext(UserDetailContex);
    console.log(userDetail);
    
  return (
    <div className="px-10 pt-10 max-sm:px-2">
      <div className="flex justify-between items-center">
        <div className="flex flex-col justify-between gap-2 max-sm:gap-1">
          <div className="rounded text-orange-600 font-extrabold text-3xl max-sm:text-2xl cursor-pointer">
            Hi {userDetail?.name}
          </div>
          <div className="text-lg max-sm:text-md font-semibold max-sm:font-normal">dashboard</div>
        </div>
        <div className="flex flex-col justify-between items-end gap-2 max-sm:gap-1">
          <div className="text-lg font-semibold">{userDetail?.credits} credit left</div>
          <Link href={'/'}>
          <div className="bg-orange-500 rounded px-4 py-2 text-white cursor-pointer">
            + create logo
          </div>
          </Link>
        </div>
      </div>
      <div className="mt-4 mb-20">
        <LogoList/>
      </div>
    </div>
  );
};

export default dashboard;
