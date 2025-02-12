"use client";

import React, { useContext, useEffect, useState } from "react";
import { UserDetailContex } from "../../_context/UserDetailContext";
import { db } from "../../../configs/FirebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { HiDotsVertical } from "react-icons/hi";
import { HiDownload } from "react-icons/hi";
import FileSaver from "file-saver";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../../components/ui/dropdown-menu";

const LogoList = () => {
  const { userDetail, setUserDetail } = useContext(UserDetailContex);
  const [userLogo, setUserLogo] = useState([]);

  useEffect(() => {
    userDetail && GetLogos();
  }, [userDetail]);

  const GetLogos = async () => {
    const querySnapshot = await getDocs(
      collection(db, "users", userDetail?.email, "logos")
    );
    const logosArray = [];

    querySnapshot.forEach((doc) => {
      logosArray.push({ id: doc.id, ...doc.data() });
    });

    setUserLogo(logosArray);
    console.log("Fetched User Logos:", logosArray);
  };

  return (
    <>
      <div>
        <div className="grid lg:grid-cols-4 max-sm:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 justify-center gap-4 max-sm:gap-2">
          {userLogo &&
            userLogo.map((logo, index) => (
              <div key={index} className="mb-2 max-sm:mb-4">
                <img src={logo.image} alt="" className="rounded-lg" />
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-xl max-sm:text-lg font-bold ">{logo.title}</h2>
                    <p className="max-sm:text-sm">{logo.desc}</p>
                  </div>
                  <div>
                    <DropdownMenu>
                      <DropdownMenuTrigger className="text-2xl max-sm:text-xl">
                        <HiDotsVertical />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        {/* <DropdownMenuLabel></DropdownMenuLabel> */}
                        {/* <DropdownMenuSeparator /> */}
                        <DropdownMenuItem
                          className="cursor-pointer"
                          onClick={() =>
                            FileSaver.saveAs(logo.image, "download.jpg")
                          }
                        >
                          <HiDownload /> Download
                        </DropdownMenuItem>
                        {/* <DropdownMenuItem>Billing</DropdownMenuItem>
                    <DropdownMenuItem>Team</DropdownMenuItem>
                    <DropdownMenuItem>Subscription</DropdownMenuItem> */}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default LogoList;
