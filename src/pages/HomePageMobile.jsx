import LeftMobileNav from "../components/LeftMobileNav";
import NavBarMobile from "../components/NavBarMobile";
import { Outlet } from "react-router-dom";

const HomePageMobile = () => {

  return (
    <div
      id="home-scroller"
      className="w-screen h-screen max-h-[calc(100vh-56px)] box-border relative bg-frist-primary-bg text-second-primary-text dark:bg-dark-frist-primary-bg dark:text-dark-second-primary-text flex flex-col overflow-y-auto"
    >
      <div className="w-full h-full max-w-full box-border flex flex-col relative">
        <div className="h-full overflow-x-hidden">
          <LeftMobileNav />
          <div className="w-full h-full">
            <Outlet />
          </div>
        </div>
        <NavBarMobile />
      </div>
    </div>
  );
};

export default HomePageMobile;
