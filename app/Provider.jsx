"use client"

import { useUser } from '@clerk/nextjs'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Navbar from './_components/Navbar'
import {UserDetailContex} from './_context/UserDetailContext'
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

function Provider({children}){

  const {user} = useUser();
  const [userDetail, setUserDetail] = useState();

  useEffect(()=>{
    user&&CheakUserAuth();
  }, [user]);

  //save user data
  const  CheakUserAuth = async() => {
    //save user to database
    const result = await axios.post('/api/users',{
      userName:user?.fullName,
      userEmail:user?.primaryEmailAddress?.emailAddress
    });
    console.log("database saved data: ", result.data);
    setUserDetail((result.data));
  }
  
  return (
    <div className='max-w-screen'>
      <UserDetailContex.Provider value={{userDetail, setUserDetail}}>
        <PayPalScriptProvider options={{ clientId:process.env.NEXT_PUBLIC_CLIENT_ID }}>
       <Navbar />
      {children}
      </PayPalScriptProvider>
      </UserDetailContex.Provider>
    </div>
  )
}

export default Provider