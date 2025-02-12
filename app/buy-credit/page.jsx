"use client";

import React, { useContext, useEffect, useState } from "react";
import { PayPalButtons } from "@paypal/react-paypal-js";
import { UserDetailContex } from "../_context/UserDetailContext";
import { db } from "../../configs/FirebaseConfig";
import { useRouter } from "next/navigation";

function BuyCredits() {
  const options = [
    {
      id: 1,
      credit: 10,
      price: 0.02,
    },
    {
      id: 2,
      credit: 20,
      price: 0.2,
    },
    {
      id: 3,
      credit: 50,
      price: 0.5,
    },
    {
      id: 4,
      credit: 100,
      price: 1,
    },
    {
      id: 5,
      credit: 200,
      price: 2,
    },
  ];
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedPrice, setSelectedPrice] = useState(null);
  console.log("selected option", selectedOption);
  const { userDetail, setUserDetail } = useContext(UserDetailContex);

  const router = useRouter();

  const onPaymentSuccess=async()=>{
    const result = await db.update(Users).set({
        credits: userDetail.credits + selectedOption.credit,
    }).where(eq(Users.userEmail, userDetail.userEmail));

    setUserDetail({ ...userDetail, credits: (userDetail.credits || 0) + selectedOption.credit });
    router.replace("/dashboard");
  }
  return (
    <>
      <div className="px-6 py-6">
        <div>
          <h2 className="text-3xl font-semibold text-orange-500 mb-4">
            Buy Credits
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col justify-between gap-2">
              {options.map((option, index) => (
                <div
                  key={index}
                  onClick={() => {
                    setSelectedOption(option),
                    setSelectedPrice(option.price)
                  }}
                  className={`bg-gray-800 text-white rounded p-4 text-center cursor-pointer ${
                    selectedPrice == option.price && "bg-orange-400"
                  }`}
                >
                  <h3 className="text-lg">Credit: {option.credit}</h3>
                  <p className="text-xl">Price: ${option.price}</p>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-center w-full">
                <PayPalButtons
                  style={{ layout: "vertical" }}
                  disabled={!selectedPrice}
                  onApprove={(data, actions) => {
                    onPaymentSuccess()
                  }}
                  createOrder={(data, actions) => {
                    return actions.order.create({
                      purchase_units: [
                        {
                          amount: {
                            value: selectedPrice.toString(), // Ensure it's a string
                            currency_code: "USD", // Currency must be inside amount
                          },
                        },
                      ],
                    });
                  }}
                />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default BuyCredits;
