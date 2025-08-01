import Navbar from "@/app/(components)/Navbar";
import SongList from "@/app/(components)/SongPage";
import Image from 'next/image';

export default function Home() {
  return (
    <div>
      <Navbar/>
      <main>
        {/** <img src="jackets/8347.png"
alt="hello"/>
<img src="../public/file.svg"></img>
*/}

        <SongList/>

        </main>
      Footer
    </div>
  );
}
