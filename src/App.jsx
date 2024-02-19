import { BrowserRouter, Route, Routes } from "react-router-dom"
import { ForYou, Explore, Profile } from "./pages/PageComponents/HomePage/HomeComponentExporter"
import { Home, ReelSwiper } from "./pages/pageExporter"
import HomePageMobile from "./pages/HomePageMobile"
import { useEffect, useState } from "react"
import ForYouMobile from "./pages/PageComponents/HomePageMobile/ForYouMobile"

function App() {


  const [isTabletSize, setIsTabletSize] = useState(false)

  useEffect(()=>{
    if(window.innerWidth <= 768) setIsTabletSize(true);
    else setIsTabletSize(false);
  }, [])

  return (
    <BrowserRouter>
      <>
        <Routes>
          <Route element={isTabletSize ? <HomePageMobile /> : <Home/>}>
            <Route path="/" element={isTabletSize ? <ForYouMobile/> : <ForYou />} />
            <Route path="/foryou" element={<ForYou />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/:userName" element={<Profile />} />
          </Route>
          <Route path="/:userName/video/:reelId" element={<ReelSwiper />} />
        </Routes>
      </>
    </BrowserRouter>
  )
}

export default App
