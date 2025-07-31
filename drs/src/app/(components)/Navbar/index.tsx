"use client";

import Link from "next/link"
import React from 'react'

const Navbar = () => {
    return (
        <div className='flex bg-white py-4 px-4 justify-between items-center w-full'>
            <div className={`flex text-black justify-center gap-5`}>
                <Link href="/">
                    Home
                </Link>
                
                <hr/>
                Beginner's Guide
                <hr/>
                About
            </div>
        </div>
    )
}

export default Navbar