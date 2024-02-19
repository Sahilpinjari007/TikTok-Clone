import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getReelsByKeyword, setReels } from "../../../features/services/tiktokSlice";

const exploresCategori = [
  "Singing & Danching",
  "Comedy",
  "Sports",
  "Anime & Comics",
  "Relationship",
  "Shows",
  "Lipsync",
  "Daily Life",
  "Beauty Care",
  "Games",
  "Society",
  "Outfit",
  "Cars",
  "Food",
  "Animals",
  "Faimily",
  "Drama",
  "Fitness & Health",
  "Education",
  "Technology",
];

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

const CategoriBtn = ({ handleCategoriBtnClick, title, isActive }) => {
  return (
    <button
      onClick={() => handleCategoriBtnClick(title)}
      className={`flex items-center px-[12px] h-[42px] rounded-[8px] text-[17px] cursor-pointer gap-[6px] border-none ${isActive ? ' bg-third-primary-icon-color text-second-primary-btn dark:bg-third-primary-icon-btn dark:text-second-primary-text' : 'bg-fourth-primary-btn dark:bg-dark-fourth-primary-btn  hover:bg-fourth-primary-hover-btn dark:hover:bg-dark-fourth-primary-hover-btn text-second-primary-text dark:text-dark-fifth-primary-text'} mr-[12px]`}>
      {title}
    </button>
  );
};

