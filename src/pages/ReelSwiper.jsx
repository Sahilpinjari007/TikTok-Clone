import React, { useCallback, useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setIsMute } from "../features/videoPlayer/videoPlayerSlice";
import { setAutoReelScroll } from "../features/menul/menulSlice";
import { useNavigate } from "react-router-dom";
import {  getReelsByKeyword, setCursor, setKeywords } from "../features/services/tiktokSlice";



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

const timeFormatter = (timeInput) => {
  let minute = Math.floor(timeInput / 60);
  minute = minute < 10 ? "0" + minute : minute;
  let second = Math.floor(timeInput % 60);
  second = second < 10 ? "0" + second : second;
  return `${minute}:${second}`;
};

const ReelSwiper = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isMute = useSelector((state) => state.videoPlayer.isMute);
  const reelAutoScroll = useSelector((state) => state.app.reelAutoScroll)

  const [reel, setReel] = useState({});

  const { reels, response, loading, cursor, keywords } = useSelector((state) => state.tiktok);

  const [nextReelBtn, setNextReelBtn] = useState({
    visible: true,
    url: ''
  });
  
  const [preReelBtn, setPreReelBtn] = useState({
    visible: false,
    url: ''
  });

  const videoRef = useRef();
  const { reelId } = useParams();

  const [videoIntranctions, setVideoIntractions] = useState({
    isPlaying: true,
    isBuffer: false,
    videoProgress: 0,
    currentVideoTime: 0
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

  const playPreviReel = () => {
    navigate(preReelBtn.url);setVideoIntractions({...videoIntranctions, isPlaying: true})
  }

  const playNextReel = () => {
    navigate(nextReelBtn.url);setVideoIntractions({...videoIntranctions, isPlaying: true})
  }

  const handleVideoEnd = () =>{
    if(reelAutoScroll){
      playNextReel()
    }
    else{
      setVideoIntractions({ ...videoIntranctions, isPlaying: false })
    }
  }

  const handleVideoTimeUpdate = useCallback(() => {
    setVideoIntractions({ ...videoIntranctions, videoProgress: Math.round((videoRef.current.currentTime / videoRef.current.duration) * 100), currentVideoTime: timeFormatter(videoRef.current.currentTime) })
  }, [videoIntranctions])


  const commentInputRef = useRef(null);
  const [commentTextBox, setCommentTextBox] = useState({
    value: "",
    isEditable: true,
    isFocusd: false,
  });

  const [showFullTitle, setShowFullTitle] = useState(false);

  const [pageActiveNav, setPageActiveNav] = useState({
    comment: true,
    creatorVideos: false,
  });


  useEffect(() => {

    const reel = reels.filter(reel => reel.video_id === reelId);
    setReel(reel[0]);

    reels?.map((reel, i) => {
      if (i + 1 < reels.length && reels[i + 1].video_id === reelId) {
        setPreReelBtn({ visible: true, url: `/${reel.author.unique_id}/video/${reel.video_id}` })
        setNextReelBtn({ visible: true, url: `/${reels[i + 2].author.unique_id}/video/${reels[i + 2].video_id}` })
      }
      else if (reel.video_id === reelId && i === 0) {
        setPreReelBtn({ visible: false, url: `` })
        setNextReelBtn({ visible: true, url: `/${reels[i + 1].author.unique_id}/video/${reels[i + 1].video_id}` })
      }
      else if (i + 3 === reels.length) {
        if (!loading) {
          dispatch(getReelsByKeyword({ keywords, cursor }));

          if (!response?.data?.hasMore) {
            dispatch(setKeywords({ keywords: exploresCategoris[Math.floor(Math.random() * 20)] }))
            dispatch(setCursor({ cursor: 1 }))
          }
          else {
            dispatch(setCursor({ cursor: cursor + 10 }))
          }
        }
      }
    })

  }, [reelId])




  return (
    <div className="fixed flex flex-row w-full h-full inset-0 bg-frist-primary-bg dark:bg-dark-frist-primary-bg">
      <div className="mmd:flex-[1_0_600px] w-full max-w-ful relative overflow-hidden px-[80px] group/parentReelSwipere">
        <div className="absolute top-0 left-0 w-full h-[85px] bg-transparent items-center justify-center hidden mmmd:flex">
          <div className="relative w-[calc(100%-184px)] max-w-[calc(-32px+56.25vh)] bg-transparent">
            <form className="flex flex-row items-center py-3 px-4 bg-transparent rounded-[92px] relative overflow-hidden z-[1] m-0 group md:p-0">
              <input
                type="text"
                className="font-semibold text-[16px] leading-[21px] border-none bg-transparent outline-none p-0 w-full text-second-primary-text dark:text-dark-second-primary-text appearance-[textfield] md:hidden"
                placeholder="Find related content"
              />
              <span className="w-[1px] h-[28px] my-[-3px] bg-second-primary-border dark:bg-dark-second-primary-border md:hidden"></span>
              <button className="py-3 pr-4 pl-3 my-[-12px] mr-[-16px] ml-0 text-[0px] cursor-pointer outline-none border-none bg-transparent group-hover:bg-first-primary-icon-btn dark:group-hover:bg-dark-first-primary-icon-btn md:m-0 md:p-2">
                <div className="outline-none">
                  <svg
                    width={24}
                    data-e2e=""
                    height={24}
                    viewBox="0 0 48 48"
                    xmlns="http://www.w3.org/2000/svg"
                    className="box-border select-[unset] w-[24px] h-[24px] fill-first-primary-icon-color group-hover:fill-third-primary-icon-color dark:fill-dark-first-primary-icon-color dark:group-hover:fill-dark-third-primary-icon-color"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M22 10C15.3726 10 10 15.3726 10 22C10 28.6274 15.3726 34 22 34C28.6274 34 34 28.6274 34 22C34 15.3726 28.6274 10 22 10ZM6 22C6 13.1634 13.1634 6 22 6C30.8366 6 38 13.1634 38 22C38 25.6974 36.7458 29.1019 34.6397 31.8113L43.3809 40.5565C43.7712 40.947 43.7712 41.5801 43.3807 41.9705L41.9665 43.3847C41.5759 43.7753 40.9426 43.7752 40.5521 43.3846L31.8113 34.6397C29.1019 36.7458 25.6974 38 22 38C13.1634 38 6 30.8366 6 22Z"
                    />
                  </svg>
                </div>
              </button>
              <div className="absolute inset-0 rounded-[92px] z-[-1] border border-solid border-third-primary-text dark:border-dark-third-primary-text"></div>
            </form>
          </div>
        </div>

        <div className="absolute w-[10%] h-[10%] top-[50%] left-[50%] scale-[11] blur-[2px] opacity-[0.3px]">
          <span className="box-border block w-[initial] h-[initial] ">
            <picture className="block max-w-full">
              <img
                className="absolute object-cover inset-0 box-border block w-0 h-0 min-w-full max-w-full min-h-full max-h-full"
                src={reel?.origin_cover}
                alt={reel?.author?.nickname}
              />
            </picture>
          </span>
        </div>

        <div className="absolute top-0 left-0 w-full h-full cursor-pointer">
          <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
            <div className="relative w-full h-full ">
              <span className="h-[initial] w-[initial] box-border block overflow-hidden absolute inset-0 opacity-[1]">
                <picture className="block max-w-full">
                  <img
                    className="max-w-full min-w-full max-h-full min-h-full w-0 h-0 absolute inset-0 box-border block m-auto object-contain"
                    src={reel?.cover}
                    alt={reel?.author?.nickname}
                  />
                </picture>
              </span>
            </div>
            <div className="absolute top-0 left-0 w-full h-full">
              <div className="w-full h-full relative">
                <video
                  onTimeUpdate={handleVideoTimeUpdate}
                  muted={isMute}
                  autoPlay={true}
                  loop={!reelAutoScroll}
                  ref={videoRef}
                  onClick={handleVideoPlayPause}
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
                    })
                  }

                  className="w-full h-full object-contain block"
                  src={reel?.play}
                // src="https://v16m-default.akamaized.net/cab664ce981a0b88086cf1ae08ec070f/65c65f36/video/tos/maliva/tos-maliva-ve-0068c799-us/oMIQEDHHjdeoAyGKCLhBeNUDZkpIpIZAkeONCz/?a=0&ch=0&cr=0&dr=0&lr=all&cd=0%7C0%7C0%7C0&cv=1&br=538&bt=269&bti=OUBzOTg7QGo6OjZAL3AjLTAzYCMxNDNg&cs=0&ds=6&ft=XE5bCqT0m7jPD12M~t0R3wUK9AyKMeF~O5&mime_type=video_mp4&qs=0&rc=NTlnaGVpODc8OTQ0OGdlZ0Bpamd3O3Q5cjg6bzMzZzczNEA0LmJjYzQ0Ni4xLTAvMC4yYSNgcDQ1MmQ0NjVgLS1kMS9zcw%3D%3D&l=20240209112151C684E16D3545CAB1FDE6&btag=e00088000"
                ></video>
              </div>
            </div>
          </div>
        </div>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={70}
          height={70}
          fill="#fff"
          data-e2e="browse-video-play"
          className={`absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] cursor-pointer ${videoIntranctions.isPlaying ? 'opacity-0' : 'opacity-[1]'} transition-opacity ease-linear duration-[0.2s]`}
        >
          <use xlinkHref="#Play_Fill-6957a00f" />
        </svg>


        {videoIntranctions.isBuffer && <svg
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
        </svg>}

        <button onClick={() => navigate('../')} className="absolute flex justify-center items-center rounded-[50%] cursor-pointer border-none outline-none w-[40px] h-[40px] transition-opacity duration-[0.3s] ease-linear z-[100] bg-fourth-primary-icon-btn dark:bg-dark-fourth-primary-icon-btn hover:opacity-[0.7] top-[20px] left-[20px]">
          <div className="flex">
            <svg
              width={18}
              data-e2e=""
              height={18}
              viewBox="0 0 9 10"
              fill="#fff"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M1.35299 0.792837L4.49961 3.93944L7.64545 0.792566C7.8407 0.597249 8.15733 0.597223 8.35262 0.792508L8.70669 1.14658C8.90195 1.34184 8.90195 1.65842 8.70669 1.85368L5.56027 5.0001L8.70672 8.14655C8.90198 8.34181 8.90198 8.65839 8.70672 8.85366L8.35316 9.20721C8.1579 9.40247 7.84132 9.40247 7.64606 9.20721L4.49961 6.06076L1.35319 9.20719C1.15793 9.40245 0.841345 9.40245 0.646083 9.20719L0.292629 8.85373C0.0973708 8.65847 0.0973653 8.3419 0.292617 8.14664L3.43895 5.0001L0.292432 1.85357C0.0972034 1.65834 0.0971656 1.34182 0.292347 1.14655L0.645801 0.792924C0.841049 0.597582 1.1577 0.597543 1.35299 0.792837Z" />
            </svg>
          </div>
        </button>

        <button onClick={() => dispatch(setAutoReelScroll({ reelAutoScroll: !reelAutoScroll }))} className="absolute flex justify-center items-center rounded-[50%] cursor-pointer border-none outline-none w-[40px] h-[40px] transition-opacity duration-[0.3s] ease-linear z-[100] bg-fourth-primary-icon-btn dark:bg-dark-fourth-primary-icon-btn hover:opacity-[0.7] bottom-[20px] right-[68px]">
          <div className="flex">
            {
              reelAutoScroll ? <svg
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
                :
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
            }
          </div>
        </button>

        <button onClick={handleVideoSound} className="absolute flex justify-center items-center rounded-[50%] cursor-pointer border-none outline-none w-[40px] h-[40px] transition-opacity duration-[0.3s] ease-linear z-[100] bg-fourth-primary-icon-btn dark:bg-dark-fourth-primary-icon-btn hover:opacity-[0.7] bottom-[20px] right-[20px]">
          <div className="flex">
            {
              isMute ? (<svg
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
              </svg>) : (<svg
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
              )
            }
          </div>
        </button>

        <button className="absolute flex justify-center items-center rounded-[50%] cursor-pointer border-none outline-none w-[40px] h-[40px] transition-opacity duration-[0.3s] ease-linear z-[100] bg-third-primary-bg dark:bg-dark-third-primary-bg hover:opacity-[0.7] top-[20px] right-[20px]">
          <div className="flex">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={24}
              height={24}
              fill="#fff"
            >
              <use xlinkHref="#Ellipsis_Horizontal_Fill-9ee69fcf" />
            </svg>
          </div>
        </button>

        {preReelBtn.visible && <button onClick={playPreviReel} className="absolute flex justify-center items-center rounded-[50%] cursor-pointer border-none outline-none w-[40px] h-[40px] transition-opacity duration-[0.3s] ease-linear z-[100] bg-third-primary-bg dark:bg-dark-third-primary-bg hover:opacity-[0.7] top-[calc(50%-48px)] right-[20px] rotate-[-90deg] mt-[-24px]">
          <div className="flex">
            <svg
              width={26}
              data-e2e=""
              height={26}
              viewBox="0 0 48 48"
              fill="#fff"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M34.4142 22.5858L18.1213 6.29289C17.7308 5.90237 17.0976 5.90237 16.7071 6.29289L15.2929 7.70711C14.9024 8.09763 14.9024 8.7308 15.2929 9.12132L30.1716 24L15.2929 38.8787C14.9024 39.2692 14.9024 39.9024 15.2929 40.2929L16.7071 41.7071C17.0976 42.0976 17.7308 42.0976 18.1213 41.7071L34.4142 25.4142C35.1953 24.6332 35.1953 23.3668 34.4142 22.5858Z"
              />
            </svg>
          </div>
        </button>}

        {nextReelBtn.visible && <button onClick={playNextReel} className="absolute flex justify-center items-center rounded-[50%] cursor-pointer border-none outline-none w-[40px] h-[40px] transition-opacity duration-[0.3s] ease-linear z-[100] bg-third-primary-bg dark:bg-dark-third-primary-bg hover:opacity-[0.7] top-[calc(50%+8px)] right-[20px] rotate-[90deg] mt-[-24px]">
          <div className="flex">
            <svg
              width={26}
              data-e2e=""
              height={26}
              viewBox="0 0 48 48"
              fill="#fff"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M34.4142 22.5858L18.1213 6.29289C17.7308 5.90237 17.0976 5.90237 16.7071 6.29289L15.2929 7.70711C14.9024 8.09763 14.9024 8.7308 15.2929 9.12132L30.1716 24L15.2929 38.8787C14.9024 39.2692 14.9024 39.9024 15.2929 40.2929L16.7071 41.7071C17.0976 42.0976 17.7308 42.0976 18.1213 41.7071L34.4142 25.4142C35.1953 24.6332 35.1953 23.3668 34.4142 22.5858Z"
              />
            </svg>
          </div>
        </button>}

        <div className="absolute bottom-[28px] w-[calc(100%-250px)] h-[24px] px-[16px] transition-opacity duration-[0.3s] ease-linear flex items-center justify-center left-[50%] translate-x-[-50%] max-w-[56.25vh] z-[1] opacity-0 group-hover/parentReelSwipere:opacity-[1]">
          <div className="w-full h-[24px] flex-auto relative cursor-pointer flex items-center group/childReelSwiper ">
            <div className="w-full h-[5px] rounded-[3px] bg-dark-first-primary-icon-color overflow-hidden">
              <div className={`h-full bg-frist-primary-bg`} style={{ width: `${videoIntranctions.videoProgress}%` }}></div>
              <div className="w-[15px] h-[15px] rounded-[50%] bg-frist-primary-bg absolute top-[50%] translate-y-[-50%] opacity-0 group-hover/childReelSwiper:opacity-[1]" style={{ left: `${videoIntranctions.videoProgress}%` }}></div>
            </div>
          </div>
          <div className="flex-[0_0_88px] max-w-[88px] ml-[8px] text-[14px] leading-[24px] whitespace-nowrap text-end text-second-primary-text dark:text-dark-second-primary-text">
            {videoIntranctions.currentVideoTime}/{timeFormatter(reel?.duration)}
          </div>
        </div>

        <svg
          preserveAspectRatio="none"
          viewBox="0 0 200 200"
          width="48"
          height="48"
          className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] hidden"
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
      </div>

      <div className="flex-[0_0_544px] w-[544px] flex-col p-0 hidden mmd:flex">
        <div className="w-full flex flex-col overflow-hidden border-b border-solid border-border-third-primary-border dark:border-dark-third-primary-border relative box-border flex-grow-[1]">
          <div
            className={`relative w-full h-full ${pageActiveNav.comment ? "py-[24px]" : "p-0 pt-[24px]"
              } overflow-x-hidden overflow-y-auto flex-grow-[1] box-border`}
          >
            <div className="w-full h-max text-second-primary-text dark:text-dark-second-primary-text">
              <div className="rounded-[12px] mx-[20px] p-[15px] bg-second-primary-icon-btn dark:bg-dark-second-primary-icon-btn ">
                <div className="h-max flex flex-row items-center mb-[15px] relative flex-[0_0_82px]">
                  <Link className="flex-[0_0_40px] mr-[12px]">
                    <span className="w-[40px] h-[40px] rounded-[50%] items-center justify-center inline-block overflow-hidden">
                      <img
                        className="w-full h-full object-contain"
                        src={reel?.author?.avatar}
                        alt={reel?.author?.nickname}
                      />
                    </span>
                  </Link>
                  <Link className="w-full h-max no-underline flex flex-col overflow-hidden text-ellipsis flex-1 mr-[12px]">
                    <span className="font-bold text-[18px] leading-[24px]">
                      <span className="inline overflow-hidden text-ellipsis line-clamp-1">
                        {reel?.author?.unique_id || "tiktok"}
                      </span>
                    </span>
                    <span className="text-[14px] leading-[18px] flex items-center">
                      <span className="inline-block overflow-hidden text-ellipsis line-clamp-1">
                        {reel?.author?.nickname || "Tiktok"}
                      </span>
                      <span className="mx-[4px] flex items-center justify-center">
                        {" "}
                        ·{" "}
                      </span>
                      <span>{`${new Date(1654647988).getFullYear()}-${new Date(1654647988).getMonth() + 1}-${new Date(1654647988).getDate()}`}</span>
                    </span>
                  </Link>
                  <div>
                    <button className="box-border min-w-[96px] inline-flex justify-center items-center relative border-solid border rounded-[2px] font-[500] cursor-pointer text-[16px] h-[36px] px-[15px] bg-first-primary-btn dark:bg-dark-first-primary-btn border-first-primary-border dark:border-dark-first-primary-border">
                      Follow
                    </button>
                  </div>
                </div>

                <div className="overflow-visible flex flex-col flex-shrink-0">
                  <div
                    className={`flex w-full overflow-hidden relative ${showFullTitle ? "pb-[55px]" : "pb-[unset]"
                      }`}
                  >
                    <div
                      className={`w-[100%] overflow-hidden text-ellipsis ${showFullTitle
                        ? "line-clamp-[999]"
                        : "line-clamp-2 max-h-[44px]"
                        } before:content-[''] before:h-[calc(100%-21px)] before:float-right before:w-0 before:mt-0`}
                    >
                      {!showFullTitle && (
                        <div className="float-right clear-both cursor-pointer leading-[21px] items-center relative bottom-[1px] text-second-primary-text dark:text-dark-second-primary-text">
                          <button
                            onClick={() =>
                              setShowFullTitle((priVal) => !priVal)
                            }
                            className="font-semibold text-[16px] leading-[21px] cursor-pointer outline-none text-second-primary-text dark:text-dark-second-primary-text px-[6px] py-[1px]"
                          >
                            more
                          </button>
                        </div>
                      )}

                      <div>
                        <h1 className="text-[16px] leading-[21px] break-words">

                          <span className="inline font-[400]">
                            {reel?.title?.split("#")[0]}
                          </span>

                          {reel?.title?.split("#").map((hashTag, i) => {
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
                        </h1>
                      </div>
                    </div>

                    {showFullTitle && (
                      <button
                        onClick={() => setShowFullTitle((priVal) => !priVal)}
                        className="text-second-primary-text dark:text-dark-second-primary-text font-semibold text-[16px] leading-[21px] border-none outline-none cursor-pointer left-[4px] absolute bottom-[16px]"
                      >
                        less
                      </button>
                    )}
                  </div>

                  <h4 className="leading-[21px] font-[400] text-[14] mt-[8px] flex-auto ml-[1px]">
                    <Link className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="1em"
                        height="1em"
                        fill="rgba(255, 255, 255, .9)"
                        className="mr-[8px] flex-shrink-0"
                      >
                        <use xlinkHref="#Music_Note-8c658968" />
                      </svg>
                      <div className="line-clamp-1">
                        {reel?.music_info?.title}
                      </div>
                    </Link>
                  </h4>
                </div>
              </div>

              <div className="px-[32px] overflow-visible flex flex-col flex-shrink-0">
                <div className="pt-[16px] relative">
                  <div className="flex flex-row items-center justify-between">
                    <div className="flex flex-row items-center">
                      <button className="outline-none border-none flex items-center">
                        <span className="flex justify-center items-center rounded-[50%] transition-all duration-[200ms] ease-in-out w-[32px] h-[32px] bg-first-primary-icon-btn dark:bg-dark-first-primary-icon-btn p-[6px] mr-[6px]">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={20}
                            height={20}
                            className="fill-third-primary-icon-color dark:fill-dark-third-primary-icon-color"
                          >
                            <use xlinkHref="#heart-fill-03bd63df" />
                          </svg>
                        </span>

                        <strong className="text-[12px] leading-[16px] text-center text-fifth-primary-text dark:text-dark-fifth-primary-text">
                          {convertNumberInIntranational(reel?.digg_count)}
                        </strong>
                      </button>

                      <button className="outline-none border-none ml-[20px] flex items-center">
                        <span className="flex justify-center items-center rounded-[50%] transition-all duration-[200ms] ease-in-out w-[32px] h-[32px] bg-first-primary-icon-btn dark:bg-dark-first-primary-icon-btn p-[6px] mr-[6px]">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={20}
                            height={20}
                            fill="currentColor"
                            className="fill-third-primary-icon-color dark:fill-dark-third-primary-icon-color"
                          >
                            <use xlinkHref="#Bubble_Ellipsis_Right_Fill-a497dc09" />
                          </svg>
                        </span>

                        <strong className="text-[12px] leading-[16px] text-center text-fifth-primary-text dark:text-dark-fifth-primary-text">
                          {convertNumberInIntranational(reel?.comment_count)}
                        </strong>
                      </button>

                      <button className="outline-none border-none ml-[20px] flex items-center">
                        <span className="flex justify-center items-center rounded-[50%] transition-all duration-[200ms] ease-in-out w-[32px] h-[32px] bg-first-primary-icon-btn dark:bg-dark-first-primary-icon-btn p-[6px] mr-[6px]">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={20}
                            height={20}
                            fill="currentColor"
                            className="fill-third-primary-icon-color dark:fill-dark-third-primary-icon-color"
                          >
                            <use xlinkHref="#uncollect-8a52664d" />
                          </svg>
                        </span>

                        <strong className="text-[12px] leading-[16px] text-center text-fifth-primary-text dark:text-dark-fifth-primary-text">
                          {convertNumberInIntranational(reel?.collect_count)}
                        </strong>
                      </button>
                    </div>

                    <div className="flex flex-row items-center">
                      <Link className="block mr-[8px]">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width={24}
                          height={24}
                          fill="currentColor"
                        >
                          <path
                            fill="#383838"
                            fillOpacity=".95"
                            fillRule="evenodd"
                            d="M12 24c6.627 0 12-5.373 12-12S18.627 0 12 0 0 5.373 0 12s5.373 12 12 12Z"
                            clipRule="evenodd"
                          ></path>
                          <path
                            fill="white"
                            fillRule="evenodd"
                            d="M12.313 7.966a.562.562 0 1 1 1.108.194l-1.37 7.835a.562.562 0 1 1-1.109-.194l1.371-7.835Zm3.927.808a.7.7 0 0 0-1.014 0 .76.76 0 0 0 0 1.05l2.228 2.307-2.228 2.305a.76.76 0 0 0 0 1.05.7.7 0 0 0 1.015 0l3.214-3.326a.042.042 0 0 0 0-.058l-.231-.24-.005-.004-.003-.004-2.976-3.08Zm-7.351 0c.29.29.29.76 0 1.05L6.583 12.13l2.307 2.307a.742.742 0 1 1-1.05 1.05L5.423 13.07l-.002-.002-.91-.91a.04.04 0 0 1 0-.057L7.84 8.775c.29-.29.76-.29 1.05 0Z"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                      </Link>

                      <Link className="block mr-[8px]">
                        <svg
                          width={24}
                          data-e2e=""
                          height={24}
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24Z"
                            fill="#FE2C55"
                          />
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M18.7913 7.1875C18.6796 6.99413 18.4733 6.875 18.25 6.875H5.75001C5.50258 6.875 5.27845 7.02097 5.17839 7.24727C5.07834 7.47356 5.1212 7.73758 5.28771 7.9206L8.55021 11.5065C8.72305 11.6965 8.9945 11.7614 9.23456 11.6702L13.7656 9.94799C13.8184 9.92795 13.8423 9.93624 13.8527 9.94039C13.871 9.94765 13.8971 9.96649 13.9177 10.0013C13.9382 10.0361 13.9421 10.0681 13.9396 10.0876C13.9382 10.0987 13.9339 10.1237 13.8909 10.1602L10.1707 13.3155C9.97902 13.4782 9.90339 13.7398 9.97878 13.9796L11.4038 18.5124C11.4781 18.749 11.6853 18.9192 11.9317 18.9463C12.1781 18.9734 12.4173 18.8522 12.5413 18.6375L18.7913 7.81251C18.9029 7.61913 18.9029 7.38088 18.7913 7.1875Z"
                            fill="white"
                          />
                        </svg>
                      </Link>

                      <Link className="block mr-[8px]">
                        <svg
                          width="24"
                          data-e2e=""
                          height="24"
                          viewBox="0 0 48 48"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M24 47C36.7025 47 47 36.7025 47 24C47 11.2975 36.7025 1 24 1C11.2975 1 1 11.2975 1 24C1 36.7025 11.2975 47 24 47Z"
                            fill="#25D366"
                          ></path>
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M30.9028 25.6129C30.5802 25.4515 28.9944 24.6713 28.6988 24.5635C28.4031 24.4559 28.1881 24.4021 27.9731 24.7249C27.758 25.0478 27.1399 25.7744 26.9517 25.9897C26.7636 26.2049 26.5754 26.2319 26.2529 26.0704C25.9303 25.909 24.891 25.5684 23.659 24.4694C22.7002 23.6141 22.0528 22.5579 21.8647 22.235C21.6765 21.9121 21.8446 21.7375 22.0061 21.5767C22.1512 21.4321 22.3287 21.2 22.4899 21.0116C22.6512 20.8233 22.705 20.6887 22.8125 20.4735C22.92 20.2582 22.8663 20.0699 22.7855 19.9085C22.7049 19.747 22.0599 18.1593 21.7911 17.5134C21.5293 16.8845 21.2634 16.9697 21.0654 16.9598C20.8774 16.9504 20.6622 16.9484 20.4472 16.9484C20.2322 16.9484 19.8827 17.0291 19.587 17.352C19.2914 17.6749 18.4581 18.4553 18.4581 20.0428C18.4581 21.6306 19.6139 23.1643 19.7752 23.3795C19.9365 23.5949 22.0496 26.8528 25.2853 28.2499C26.0548 28.5823 26.6557 28.7807 27.1241 28.9293C27.8968 29.1749 28.5999 29.1402 29.1557 29.0572C29.7754 28.9646 31.064 28.277 31.3328 27.5235C31.6016 26.7699 31.6016 26.1242 31.521 25.9897C31.4404 25.8551 31.2253 25.7744 30.9028 25.6129ZM25.0178 33.6472H25.0134C23.0881 33.6465 21.1998 33.1292 19.5524 32.1517L19.1606 31.9191L15.0998 32.9844L16.1837 29.0251L15.9286 28.6191C14.8546 26.9109 14.2873 24.9365 14.2881 22.9091C14.2905 16.9934 19.1037 12.1805 25.022 12.1805C27.8879 12.1815 30.5817 13.299 32.6076 15.3271C34.6333 17.3551 35.7482 20.0509 35.7471 22.9178C35.7447 28.8339 30.9315 33.6472 25.0178 33.6472ZM34.1489 13.7858C31.7117 11.3458 28.4706 10.0014 25.0173 10C17.902 10 12.111 15.7906 12.1082 22.908C12.1073 25.1832 12.7017 27.4039 13.8313 29.3617L12 36.0509L18.8432 34.2559C20.7287 35.2843 22.8516 35.8264 25.0121 35.827H25.0174H25.0174C32.132 35.827 37.9234 30.0359 37.9263 22.9184C37.9276 19.4691 36.5861 16.2258 34.1489 13.7858Z"
                            fill="white"
                          ></path>
                        </svg>
                      </Link>

                      <Link className="block mr-[8px]">
                        <svg
                          width={24}
                          data-e2e=""
                          height={24}
                          viewBox="0 0 48 48"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M24 47C36.7025 47 47 36.7025 47 24C47 11.2975 36.7025 1 24 1C11.2975 1 1 11.2975 1 24C1 36.7025 11.2975 47 24 47Z"
                            fill="white"
                          />
                          <path
                            d="M24 1C11.2964 1 1 11.2964 1 24C1 35.4775 9.40298 44.9804 20.3846 46.7205L20.3936 30.6629H14.5151V24.009H20.3936C20.3936 24.009 20.3665 20.2223 20.3936 18.5363C20.4206 16.8503 20.7542 15.2274 21.6288 13.7487C22.9722 11.4586 25.0639 10.3407 27.6335 10.0251C29.7432 9.76362 31.826 10.0521 33.9087 10.3407C34.0529 10.3587 34.125 10.3767 34.2693 10.4038C34.2693 10.4038 34.2783 10.6472 34.2693 10.8005C34.2603 12.4053 34.2693 16.0839 34.2693 16.0839C33.2685 16.0659 31.6096 15.9667 30.5096 16.138C28.6884 16.4175 27.6425 17.5806 27.6064 19.4108C27.5704 20.8354 27.5884 24.009 27.5884 24.009H33.9988L32.962 30.6629H27.5974V46.7205C38.597 44.9984 47.009 35.4775 47.009 24C47 11.2964 36.7036 1 24 1Z"
                            fill="#0075FA"
                          />
                        </svg>
                      </Link>

                      <Link className="block mr-[8px]">
                        <svg
                          width={24}
                          data-e2e=""
                          height={24}
                          viewBox="0 0 48 48"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M24.0002 47.001C36.7028 47.001 47.0002 36.7035 47.0002 24.001C47.0002 11.2984 36.7028 1.00098 24.0002 1.00098C11.2977 1.00098 1.00024 11.2984 1.00024 24.001C1.00024 36.7035 11.2977 47.001 24.0002 47.001Z"
                            fill="#1DA1F2"
                          />
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M38.2029 13.5327C37.3894 14.0824 35.5215 14.8813 34.6003 14.8813V14.8829C33.5484 13.7237 32.0675 13 30.4252 13C27.2353 13 24.6488 15.7287 24.6488 19.0925C24.6488 19.5598 24.7001 20.0157 24.795 20.4529H24.794C20.4671 20.3331 15.7348 18.0452 12.886 14.1294C11.1344 17.3277 12.6501 20.8848 14.6378 22.1809C13.9574 22.235 12.7049 22.0982 12.1153 21.4913C12.0758 23.6142 13.0434 26.4269 16.5714 27.4473C15.8919 27.8329 14.6892 27.7223 14.1662 27.6402C14.3497 29.4322 16.7285 31.775 19.3297 31.775C18.4026 32.9063 14.9144 34.9582 11 34.3054C13.6584 36.0118 16.7568 37 20.0362 37C29.3556 37 36.5929 29.0322 36.2034 19.2027C36.2019 19.1919 36.2019 19.1811 36.2009 19.1693C36.2019 19.144 36.2034 19.1187 36.2034 19.0925C36.2034 19.0619 36.2009 19.0331 36.2 19.0035C37.0484 18.3914 38.1868 17.3087 39 15.8836C38.5284 16.1577 37.1134 16.7064 35.7968 16.8426C36.6418 16.3615 37.8937 14.7858 38.2029 13.5327Z"
                            fill="white"
                          />
                        </svg>
                      </Link>

                      <Link className="block mr-[8px]">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width={16}
                          height={16}
                          fill="currentColor"
                        >
                          <use xlinkHref="#Arrow_Turn_Up_Right_Fill-9e05bdb9" />
                        </svg>
                      </Link>
                    </div>
                  </div>

                  <div className="text-[14px] leading-[18px] flex flex-row box-border border border-solid border-transparent rounded-[8px] overflow-hidden text-fifth-primary-text dark:text-dark-fifth-primary-text mt-[16px]">
                    <p className="text-ellipsis overflow-hidden whitespace-nowrap flex-auto pt-[7px] pb-[5px] pl-[12px] bg-third-primary-bg dark:bg-dark-third-primary-bg max-h-[32px] w-full">
                      {`https://www.tiktok.com/@${reel?.author?.unique_id}/video/${reelId}`}
                    </p>

                    <button className="border-none bg-second-primary-btn dark:bg-dark-second-primary-btn text-second-primary-text dark:text-dark-second-primary-text outline-none font-bold flex-auto cursor-pointer px-[18px] py-[7px] w-min max-w-max whitespace-nowrap">
                      Copy link
                    </button>
                  </div>
                </div>

                <div
                  className={`sticky top-[-28px] w-full bg-frist-primary-bg dark:bg-dark-frist-primary-bg z-[99] ${pageActiveNav.comment ? "mb-[24px]" : "m-0"
                    }`}
                >
                  <div className="pt-[18px] h-[50px] flex items-center flex-row">
                    <div
                      onClick={() => {
                        setPageActiveNav({
                          ...{ comment: false, creatorVideos: false },
                          comment: true,
                        });
                      }}
                      className={`border-b-[2px] border-solid ${pageActiveNav.comment
                        ? " border-second-primary-text dark:border-dark-second-primary-text"
                        : "border-transparent"
                        } w-[50%] h-full`}
                    >
                      <div className="font-bold text-second-primary-text dark:text-dark-second-primary-text overflow-auto leading-[24px] cursor-pointer text-[14px] text-center">
                        Comments (5248)
                      </div>
                    </div>

                    <div
                      onClick={() => {
                        setPageActiveNav({
                          ...{ comment: false, creatorVideos: false },
                          creatorVideos: true,
                        });
                      }}
                      className={`border-b-[2px] border-solid ${pageActiveNav.creatorVideos
                        ? "border-second-primary-text dark:border-dark-second-primary-text"
                        : "border-transparent"
                        } w-[50%] h-full`}
                    >
                      <div className="font-bold text-second-primary-text dark:text-dark-second-primary-text overflow-auto leading-[24px] cursor-pointer text-[14px] text-center">
                        Creator videos
                      </div>
                    </div>
                  </div>
                </div>

                {pageActiveNav.comment ? (
                  <div className="w-full">
                    <div className="mb-[20px]">
                      <div className="flex flex-row items-start relative mb-[8px] group">
                        <Link className="flex-[0_0_40px] mr-[12px]">
                          <span className="w-[40px] h-[40px] inline-block rounded-[50%] overflow-hidden">
                            <img
                              className="w-full h-full object-cover"
                              src="https://p16-sign.tiktokcdn-us.com/tos-useast5-avt-0068-tx/e2f923808c2f2295382c6d74aa3586e1~c5_100x100.jpg?lk3s=30310797&x-expires=1707130800&x-signature=Ti3Ox6Q4IzD65UZ5o3A%2BS2eMHWA%3D"
                              alt=""
                            />
                          </span>
                        </Link>

                        <div className="box-border flex-auto">
                          <Link className="font-bold leading-[18px] text-[14px]">
                            SEEK ONER!
                          </Link>
                          <p className="text-[16px] leading-[21px] whitespace-pre-line break-words mb-[6px]">
                            Is he acoustic
                          </p>
                          <p className="text-[14px] leading-[18px] text-third-primary-text dark:text-dark-third-primary-text">
                            <span className="w-[64px] max-w-[64px] inline-block truncate align-top">
                              1-14
                            </span>
                            <span className="cursor-pointer text-third-primary-text dark:text-dark-third-primary-text font-[400] ml-[4px]">
                              Reply
                            </span>
                          </p>
                        </div>

                        <div className="ml-[18px] pr-[2px] w-[24px] flex-[0_0_24px] flex-col flex items-center pt-[24px] group-hover:pt-0">
                          <div className="relative w-[24px] h-[24px] cursor-pointer hidden group-hover:block">
                            <svg
                              className="w-[24px] h-[24px] block cursor-pointer"
                              width="1em"
                              data-e2e=""
                              height="1em"
                              viewBox="0 0 48 48"
                              fill="currentColor"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M4 24C4 21.7909 5.79086 20 8 20C10.2091 20 12 21.7909 12 24C12 26.2091 10.2091 28 8 28C5.79086 28 4 26.2091 4 24ZM20 24C20 21.7909 21.7909 20 24 20C26.2091 20 28 21.7909 28 24C28 26.2091 26.2091 28 24 28C21.7909 28 20 26.2091 20 24ZM36 24C36 21.7909 37.7909 20 40 20C42.2091 20 44 21.7909 44 24C44 26.2091 42.2091 28 40 28C37.7909 28 36 26.2091 36 24Z"
                              />
                            </svg>
                          </div>

                          <div className="text-[12px] leading-[16px] w-[20px] flex flex-col items-center cursor-pointer text-third-primary-text dark:text-dark-third-primary-text">
                            <div className="h-[20px]">
                              <svg
                                width={20}
                                data-e2e=""
                                height={20}
                                viewBox="0 0 48 48"
                                fill="currentColor"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  fillRule="evenodd"
                                  clipRule="evenodd"
                                  d="M24 9.01703C19.0025 3.74266 11.4674 3.736 6.67302 8.56049C1.77566 13.4886 1.77566 21.4735 6.67302 26.4016L22.5814 42.4098C22.9568 42.7876 23.4674 43 24 43C24.5326 43 25.0432 42.7876 25.4186 42.4098L41.327 26.4016C46.2243 21.4735 46.2243 13.4886 41.327 8.56049C36.5326 3.736 28.9975 3.74266 24 9.01703ZM21.4938 12.2118C17.9849 8.07195 12.7825 8.08727 9.51028 11.3801C6.16324 14.7481 6.16324 20.214 9.51028 23.582L24 38.1627L38.4897 23.582C41.8368 20.214 41.8368 14.7481 38.4897 11.3801C35.2175 8.08727 30.0151 8.07195 26.5062 12.2118L26.455 12.2722L25.4186 13.3151C25.0432 13.6929 24.5326 13.9053 24 13.9053C23.4674 13.9053 22.9568 13.6929 22.5814 13.3151L21.545 12.2722L21.4938 12.2118Z"
                                />
                              </svg>
                            </div>
                            <span className="text-[16px] leading-[21px] w-[24px] h-[24px] flex items-center">
                              551
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="pl-[52px]">
                        <div className="flex flex-row items-center justify-between relative">
                          <p className="text-third-primary-text dark:text-dark-third-primary-text font-semibold text-[14px] leading-[18px] cursor-pointer flex items-center">
                            View 19 replies
                            <svg
                              className="ml-[6px] w-[14px] h-[14px] align-middle"
                              width="1em"
                              data-e2e=""
                              height="1em"
                              viewBox="0 0 48 48"
                              fill="currentColor"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M21.8788 33.1213L7.58586 18.8284C7.19534 18.4379 7.19534 17.8047 7.58586 17.4142L10.4143 14.5858C10.8048 14.1953 11.438 14.1953 11.8285 14.5858L24.0001 26.7574L36.1716 14.5858C36.5622 14.1953 37.1953 14.1953 37.5859 14.5858L40.4143 17.4142C40.8048 17.8047 40.8048 18.4379 40.4143 18.8284L26.1214 33.1213C24.9498 34.2929 23.0503 34.2929 21.8788 33.1213Z"
                              />
                            </svg>
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="mb-[20px]">
                      <div className="flex flex-row items-start relative mb-[8px] group">
                        <Link className="flex-[0_0_40px] mr-[12px]">
                          <span className="w-[40px] h-[40px] inline-block rounded-[50%] overflow-hidden">
                            <img
                              className="w-full h-full object-cover"
                              src="https://p16-sign.tiktokcdn-us.com/tos-useast5-avt-0068-tx/e2f923808c2f2295382c6d74aa3586e1~c5_100x100.jpg?lk3s=30310797&x-expires=1707130800&x-signature=Ti3Ox6Q4IzD65UZ5o3A%2BS2eMHWA%3D"
                              alt=""
                            />
                          </span>
                        </Link>

                        <div className="box-border flex-auto">
                          <Link className="font-bold leading-[18px] text-[14px]">
                            SEEK ONER!
                          </Link>
                          <p className="text-[16px] leading-[21px] whitespace-pre-line break-words mb-[6px]">
                            Is he acoustic
                          </p>
                          <p className="text-[14px] leading-[18px] text-third-primary-text dark:text-dark-third-primary-text">
                            <span className="w-[64px] max-w-[64px] inline-block truncate align-top">
                              1-14
                            </span>
                            <span className="cursor-pointer text-third-primary-text dark:text-dark-third-primary-text font-[400] ml-[4px]">
                              Reply
                            </span>
                          </p>
                        </div>

                        <div className="ml-[18px] pr-[2px] w-[24px] flex-[0_0_24px] flex-col flex items-center pt-[24px] group-hover:pt-0">
                          <div className="relative w-[24px] h-[24px] cursor-pointer hidden group-hover:block">
                            <svg
                              className="w-[24px] h-[24px] block cursor-pointer"
                              width="1em"
                              data-e2e=""
                              height="1em"
                              viewBox="0 0 48 48"
                              fill="currentColor"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M4 24C4 21.7909 5.79086 20 8 20C10.2091 20 12 21.7909 12 24C12 26.2091 10.2091 28 8 28C5.79086 28 4 26.2091 4 24ZM20 24C20 21.7909 21.7909 20 24 20C26.2091 20 28 21.7909 28 24C28 26.2091 26.2091 28 24 28C21.7909 28 20 26.2091 20 24ZM36 24C36 21.7909 37.7909 20 40 20C42.2091 20 44 21.7909 44 24C44 26.2091 42.2091 28 40 28C37.7909 28 36 26.2091 36 24Z"
                              />
                            </svg>
                          </div>

                          <div className="text-[12px] leading-[16px] w-[20px] flex flex-col items-center cursor-pointer text-third-primary-text dark:text-dark-third-primary-text">
                            <div className="h-[20px]">
                              <svg
                                width={20}
                                data-e2e=""
                                height={20}
                                viewBox="0 0 48 48"
                                fill="currentColor"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  fillRule="evenodd"
                                  clipRule="evenodd"
                                  d="M24 9.01703C19.0025 3.74266 11.4674 3.736 6.67302 8.56049C1.77566 13.4886 1.77566 21.4735 6.67302 26.4016L22.5814 42.4098C22.9568 42.7876 23.4674 43 24 43C24.5326 43 25.0432 42.7876 25.4186 42.4098L41.327 26.4016C46.2243 21.4735 46.2243 13.4886 41.327 8.56049C36.5326 3.736 28.9975 3.74266 24 9.01703ZM21.4938 12.2118C17.9849 8.07195 12.7825 8.08727 9.51028 11.3801C6.16324 14.7481 6.16324 20.214 9.51028 23.582L24 38.1627L38.4897 23.582C41.8368 20.214 41.8368 14.7481 38.4897 11.3801C35.2175 8.08727 30.0151 8.07195 26.5062 12.2118L26.455 12.2722L25.4186 13.3151C25.0432 13.6929 24.5326 13.9053 24 13.9053C23.4674 13.9053 22.9568 13.6929 22.5814 13.3151L21.545 12.2722L21.4938 12.2118Z"
                                />
                              </svg>
                            </div>
                            <span className="text-[16px] leading-[21px] w-[24px] h-[24px] flex items-center">
                              551
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="pl-[52px]">
                        <div className="flex flex-row items-center justify-between relative">
                          <p className="text-third-primary-text dark:text-dark-third-primary-text font-semibold text-[14px] leading-[18px] cursor-pointer flex items-center">
                            View 19 replies
                            <svg
                              className="ml-[6px] w-[14px] h-[14px] align-middle"
                              width="1em"
                              data-e2e=""
                              height="1em"
                              viewBox="0 0 48 48"
                              fill="currentColor"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M21.8788 33.1213L7.58586 18.8284C7.19534 18.4379 7.19534 17.8047 7.58586 17.4142L10.4143 14.5858C10.8048 14.1953 11.438 14.1953 11.8285 14.5858L24.0001 26.7574L36.1716 14.5858C36.5622 14.1953 37.1953 14.1953 37.5859 14.5858L40.4143 17.4142C40.8048 17.8047 40.8048 18.4379 40.4143 18.8284L26.1214 33.1213C24.9498 34.2929 23.0503 34.2929 21.8788 33.1213Z"
                              />
                            </svg>
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="mb-[20px]">
                      <div className="flex flex-row items-start relative mb-[8px] group">
                        <Link className="flex-[0_0_40px] mr-[12px]">
                          <span className="w-[40px] h-[40px] inline-block rounded-[50%] overflow-hidden">
                            <img
                              className="w-full h-full object-cover"
                              src="https://p16-sign.tiktokcdn-us.com/tos-useast5-avt-0068-tx/e2f923808c2f2295382c6d74aa3586e1~c5_100x100.jpg?lk3s=30310797&x-expires=1707130800&x-signature=Ti3Ox6Q4IzD65UZ5o3A%2BS2eMHWA%3D"
                              alt=""
                            />
                          </span>
                        </Link>

                        <div className="box-border flex-auto">
                          <Link className="font-bold leading-[18px] text-[14px]">
                            SEEK ONER!
                          </Link>
                          <p className="text-[16px] leading-[21px] whitespace-pre-line break-words mb-[6px]">
                            Is he acoustic
                          </p>
                          <p className="text-[14px] leading-[18px] text-third-primary-text dark:text-dark-third-primary-text">
                            <span className="w-[64px] max-w-[64px] inline-block truncate align-top">
                              1-14
                            </span>
                            <span className="cursor-pointer text-third-primary-text dark:text-dark-third-primary-text font-[400] ml-[4px]">
                              Reply
                            </span>
                          </p>
                        </div>

                        <div className="ml-[18px] pr-[2px] w-[24px] flex-[0_0_24px] flex-col flex items-center pt-[24px] group-hover:pt-0">
                          <div className="relative w-[24px] h-[24px] cursor-pointer hidden group-hover:block">
                            <svg
                              className="w-[24px] h-[24px] block cursor-pointer"
                              width="1em"
                              data-e2e=""
                              height="1em"
                              viewBox="0 0 48 48"
                              fill="currentColor"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M4 24C4 21.7909 5.79086 20 8 20C10.2091 20 12 21.7909 12 24C12 26.2091 10.2091 28 8 28C5.79086 28 4 26.2091 4 24ZM20 24C20 21.7909 21.7909 20 24 20C26.2091 20 28 21.7909 28 24C28 26.2091 26.2091 28 24 28C21.7909 28 20 26.2091 20 24ZM36 24C36 21.7909 37.7909 20 40 20C42.2091 20 44 21.7909 44 24C44 26.2091 42.2091 28 40 28C37.7909 28 36 26.2091 36 24Z"
                              />
                            </svg>
                          </div>

                          <div className="text-[12px] leading-[16px] w-[20px] flex flex-col items-center cursor-pointer text-third-primary-text dark:text-dark-third-primary-text">
                            <div className="h-[20px]">
                              <svg
                                width={20}
                                data-e2e=""
                                height={20}
                                viewBox="0 0 48 48"
                                fill="currentColor"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  fillRule="evenodd"
                                  clipRule="evenodd"
                                  d="M24 9.01703C19.0025 3.74266 11.4674 3.736 6.67302 8.56049C1.77566 13.4886 1.77566 21.4735 6.67302 26.4016L22.5814 42.4098C22.9568 42.7876 23.4674 43 24 43C24.5326 43 25.0432 42.7876 25.4186 42.4098L41.327 26.4016C46.2243 21.4735 46.2243 13.4886 41.327 8.56049C36.5326 3.736 28.9975 3.74266 24 9.01703ZM21.4938 12.2118C17.9849 8.07195 12.7825 8.08727 9.51028 11.3801C6.16324 14.7481 6.16324 20.214 9.51028 23.582L24 38.1627L38.4897 23.582C41.8368 20.214 41.8368 14.7481 38.4897 11.3801C35.2175 8.08727 30.0151 8.07195 26.5062 12.2118L26.455 12.2722L25.4186 13.3151C25.0432 13.6929 24.5326 13.9053 24 13.9053C23.4674 13.9053 22.9568 13.6929 22.5814 13.3151L21.545 12.2722L21.4938 12.2118Z"
                                />
                              </svg>
                            </div>
                            <span className="text-[16px] leading-[21px] w-[24px] h-[24px] flex items-center">
                              551
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="pl-[52px]">
                        <div className="flex flex-row items-center justify-between relative">
                          <p className="text-third-primary-text dark:text-dark-third-primary-text font-semibold text-[14px] leading-[18px] cursor-pointer flex items-center">
                            View 19 replies
                            <svg
                              className="ml-[6px] w-[14px] h-[14px] align-middle"
                              width="1em"
                              data-e2e=""
                              height="1em"
                              viewBox="0 0 48 48"
                              fill="currentColor"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M21.8788 33.1213L7.58586 18.8284C7.19534 18.4379 7.19534 17.8047 7.58586 17.4142L10.4143 14.5858C10.8048 14.1953 11.438 14.1953 11.8285 14.5858L24.0001 26.7574L36.1716 14.5858C36.5622 14.1953 37.1953 14.1953 37.5859 14.5858L40.4143 17.4142C40.8048 17.8047 40.8048 18.4379 40.4143 18.8284L26.1214 33.1213C24.9498 34.2929 23.0503 34.2929 21.8788 33.1213Z"
                              />
                            </svg>
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="mb-[20px]">
                      <div className="flex flex-row items-start relative mb-[8px] group">
                        <Link className="flex-[0_0_40px] mr-[12px]">
                          <span className="w-[40px] h-[40px] inline-block rounded-[50%] overflow-hidden">
                            <img
                              className="w-full h-full object-cover"
                              src="https://p16-sign.tiktokcdn-us.com/tos-useast5-avt-0068-tx/e2f923808c2f2295382c6d74aa3586e1~c5_100x100.jpg?lk3s=30310797&x-expires=1707130800&x-signature=Ti3Ox6Q4IzD65UZ5o3A%2BS2eMHWA%3D"
                              alt=""
                            />
                          </span>
                        </Link>

                        <div className="box-border flex-auto">
                          <Link className="font-bold leading-[18px] text-[14px]">
                            SEEK ONER!
                          </Link>
                          <p className="text-[16px] leading-[21px] whitespace-pre-line break-words mb-[6px]">
                            Is he acoustic
                          </p>
                          <p className="text-[14px] leading-[18px] text-third-primary-text dark:text-dark-third-primary-text">
                            <span className="w-[64px] max-w-[64px] inline-block truncate align-top">
                              1-14
                            </span>
                            <span className="cursor-pointer text-third-primary-text dark:text-dark-third-primary-text font-[400] ml-[4px]">
                              Reply
                            </span>
                          </p>
                        </div>

                        <div className="ml-[18px] pr-[2px] w-[24px] flex-[0_0_24px] flex-col flex items-center pt-[24px] group-hover:pt-0">
                          <div className="relative w-[24px] h-[24px] cursor-pointer hidden group-hover:block">
                            <svg
                              className="w-[24px] h-[24px] block cursor-pointer"
                              width="1em"
                              data-e2e=""
                              height="1em"
                              viewBox="0 0 48 48"
                              fill="currentColor"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M4 24C4 21.7909 5.79086 20 8 20C10.2091 20 12 21.7909 12 24C12 26.2091 10.2091 28 8 28C5.79086 28 4 26.2091 4 24ZM20 24C20 21.7909 21.7909 20 24 20C26.2091 20 28 21.7909 28 24C28 26.2091 26.2091 28 24 28C21.7909 28 20 26.2091 20 24ZM36 24C36 21.7909 37.7909 20 40 20C42.2091 20 44 21.7909 44 24C44 26.2091 42.2091 28 40 28C37.7909 28 36 26.2091 36 24Z"
                              />
                            </svg>
                          </div>

                          <div className="text-[12px] leading-[16px] w-[20px] flex flex-col items-center cursor-pointer text-third-primary-text dark:text-dark-third-primary-text">
                            <div className="h-[20px]">
                              <svg
                                width={20}
                                data-e2e=""
                                height={20}
                                viewBox="0 0 48 48"
                                fill="currentColor"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  fillRule="evenodd"
                                  clipRule="evenodd"
                                  d="M24 9.01703C19.0025 3.74266 11.4674 3.736 6.67302 8.56049C1.77566 13.4886 1.77566 21.4735 6.67302 26.4016L22.5814 42.4098C22.9568 42.7876 23.4674 43 24 43C24.5326 43 25.0432 42.7876 25.4186 42.4098L41.327 26.4016C46.2243 21.4735 46.2243 13.4886 41.327 8.56049C36.5326 3.736 28.9975 3.74266 24 9.01703ZM21.4938 12.2118C17.9849 8.07195 12.7825 8.08727 9.51028 11.3801C6.16324 14.7481 6.16324 20.214 9.51028 23.582L24 38.1627L38.4897 23.582C41.8368 20.214 41.8368 14.7481 38.4897 11.3801C35.2175 8.08727 30.0151 8.07195 26.5062 12.2118L26.455 12.2722L25.4186 13.3151C25.0432 13.6929 24.5326 13.9053 24 13.9053C23.4674 13.9053 22.9568 13.6929 22.5814 13.3151L21.545 12.2722L21.4938 12.2118Z"
                                />
                              </svg>
                            </div>
                            <span className="text-[16px] leading-[21px] w-[24px] h-[24px] flex items-center">
                              551
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="pl-[52px]">
                        <div className="flex flex-row items-center justify-between relative">
                          <p className="text-third-primary-text dark:text-dark-third-primary-text font-semibold text-[14px] leading-[18px] cursor-pointer flex items-center">
                            View 19 replies
                            <svg
                              className="ml-[6px] w-[14px] h-[14px] align-middle"
                              width="1em"
                              data-e2e=""
                              height="1em"
                              viewBox="0 0 48 48"
                              fill="currentColor"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M21.8788 33.1213L7.58586 18.8284C7.19534 18.4379 7.19534 17.8047 7.58586 17.4142L10.4143 14.5858C10.8048 14.1953 11.438 14.1953 11.8285 14.5858L24.0001 26.7574L36.1716 14.5858C36.5622 14.1953 37.1953 14.1953 37.5859 14.5858L40.4143 17.4142C40.8048 17.8047 40.8048 18.4379 40.4143 18.8284L26.1214 33.1213C24.9498 34.2929 23.0503 34.2929 21.8788 33.1213Z"
                              />
                            </svg>
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="mb-[20px]">
                      <div className="flex flex-row items-start relative mb-[8px] group">
                        <Link className="flex-[0_0_40px] mr-[12px]">
                          <span className="w-[40px] h-[40px] inline-block rounded-[50%] overflow-hidden">
                            <img
                              className="w-full h-full object-cover"
                              src="https://p16-sign.tiktokcdn-us.com/tos-useast5-avt-0068-tx/e2f923808c2f2295382c6d74aa3586e1~c5_100x100.jpg?lk3s=30310797&x-expires=1707130800&x-signature=Ti3Ox6Q4IzD65UZ5o3A%2BS2eMHWA%3D"
                              alt=""
                            />
                          </span>
                        </Link>

                        <div className="box-border flex-auto">
                          <Link className="font-bold leading-[18px] text-[14px]">
                            SEEK ONER!
                          </Link>
                          <p className="text-[16px] leading-[21px] whitespace-pre-line break-words mb-[6px]">
                            Is he acoustic
                          </p>
                          <p className="text-[14px] leading-[18px] text-third-primary-text dark:text-dark-third-primary-text">
                            <span className="w-[64px] max-w-[64px] inline-block truncate align-top">
                              1-14
                            </span>
                            <span className="cursor-pointer text-third-primary-text dark:text-dark-third-primary-text font-[400] ml-[4px]">
                              Reply
                            </span>
                          </p>
                        </div>

                        <div className="ml-[18px] pr-[2px] w-[24px] flex-[0_0_24px] flex-col flex items-center pt-[24px] group-hover:pt-0">
                          <div className="relative w-[24px] h-[24px] cursor-pointer hidden group-hover:block">
                            <svg
                              className="w-[24px] h-[24px] block cursor-pointer"
                              width="1em"
                              data-e2e=""
                              height="1em"
                              viewBox="0 0 48 48"
                              fill="currentColor"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M4 24C4 21.7909 5.79086 20 8 20C10.2091 20 12 21.7909 12 24C12 26.2091 10.2091 28 8 28C5.79086 28 4 26.2091 4 24ZM20 24C20 21.7909 21.7909 20 24 20C26.2091 20 28 21.7909 28 24C28 26.2091 26.2091 28 24 28C21.7909 28 20 26.2091 20 24ZM36 24C36 21.7909 37.7909 20 40 20C42.2091 20 44 21.7909 44 24C44 26.2091 42.2091 28 40 28C37.7909 28 36 26.2091 36 24Z"
                              />
                            </svg>
                          </div>

                          <div className="text-[12px] leading-[16px] w-[20px] flex flex-col items-center cursor-pointer text-third-primary-text dark:text-dark-third-primary-text">
                            <div className="h-[20px]">
                              <svg
                                width={20}
                                data-e2e=""
                                height={20}
                                viewBox="0 0 48 48"
                                fill="currentColor"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  fillRule="evenodd"
                                  clipRule="evenodd"
                                  d="M24 9.01703C19.0025 3.74266 11.4674 3.736 6.67302 8.56049C1.77566 13.4886 1.77566 21.4735 6.67302 26.4016L22.5814 42.4098C22.9568 42.7876 23.4674 43 24 43C24.5326 43 25.0432 42.7876 25.4186 42.4098L41.327 26.4016C46.2243 21.4735 46.2243 13.4886 41.327 8.56049C36.5326 3.736 28.9975 3.74266 24 9.01703ZM21.4938 12.2118C17.9849 8.07195 12.7825 8.08727 9.51028 11.3801C6.16324 14.7481 6.16324 20.214 9.51028 23.582L24 38.1627L38.4897 23.582C41.8368 20.214 41.8368 14.7481 38.4897 11.3801C35.2175 8.08727 30.0151 8.07195 26.5062 12.2118L26.455 12.2722L25.4186 13.3151C25.0432 13.6929 24.5326 13.9053 24 13.9053C23.4674 13.9053 22.9568 13.6929 22.5814 13.3151L21.545 12.2722L21.4938 12.2118Z"
                                />
                              </svg>
                            </div>
                            <span className="text-[16px] leading-[21px] w-[24px] h-[24px] flex items-center">
                              551
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="pl-[52px]">
                        <div className="flex flex-row items-center justify-between relative">
                          <p className="text-third-primary-text dark:text-dark-third-primary-text font-semibold text-[14px] leading-[18px] cursor-pointer flex items-center">
                            View 19 replies
                            <svg
                              className="ml-[6px] w-[14px] h-[14px] align-middle"
                              width="1em"
                              data-e2e=""
                              height="1em"
                              viewBox="0 0 48 48"
                              fill="currentColor"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M21.8788 33.1213L7.58586 18.8284C7.19534 18.4379 7.19534 17.8047 7.58586 17.4142L10.4143 14.5858C10.8048 14.1953 11.438 14.1953 11.8285 14.5858L24.0001 26.7574L36.1716 14.5858C36.5622 14.1953 37.1953 14.1953 37.5859 14.5858L40.4143 17.4142C40.8048 17.8047 40.8048 18.4379 40.4143 18.8284L26.1214 33.1213C24.9498 34.2929 23.0503 34.2929 21.8788 33.1213Z"
                              />
                            </svg>
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="mb-[20px]">
                      <div className="flex flex-row items-start relative mb-[8px] group">
                        <Link className="flex-[0_0_40px] mr-[12px]">
                          <span className="w-[40px] h-[40px] inline-block rounded-[50%] overflow-hidden">
                            <img
                              className="w-full h-full object-cover"
                              src="https://p16-sign.tiktokcdn-us.com/tos-useast5-avt-0068-tx/e2f923808c2f2295382c6d74aa3586e1~c5_100x100.jpg?lk3s=30310797&x-expires=1707130800&x-signature=Ti3Ox6Q4IzD65UZ5o3A%2BS2eMHWA%3D"
                              alt=""
                            />
                          </span>
                        </Link>

                        <div className="box-border flex-auto">
                          <Link className="font-bold leading-[18px] text-[14px]">
                            SEEK ONER!
                          </Link>
                          <p className="text-[16px] leading-[21px] whitespace-pre-line break-words mb-[6px]">
                            Is he acoustic
                          </p>
                          <p className="text-[14px] leading-[18px] text-third-primary-text dark:text-dark-third-primary-text">
                            <span className="w-[64px] max-w-[64px] inline-block truncate align-top">
                              1-14
                            </span>
                            <span className="cursor-pointer text-third-primary-text dark:text-dark-third-primary-text font-[400] ml-[4px]">
                              Reply
                            </span>
                          </p>
                        </div>

                        <div className="ml-[18px] pr-[2px] w-[24px] flex-[0_0_24px] flex-col flex items-center pt-[24px] group-hover:pt-0">
                          <div className="relative w-[24px] h-[24px] cursor-pointer hidden group-hover:block">
                            <svg
                              className="w-[24px] h-[24px] block cursor-pointer"
                              width="1em"
                              data-e2e=""
                              height="1em"
                              viewBox="0 0 48 48"
                              fill="currentColor"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M4 24C4 21.7909 5.79086 20 8 20C10.2091 20 12 21.7909 12 24C12 26.2091 10.2091 28 8 28C5.79086 28 4 26.2091 4 24ZM20 24C20 21.7909 21.7909 20 24 20C26.2091 20 28 21.7909 28 24C28 26.2091 26.2091 28 24 28C21.7909 28 20 26.2091 20 24ZM36 24C36 21.7909 37.7909 20 40 20C42.2091 20 44 21.7909 44 24C44 26.2091 42.2091 28 40 28C37.7909 28 36 26.2091 36 24Z"
                              />
                            </svg>
                          </div>

                          <div className="text-[12px] leading-[16px] w-[20px] flex flex-col items-center cursor-pointer text-third-primary-text dark:text-dark-third-primary-text">
                            <div className="h-[20px]">
                              <svg
                                width={20}
                                data-e2e=""
                                height={20}
                                viewBox="0 0 48 48"
                                fill="currentColor"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  fillRule="evenodd"
                                  clipRule="evenodd"
                                  d="M24 9.01703C19.0025 3.74266 11.4674 3.736 6.67302 8.56049C1.77566 13.4886 1.77566 21.4735 6.67302 26.4016L22.5814 42.4098C22.9568 42.7876 23.4674 43 24 43C24.5326 43 25.0432 42.7876 25.4186 42.4098L41.327 26.4016C46.2243 21.4735 46.2243 13.4886 41.327 8.56049C36.5326 3.736 28.9975 3.74266 24 9.01703ZM21.4938 12.2118C17.9849 8.07195 12.7825 8.08727 9.51028 11.3801C6.16324 14.7481 6.16324 20.214 9.51028 23.582L24 38.1627L38.4897 23.582C41.8368 20.214 41.8368 14.7481 38.4897 11.3801C35.2175 8.08727 30.0151 8.07195 26.5062 12.2118L26.455 12.2722L25.4186 13.3151C25.0432 13.6929 24.5326 13.9053 24 13.9053C23.4674 13.9053 22.9568 13.6929 22.5814 13.3151L21.545 12.2722L21.4938 12.2118Z"
                                />
                              </svg>
                            </div>
                            <span className="text-[16px] leading-[21px] w-[24px] h-[24px] flex items-center">
                              551
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="pl-[52px]">
                        <div className="flex flex-row items-center justify-between relative">
                          <p className="text-third-primary-text dark:text-dark-third-primary-text font-semibold text-[14px] leading-[18px] cursor-pointer flex items-center">
                            View 19 replies
                            <svg
                              className="ml-[6px] w-[14px] h-[14px] align-middle"
                              width="1em"
                              data-e2e=""
                              height="1em"
                              viewBox="0 0 48 48"
                              fill="currentColor"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M21.8788 33.1213L7.58586 18.8284C7.19534 18.4379 7.19534 17.8047 7.58586 17.4142L10.4143 14.5858C10.8048 14.1953 11.438 14.1953 11.8285 14.5858L24.0001 26.7574L36.1716 14.5858C36.5622 14.1953 37.1953 14.1953 37.5859 14.5858L40.4143 17.4142C40.8048 17.8047 40.8048 18.4379 40.4143 18.8284L26.1214 33.1213C24.9498 34.2929 23.0503 34.2929 21.8788 33.1213Z"
                              />
                            </svg>
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="mb-[20px]">
                      <div className="flex flex-row items-start relative mb-[8px] group">
                        <Link className="flex-[0_0_40px] mr-[12px]">
                          <span className="w-[40px] h-[40px] inline-block rounded-[50%] overflow-hidden">
                            <img
                              className="w-full h-full object-cover"
                              src="https://p16-sign.tiktokcdn-us.com/tos-useast5-avt-0068-tx/e2f923808c2f2295382c6d74aa3586e1~c5_100x100.jpg?lk3s=30310797&x-expires=1707130800&x-signature=Ti3Ox6Q4IzD65UZ5o3A%2BS2eMHWA%3D"
                              alt=""
                            />
                          </span>
                        </Link>

                        <div className="box-border flex-auto">
                          <Link className="font-bold leading-[18px] text-[14px]">
                            SEEK ONER!
                          </Link>
                          <p className="text-[16px] leading-[21px] whitespace-pre-line break-words mb-[6px]">
                            Is he acoustic
                          </p>
                          <p className="text-[14px] leading-[18px] text-third-primary-text dark:text-dark-third-primary-text">
                            <span className="w-[64px] max-w-[64px] inline-block truncate align-top">
                              1-14
                            </span>
                            <span className="cursor-pointer text-third-primary-text dark:text-dark-third-primary-text font-[400] ml-[4px]">
                              Reply
                            </span>
                          </p>
                        </div>

                        <div className="ml-[18px] pr-[2px] w-[24px] flex-[0_0_24px] flex-col flex items-center pt-[24px] group-hover:pt-0">
                          <div className="relative w-[24px] h-[24px] cursor-pointer hidden group-hover:block">
                            <svg
                              className="w-[24px] h-[24px] block cursor-pointer"
                              width="1em"
                              data-e2e=""
                              height="1em"
                              viewBox="0 0 48 48"
                              fill="currentColor"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M4 24C4 21.7909 5.79086 20 8 20C10.2091 20 12 21.7909 12 24C12 26.2091 10.2091 28 8 28C5.79086 28 4 26.2091 4 24ZM20 24C20 21.7909 21.7909 20 24 20C26.2091 20 28 21.7909 28 24C28 26.2091 26.2091 28 24 28C21.7909 28 20 26.2091 20 24ZM36 24C36 21.7909 37.7909 20 40 20C42.2091 20 44 21.7909 44 24C44 26.2091 42.2091 28 40 28C37.7909 28 36 26.2091 36 24Z"
                              />
                            </svg>
                          </div>

                          <div className="text-[12px] leading-[16px] w-[20px] flex flex-col items-center cursor-pointer text-third-primary-text dark:text-dark-third-primary-text">
                            <div className="h-[20px]">
                              <svg
                                width={20}
                                data-e2e=""
                                height={20}
                                viewBox="0 0 48 48"
                                fill="currentColor"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  fillRule="evenodd"
                                  clipRule="evenodd"
                                  d="M24 9.01703C19.0025 3.74266 11.4674 3.736 6.67302 8.56049C1.77566 13.4886 1.77566 21.4735 6.67302 26.4016L22.5814 42.4098C22.9568 42.7876 23.4674 43 24 43C24.5326 43 25.0432 42.7876 25.4186 42.4098L41.327 26.4016C46.2243 21.4735 46.2243 13.4886 41.327 8.56049C36.5326 3.736 28.9975 3.74266 24 9.01703ZM21.4938 12.2118C17.9849 8.07195 12.7825 8.08727 9.51028 11.3801C6.16324 14.7481 6.16324 20.214 9.51028 23.582L24 38.1627L38.4897 23.582C41.8368 20.214 41.8368 14.7481 38.4897 11.3801C35.2175 8.08727 30.0151 8.07195 26.5062 12.2118L26.455 12.2722L25.4186 13.3151C25.0432 13.6929 24.5326 13.9053 24 13.9053C23.4674 13.9053 22.9568 13.6929 22.5814 13.3151L21.545 12.2722L21.4938 12.2118Z"
                                />
                              </svg>
                            </div>
                            <span className="text-[16px] leading-[21px] w-[24px] h-[24px] flex items-center">
                              551
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="pl-[52px]">
                        <div className="flex flex-row items-center justify-between relative">
                          <p className="text-third-primary-text dark:text-dark-third-primary-text font-semibold text-[14px] leading-[18px] cursor-pointer flex items-center">
                            View 19 replies
                            <svg
                              className="ml-[6px] w-[14px] h-[14px] align-middle"
                              width="1em"
                              data-e2e=""
                              height="1em"
                              viewBox="0 0 48 48"
                              fill="currentColor"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M21.8788 33.1213L7.58586 18.8284C7.19534 18.4379 7.19534 17.8047 7.58586 17.4142L10.4143 14.5858C10.8048 14.1953 11.438 14.1953 11.8285 14.5858L24.0001 26.7574L36.1716 14.5858C36.5622 14.1953 37.1953 14.1953 37.5859 14.5858L40.4143 17.4142C40.8048 17.8047 40.8048 18.4379 40.4143 18.8284L26.1214 33.1213C24.9498 34.2929 23.0503 34.2929 21.8788 33.1213Z"
                              />
                            </svg>
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="mb-[20px]">
                      <div className="flex flex-row items-start relative mb-[8px] group">
                        <Link className="flex-[0_0_40px] mr-[12px]">
                          <span className="w-[40px] h-[40px] inline-block rounded-[50%] overflow-hidden">
                            <img
                              className="w-full h-full object-cover"
                              src="https://p16-sign.tiktokcdn-us.com/tos-useast5-avt-0068-tx/e2f923808c2f2295382c6d74aa3586e1~c5_100x100.jpg?lk3s=30310797&x-expires=1707130800&x-signature=Ti3Ox6Q4IzD65UZ5o3A%2BS2eMHWA%3D"
                              alt=""
                            />
                          </span>
                        </Link>

                        <div className="box-border flex-auto">
                          <Link className="font-bold leading-[18px] text-[14px]">
                            SEEK ONER!
                          </Link>
                          <p className="text-[16px] leading-[21px] whitespace-pre-line break-words mb-[6px]">
                            Is he acoustic
                          </p>
                          <p className="text-[14px] leading-[18px] text-third-primary-text dark:text-dark-third-primary-text">
                            <span className="w-[64px] max-w-[64px] inline-block truncate align-top">
                              1-14
                            </span>
                            <span className="cursor-pointer text-third-primary-text dark:text-dark-third-primary-text font-[400] ml-[4px]">
                              Reply
                            </span>
                          </p>
                        </div>

                        <div className="ml-[18px] pr-[2px] w-[24px] flex-[0_0_24px] flex-col flex items-center pt-[24px] group-hover:pt-0">
                          <div className="relative w-[24px] h-[24px] cursor-pointer hidden group-hover:block">
                            <svg
                              className="w-[24px] h-[24px] block cursor-pointer"
                              width="1em"
                              data-e2e=""
                              height="1em"
                              viewBox="0 0 48 48"
                              fill="currentColor"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M4 24C4 21.7909 5.79086 20 8 20C10.2091 20 12 21.7909 12 24C12 26.2091 10.2091 28 8 28C5.79086 28 4 26.2091 4 24ZM20 24C20 21.7909 21.7909 20 24 20C26.2091 20 28 21.7909 28 24C28 26.2091 26.2091 28 24 28C21.7909 28 20 26.2091 20 24ZM36 24C36 21.7909 37.7909 20 40 20C42.2091 20 44 21.7909 44 24C44 26.2091 42.2091 28 40 28C37.7909 28 36 26.2091 36 24Z"
                              />
                            </svg>
                          </div>

                          <div className="text-[12px] leading-[16px] w-[20px] flex flex-col items-center cursor-pointer text-third-primary-text dark:text-dark-third-primary-text">
                            <div className="h-[20px]">
                              <svg
                                width={20}
                                data-e2e=""
                                height={20}
                                viewBox="0 0 48 48"
                                fill="currentColor"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  fillRule="evenodd"
                                  clipRule="evenodd"
                                  d="M24 9.01703C19.0025 3.74266 11.4674 3.736 6.67302 8.56049C1.77566 13.4886 1.77566 21.4735 6.67302 26.4016L22.5814 42.4098C22.9568 42.7876 23.4674 43 24 43C24.5326 43 25.0432 42.7876 25.4186 42.4098L41.327 26.4016C46.2243 21.4735 46.2243 13.4886 41.327 8.56049C36.5326 3.736 28.9975 3.74266 24 9.01703ZM21.4938 12.2118C17.9849 8.07195 12.7825 8.08727 9.51028 11.3801C6.16324 14.7481 6.16324 20.214 9.51028 23.582L24 38.1627L38.4897 23.582C41.8368 20.214 41.8368 14.7481 38.4897 11.3801C35.2175 8.08727 30.0151 8.07195 26.5062 12.2118L26.455 12.2722L25.4186 13.3151C25.0432 13.6929 24.5326 13.9053 24 13.9053C23.4674 13.9053 22.9568 13.6929 22.5814 13.3151L21.545 12.2722L21.4938 12.2118Z"
                                />
                              </svg>
                            </div>
                            <span className="text-[16px] leading-[21px] w-[24px] h-[24px] flex items-center">
                              551
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="pl-[52px]">
                        <div className="flex flex-row items-center justify-between relative">
                          <p className="text-third-primary-text dark:text-dark-third-primary-text font-semibold text-[14px] leading-[18px] cursor-pointer flex items-center">
                            View 19 replies
                            <svg
                              className="ml-[6px] w-[14px] h-[14px] align-middle"
                              width="1em"
                              data-e2e=""
                              height="1em"
                              viewBox="0 0 48 48"
                              fill="currentColor"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M21.8788 33.1213L7.58586 18.8284C7.19534 18.4379 7.19534 17.8047 7.58586 17.4142L10.4143 14.5858C10.8048 14.1953 11.438 14.1953 11.8285 14.5858L24.0001 26.7574L36.1716 14.5858C36.5622 14.1953 37.1953 14.1953 37.5859 14.5858L40.4143 17.4142C40.8048 17.8047 40.8048 18.4379 40.4143 18.8284L26.1214 33.1213C24.9498 34.2929 23.0503 34.2929 21.8788 33.1213Z"
                              />
                            </svg>
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="mb-[20px]">
                      <div className="flex flex-row items-start relative mb-[8px] group">
                        <Link className="flex-[0_0_40px] mr-[12px]">
                          <span className="w-[40px] h-[40px] inline-block rounded-[50%] overflow-hidden">
                            <img
                              className="w-full h-full object-cover"
                              src="https://p16-sign.tiktokcdn-us.com/tos-useast5-avt-0068-tx/e2f923808c2f2295382c6d74aa3586e1~c5_100x100.jpg?lk3s=30310797&x-expires=1707130800&x-signature=Ti3Ox6Q4IzD65UZ5o3A%2BS2eMHWA%3D"
                              alt=""
                            />
                          </span>
                        </Link>

                        <div className="box-border flex-auto">
                          <Link className="font-bold leading-[18px] text-[14px]">
                            SEEK ONER!
                          </Link>
                          <p className="text-[16px] leading-[21px] whitespace-pre-line break-words mb-[6px]">
                            Is he acoustic
                          </p>
                          <p className="text-[14px] leading-[18px] text-third-primary-text dark:text-dark-third-primary-text">
                            <span className="w-[64px] max-w-[64px] inline-block truncate align-top">
                              1-14
                            </span>
                            <span className="cursor-pointer text-third-primary-text dark:text-dark-third-primary-text font-[400] ml-[4px]">
                              Reply
                            </span>
                          </p>
                        </div>

                        <div className="ml-[18px] pr-[2px] w-[24px] flex-[0_0_24px] flex-col flex items-center pt-[24px] group-hover:pt-0">
                          <div className="relative w-[24px] h-[24px] cursor-pointer hidden group-hover:block">
                            <svg
                              className="w-[24px] h-[24px] block cursor-pointer"
                              width="1em"
                              data-e2e=""
                              height="1em"
                              viewBox="0 0 48 48"
                              fill="currentColor"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M4 24C4 21.7909 5.79086 20 8 20C10.2091 20 12 21.7909 12 24C12 26.2091 10.2091 28 8 28C5.79086 28 4 26.2091 4 24ZM20 24C20 21.7909 21.7909 20 24 20C26.2091 20 28 21.7909 28 24C28 26.2091 26.2091 28 24 28C21.7909 28 20 26.2091 20 24ZM36 24C36 21.7909 37.7909 20 40 20C42.2091 20 44 21.7909 44 24C44 26.2091 42.2091 28 40 28C37.7909 28 36 26.2091 36 24Z"
                              />
                            </svg>
                          </div>

                          <div className="text-[12px] leading-[16px] w-[20px] flex flex-col items-center cursor-pointer text-third-primary-text dark:text-dark-third-primary-text">
                            <div className="h-[20px]">
                              <svg
                                width={20}
                                data-e2e=""
                                height={20}
                                viewBox="0 0 48 48"
                                fill="currentColor"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  fillRule="evenodd"
                                  clipRule="evenodd"
                                  d="M24 9.01703C19.0025 3.74266 11.4674 3.736 6.67302 8.56049C1.77566 13.4886 1.77566 21.4735 6.67302 26.4016L22.5814 42.4098C22.9568 42.7876 23.4674 43 24 43C24.5326 43 25.0432 42.7876 25.4186 42.4098L41.327 26.4016C46.2243 21.4735 46.2243 13.4886 41.327 8.56049C36.5326 3.736 28.9975 3.74266 24 9.01703ZM21.4938 12.2118C17.9849 8.07195 12.7825 8.08727 9.51028 11.3801C6.16324 14.7481 6.16324 20.214 9.51028 23.582L24 38.1627L38.4897 23.582C41.8368 20.214 41.8368 14.7481 38.4897 11.3801C35.2175 8.08727 30.0151 8.07195 26.5062 12.2118L26.455 12.2722L25.4186 13.3151C25.0432 13.6929 24.5326 13.9053 24 13.9053C23.4674 13.9053 22.9568 13.6929 22.5814 13.3151L21.545 12.2722L21.4938 12.2118Z"
                                />
                              </svg>
                            </div>
                            <span className="text-[16px] leading-[21px] w-[24px] h-[24px] flex items-center">
                              551
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="pl-[52px]">
                        <div className="flex flex-row items-center justify-between relative">
                          <p className="text-third-primary-text dark:text-dark-third-primary-text font-semibold text-[14px] leading-[18px] cursor-pointer flex items-center">
                            View 19 replies
                            <svg
                              className="ml-[6px] w-[14px] h-[14px] align-middle"
                              width="1em"
                              data-e2e=""
                              height="1em"
                              viewBox="0 0 48 48"
                              fill="currentColor"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M21.8788 33.1213L7.58586 18.8284C7.19534 18.4379 7.19534 17.8047 7.58586 17.4142L10.4143 14.5858C10.8048 14.1953 11.438 14.1953 11.8285 14.5858L24.0001 26.7574L36.1716 14.5858C36.5622 14.1953 37.1953 14.1953 37.5859 14.5858L40.4143 17.4142C40.8048 17.8047 40.8048 18.4379 40.4143 18.8284L26.1214 33.1213C24.9498 34.2929 23.0503 34.2929 21.8788 33.1213Z"
                              />
                            </svg>
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="mb-[20px]">
                      <div className="flex flex-row items-start relative mb-[8px] group">
                        <Link className="flex-[0_0_40px] mr-[12px]">
                          <span className="w-[40px] h-[40px] inline-block rounded-[50%] overflow-hidden">
                            <img
                              className="w-full h-full object-cover"
                              src="https://p16-sign.tiktokcdn-us.com/tos-useast5-avt-0068-tx/e2f923808c2f2295382c6d74aa3586e1~c5_100x100.jpg?lk3s=30310797&x-expires=1707130800&x-signature=Ti3Ox6Q4IzD65UZ5o3A%2BS2eMHWA%3D"
                              alt=""
                            />
                          </span>
                        </Link>

                        <div className="box-border flex-auto">
                          <Link className="font-bold leading-[18px] text-[14px]">
                            SEEK ONER!
                          </Link>
                          <p className="text-[16px] leading-[21px] whitespace-pre-line break-words mb-[6px]">
                            Is he acoustic
                          </p>
                          <p className="text-[14px] leading-[18px] text-third-primary-text dark:text-dark-third-primary-text">
                            <span className="w-[64px] max-w-[64px] inline-block truncate align-top">
                              1-14
                            </span>
                            <span className="cursor-pointer text-third-primary-text dark:text-dark-third-primary-text font-[400] ml-[4px]">
                              Reply
                            </span>
                          </p>
                        </div>

                        <div className="ml-[18px] pr-[2px] w-[24px] flex-[0_0_24px] flex-col flex items-center pt-[24px] group-hover:pt-0">
                          <div className="relative w-[24px] h-[24px] cursor-pointer hidden group-hover:block">
                            <svg
                              className="w-[24px] h-[24px] block cursor-pointer"
                              width="1em"
                              data-e2e=""
                              height="1em"
                              viewBox="0 0 48 48"
                              fill="currentColor"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M4 24C4 21.7909 5.79086 20 8 20C10.2091 20 12 21.7909 12 24C12 26.2091 10.2091 28 8 28C5.79086 28 4 26.2091 4 24ZM20 24C20 21.7909 21.7909 20 24 20C26.2091 20 28 21.7909 28 24C28 26.2091 26.2091 28 24 28C21.7909 28 20 26.2091 20 24ZM36 24C36 21.7909 37.7909 20 40 20C42.2091 20 44 21.7909 44 24C44 26.2091 42.2091 28 40 28C37.7909 28 36 26.2091 36 24Z"
                              />
                            </svg>
                          </div>

                          <div className="text-[12px] leading-[16px] w-[20px] flex flex-col items-center cursor-pointer text-third-primary-text dark:text-dark-third-primary-text">
                            <div className="h-[20px]">
                              <svg
                                width={20}
                                data-e2e=""
                                height={20}
                                viewBox="0 0 48 48"
                                fill="currentColor"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  fillRule="evenodd"
                                  clipRule="evenodd"
                                  d="M24 9.01703C19.0025 3.74266 11.4674 3.736 6.67302 8.56049C1.77566 13.4886 1.77566 21.4735 6.67302 26.4016L22.5814 42.4098C22.9568 42.7876 23.4674 43 24 43C24.5326 43 25.0432 42.7876 25.4186 42.4098L41.327 26.4016C46.2243 21.4735 46.2243 13.4886 41.327 8.56049C36.5326 3.736 28.9975 3.74266 24 9.01703ZM21.4938 12.2118C17.9849 8.07195 12.7825 8.08727 9.51028 11.3801C6.16324 14.7481 6.16324 20.214 9.51028 23.582L24 38.1627L38.4897 23.582C41.8368 20.214 41.8368 14.7481 38.4897 11.3801C35.2175 8.08727 30.0151 8.07195 26.5062 12.2118L26.455 12.2722L25.4186 13.3151C25.0432 13.6929 24.5326 13.9053 24 13.9053C23.4674 13.9053 22.9568 13.6929 22.5814 13.3151L21.545 12.2722L21.4938 12.2118Z"
                                />
                              </svg>
                            </div>
                            <span className="text-[16px] leading-[21px] w-[24px] h-[24px] flex items-center">
                              551
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="pl-[52px]">
                        <div className="flex flex-row items-center justify-between relative">
                          <p className="text-third-primary-text dark:text-dark-third-primary-text font-semibold text-[14px] leading-[18px] cursor-pointer flex items-center">
                            View 19 replies
                            <svg
                              className="ml-[6px] w-[14px] h-[14px] align-middle"
                              width="1em"
                              data-e2e=""
                              height="1em"
                              viewBox="0 0 48 48"
                              fill="currentColor"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M21.8788 33.1213L7.58586 18.8284C7.19534 18.4379 7.19534 17.8047 7.58586 17.4142L10.4143 14.5858C10.8048 14.1953 11.438 14.1953 11.8285 14.5858L24.0001 26.7574L36.1716 14.5858C36.5622 14.1953 37.1953 14.1953 37.5859 14.5858L40.4143 17.4142C40.8048 17.8047 40.8048 18.4379 40.4143 18.8284L26.1214 33.1213C24.9498 34.2929 23.0503 34.2929 21.8788 33.1213Z"
                              />
                            </svg>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="w-full h-[100vh] max-h-full overflow-auto bg-green-300"></div>
                )}
              </div>
            </div>
          </div>
        </div>

        {pageActiveNav.comment && (
          <div className="w-full py-[21px] px-[30px] flex items-end">
            <div
              className={`flex bg-third-primary-bg dark:bg-dark-third-primary-bg box-border relative rounded-[8px] border border-solid ${commentTextBox.isFocusd
                ? "border-fourth-primary-border"
                : "border-transparent"
                } px-[9px] w-full`}
            >
              <div className="flex flex-row w-full items-end">
                <div className="flex flex-col w-full">
                  <div className="my-[10px] mr-[8px] box-border w-full">
                    <div className="min-h-[17px] max-h-[68px] break-all text-[14px] leading-[17px] text-second-primary-text dark:text-dark-second-primary-text">
                      {commentTextBox.value === "" && (
                        <div>
                          <div
                            className="text-[14px] leading-[17px] text-fifth-primary-text dark:text-dark-fifth-primary-text whitespace-pre-wrap h-max w-max absolute"
                            onClick={() => commentInputRef.current?.focus()}
                          >
                            Add comment...
                          </div>
                        </div>
                      )}
                      <div
                        onClick={() =>
                          setCommentTextBox({
                            ...commentTextBox,
                            isEditable: true,
                          })
                        }
                        ref={commentInputRef}
                        contentEditable={commentTextBox.isEditable}
                        role="textbox"
                        onInput={(e) => {
                          setCommentTextBox({
                            ...commentTextBox,
                            value: e.target.innerText,
                            isEditable:
                              e.target.innerText.length >= 150 ? false : true,
                          });
                        }}
                        onFocus={() =>
                          setCommentTextBox({
                            ...commentTextBox,
                            isFocusd: true,
                          })
                        }
                        onBlur={() => {
                          commentTextBox.value === "" &&
                            setCommentTextBox({
                              ...commentTextBox,
                              isFocusd: false,
                            });
                        }}
                        className="outline-none select-text whitespace-pre-wrap break-words caret-frist-primary-text dark:caret-dark-frist-primary-text"
                      ></div>
                    </div>
                  </div>

                  {commentTextBox.value.length > 47 && (
                    <div className="w-full pb-[4px] font-[400] text-dark-third-primary-text text-[15px]">
                      <span>{commentTextBox.value.length}</span>
                      <span>/150</span>
                    </div>
                  )}
                </div>

                <div className="flex-[0_0_32px] w-[32px] h-[32px] p-[5px] m-[3px] cursor-pointer bg-transparent rounded-[8px]">
                  <svg
                    width="1em"
                    data-e2e=""
                    height="1em"
                    viewBox="0 0 48 48"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-full h-full fill-third-primary-icon-color dark:fill-dark-third-primary-icon-color"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M24 6C14.0589 6 6 14.0589 6 24C6 33.9411 14.0589 42 24 42C28.0553 42 31.7921 40.6614 34.8006 38.401L35.6001 37.8003C36.0416 37.4686 36.6685 37.5576 37.0003 37.9992L38.2016 39.5981C38.5334 40.0397 38.4443 40.6666 38.0028 40.9983L37.2033 41.599C33.5258 44.3619 28.9513 46 24 46C11.8497 46 2 36.1503 2 24C2 11.8497 11.8497 2 24 2C36.1503 2 46 11.8497 46 24V26C46 30.4843 42.1949 34 37.8438 34C35.1966 34 32.8496 32.7142 31.3935 30.733C29.5649 32.7403 26.9303 34 24 34C18.4772 34 14 29.5228 14 24C14 18.4772 18.4772 14 24 14C29.5228 14 34 18.4772 34 24C34 24.5814 33.9502 25.1528 33.8541 25.7096C33.8473 25.8052 33.8438 25.902 33.8438 26C33.8438 28.2091 35.6347 30 37.8438 30C40.1201 30 42 28.1431 42 26V24C42 14.0589 33.9411 6 24 6ZM24 18C20.6863 18 18 20.6863 18 24C18 27.3137 20.6863 30 24 30C26.9395 30 29.3891 27.8841 29.9013 25.0918C29.9659 24.7392 30 24.3744 30 24C30 20.6863 27.3137 18 24 18Z"
                    />
                  </svg>
                </div>
                <div className="flex-[0_0_32px] w-[32px] h-[32px] p-[5px] m-[3px] cursor-pointer bg-transparent rounded-[8px]">
                  <svg
                    width="1em"
                    data-e2e=""
                    height="1em"
                    viewBox="0 0 48 48"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-full h-full fill-third-primary-icon-color dark:fill-dark-third-primary-icon-color"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M24 6C14.0589 6 6 14.0589 6 24C6 33.9411 14.0589 42 24 42C33.9411 42 42 33.9411 42 24C42 14.0589 33.9411 6 24 6ZM2 24C2 11.8497 11.8497 2 24 2C36.1503 2 46 11.8497 46 24C46 36.1503 36.1503 46 24 46C11.8497 46 2 36.1503 2 24Z"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M17 23C18.6569 23 20 21.2091 20 19C20 16.7909 18.6569 15 17 15C15.3431 15 14 16.7909 14 19C14 21.2091 15.3431 23 17 23Z"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M31 23C32.6569 23 34 21.2091 34 19C34 16.7909 32.6569 15 31 15C29.3431 15 28 16.7909 28 19C28 21.2091 29.3431 23 31 23Z"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M16 28.3431C16 31.4673 19.5817 36 24 36C28.4183 36 32 31.4673 32 28.3431C32 25.219 16 25.219 16 28.3431Z"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <button
              className={`font-bold outline-none border-none p-[8px] ml-[4px] ${commentTextBox.value !== ""
                ? "text-frist-primary-text dark:text-dark-frist-primary-text"
                : "text-first-primary-icon-color dark:text-dark-first-primary-icon-color"
                } font-sans`}
            >
              Post
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReelSwiper;
