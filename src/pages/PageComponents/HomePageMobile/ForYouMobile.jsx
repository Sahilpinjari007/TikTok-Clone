import React, { useEffect, useRef } from "react";
import ReelCardMobile from "../../../components/ReelCardMobile";
import { useDispatch, useSelector } from "react-redux";
import { setIsOpenNav } from "../../../features/menul/menulSlice";
import {
  getReelsByKeyword,
  setCursor,
  setKeywords,
} from "../../../features/services/tiktokSlice";

const ForYouMobile = () => {
  const mobileReelContainerRef = useRef(null);
  const dispatch = useDispatch();

  const { isOpenNav } = useSelector((state) => state.app);

  const { reels, response, loading, cursor, keywords } = useSelector(
    (state) => state.tiktok
  );

  const loadMoreReels = () => {
    dispatch(getReelsByKeyword({ keywords, cursor }));

    if (!response?.data?.hasMore) {
      dispatch(
        setKeywords({
          keywords: exploresCategoris[Math.floor(Math.random() * 20)],
        })
      );
      dispatch(setCursor({ cursor: 1 }));
    } else {
      dispatch(setCursor({ cursor: cursor + 10 }));
    }
  };

  const handleMobileReelContainerScroll = (e) => {
    if (e.target.scrollTop >= e.target.scrollHeight - 1500 && !loading) {
      loadMoreReels();
    }
  };

  useEffect(() => {
    dispatch(getReelsByKeyword({ keywords, cursor }));
    dispatch(setCursor({ cursor: cursor + 10 }));
  }, []);

  return (
    <div className="w-full h-full">
      <div className="w-full h-full relative  overflow-hidden box-border">
        <div
          onClick={() => dispatch(setIsOpenNav(!isOpenNav))}
          className="w-max h-max absolute top-[10px] left-[15px] flex z-[999]"
        >
          <svg
            fontSize="24px"
            viewBox="0 0 48 48"
            xmlns="http://www.w3.org/2000/svg"
            width="25px"
            height="25px"
            className="fill-dark-third-primary-icon-color"
          >
            <path d="M5 11a1 1 0 0 1 1-1h36a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1v-2Zm0 12a1 1 0 0 1 1-1h36a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1v-2Zm1 11a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h36a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1H6Z" />
          </svg>
        </div>

        <div className="w-max h-max absolute top-[10px] right-[15px] flex z-[999]">
          <svg
            fill="currentColor"
            fontSize="24px"
            viewBox="0 0 48 48"
            xmlns="http://www.w3.org/2000/svg"
            width="25px"
            height="25px"
            className="fill-dark-third-primary-icon-color"
          >
            <path d="M21.26 7a15.26 15.26 0 1 0 0 30.52 15.26 15.26 0 0 0 0-30.52ZM2 22.26A19.26 19.26 0 1 1 36.23 34.4l9.65 9.66c.3.29.3.76 0 1.06l-1.76 1.76c-.3.3-.77.3-1.06 0l-9.66-9.65A19.26 19.26 0 0 1 2 22.27Z" />
          </svg>
        </div>

        <div
          onScroll={(e) => handleMobileReelContainerScroll(e)}
          ref={mobileReelContainerRef}
          className="w-full h-full overflow-y-auto overflow-x-hidden scrollbar-hide flex flex-col snap-y snap-mandatory"
        >
          {reels?.map((reel, i) => (
            <ReelCardMobile key={i}
              parent={mobileReelContainerRef.current}
              data={reel}
            />
          ))}

          {loading && reels.length === 0 && (
            <svg
              preserveAspectRatio="none"
              viewBox="0 0 200 200"
              width="48"
              height="48"
              className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]"
            >
              <defs>
                <mask id="redhole-1706520364919">
                  <rect width="100%" height="100%" fill="white"></rect>
                  <circle className="css-dt84ji-Circle e1ugmybf0"></circle>
                </mask>
                <mask id="greenhole-1706520364919">
                  <rect width="100%" height="100%" fill="white"></rect>
                  <circle className="css-nuz7yg-Circle e1ugmybf0"></circle>
                </mask>
              </defs>

              <circle
                strokeWidth="2"
                stroke="#3AF2FF"
                className="tiktiok-loader-circle1"
              ></circle>
              <circle
                mask="url(#redhole-1706520364919)"
                className="tiktiok-loader-circle2"
              ></circle>
              <circle
                mask="url(#greenhole-1706520364919)"
                className="tiktiok-loader-circle3"
              ></circle>
            </svg>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForYouMobile;