const ExploreCard = ({ data }) => {

  const videoRef = useRef(null);
  const [videoIntractions, setVideoIntractions] = useState({
    isBuffer: false,
    isHover: false,
    isMute: true
  })

  const handleMouseHover = () => {
    videoRef.current.play();
    setVideoIntractions({ ...videoIntractions, isHover: true })
  }

  const handleMouseHoverOver = () => {
    videoRef.current.pause();
    setVideoIntractions({
      isBuffer: false,
      isHover: false,
      isMute: true
    })

    videoRef.current.currentTime = 0;
  }

  const handleVideoAudio = () => {
    setVideoIntractions({ ...videoIntractions, isMute: !videoIntractions.isMute })
  }

  return (
    <div className="rounded-[4px] group">
      <div
        onMouseLeave={handleMouseHoverOver}
        onMouseOver={handleMouseHover} className="relative w-full rounded-[8px] overflow-hidden">
        <div className="pt-[133.333%]">
          <div className="absolute inset-0">
            <Link to={`/@${data?.author?.unique_id}/video/${data?.video_id}`}>
              <canvas className="block invisible h-full"></canvas>
              <div className="absolute left-0 top-0 w-full h-full">
                <div className="w-full h-full overflow-hidden relative bg-second-primary-btn dark:bg-dark-second-primary-btn bg-cover bg-no-repeat bg-center flex items-center content-center">
                  <div className="w-full h-full relative">
                    <span className="box-border block overflow-hidden bg-none opacity-[1] absolute inset-0 w-[initial] h-[initial]">
                      <picture className="max-w-full block">
                        <img
                          className="absolute inset-0 box-border block min-w-full max-w-full min-h-full max-h-full m-auto w-0 h-0 border-none"
                          src={data?.origin_cover}
                          alt={data?.author?.nickname}
                        />
                      </picture>
                    </span>
                  </div>
                  <div className="absolute left-0 top-0 w-full h-full ">
                    <div className="w-full h-full">
                      <video
                        loop={true}
                        muted={videoIntractions.isMute}
                        ref={videoRef}
                        onWaiting={() => setVideoIntractions({ ...videoIntractions, isBuffer: true })}
                        onPlay={() => setVideoIntractions({ ...videoIntractions, isBuffer: false })}
                        className="w-full h-full block object-cover"
                        src={data?.play}
                      ></video>
                    </div>
                    {videoIntractions.isBuffer && <svg
                      preserveAspectRatio="none"
                      viewBox="0 0 200 200"
                      width="48"
                      height="48"
                      className="block absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]"
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
                </div>

                <div className="w-full h-max px-[12px] pb-[12px] absolute bottom-0 left-0 flex items-center justify-between pointer-events-auto">
                  <div className="flex items-center">
                    <svg
                      className="css-b82ygf-StyledPlay e19c29qe19 mr-[4px]"
                      width={20}
                      data-e2e=""
                      height={20}
                      viewBox="0 0 48 48"
                      fill="#fff"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M16 10.554V37.4459L38.1463 24L16 10.554ZM12 8.77702C12 6.43812 14.5577 4.99881 16.5569 6.21266L41.6301 21.4356C43.5542 22.6038 43.5542 25.3962 41.6301 26.5644L16.5569 41.7873C14.5577 43.0012 12 41.5619 12 39.223V8.77702Z"
                      />
                    </svg>

                    <strong className="text-[16px] leading-[24px] text-dark-second-primary-text font-semibold">
                      {convertNumberInIntranational(data?.play_count)}
                    </strong>
                  </div>

                  <div onClick={handleVideoAudio} className="flex items-center justify-center opacity-0 group-hover:opacity-[1]">
                    {videoIntractions.isMute ? <svg
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
                        d="M25 10.8685C25 8.47242 22.3296 7.04325 20.3359 8.37236L10.3944 15H6C4.34315 15 3 16.3431 3 18V30C3 31.6568 4.34314 33 6 33H10.3944L20.3359 39.6276C22.3296 40.9567 25 39.5276 25 37.1315V10.8685ZM29.2929 18.1213L35.1716 24L29.2929 29.8787C28.9024 30.2692 28.9024 30.9024 29.2929 31.2929L30.7071 32.7071C31.0976 33.0976 31.7308 33.0976 32.1213 32.7071L38 26.8284L43.8787 32.7071C44.2692 33.0976 44.9024 33.0976 45.2929 32.7071L46.7071 31.2929C47.0976 30.9024 47.0976 30.2692 46.7071 29.8787L40.8284 24L46.7071 18.1213C47.0976 17.7308 47.0976 17.0976 46.7071 16.7071L45.2929 15.2929C44.9024 14.9024 44.2692 14.9024 43.8787 15.2929L38 21.1716L32.1213 15.2929C31.7308 14.9024 31.0976 14.9024 30.7071 15.2929L29.2929 16.7071C28.9024 17.0976 28.9024 17.7308 29.2929 18.1213Z"
                      />
                    </svg> :
                      <svg
                        width={24}
                        data-e2e=""
                        height={24}
                        fill="none"
                        viewBox="0 0 48 48"
                        xmlns="http://www.w3.org/2000/svg"
                        className="flex items-center justify-center scale-[2]"
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

                    }
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
      <div>
        <div className="font-[400] pt-[4px] pb-[8px]">
          <div className="overflow-hidden line-clamp-2 mt-[4px] text-ellipsis break-words cursor-pointer">
            <div className="text-[16px] leading-[21px] break-words">
              <span className="inline font-[400]">
                {data?.title?.split("#")[0]}
              </span>

              {data?.title?.split("#").map((hashTag, i) => {
                if (i === 0) return;
                return (
                  <>
                    <Link
                      key={i}
                      className="inline-block text-second-primary-text dark:text-dark-second-primary-text ml-[5px]"
                    >
                      <strong className="font-semibold text-fourth-primary-text dark:text-dark-fourth-primary-text w-max">
                        #{hashTag}
                      </strong>
                    </Link>
                    <span className="font-semibold"> </span>
                  </>
                );
              })}
            </div>
          </div>

          <div className="flex items-center justify-between leading-[21px] text-[16px] mt-[8px]">
            <div className="flex items-center">
              <Link>
                <span className="inline-block box-border relative w-[24px] h-[24px] rounded-[50%] overflow-hidden">
                  <img
                    className="w-full h-full object-cover"
                    src={data?.author?.avatar}
                    alt={data?.author?.nickname}
                  />
                </span>
              </Link>
              <Link>
                <p className="mr-[4px] ml-[4px] max-w-[150px] overflow-hidden text-ellipsis">
                  {data?.author?.unique_id || "tiktok"}
                </p>
              </Link>
            </div>
            <div className="flex items-center flex-shrink-0 text-[20px] cursor-pointer text-sixth-primary-text dark:text-dark-sixth-primary-text">
              <svg
                fill="currentColor"
                viewBox="0 0 48 48"
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
              >
                <path d="M24 11.84c-4.42-4.17-10.84-4.07-14.97 0a10.9 10.9 0 0 0 0 15.58l13.4 13.18c.87.87 2.27.87 3.15 0l13.4-13.18a10.9 10.9 0 0 0 0-15.58c-4.14-4.07-10.56-4.17-14.98 0Zm-2.53 3.86.06.07L24 18.2l2.47-2.43.06-.07c2.74-3.17 6.77-3.13 9.29-.65a6.4 6.4 0 0 1 0 9.16L24 35.84 12.18 24.21a6.4 6.4 0 0 1 0-9.16c2.52-2.48 6.55-2.52 9.3.65Z" />
              </svg>
              <strong className="text-[16px] font-semibold ml-[2px]">
                {convertNumberInIntranational(data?.digg_count)}
              </strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Explore = () => {

  const dispatch = useDispatch();
  const categoriContainer = useRef(null);
  const { isBodyScrolling, loadMoreData } = useSelector(state => state.app)

  const [leftCategoriScrollBtn, setLeftCategoriScrollBtn] = useState(false);
  const [rightCategoriScrollBtn, setRightCategoriScrollBtn] = useState(true);

  const [cursor, setCursor] = useState(0);
  const [keywords, setKeywords] = useState('Singing & Danching')

  const { reels, response, loading } = useSelector((state) => state.tiktok);


  const handleRightScrollBtn = () => {
    categoriContainer.current.scrollLeft = categoriContainer.current.scrollLeft + 300;
    setLeftCategoriScrollBtn(true);

    if (categoriContainer.current.scrollLeft + categoriContainer.current.offsetWidth >= 1851) {
      setRightCategoriScrollBtn(false);
    }
  }

  const handleLeftScrollBtn = () => {
    categoriContainer.current.scrollLeft = categoriContainer.current.scrollLeft - 300;
    setRightCategoriScrollBtn(true);

    if (categoriContainer.current.scrollLeft <= 300) {
      setLeftCategoriScrollBtn(false);
    }
  }

  const handleCategoriBtnClick = (categori) => {
    setKeywords(categori)
  }

  if (loadMoreData && !loading) {
    if (response?.data?.hasMore) dispatch(getReelsByKeyword({ keywords, cursor }));
  }

  useEffect(() => {
    dispatch(setReels({ reels: [] }))
    dispatch(getReelsByKeyword({ keywords, cursor }));
  }, [keywords])

  useEffect(() => {
    if (response?.data?.hasMore) setCursor(response?.data?.cursor)
  }, [response])


  return (
    <div className="w-full flex flex-col flex-auto min-h-[calc(100vh-59px)] mx-auto my-0 box-border pt-[96px] pr-[48px] pb-[32px] pl-[48px] max-w-[1328px]">
      <div className="flex flex-auto flex-col">
        <div className={`${isBodyScrolling ? 'mmd:top-[-24px]' : 'mmd:top-[60px]'} top-0 left-[10px] right-[10px] mmmd:max-w-[calc(100vw-90px)] mmd:max-w-[calc(100vw-330px)] mmmd:left-[unset] mmmd:right-[unset] fixed z-[1] h-[84px]  bg-frist-primary-bg dark:bg-dark-frist-primary-bg transition-[top] duration-[0.4s] ease-linear`}>

          <div className={`absolute z-[1] left-0 cursor-pointer top-[28px] ${!leftCategoriScrollBtn ? 'mmmd:hidden' : 'block'}`}>
            <div onClick={handleLeftScrollBtn}
              className="absolute z-[1] top-[5px] w-[32px] h-[32px] rounded-[50%] bg-third-primary-icon-btn 
            dark:bg-dark-third-primary-icon-btn text-[16px] pt-[8px] pl-[11px] cursor-pointer hidden mmmd:block "
            >
              <svg
                fill="currentColor"
                viewBox="0 0 48 48"
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                className="fill-third-primary-text dark:fill-dark-third-primary-text rotate-[180deg]"
              >
                <path d="M39.88 24 26.7 10.83a1 1 0 0 1 0-1.41l2.83-2.83a1 1 0 0 1 1.41 0L47.3 22.94a1.5 1.5 0 0 1 0 2.12L30.95 41.42a1 1 0 0 1-1.41 0l-2.83-2.83a1 1 0 0 1 0-1.42L39.88 24Z" />
              </svg>
            </div>
            <div className="absolute top-0 w-[80px] h-[42px] left-0 shadow-btn-bg-left"></div>
          </div>

          <div
            className="w-full flex box-border overflow-x-scroll pt-[28px] pb-[16px] whitespace-nowrap no-scrollbar scroll-smooth"
            ref={categoriContainer}
          >
            {exploresCategori.map((elem) => (
              <CategoriBtn handleCategoriBtnClick={handleCategoriBtnClick} title={elem} isActive={elem === keywords} key={elem} />
            ))}
          </div>

          <div className={`absolute z-[1] right-0 cursor-pointer top-[28px] ${!rightCategoriScrollBtn ? 'hidden' : 'block'}`}>
            <div onClick={handleRightScrollBtn}
              className="absolute z-[1] top-[5px] w-[32px] h-[32px] rounded-[50%] bg-third-primary-icon-btn right-0
            dark:bg-dark-third-primary-icon-btn text-[16px] pt-[8px] pl-[5px] cursor-pointer hidden mmmd:block"
            >
              <svg
                fill="currentColor"
                viewBox="0 0 48 48"
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                className="fill-third-primary-text dark:fill-dark-third-primary-text"
              >
                <path d="M39.88 24 26.7 10.83a1 1 0 0 1 0-1.41l2.83-2.83a1 1 0 0 1 1.41 0L47.3 22.94a1.5 1.5 0 0 1 0 2.12L30.95 41.42a1 1 0 0 1-1.41 0l-2.83-2.83a1 1 0 0 1 0-1.42L39.88 24Z" />
              </svg>
            </div>
            <div className="absolute top-0 w-[80px] h-[42px] right-0 shadow-btn-bg-right"></div>
          </div>

        </div>

        <div className="w-full">
          <div className=" grid gap-y-[24px] gap-x-[16px] grid-cols-[repeat(auto-fill,_minmax(304px,_1fr))] 3xl:grid-cols-[repeat(auto-fill,_minmax(256px,_1fr))] md:grid-cols-[repeat(auto-fill,_minmax(259px,_1fr))]">
            {
              reels?.map((data, i) => <ExploreCard key={i} data={data} />)
            }
          </div>


          {loading && <svg
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
      </div>
    </div>
  );
};

export default Explore;
