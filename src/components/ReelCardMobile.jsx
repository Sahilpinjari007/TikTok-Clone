import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setIsMute } from "../features/videoPlayer/videoPlayerSlice";

function convertNumberInIntranational(labelValue) {
  // Nine Zeroes for Billions
  return Math.abs(Number(labelValue)) >= 1.0e9
    ? (Math.abs(Number(labelValue)) / 1.0e9).toFixed(2) + "B"
    : // Six Zeroes for Millions
    Math.abs(Number(labelValue)) >= 1.0e6
    ? (Math.abs(Number(labelValue)) / 1.0e6).toFixed(2) + "M"
    : // Three Zeroes for Thousands
    Math.abs(Number(labelValue)) >= 1.0e3
    ? (Math.abs(Number(labelValue)) / 1.0e3).toFixed(2) + "K"
    : Math.abs(Number(labelValue));
}

const ReelCardMobile = ({ parent, data }) => {
  const dispatch = useDispatch();
  const reelCardRef = useRef(null);
  const videoRef = useRef(null);

  const { isMute } = useSelector((state) => state.videoPlayer);

  const [showFullTitle, setShowFullTitle] = useState(false);
  const [videoIntranctions, setVideoIntractions] = useState({
    isPaused: false,
    isBuffer: false,
    videoProgress: 0,
    currentVideoTime: 0,
  });

  const handleVideoPlayPause = () => {
    videoIntranctions.isPaused
      ? videoRef.current.play()
      : videoRef.current.pause();
    setVideoIntractions({
      ...videoIntranctions,
      isPaused: !videoIntranctions.isPaused,
    });
  };

  const handleVideoAudio = () => {
    isMute ? (videoRef.current.muted = false) : (videoRef.current.muted = true);
    dispatch(setIsMute({ setIsMute: !isMute }));
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            videoRef.current.currentTime = 0;
            videoRef.current?.play();
          } else {
            videoRef.current?.pause();
            setVideoIntractions({...videoIntranctions, isPaused: false})
          }
        });
      },
      {
        root: parent,
        rootMargin: "0px",
        threshold: 1.0,
      }
    );

    observer.observe(reelCardRef.current);
  }, [videoRef.current]);

  return (
    <div
      ref={reelCardRef}
      className="relative min-h-full h-full w-full overflow-hidden snap-start"
    >
      <div className="absolute w-[10%] h-[10%] max-h-[calc(100%-52.8px)]] top-[50%] left-[50%] scale-[11] blur-[2px] opacity-[0.3px]">
        <span className="block w-full h-full overflow-hidden">
          <img
            className="h-full w-full object-cover"
            draggable={false}
            src={data?.origin_cover}
            alt={data?.author?.nickname}
          />
        </span>
      </div>

      {videoIntranctions.isPaused && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={70}
          height={70}
          fill="#fff"
          data-e2e="browse-video-play"
          className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] cursor-pointer z-[999]"
        >
          <use xlinkHref="#Play_Fill-6957a00f" />
        </svg>
      )}

      <div className="relative h-full min-h-full m-auto w-full mssm:w-[372px] max-w-full">
        <div className="w-full h-full min-h-full block m-auto inset-0">
          <span className="w-full mssm:w-max h-full inset-0">
            <img
              className="w-full mssm:w-max h-full object-cover"
              src={data?.origin_cover}
              alt={data?.author?.nickname}
            />
          </span>
        </div>

        <div className="absolute m-auto w-full h-full top-0 left-0">
          <div className="w-full h-full relative flex items-center justify-center">
            <video
              loop={true}
              muted={isMute}
              ref={videoRef}
              onClick={handleVideoPlayPause}
              onPlaying={() =>
                setVideoIntractions({
                  ...videoIntranctions,
                  isBuffer: false,
                  sPaused: false,
                })
              }
              onWaiting={() =>
                setVideoIntractions({ ...videoIntranctions, isBuffer: true })
              }
              className="w-full h-full block object-cover cursor-pointer"
              src={data?.play}
            ></video>

            {videoIntranctions.isBuffer && (
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

        <div className="w-full h-max absolute bottom-0 left-0">
          <div className="relative w-full h-max flex flex-row">
            <div className="w-full max-w-[calc(100%-74px)] h-max mr-[62px] ml-[12px] box-border">
              <div className="w-full h-max">
                <h2 className="w-full h-max flex items-center">
                  <strong className="font-semibold text-[17px]">
                    {data?.author?.unique_id}
                  </strong>
                  <span className="inline-block ml-[6px]">
                    <svg
                      viewBox="0 0 48 48"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                      width="1em"
                      height="1em"
                    >
                      <g clipPath="url(#Icon_Color-Verified_Badge_svg__a)">
                        <path
                          d="M0 24a24 24 0 1 1 48 0 24 24 0 0 1-48 0Z"
                          fill="#20D5EC"
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M37.12 15.88a3 3 0 0 1 0 4.24l-13.5 13.5a3 3 0 0 1-4.24 0l-8.5-8.5a3 3 0 1 1 4.24-4.24l6.38 6.38 11.38-11.38a3 3 0 0 1 4.24 0Z"
                          fill="#fff"
                        />
                      </g>
                      <defs>
                        <clipPath id="Icon_Color-Verified_Badge_svg__a">
                          <path fill="#fff" d="M0 0h48v48H0z" />
                        </clipPath>
                      </defs>
                    </svg>
                  </span>
                </h2>

                <h1 className="w-full max-w-[calc(100%-5px)] text-[15px] font-normal leading-[1.2] mb-[8px] truncate box box-border whitespace-normal">
                  <div
                    className={`flex w-full overflow-hidden relative ${
                      showFullTitle ? "pb-[26px]" : "pb-[unset]"
                    }`}
                  >
                    <div
                      className={`w-full overflow-hidden text-ellipsis 
                    ${
                      showFullTitle
                        ? "line-clamp-[999] max-h-[unset]"
                        : "line-clamp-2 max-h-[38px]"
                    }  box-border before:content-[''] before:h-[calc(100%-18px)] before:float-right before:w-0 before:mt-0`}
                    >
                      {(!showFullTitle && data?.title.length >= 70) && (
                        <div className="clear-both float-right cursor-pointer flex items-center text-[18px] relative bottom-[3px] box-border">
                          <button
                            onClick={() =>
                              setShowFullTitle((priVal) => !priVal)
                            }
                            className="text-[15px] leading-[18px]  font-semibold border-none outline-none bg-none cursor-pointer"
                          >
                            more
                          </button>
                        </div>
                      )}
                      <div
                        className={`box-border ${
                          showFullTitle &&
                          " overflow-y-auto max-h-[42vh] scrollbar-hide"
                        }`}
                      >
                        <span className="inline box-border font-[400]">
                          {data?.title}
                        </span>
                      </div>
                    </div>
                    {showFullTitle && (
                      <button
                        onClick={() => setShowFullTitle((priVal) => !priVal)}
                        className="text-[15px] leading-[18px]  font-semibold border-none outline-none bg-none cursor-pointer right-0 bottom-0 absolute"
                      >
                        less
                      </button>
                    )}
                  </div>
                </h1>

                <h2 className="mb-[12px] relative w-full h-max text-[15px] font-semibold overflow-hidden cursor-pointer text-dark-second-primary-text">
                  <div className="w-full h-max flex flex-row items-start">
                    <span className="w-full max-w-full truncate flex flex-row items-center">
                      <div className="w-[15px] h-[15px] mx-[3px] flex items-center justify-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="1em"
                          height="1em"
                          fill="rgba(255, 255, 255, .9)"
                          className="mr-[8px] flex-shrink-0"
                        >
                          <use xlinkHref="#Music_Note-8c658968" />
                        </svg>
                      </div>
                      <span className="w-full max-w-[calc(100%-40px)] h-max truncate font-normal">
                        {data?.music_info?.title}
                      </span>
                    </span>
                  </div>
                </h2>
              </div>
            </div>

            <div className="absolute w-full max-w-max h-max right-0 bottom-0 cursor-pointer">
              <div className="relative w-max h-max flex flex-col items-center">
                <div className="w-[62px] h-[65px] flex flex-col justify-center mb-[12px]">
                  <div className="flex  items-center justify-center relative">
                    <div className="w-[44px] h-[44px] rounded-[50%] relative flex items-center justify-center box-border border border-solid border-second-primary-btn overflow-hidden">
                      <img
                        src={data?.author?.avatar}
                        alt={data?.author?.nickname}
                      />
                    </div>

                    <div className="box-border flex items-center justify-center absolute left-[50%] bottom-0 translate-x-[-50%] translate-y-[50%] ">
                      <svg
                        width={23}
                        data-e2e=""
                        height={23}
                        viewBox="0 0 28 28"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g filter="url(#RedPlusCircleColor_filter0_d)">
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M14 25C20.6274 25 26 19.6274 26 13C26 6.37258 20.6274 1 14 1C7.37258 1 2 6.37258 2 13C2 19.6274 7.37258 25 14 25Z"
                            fill="#FE2C55"
                          />
                        </g>
                        <path
                          d="M9.5 14C9.22386 14 9 13.7761 9 13.5V12.5C9 12.2239 9.22386 12 9.5 12H18.5C18.7761 12 19 12.2239 19 12.5V13.5C19 13.7761 18.7761 14 18.5 14H9.5Z"
                          fill="white"
                        />
                        <path
                          d="M13 8.5C13 8.22386 13.2239 8 13.5 8H14.5C14.7761 8 15 8.22386 15 8.5V17.5C15 17.7761 14.7761 18 14.5 18H13.5C13.2239 18 13 17.7761 13 17.5V8.5Z"
                          fill="white"
                        />
                        <defs>
                          <filter
                            id="RedPlusCircleColor_filter0_d"
                            x={0}
                            y={0}
                            width={28}
                            height={28}
                            filterUnits="userSpaceOnUse"
                            colorInterpolationFilters="sRGB"
                          >
                            <feFlood
                              floodOpacity={0}
                              result="BackgroundImageFix"
                            />
                            <feColorMatrix
                              in="SourceAlpha"
                              type="matrix"
                              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                            />
                            <feOffset dy={1} />
                            <feGaussianBlur stdDeviation={1} />
                            <feColorMatrix
                              type="matrix"
                              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.06 0"
                            />
                            <feBlend
                              mode="normal"
                              in2="BackgroundImageFix"
                              result="effect1_dropShadow"
                            />
                            <feBlend
                              mode="normal"
                              in="SourceGraphic"
                              in2="effect1_dropShadow"
                              result="shape"
                            />
                          </filter>
                        </defs>
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="w-[62px] h-[65px] flex flex-col justify-center">
                  <div className="flex items-center justify-center">
                    <svg
                      viewBox="0 0 48 48"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                      width="32px"
                      height="32px"
                    >
                      <g
                        filter="url(#Icon_Color-Like_Shadow_Alt_1_svg__b)"
                        clipPath="url(#Icon_Color-Like_Shadow_Alt_1_svg__a)"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M15 4.5c6 0 9 4 9 4s3-4 9-4c7 0 12 5.5 12 12.5 0 8-6.54 15.13-12.5 20.5C28.82 40.81 26 43 24 43s-4.9-2.2-8.5-5.5C9.64 32.13 3 25 3 17 3 10 8 4.5 15 4.5Z"
                          fill="#fff"
                          fillOpacity="0.9"
                          shapeRendering="crispEdges"
                        />
                      </g>
                      <defs>
                        <clipPath id="Icon_Color-Like_Shadow_Alt_1_svg__a">
                          <path fill="#fff" d="M0 0h48v48H0z" />
                        </clipPath>
                        <filter
                          id="Icon_Color-Like_Shadow_Alt_1_svg__b"
                          x="-1.5"
                          y="1.5"
                          width={51}
                          height="47.5"
                          filterUnits="userSpaceOnUse"
                          colorInterpolationFilters="sRGB"
                        >
                          <feFlood
                            floodOpacity={0}
                            result="BackgroundImageFix"
                          />
                          <feColorMatrix
                            in="SourceAlpha"
                            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                            result="hardAlpha"
                          />
                          <feOffset dy="1.5" />
                          <feGaussianBlur stdDeviation="2.25" />
                          <feComposite in2="hardAlpha" operator="out" />
                          <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0" />
                          <feBlend
                            in2="BackgroundImageFix"
                            result="effect1_dropShadow_81245_5661"
                          />
                          <feColorMatrix
                            in="SourceAlpha"
                            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                            result="hardAlpha"
                          />
                          <feOffset dy="1.5" />
                          <feGaussianBlur stdDeviation="0.75" />
                          <feComposite in2="hardAlpha" operator="out" />
                          <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0" />
                          <feBlend
                            in2="effect1_dropShadow_81245_5661"
                            result="effect2_dropShadow_81245_5661"
                          />
                          <feBlend
                            in="SourceGraphic"
                            in2="effect2_dropShadow_81245_5661"
                            result="shape"
                          />
                        </filter>
                      </defs>
                    </svg>
                  </div>
                  <span className="text-[13px] leading-[17px] font-semibold text-dark-second-primary-text text-center">
                    {convertNumberInIntranational(data?.digg_count)}
                  </span>
                </div>

                <div className="w-[62px] h-[65px] flex flex-col justify-center">
                  <div className="flex items-center justify-center">
                    <svg
                      viewBox="0 0 48 48"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                      width="32px"
                      height="32px"
                    >
                      <g filter="url(#Icon_Color-Comment_Shadow_svg__a)">
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M38.5 35.31c4.1-4.11 6.5-8.4 6.5-13.38C45 11.8 35.73 3.6 24.3 3.6S3.6 11.8 3.6 21.93C3.6 32.05 13.17 39 24.6 39v3.36c0 1.06 1.1 1.74 2.04 1.24 2.92-1.59 8.33-4.76 11.85-8.29ZM14.23 19.46a2.95 2.95 0 0 1 2.96 2.93 2.95 2.95 0 0 1-2.96 2.94 2.95 2.95 0 0 1-2.95-2.94 2.95 2.95 0 0 1 2.95-2.93Zm13.02 2.93a2.95 2.95 0 0 0-2.96-2.93 2.95 2.95 0 0 0-2.96 2.93 2.95 2.95 0 0 0 2.96 2.94 2.95 2.95 0 0 0 2.96-2.94Zm7.1-2.93a2.95 2.95 0 0 1 2.95 2.93 2.95 2.95 0 0 1-2.96 2.94 2.95 2.95 0 0 1-2.95-2.94 2.95 2.95 0 0 1 2.95-2.93Z"
                          fill="#fff"
                          fillOpacity="0.9"
                        />
                      </g>
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M24.6 39s11.47-.89 16.26-7.02c-4.8 6.75-9.59 10.43-13.78 11.66C22.88 44.86 24.6 39 24.6 39Z"
                        fill="#000"
                        fillOpacity="0.03"
                      />
                      <defs>
                        <filter
                          id="Icon_Color-Comment_Shadow_svg__a"
                          x="1.2"
                          y="2.4"
                          width="46.2"
                          height="44.97"
                          filterUnits="userSpaceOnUse"
                          colorInterpolationFilters="sRGB"
                        >
                          <feFlood
                            floodOpacity={0}
                            result="BackgroundImageFix"
                          />
                          <feColorMatrix
                            in="SourceAlpha"
                            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                            result="hardAlpha"
                          />
                          <feOffset dy="1.2" />
                          <feGaussianBlur stdDeviation="1.2" />
                          <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0" />
                          <feBlend
                            in2="BackgroundImageFix"
                            result="effect1_dropShadow_1_2867"
                          />
                          <feBlend
                            in="SourceGraphic"
                            in2="effect1_dropShadow_1_2867"
                            result="shape"
                          />
                        </filter>
                      </defs>
                    </svg>
                  </div>
                  <span className="text-[13px] leading-[17px] font-semibold text-dark-second-primary-text text-center">
                    {convertNumberInIntranational(data?.comment_count)}
                  </span>
                </div>

                <div className="w-[62px] h-[65px] flex flex-col justify-center">
                  <div className="flex items-center justify-center">
                    <svg
                      viewBox="0 0 48 48"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                      width="32px"
                      height="32px"
                    >
                      <g
                        filter="url(#Icon_Color-Share_Shadow_Alt_2_svg__b)"
                        clipPath="url(#Icon_Color-Share_Shadow_Alt_2_svg__a)"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M25.56 4.07a1.98 1.98 0 0 0-2.15-.42 1.95 1.95 0 0 0-1.21 1.8v8.34c-5.4.35-10.04 2.2-13.43 5.68C4.97 23.35 3 29.03 3 36.19c0 .79.48 1.5 1.22 1.8.73.3 1.58.13 2.14-.42 3.34-3.31 7.65-4.56 11.25-4.95 1.8-.2 3.37-.18 4.5-.1h.09v9.03c0 .78.46 1.48 1.18 1.79.72.3 1.56.16 2.13-.37l18.87-17.49a1.94 1.94 0 0 0 .04-2.8L25.56 4.07Z"
                          fill="#fff"
                          fillOpacity="0.9"
                          shapeRendering="crispEdges"
                        />
                      </g>
                      <defs>
                        <clipPath id="Icon_Color-Share_Shadow_Alt_2_svg__a">
                          <path fill="#fff" d="M0 0h48v48H0z" />
                        </clipPath>
                        <filter
                          id="Icon_Color-Share_Shadow_Alt_2_svg__b"
                          x="-1.5"
                          y="0.5"
                          width={51}
                          height={49}
                          filterUnits="userSpaceOnUse"
                          colorInterpolationFilters="sRGB"
                        >
                          <feFlood
                            floodOpacity={0}
                            result="BackgroundImageFix"
                          />
                          <feColorMatrix
                            in="SourceAlpha"
                            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                            result="hardAlpha"
                          />
                          <feOffset dy="1.5" />
                          <feGaussianBlur stdDeviation="2.25" />
                          <feComposite in2="hardAlpha" operator="out" />
                          <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0" />
                          <feBlend
                            in2="BackgroundImageFix"
                            result="effect1_dropShadow_81245_5665"
                          />
                          <feColorMatrix
                            in="SourceAlpha"
                            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                            result="hardAlpha"
                          />
                          <feOffset dy="1.5" />
                          <feGaussianBlur stdDeviation="0.75" />
                          <feComposite in2="hardAlpha" operator="out" />
                          <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0" />
                          <feBlend
                            in2="effect1_dropShadow_81245_5665"
                            result="effect2_dropShadow_81245_5665"
                          />
                          <feBlend
                            in="SourceGraphic"
                            in2="effect2_dropShadow_81245_5665"
                            result="shape"
                          />
                        </filter>
                      </defs>
                    </svg>
                  </div>
                  <span className="text-[13px] leading-[17px] font-semibold text-dark-second-primary-text text-center">
                    {convertNumberInIntranational(data?.share_count)}
                  </span>
                </div>

                <div
                  className={`w-[62px] h-[65px] flex flex-col justify-center mb-[12px] ${
                    !videoIntranctions.isPaused && "animate-rotate"
                  }`}
                >
                  <div className="flex items-center justify-center">
                    <div className="w-[40px] h-[40px] rounded-[50%] relative flex items-center justify-center box-border bg-sixth-primary-text">
                      <img
                        className="w-[28px] h-[28px] rounded-[50%]"
                        src={data?.music_info?.cover || data?.author?.avatar}
                        alt=""
                      />
                    </div>
                  </div>
                </div>

                <div
                  className="w-[35px] h-[35px] mt-[-15px] mb-[20px]"
                  onClick={handleVideoAudio}
                >
                  {isMute ? (
                    <svg
                      width={40}
                      data-e2e=""
                      height={40}
                      viewBox="0 0 48 48"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle cx={24} cy={24} r={24} fillOpacity={1} />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M21 16.9118C21 15.2513 20.8942 15.0909 20.709 15.0221C20.5238 14.9763 20.3122 14.9992 20.1799 15.1138L15.0741 19.5258H11.4762C11.2116 19.5258 11 19.7092 11 19.9384V28.084C11 28.3132 11.2116 28.4965 11.4762 28.4965H15.0741L20.1799 32.8862C20.3122 33.0008 20.5238 33.0237 20.709 32.9779C20.8942 32.9091 21 32.7487 21 32.5882V16.9118Z"
                        fill="white"
                      />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M35.098 18.9489C34.5998 18.4508 33.7921 18.4508 33.2939 18.949L30.1368 22.1061L26.9797 18.949C26.4815 18.4508 25.6738 18.4508 25.1756 18.9489C24.6775 19.4471 24.6775 20.2548 25.1756 20.753L28.3327 23.9101L25.1757 27.0672C24.6775 27.5654 24.6775 28.3731 25.1757 28.8713C25.6738 29.3694 26.4815 29.3694 26.9797 28.8713L30.1368 25.7142L33.2939 28.8713C33.7921 29.3694 34.5998 29.3694 35.0979 28.8713C35.5961 28.3731 35.5961 27.5654 35.0979 27.0672L31.9409 23.9101L35.098 20.753C35.5962 20.2548 35.5962 19.4471 35.098 18.9489Z"
                        fill="white"
                      />
                    </svg>
                  ) : (
                    <svg
                      width={40}
                      data-e2e=""
                      height={40}
                      viewBox="0 0 48 48"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle cx={24} cy={24} r={24} />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M21 16.9118C21 15.2513 20.8942 15.0909 20.709 15.0221C20.5238 14.9763 20.3122 14.9992 20.1799 15.1138L15.0741 19.5258H11.4762C11.2116 19.5258 11 19.7092 11 19.9384V28.084C11 28.3132 11.2116 28.4965 11.4762 28.4965H15.0741L20.1799 32.8862C20.3122 33.0008 20.5238 33.0237 20.709 32.9779C20.8942 32.9091 21 32.7487 21 32.5882V16.9118Z"
                        fill="white"
                      />
                      <path
                        d="M30.6653 15C32.7348 17.2304 34.0001 20.2174 34.0001 23.5C34.0001 26.7826 32.7348 29.7696 30.6653 32"
                        stroke="white"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                      />
                      <path
                        d="M26.8799 17.8833C28.1994 19.381 28.9999 21.347 28.9999 23.5C28.9999 25.653 28.1994 27.6191 26.8799 29.1168"
                        stroke="white"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                      />
                    </svg>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReelCardMobile;
