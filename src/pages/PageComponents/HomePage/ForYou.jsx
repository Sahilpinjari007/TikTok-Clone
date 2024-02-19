import React, { useEffect, useState } from "react";
import { ReelCard } from "../../../components/componentsExporter.js";
import { useSelector, useDispatch } from "react-redux";
import { setCursor, setKeywords, getReelsByKeyword } from "../../../features/services/tiktokSlice.js";
import { exploresCategoris } from "../../../constant.js";




const ForYou = () => {


  const dispatch = useDispatch()
  const { loadMoreData, reelAutoScroll, isReelEnd } = useSelector((state) => state.app)
  const { reels, response, loading, cursor, keywords } = useSelector((state) => state.tiktok);


  const loadMoreReels = () => {
    dispatch(getReelsByKeyword({ keywords, cursor }))

    if (!response?.data?.hasMore) {
      dispatch(setKeywords({ keywords: exploresCategoris[Math.floor(Math.random() * 20)] }))
      dispatch(setCursor({ cursor: 1 }))
    }
    else {
      dispatch(setCursor({ cursor: cursor + 10 }))
    }
  }


  if (loadMoreData && !loading) {
    loadMoreReels()
  }

  if (reelAutoScroll && isReelEnd?.value) {
    const container = document.querySelector('#reel-container');
    container?.children[isReelEnd?.index + 1]?.scrollIntoView();
  }

  useEffect(() => {
    dispatch(getReelsByKeyword({ keywords, cursor }))
    dispatch(setCursor({ cursor: cursor + 10 }))
  }, [])


  return (
    <div className="w-full h-fullflex flex-col items-center justify-center overflow-hidden">
      <div id="reel-container" className="w-max m-auto min-h-[calc(100vh-60px)] relative">
        {reels.length === 0 && (
          <svg
            preserveAspectRatio="none"
            viewBox="0 0 200 200"
            width="48"
            height="48"
            className="block my-[6px] mx-auto absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]"
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

        {reels?.map((reel, i) => {
          return <ReelCard key={i} data={reel} index={i} />;
        })}

      </div>

      {(loading && reels.length > 0) && <svg
        preserveAspectRatio="none"
        viewBox="0 0 200 200"
        width="48"
        height="48"
        className="block my-[6px] mx-auto"
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
      </svg>}
    </div>
  );
};

export default ForYou;
