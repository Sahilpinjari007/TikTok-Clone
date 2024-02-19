import React, { useState } from "react";
import { Header, NavBar } from "../components/componentsExporter";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setBodyScrolling, setLoadMoreData } from "../features/menul/menulSlice";

const HomePage = () => {

  const dispatch = useDispatch();
  const [scrollVal, setScrollVal] = useState(0);


  const handleBodyScrolling = (e) => {

    if(e.target.scrollTop >= e.target.scrollHeight - 1500) dispatch(setLoadMoreData({loadMoreData: true}));
    else dispatch(setLoadMoreData({loadMoreData: false}))

    if (e.target.scrollTop > 80) {
      if (scrollVal - e.target.scrollTop > 0) {
        dispatch(setBodyScrolling({ isBodyScrolling: false }))
      }
      else {
        dispatch(setBodyScrolling({ isBodyScrolling: true }))
      }
    }
    setScrollVal(e.target.scrollTop);
  }



  return (
    <div onScroll={(e) => handleBodyScrolling(e)} id="home-scroller" className="w-screen h-screen box-border relative bg-frist-primary-bg text-second-primary-text dark:bg-dark-frist-primary-bg dark:text-dark-second-primary-text flex flex-col overflow-y-auto">
      <Header />
      <div className="w-full max-w-full h-max box-border flex flex-col-reverse mmd:flex-row relative">
        <NavBar />
        <div className="w-full h-max mb-[58.8px] mmd:mb-0 mmd:ml-[240px]">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
