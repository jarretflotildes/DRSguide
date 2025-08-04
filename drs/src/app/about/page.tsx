import React from 'react'
import Navbar from "@/app/(components)/Navbar"
import Footer from '@/app/(components)/Footer'

const about = () => {
    return (
        <div>
            <Navbar/>
            <div className="min-h-screen bg-gray-900 text-white p-8">
                <div>
                    Learn how to play the dance game Dancerush Stardom with this website!
                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default about