import SongList from "@/app/tests.js"
import Navbar from "@/app/(components)/Navbar";
import SongPage from "@/app/(components)/SongPage";

export default function Home() {
  return (
    <div>
      <Navbar/>
      <main>
        <SongPage/>
      </main>
      Footer
    </div>
  );
}
