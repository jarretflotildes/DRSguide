"use client"

import Navbar from "@/app/(components)/Navbar";
import SongList from "@/app/(components)/SongList";
import Footer from "@/app/(components)/Footer";

export default function Home() {

  return (
    <div>
        <Navbar/>
        <main>
          <SongList/>
          </main>
        <Footer/>
    </div>
  );
}
