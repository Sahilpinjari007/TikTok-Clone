import React, { useEffect, useState } from "react";
import {
  Videos,
  Favorites,
  Liked,
} from "../ProfilePage/ProfileComponentExporter";

let globalNavIndicatorValues =
  window.innerWidth <= 478
    ? {
        videos: { value: true, width: "92.18px", Xoffset: "0px" },
        favorites: { value: false, width: "133.15px", Xoffset: "92.18px" },
        liked: { value: false, width: "103.8px", Xoffset: "225.33px" },
      }
    : {
        videos: { value: true, width: "122.7px", Xoffset: "0px" },
        favorites: { value: false, width: "168.04px", Xoffset: "122.7px" },
        liked: { value: false, width: "135.03px", Xoffset: "290.74px" },
      };

const Profile = () => {
  const [activeProfileNav, setActiveProfileNav] = useState(
    globalNavIndicatorValues
  );

  const handleProfileNavClick = (key) => {
    setActiveProfileNav({
      ...{
        videos: {
          value: false,
          width: globalNavIndicatorValues.videos.width,
          Xoffset: globalNavIndicatorValues.videos.Xoffset,
        },

        favorites: {
          value: false,
          width: globalNavIndicatorValues.favorites.width,
          Xoffset: globalNavIndicatorValues.favorites.Xoffset,
        },

        liked: {
          value: false,
          width: globalNavIndicatorValues.liked.width,
          Xoffset: globalNavIndicatorValues.liked.Xoffset,
        },
      },
      [key]: {
        value: true,
        width: activeProfileNav[key].width,
        Xoffset: activeProfileNav[key].Xoffset,
      },
    });

    handleMouseHoverOnProfilNav(key);
  };

  const handleMouseHoverOnProfilNav = (key) => {
    const navIndicator = document.querySelector(".nav-indicator");

    navIndicator.style.width = activeProfileNav[key].width;
    navIndicator.style.transform = `translate(${activeProfileNav[key].Xoffset}, 0)`;
  };

  const handleMouseHoverOutOnProfilNav = () => {
    const navIndicator = document.querySelector(".nav-indicator");

    if (activeProfileNav.videos.value) {
      navIndicator.style.width = activeProfileNav.videos.width;
      navIndicator.style.transform = `translate(${activeProfileNav.videos.Xoffset}, 0)`;
    } else if (activeProfileNav.favorites.value) {
      navIndicator.style.width = activeProfileNav.favorites.width;
      navIndicator.style.transform = `translate(${activeProfileNav.favorites.Xoffset}, 0)`;
    } else {
      navIndicator.style.width = activeProfileNav.liked.width;
      navIndicator.style.transform = `translate(${activeProfileNav.liked.Xoffset}, 0)`;
    }
  };

  return (
    <div className="px-[15px] mssm:px-[24px] pt-[32px] pb-[36px] flex flex-col min-h-[calc(-59px+100vh)] mx-auto box-content">
      <div className="flex flex-col flex-auto">
        <div className="w-full mmmd:max-w-[624px] pr-0 mmmd:pr-[92px] min-h-[140px] flex flex-col box-border my-[20px] mssm:mt-0 relative flex-[0_0_auto]">
          <div className="flex mssm:flex-row flex-col items-center w-full h-max">
            <div className="w-[100px] h-[100px] mmd:w-[116px] mmd:h-[116px] relative flex items-center justify-center">
              <span className="w-full h-full overflow-hidden rounded-[50%] inline-block">
                <img
                  className="w-full h-full object-cover"
                  src="https://p16-sign.tiktokcdn-us.com/tos-useast5-avt-0068-tx/7327232170508943403~c5_100x100.jpeg?lk3s=a5d48078&x-expires=1706932800&x-signature=Q76NR38%2F8Y5oboHCYyCuD1eHyUQ%3D"
                  alt=""
                />
              </span>
            </div>
            <div className="flex-[1_1_0%] cursor-pointer overflow-visible flex mssm:ml-[20px] flex-col justify-between ssm:w-full mt-[20px] mssm:mt-0">
              <h1 className="font-bold text-[28px] mmd:text-[32px] leading-[38px] mmd:mb-[4px] overflow-hidden text-ellipsis text-center mssm:text-left break-words">
                sahilpinjari231
              </h1>
              <h2 className="font-semibold text-[18px] leading-[24px] text-ellipsis h-[25px] overflow-hidden max-w-[450px] whitespace-nowrap flex justify-center mssm:justify-start">
                sahilpinjari231
              </h2>
              <div className="relative h-[36px] p-0 mt-[16px] ssm:w-full ssm:flex ssm:justify-center">
                <button className="font-semibold border border-solid border-second-primary-border dark:border-transparent hover:border-fifth-primary-border dark:hover:border-dark-fifth-primary-border rounded-[4px] min-h-[36px]  relative justify-center select-none cursor-pointer h-[36px] text-[16px] flex items-center px-[16px] min-w-[136px] leading-[34px] mr-[8px] text-second-primary-text dark:text-dark-second-primary-text bg-second-primary-btn dark:bg-dark-fourth-primary-btn hover:bg-third-primary-btn dark:hover:bg-dark-frist-primary-bg">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1em"
                    height="1em"
                    fill="currentColor"
                    className="w-[20px] h-[20px] mr-[6px]"
                  >
                    <path
                      fill="currentColor"
                      fillRule="evenodd"
                      d="M15.393 2.226a.842.842 0 0 0-1.17.02L8.142 8.33a.842.842 0 0 0-.247.595v2.34c0 .464.377.841.842.841h2.183a.842.842 0 0 0 .596-.246l6.237-6.238a.843.843 0 0 0-.02-1.211l-2.34-2.184ZM9.58 9.273l5.26-5.26 1.107 1.033-5.374 5.375H9.58V9.273ZM9.58 2a.42.42 0 0 1 .42.421v.842a.421.421 0 0 1-.42.421H4.526a.842.842 0 0 0-.842.842v10.948c0 .465.377.842.842.842h10.947a.842.842 0 0 0 .842-.842V10.42c0-.232.189-.421.421-.421h.842c.233 0 .422.188.422.421v5.053A2.526 2.526 0 0 1 15.473 18H4.526A2.526 2.526 0 0 1 2 15.474V4.526A2.526 2.526 0 0 1 4.526 2H9.58Z"
                      clipRule="evenodd"
                    ></path>
                  </svg>

                  <span>Edit profile</span>
                </button>
              </div>
            </div>
          </div>
          <h3 className="flex items-center mt-[22px] text-fifth-primary-text">
            <div className="font-semibold leading-[24px] flex items-baseline cursor-pointer text-second-primary-text dark:text-dark-second-primary-text mr-[20px]">
              <strong className="font-bold text-[18px]">0</strong>
              <span className="font-[400] text-[16px] leading-[20px] inline-block ml-[6px] text-fifth-primary-text dark:text-dark-fifth-primary-text">
                Following
              </span>
            </div>

            <div className="font-semibold leading-[24px] flex items-baseline cursor-pointer text-second-primary-text dark:text-dark-second-primary-text mr-[20px]">
              <strong className="font-bold text-[18px]">0</strong>
              <span className="font-[400] text-[16px] leading-[20px] inline-block ml-[6px] text-fifth-primary-text dark:text-dark-fifth-primary-text">
                Followers
              </span>
            </div>

            <div className="font-semibold leading-[24px] flex items-baseline cursor-pointer text-second-primary-text dark:text-dark-second-primary-text mr-[20px]">
              <strong className="font-bold text-[18px]">0</strong>
              <span className="font-[400] text-[16px] leading-[20px] inline-block ml-[6px] text-fifth-primary-text dark:text-dark-fifth-primary-text">
                Likes
              </span>
            </div>
          </h3>
          <h2 className="text-left text-second-primary-text dark:text-dark-second-primary-text font-[400] text-[16px] leading-[21px] whitespace-pre-line mt-[10px]">
            No bio yet.
          </h2>
          <div className="absolute top-[-37px] mssm:top-[21px] cursor-pointer flex flex-row justify-between gap-[18px] right-[1px]">
            <div className="relative cursor-pointer">
              <svg
                className="stroke-second-primary-text dark:stroke-dark-second-primary-text"
                width={24}
                data-e2e=""
                height={24}
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12.5546 8.35111L13.3171 8.16468V7.37972V3.50006L21.4998 12.0001L13.3171 20.5001V16.3738V15.3664L12.3098 15.3738C8.838 15.3994 5.4275 17.0466 2.49983 19.5882C2.54612 19.2536 2.67769 18.641 2.94391 17.8329C3.3786 16.5132 4.01326 15.1988 4.88691 13.971C6.71045 11.4083 9.24414 9.16046 12.5546 8.35111Z"
                  // stroke="#161823"
                  strokeWidth={2}
                />
              </svg>
            </div>
          </div>
        </div>

        <div className="flex flex-auto flex-col justify-start min-h-[490px] items-start relative">
          <div className="flex relative top-0 z-0 flex-row items-stretch justify-stretch w-full h-[44px] mb-[8px] bg-frist-primary-bg dark:bg-dark-frist-primary-bg after:absolute after:bottom-0 after:left-0 after:content-[''] after:w-full after:h-[1px] after:bg-third-primary-bg  dark:after:bg-dark-third-primary-bg after:scale-y-[0.5]">
            <p
              onClick={() => handleProfileNavClick("videos")}
              onMouseOver={() => handleMouseHoverOnProfilNav("videos")}
              onMouseOut={handleMouseHoverOutOnProfilNav}
              className={`px-[20px] mmmd:px-[32px] font-semibold text-[16px] mmmd:text-[18px] leading-[24px] relativejustify-center flex-shrink-0 h-[44px] cursor-pointer text-center ${
                activeProfileNav.videos.value
                  ? "text-second-primary-text dark:text-dark-second-primary-text"
                  : "text-third-primary-text dark:text-dark-third-primary-text"
              } hover:text-second-primary-text dark:hover:text-dark-second-primary-text  flex items-center`}
            >
              <span>Videos</span>
            </p>

            <p
              onClick={() => handleProfileNavClick("favorites")}
              onMouseOver={() => handleMouseHoverOnProfilNav("favorites")}
              onMouseOut={handleMouseHoverOutOnProfilNav}
              className={`px-[20px] mmmd:px-[32px] font-semibold text-[16px] mmmd:text-[18px] leading-[24px] relativejustify-center flex-shrink-0 h-[44px] cursor-pointer text-center ${
                activeProfileNav.favorites.value
                  ? "text-second-primary-text dark:text-dark-second-primary-text"
                  : "text-third-primary-text dark:text-dark-third-primary-text"
              } hover:text-second-primary-text dark:hover:text-dark-second-primary-text  flex items-center`}
            >
              <svg
                width="1em"
                data-e2e=""
                height="1em"
                viewBox="0 0 48 48"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                style={{ transform: "translateY(2px)" }}
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M24 3C17.9249 3 13 7.92487 13 14V21H8C6.89543 21 6 21.8954 6 23V41C6 42.1046 6.89543 43 8 43H40C41.1046 43 42 42.1046 42 41V23C42 21.8954 41.1046 21 40 21H35V14C35 7.92487 30.0751 3 24 3ZM31 21V14C31 10.134 27.866 7 24 7C20.134 7 17 10.134 17 14V21H31Z"
                />
              </svg>
              <span className="ml-[6px]">Favorites</span>
            </p>

            <p
              onClick={() => handleProfileNavClick("liked")}
              onMouseOver={() => handleMouseHoverOnProfilNav("liked")}
              onMouseOut={handleMouseHoverOutOnProfilNav}
              className={`px-[20px] mmmd:px-[32px] font-semibold text-[16px] mmmd:text-[18px] leading-[24px] relativejustify-center flex-shrink-0 h-[44px] cursor-pointer text-center ${
                activeProfileNav.liked.value
                  ? "text-second-primary-text dark:text-dark-second-primary-text"
                  : "text-third-primary-text dark:text-dark-third-primary-text"
              } hover:text-second-primary-text dark:hover:text-dark-second-primary-text flex items-center`}
            >
              <svg
                width="1em"
                data-e2e=""
                height="1em"
                viewBox="0 0 48 48"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                style={{ transform: "translateY(2px)" }}
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M24 3C17.9249 3 13 7.92487 13 14V21H8C6.89543 21 6 21.8954 6 23V41C6 42.1046 6.89543 43 8 43H40C41.1046 43 42 42.1046 42 41V23C42 21.8954 41.1046 21 40 21H35V14C35 7.92487 30.0751 3 24 3ZM31 21V14C31 10.134 27.866 7 24 7C20.134 7 17 10.134 17 14V21H31Z"
                />
              </svg>
              <span className="ml-[6px]">Liked</span>
            </p>

            <div
              className={`absolute h-[2px] bottom-0 transition-transform duration-[0.3s] ease-linear bg-second-primary-text dark:bg-dark-second-primary-text nav-indicator w-[122.7px] translate-x-[0px]`}
            ></div>
          </div>

          <main className="flex-[0_0_auto] justify-center flex flex-col min-h-[490px] items-center mx-auto">
            {activeProfileNav.videos.value ? (
              <Videos />
            ) : activeProfileNav.favorites.value ? (
              <Favorites />
            ) : (
              <Liked />
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Profile;
