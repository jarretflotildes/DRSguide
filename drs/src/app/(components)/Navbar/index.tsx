"use client";

import Link from "next/link"
import React from 'react'

const Navbar = () => {
    return (
        <div className='flex bg-yellow-500 py-4 px-4 items-center w-full'>
            <div className={`flex text-black justify-center gap-5`}>
                <Link href="/">
                    Home
                </Link>
              
                <Link href="/about">
                    About
                </Link>
            </div>
        </div>
    )
}

export default Navbar