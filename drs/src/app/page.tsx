import Navbar from "@/app/(components)/Navbar";
import SongList from "@/app/(components)/SongPage";

export default function Home() {
  return (
    <div>
      <Navbar/>
      <main>
        <SongList/>
      </main>
      Footer
    </div>
  );
}
