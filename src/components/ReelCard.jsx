import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setIsMute } from "../features/videoPlayer/videoPlayerSlice";
import { setAutoReelScroll, setIsReelEnd } from "../features/menul/menulSlice";

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

const ReelCard = ({ data, index }) => {
  const dispatch = useDispatch();
  const isMute = useSelector((state) => state.videoPlayer.isMute);
  const reelAutoScroll = useSelector((state) => state.app.reelAutoScroll);

  const videoRef = useRef(null);
  const observRef = useRef(null);
  const [showFullTitle, setShowFullTitle] = useState(false);
  const [videoIntranctions, setVideoIntractions] = useState({
    isPlaying: true,
    isBuffer: false,
  });

  const handleVideoPlayPause = () => {
    setVideoIntractions({
      ...videoIntranctions,
      isPlaying: !videoIntranctions.isPlaying,
    });

    videoIntranctions.isPlaying
      ? videoRef.current.pause()
      : videoRef.current.play();
  };

  const handleVideoSound = () => {
    dispatch(setIsMute({ setIsMute: !isMute }));
    isMute ? (videoRef.current.muted = false) : (videoRef.current.muted = true);
  };

  const handleVideoEnd = () => {
    dispatch(setIsReelEnd({ value: true, index }));
  };

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        videoRef?.current?.play();
        setVideoIntractions({
          ...videoIntranctions,
          isPlaying: false,
        });
      } else {
        videoRef?.current?.pause();
        setVideoIntractions({
          ...videoIntranctions,
          isPlaying: true,
        });
      }
    });
    observer.observe(observRef?.current);
    dispatch(setIsReelEnd({ value: false, index }));
    return () => observer.disconnect();
  }, [observRef.current]);

  return (
    <div className="flex flex-row  py-[20px] relative max-w-[692px] transition-all duration-[0.3s] mmmd:w-[calc(100vw-80px)] mmd:w-auto w-[calc(100vw-40px)] mlg:w-[592px] mlg:max-w-[592px] after:content-[' '] after:absolute after:left-0 after:bottom-0 after:w-full after:h-[1px] after:scale-y-[0.5] after:bg-fourth-primary-text dark:after:bg-dark-fourth-primary-border scroll-mt-[60px]">
      <Link className="flex flex-[0_0_auto] smmd:hidden">
        <div className="relative flex items-center justify-center w-[56px] h-[56px]">
          <span className="inline-block box-border m-0 p-0 relative overflow-hidden text-center  rounded-[50%] cursor-pointer border-[0.5px] border-second-primary-border dark:border-dark-second-primary-border border-solid">
            <img src={data?.author?.avatar} alt={data?.author?.nickname} />
          </span>
        </div>
      </Link>

      <div className="ml-[12px] w-[624px] flex-[1_1_624px] flex flex-col smmd:ml-0 smmd:w-[100%] smmd:flex-[0_0_100%]">
        <div className="box-border mr-[114px]">
          <div className="flex flex-row items-center">
            <Link className="mr-[12px] mmmd:hidden">
              <div className="w-[40px] h-[40px] relative flex items-center justify-center">
                <span className="w-full h-full rounded-[50%] inline-block relative overflow-hidden text-center border-[0.5px] border-second-primary-border dark:border-dark-second-primary-border cursor-pointer">
                  <img
                    src={data?.author?.avatar}
                    alt={data?.author?.nickname}
                  />
                </span>
              </div>
            </Link>
            <Link className="block">
              <h3 className="font-semibold text-[18px] leading-[24px] inline-block mr-[4px] hover:underline">
                {data?.author?.unique_id}
                <span className="inline-block ml-[4px]">
                  <svg
                    fontSize="14px"
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
              </h3>
              <h4 className="font-[400] text-[14px] inline-block leading-[28px]">
                {data?.author?.nickname}
              </h4>
            </Link>
          </div>
          <button className="box-border appearance-none min-w-[96px] h-[36px] px-[15px] justify-center items-center border border-solid border-first-primary-border dark:border-dark-first-primary-border rounded-[2px] outline-none cursor-pointer text-[16px] text-frist-primary-text dark:text-dark-frist-primary-text right-0 absolute top-[28px] font-semibold dark:hover:bg-dark-third-primary-hover-btn hover:bg-third-primary-hover-btn inline-block">
            <div>Follow</div>
          </button>

          <div
            className={`flex w-full overflow-hidden relative ${
              showFullTitle ? "pb-[55px]" : "pb-0"
            }`}
          >
            <div
              className={`w-[100%] overflow-hidden text-ellipsis ${
                showFullTitle ? "line-clamp-[999]" : "line-clamp-2 max-h-[44px]"
              } before:content-[''] before:h-[calc(100%-21px)] before:float-right before:w-0 before:mt-0`}
            >
              <div className="float-right clear-both cursor-pointer leading-[21px] items-center relative bottom-[1px] text-second-primary-text dark:text-dark-second-primary-text">
                {!showFullTitle && data?.title.length > 75 && (
                  <button
                    onClick={() => setShowFullTitle(true)}
                    className="font-semibold text-[16px] leading-[21px] cursor-pointer outline-none text-second-primary-text dark:text-dark-second-primary-text px-[6px] py-[1px]"
                  >
                    more
                  </button>
                )}
              </div>

              <div className="text-[16px] leading-[21px] break-words">
                <span className="inline font-[400] fill-second-primary-text dark:fill-dark-second-primary-text leading-[21px] text-[16px]">
                  {data?.title?.split("#")[0]}
                </span>

                {data?.title?.split("#").map((hashTag, i) => {
                  if (i === 0) return;
                  return (
                    <Link
                      key={i}
                      className="inline-block text-second-primary-text dark:text-dark-second-primary-text ml-[5px]"
                    >
                      <strong className="font-semibold text-fourth-primary-text dark:text-dark-fourth-primary-text w-max">
                        #{hashTag}
                      </strong>
                    </Link>
                  );
                })}
              </div>
            </div>
            {showFullTitle && (
              <button
                onClick={() => setShowFullTitle(false)}
                className="font-semibold text-[16px] leading-[21px] border-none outline-none cursor-pointer left-[0px]] absolute bottom-[16px] text-second-primary-text dark:text-dark-second-primary-text"
              >
                less
              </button>
            )}
          </div>

          <div className="mb-[12px]">
            <h4 className="leading-[21px] mt-[2px] ml-[2px] font-[400] text-[14px] flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                className="css-wyuo16-MusicNoteIcon epjbyn4 mr-[5px] fill-third-primary-icon-color dark:fill-dark-third-primary-icon-color"
              >
                <use xlinkHref="#Music_Note-8c658968" />
              </svg>

              <div className="line-clamp-1 overflow-hidden inline-block hover:underline cursor-pointer">
                {data?.music_info?.title}
              </div>
            </h4>
          </div>
        </div>

        <div className="flex flex-row items-end h-max m-0  justify-center mmmd:justify-start">
          <div className="relative box-border bg-cover cursor-pointer mr-[20px] h-max">
            <div className="relative top-0 left-0 group">
              <div className="overflow-hidden rounded-[8px] relative h-max w-max">
                <Link
                  to={`/@${data?.author?.unique_id}/video/${data?.video_id}`}
                >
                  <div className="relative">
                    <img
                      className="max-w-[336px] max-h-max block object-cover absolute"
                      src={data?.origin_cover}
                      alt={data?.title}
                    />
                      <canvas className="w-[336px] h-[597px] max-w-full max-h-full bg-third-primary-bg dark:bg-dark-third-primary-bg" />
                  </div>

                  <div className="absolute top-0 left-0">
                    <video
                      muted={isMute}
                      loop={!reelAutoScroll}
                      ref={videoRef}
                      onEnded={handleVideoEnd}
                      onWaiting={() =>
                        setVideoIntractions({
                          ...videoIntranctions,
                          isBuffer: true,
                        })
                      }
                      onPlaying={() =>
                        setVideoIntractions({
                          ...videoIntranctions,
                          isBuffer: false,
                          isPlaying: true,
                        })
                      }
                      onPause={() =>
                        setVideoIntractions({
                          ...videoIntranctions,
                          isPlaying: false,
                        })
                      }
                      className="w-full h-full max-h-max block object-cover"
                      src={data?.play}
                    ></video>
                  </div>
                </Link>
              </div>

              <div
                ref={observRef}
                className="absolute bottom-[26px] left-0 w-full h-max flex items-center justify-between px-[12px]"
              >
                <div>
                  <div
                    className="p-[10px] w-[40px] h-[40px] transition-opacity duration-[0.3s] ease-linear flex items-center opacity-0 group-hover:opacity-[1]"
                    onClick={handleVideoPlayPause}
                  >
                    {videoIntranctions.isPlaying ? (
                      <svg
                        width="20"
                        data-e2e=""
                        height="20"
                        viewBox="0 0 48 48"
                        fill="#fff"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M8 6C8 5.44771 8.44772 5 9 5H17C17.5523 5 18 5.44772 18 6V42C18 42.5523 17.5523 43 17 43H9C8.44772 43 8 42.5523 8 42V6Z"></path>
                        <path d="M30 6C30 5.44771 30.4477 5 31 5H39C39.5523 5 40 5.44772 40 6V42C40 42.5523 39.5523 43 39 43H31C30.4477 43 30 42.5523 30 42V6Z"></path>
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={20}
                        height={20}
                        fill="#fff"
                      >
                        <use xlinkHref="#Play_Fill-6957a00f" />
                      </svg>
                    )}
                  </div>
                </div>

                <div className="w-max h-max flex items-center justify-between">
                  <div
                    className="p-[10px] h-[40px] transition-opacity duration-[0.3s] ease-linear pr-0 text-end opacity-0 group-hover:opacity-[1]"
                    onClick={() =>
                      dispatch(
                        setAutoReelScroll({ reelAutoScroll: !reelAutoScroll })
                      )
                    }
                  >
                    {reelAutoScroll ? (
                      <svg
                        fill="currentColor"
                        fontSize={20}
                        viewBox="0 0 48 48"
                        xmlns="http://www.w3.org/2000/svg"
                        width="1em"
                        height="1em"
                        style={{ fill: "rgb(255, 255, 255)" }}
                      >
                        <path d="M22.77 2.46 3.59 17.42A2 2 0 0 0 4.82 21H17.5v4a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4h12.68a2 2 0 0 0 1.23-3.58L25.23 2.46a2 2 0 0 0-2.46 0ZM17.5 31a1 1 0 0 1 1-1h11a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1h-11a1 1 0 0 1-1-1v-4ZM17.5 41a1 1 0 0 1 1-1h11a1 1 0 0 1 1 1v3a2 2 0 0 1-2 2h-9a2 2 0 0 1-2-2v-3Z" />
                      </svg>
                    ) : (
                      <svg
                        fill="currentColor"
                        fontSize={20}
                        viewBox="0 0 48 48"
                        xmlns="http://www.w3.org/2000/svg"
                        width="1em"
                        height="1em"
                        style={{ fill: "rgb(255, 255, 255)" }}
                      >
                        <path d="m3.59 17.42 1.4-1.09a1 1 0 0 1 1.25.02l4.54 3.76a.5.5 0 0 1-.32.89H4.82a2 2 0 0 1-1.23-3.58ZM30.5 22.3V21h12.68a2 2 0 0 0 1.23-3.58L25.23 2.46a2 2 0 0 0-2.46 0l-8.35 6.51-3.1-2.56a.99.99 0 0 0-1.4.14L7.44 9.64c-.35.42-.28 1.06.14 1.41L39.36 37.4a.99.99 0 0 0 1.4-.14l2.5-3.09c.34-.43.28-1.06-.15-1.41L30.5 22.3ZM17.5 26.75c0-.42.5-.65.82-.38l11.82 9.8a1 1 0 0 1 .36.76V44a2 2 0 0 1-2 2h-9a2 2 0 0 1-2-2V26.75Z" />
                      </svg>
                    )}
                  </div>

                  <div
                    onClick={handleVideoSound}
                    className="p-[8px] w-[40px] h-[40px] transition-opacity duration-[0.3s] ease-linear"
                  >
                    {isMute ? (
                      <svg
                        width="24"
                        data-e2e=""
                        height="24"
                        viewBox="0 0 48 48"
                        fill="#fff"
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-[24px] h-[24px]"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M25 10.8685C25 8.47242 22.3296 7.04325 20.3359 8.37236L10.3944 15H6C4.34315 15 3 16.3431 3 18V30C3 31.6568 4.34314 33 6 33H10.3944L20.3359 39.6276C22.3296 40.9567 25 39.5276 25 37.1315V10.8685ZM29.2929 18.1213L35.1716 24L29.2929 29.8787C28.9024 30.2692 28.9024 30.9024 29.2929 31.2929L30.7071 32.7071C31.0976 33.0976 31.7308 33.0976 32.1213 32.7071L38 26.8284L43.8787 32.7071C44.2692 33.0976 44.9024 33.0976 45.2929 32.7071L46.7071 31.2929C47.0976 30.9024 47.0976 30.2692 46.7071 29.8787L40.8284 24L46.7071 18.1213C47.0976 17.7308 47.0976 17.0976 46.7071 16.7071L45.2929 15.2929C44.9024 14.9024 44.2692 14.9024 43.8787 15.2929L38 21.1716L32.1213 15.2929C31.7308 14.9024 31.0976 14.9024 30.7071 15.2929L29.2929 16.7071C28.9024 17.0976 28.9024 17.7308 29.2929 18.1213Z"
                        ></path>
                      </svg>
                    ) : (
                      <svg
                        width={24}
                        data-e2e=""
                        height={24}
                        viewBox="0 0 48 48"
                        fill="#fff"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M20.3359 8.37236C22.3296 7.04325 25 8.47242 25 10.8685V37.1315C25 39.5276 22.3296 40.9567 20.3359 39.6276L10.3944 33H6C4.34314 33 3 31.6568 3 30V18C3 16.3431 4.34315 15 6 15H10.3944L20.3359 8.37236ZM21 12.737L12.1094 18.6641C11.7809 18.8831 11.3948 19 11 19H7V29H11C11.3948 29 11.7809 29.1169 12.1094 29.3359L21 35.263V12.737ZM32.9998 24C32.9998 21.5583 32.0293 19.3445 30.4479 17.7211C30.0625 17.3255 29.9964 16.6989 30.3472 16.2724L31.6177 14.7277C31.9685 14.3011 32.6017 14.2371 33.0001 14.6195C35.4628 16.9832 36.9998 20.3128 36.9998 24C36.9998 27.6872 35.4628 31.0168 33.0001 33.3805C32.6017 33.7629 31.9685 33.6989 31.6177 33.2724L30.3472 31.7277C29.9964 31.3011 30.0625 30.6745 30.4479 30.2789C32.0293 28.6556 32.9998 26.4418 32.9998 24ZM37.0144 11.05C36.6563 11.4705 36.7094 12.0995 37.1069 12.4829C40.1263 15.3951 42.0002 19.4778 42.0002 23.9999C42.0002 28.522 40.1263 32.6047 37.1069 35.5169C36.7094 35.9003 36.6563 36.5293 37.0144 36.9498L38.3109 38.4727C38.6689 38.8932 39.302 38.9456 39.7041 38.5671C43.5774 34.9219 46.0002 29.7429 46.0002 23.9999C46.0002 18.2569 43.5774 13.078 39.7041 9.43271C39.302 9.05421 38.6689 9.10664 38.3109 9.52716L37.0144 11.05Z"
                        />
                      </svg>
                    )}
                  </div>
                </div>
              </div>

              <div className="font-semibold text-[16px] leading-[21px] right-[16px] absolute top-[16px] transition-opacity duration-[0.3s] ease-linear opacity-0 group-hover:opacity-[1]">
                <svg
                  fontSize="21"
                  viewBox="0 0 48 48"
                  xmlns="http://www.w3.org/2000/svg"
                  width="1em"
                  height="1em"
                  fill="#fff"
                >
                  <path d="M4 24a5 5 0 1 1 10 0 5 5 0 0 1-10 0Zm15 0a5 5 0 1 1 10 0 5 5 0 0 1-10 0Zm20-5a5 5 0 1 0 0 10 5 5 0 0 0 0-10Z"></path>
                </svg>
              </div>

              <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
                {videoIntranctions.isBuffer && (
                  <svg
                    preserveAspectRatio="none"
                    viewBox="0 0 200 200"
                    width="48"
                    height="48"
                    className="e1yey0rl3 css-b6maef-SvgContainer-StyledLoading e1ugmybf1"
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

          <div className="flex flex-col">
            <button className="border-none bg-none outline-none p-0 relative flex items-center cursor-pointer flex-col">
              <span className="flex justify-center items-center rounded-[50%] w-[48px] ssm:w-[35px] ssm:h-[35px] h-[48px] mt-[8px] mb-[6px] transition-all duration-[200ms] ease-in-out bg-first-primary-icon-btn dark:bg-dark-first-primary-icon-btn">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  fill="currentColor"
                  className="fill-third-primary-icon-color dark:fill-dark-third-primary-icon-color ssm:w-[20px] ssm:h-[20px]"
                >
                  <use xlinkHref="#heart-fill-03bd63df" />
                </svg>
              </span>
              <strong className="text-[12px] leading-[16px] text-center text-fifth-primary-text dark:text-dark-fifth-primary-text">
                {convertNumberInIntranational(data?.digg_count)}
              </strong>
            </button>

            <button className="border-none bg-none outline-none p-0 relative flex items-center cursor-pointer flex-col">
              <span className="flex justify-center items-center rounded-[50%] w-[48px] ssm:w-[35px] ssm:h-[35px] h-[48px] mt-[8px] mb-[6px] transition-all duration-[200ms] ease-in-out bg-first-primary-icon-btn dark:bg-dark-first-primary-icon-btn">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  fill="currentColor"
                  className="fill-third-primary-icon-color dark:fill-dark-third-primary-icon-color  ssm:w-[20px] ssm:h-[20px]"
                >
                  <use xlinkHref="#Bubble_Ellipsis_Right_Fill-a497dc09" />
                </svg>
              </span>
              <strong className="text-[12px] leading-[16px] text-center text-fifth-primary-text dark:text-dark-fifth-primary-text">
                {convertNumberInIntranational(data?.comment_count)}
              </strong>
            </button>

            <button className="border-none bg-none outline-none p-0 relative flex items-center cursor-pointer flex-col">
              <span className="flex justify-center items-center rounded-[50%] w-[48px] ssm:w-[35px] ssm:h-[35px] h-[48px] mt-[8px] mb-[6px] transition-all duration-[200ms] ease-in-out bg-first-primary-icon-btn dark:bg-dark-first-primary-icon-btn">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  fill="currentColor"
                  className="fill-third-primary-icon-color dark:fill-dark-third-primary-icon-color  ssm:w-[20px] ssm:h-[20px]"
                >
                  <use xlinkHref="#uncollect-8a52664d" />
                </svg>
              </span>
              <strong className="text-[12px] leading-[16px] text-center text-fifth-primary-text dark:text-dark-fifth-primary-text">
                {convertNumberInIntranational(data?.download_count)}
              </strong>
            </button>

            <button className="border-none bg-none outline-none p-0 relative flex items-center cursor-pointer flex-col">
              <span className="flex justify-center items-center rounded-[50%] w-[48px] ssm:w-[35px] ssm:h-[35px] h-[48px] mt-[8px] mb-[6px] transition-all duration-[200ms] ease-in-out bg-first-primary-icon-btn dark:bg-dark-first-primary-icon-btn">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  fill="currentColor"
                  className="fill-third-primary-icon-color dark:fill-dark-third-primary-icon-colo  ssm:w-[20px] ssm:h-[20px]r"
                >
                  <use xlinkHref="#pc-share-44d9fe83" />
                </svg>
              </span>
              <strong className="text-[12px] leading-[16px] text-center text-fifth-primary-text dark:text-dark-fifth-primary-text">
                {convertNumberInIntranational(data?.share_count)}
              </strong>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReelCard;
