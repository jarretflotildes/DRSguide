"use client";

import Link from "next/link"
import React from 'react'

const Footer = () => {
    return (
        <div className='flex bg-yellow-500 py-4 px-4 items-center w-full'>
            <Link href="https://github.com/jarretflotildes/DRSguide" 
                className="text-white">
                    v08032025
            </Link>
       </div>
    )
}

export default Footer