import { React, useState } from "react";
import { Link, NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <div className="z-[999999] fixed left-[-240px] mmd:left-0 box-border max-h-full h-full bottom-auto w-[240px] overflow-y-auto bg-frist-primary-bg dark:bg-dark-frist-primary-bg transition-transform duration-[.2s]">
      <div className="py-[5px]  mssm:px-[20px]  border-solid border-second-primary-border dark:border-dark-second-primary-border w-full h-full p-0 px-[8px]  border-r pt-[20px] pr-0 pb-[26px] pl-[8px] ">
        <div className="pt-[12px] pb-[26px] p-0">
          <nav>
            <ul className="flex justify-around flex-col">
              <li>
                <div>
                  <NavLink
                    to={"/"}
                    className="relative w-full h-max flex items-center justify-start p-[8px] box-border text-[32px] transition-colors duration-[200ms] ease-in-out hover:bg-second-primary-icon-btn dark:hover:bg-dark-second-primary-icon-btn rounded-[4px]"
                  >
                    {({ isActive }) => (
                      <>
                        <div className="w-[32px] h-[32px] flex items-center justify-center">
                          {isActive ? (
                            <svg
                              width={32}
                              data-e2e=""
                              height={32}
                              viewBox="0 0 48 48"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="rgba(255, 59, 92, 1)"
                            >
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M24.9505 7.84001C24.3975 7.38666 23.6014 7.38666 23.0485 7.84003L6.94846 21.04C6.45839 21.4418 6.2737 22.1083 6.48706 22.705C6.70041 23.3017 7.26576 23.7 7.89949 23.7H10.2311L11.4232 36.7278C11.5409 38.0149 12.6203 39 13.9128 39H21.5C22.0523 39 22.5 38.5523 22.5 38V28.3153C22.5 27.763 22.9477 27.3153 23.5 27.3153H24.5C25.0523 27.3153 25.5 27.763 25.5 28.3153V38C25.5 38.5523 25.9477 39 26.5 39H34.0874C35.3798 39 36.4592 38.0149 36.577 36.7278L37.7691 23.7H40.1001C40.7338 23.7 41.2992 23.3017 41.5125 22.705C41.7259 22.1082 41.5412 21.4418 41.0511 21.04L24.9505 7.84001Z"
                              />
                            </svg>
                          ) : (
                            <svg
                              width={32}
                              data-e2e=""
                              height={32}
                              viewBox="0 0 48 48"
                              fill="rgba(255, 255, 255, .9)"
                              xmlns="http://www.w3.org/2000/svg"
                              className="fill-third-primary-icon-color dark:fill-dark-third-primary-icon-color"
                            >
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M23.0484 7.84003C23.6014 7.38666 24.3975 7.38666 24.9504 7.84001L41.051 21.04C41.5411 21.4418 41.7258 22.1082 41.5125 22.705C41.2991 23.3017 40.7338 23.7 40.1 23.7H37.769L36.5769 36.7278C36.4592 38.0149 35.3798 39 34.0873 39H13.9127C12.6202 39 11.5409 38.0149 11.4231 36.7278L10.231 23.7H7.89943C7.2657 23.7 6.70035 23.3017 6.487 22.705C6.27364 22.1083 6.45833 21.4418 6.9484 21.04L23.0484 7.84003ZM23.9995 10.9397L12.0948 20.7H12.969L14.369 36H22.4994V28.3138C22.4994 27.7616 22.9471 27.3138 23.4994 27.3138H24.4994C25.0517 27.3138 25.4994 27.7616 25.4994 28.3138V36H33.631L35.031 20.7H35.9045L23.9995 10.9397Z"
                              />
                            </svg>
                          )}
                        </div>
                        <span
                          className={`font-semibold text-[18px] leading-[24px] ml-[8px] font-sans ${
                            isActive
                              ? "text-frist-primary-text"
                              : "text-second-primary-text dark:text-dark-second-primary-text"
                          }`}
                        >
                          For You
                        </span>
                      </>
                    )}
                  </NavLink>
                </div>
              </li>

              {/* <li>
                <div>
                  <NavLink
                    to={"/following"}
                    className="relative w-full h-max flex items-center justify-start p-[8px] box-border text-[32px] transition-colors duration-[200ms] ease-in-out  hover:bg-second-primary-icon-btn dark:hover:bg-dark-second-primary-icon-btn rounded-[4px] lg:justify-center"
                  >
                    {({ isActive }) => (
                      <>
                        <div className="w-[32px] h-[32px] flex items-center justify-center p-[4px]">
                          {isActive ? (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width={24}
                              height={24}
                              fill="rgba(255, 59, 92, 1)"
                            >
                              <path d="m17.851 21.44-1.94-1.94H22.5a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-6.59l1.94-1.94a.5.5 0 0 0 0-.706l-.707-.708a.5.5 0 0 0-.707 0l-3.649 3.647a1 1 0 0 0 0 1.414l3.648 3.647a.5.5 0 0 0 .708 0l.707-.708a.5.5 0 0 0 0-.707ZM4.5 7c0-2.76 2.24-5 5-5s5 2.24 5 5-2.24 5-5 5-5-2.24-5-5Z" />
                              <path d="M1 20.72c0-3.26 3.03-7.22 8.5-7.22 1.589 0 2.971.334 4.134.888l-2.03 1.952a3 3 0 0 0-.004 4.321l1.906 1.839H5.5c-3.5 0-4.5 0-4.5-1.78Z" />
                            </svg>
                          ) : (
                            <svg
                              width="1em"
                              height="1em"
                              viewBox="0 0 48 48"
                              xmlns="http://www.w3.org/2000/svg"
                              className="fill-third-primary-icon-color dark:fill-dark-third-primary-icon-color"
                            >
                              <path d="M18.99 4a10 10 0 1 1 0 20 10 10 0 0 1 0-20Zm0 4a6 6 0 1 0 0 12.00A6 6 0 0 0 19 8ZM18.99 27c2.96 0 5.6.58 7.87 1.65l-3.07 3.06a15.38 15.38 0 0 0-4.8-.71C10.9 31 6.3 36.16 6 44c-.02.55-.46 1-1.02 1h-2c-.55 0-1-.45-.98-1C2.33 33.99 8.7 27 19 27ZM35.7 42.88 31.82 39H45a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1H31.82l3.88-3.88a1 1 0 0 0 0-1.41l-1.41-1.42a1 1 0 0 0-1.42 0l-7.3 7.3a2 2 0 0 0 0 2.82l7.3 7.3a1 1 0 0 0 1.42 0l1.41-1.42a1 1 0 0 0 0-1.41Z" />
                            </svg>
                          )}
                        </div>

                        <span
                          className={`font-semibold text-[18px] leading-[24px] ml-[8px] font-sans lg:hidden  ${
                            isActive
                              ? "text-frist-primary-text"
                              : "text-second-primary-text dark:text-dark-second-primary-text"
                          }`}
                        >
                          Following
                        </span>
                      </>
                    )}
                  </NavLink>
                </div>
              </li>

              <li>
                <div>
                  <NavLink
                    to={"/friends"}
                    className="relative w-full h-max flex items-center justify-start p-[8px] box-border text-[32px] transition-colors duration-[200ms] ease-in-out  hover:bg-second-primary-icon-btn dark:hover:bg-dark-second-primary-icon-btn rounded-[4px] lg:justify-center"
                  >
                    {({ isActive }) => (
                      <>
                        <div className="w-[32px] h-[32px] flex items-center justify-center">
                          {isActive ? (
                            <svg
                              width={32}
                              data-e2e=""
                              height={32}
                              viewBox="0 0 48 48"
                              fill="rgba(255, 59, 92, 1)"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M25.5 17C25.5 21.1421 22.1421 24.5 18 24.5C13.8579 24.5 10.5 21.1421 10.5 17C10.5 12.8579 13.8579 9.5 18 9.5C22.1421 9.5 25.5 12.8579 25.5 17Z" />
                              <path d="M7.10396 34.7906C8.78769 30.2189 12.8204 27 18.0009 27C23.1818 27 27.2107 30.2213 28.8958 34.7898C29.3075 35.906 28.6141 37 27.5 37H8.5C7.38629 37 6.69289 35.9067 7.10396 34.7906Z" />
                              <path d="M40.6308 37H32C31.2264 34.1633 30.0098 31.5927 28.144 29.7682C29.5384 28.9406 31.1829 28.5 33 28.5C37.239 28.5 40.536 30.8992 41.9148 35.0108C42.2516 36.0154 41.5423 37 40.6308 37Z" />
                              <path d="M33 26.5C36.0376 26.5 38.5 24.0376 38.5 21C38.5 17.9624 36.0376 15.5 33 15.5C29.9624 15.5 27.5 17.9624 27.5 21C27.5 24.0376 29.9624 26.5 33 26.5Z" />
                            </svg>
                          ) : (
                            <svg
                              width={32}
                              data-e2e=""
                              height={32}
                              viewBox="0 0 48 48"
                              xmlns="http://www.w3.org/2000/svg"
                              className="fill-third-primary-icon-color dark:fill-dark-third-primary-icon-color"
                            >
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M18 12.5C15.5897 12.5 13.5849 14.5018 13.5849 17.0345C13.5849 19.5672 15.5897 21.569 18 21.569C20.4103 21.569 22.4151 19.5672 22.4151 17.0345C22.4151 14.5018 20.4103 12.5 18 12.5ZM10.5849 17.0345C10.5849 12.9017 13.8766 9.5 18 9.5C22.1234 9.5 25.4151 12.9017 25.4151 17.0345C25.4151 21.1673 22.1234 24.569 18 24.569C13.8766 24.569 10.5849 21.1673 10.5849 17.0345ZM18 29.8793C14.0801 29.8793 10.7403 32.5616 9.69697 36.2673C9.5473 36.7989 9.03833 37.1708 8.49337 37.0811L7.50662 36.9189C6.96166 36.8292 6.58837 36.3131 6.72325 35.7776C8.00732 30.6788 12.5509 26.8793 18 26.8793C23.449 26.8793 27.9927 30.6788 29.2767 35.7776C29.4116 36.3131 29.0383 36.8292 28.4934 36.9189L27.5066 37.0811C26.9617 37.1708 26.4527 36.7989 26.303 36.2673C25.2597 32.5616 21.9199 29.8793 18 29.8793Z"
                              />
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M33 31.5371C32.2445 31.5371 31.5198 31.668 30.8447 31.9093C30.3246 32.0951 29.7189 31.9243 29.4549 31.4392L28.9769 30.5608C28.713 30.0757 28.8907 29.463 29.4009 29.2516C30.513 28.791 31.7285 28.5371 33 28.5371C37.4554 28.5371 41.1594 31.6303 42.2706 35.7812C42.4135 36.3147 42.0386 36.8308 41.4935 36.9196L40.5065 37.0804C39.9614 37.1692 39.4546 36.7956 39.2894 36.2686C38.4217 33.5 35.91 31.5371 33 31.5371Z"
                              />
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M33 18.5C31.6193 18.5 30.5 19.6193 30.5 21C30.5 22.3807 31.6193 23.5 33 23.5C34.3807 23.5 35.5 22.3807 35.5 21C35.5 19.6193 34.3807 18.5 33 18.5ZM27.5 21C27.5 17.9624 29.9624 15.5 33 15.5C36.0376 15.5 38.5 17.9624 38.5 21C38.5 24.0376 36.0376 26.5 33 26.5C29.9624 26.5 27.5 24.0376 27.5 21Z"
                              />
                            </svg>
                          )}
                        </div>
                        <span
                          className={`font-semibold text-[18px] leading-[24px] ml-[8px] font-sans lg:hidden  ${
                            isActive
                              ? "text-frist-primary-text"
                              : "text-second-primary-text dark:text-dark-second-primary-text"
                          }`}
                        >
                          Friends
                        </span>
                      </>
                    )}
                  </NavLink>
                </div>
              </li> */}

              <li>
                <div>
                  <NavLink
                    to={"/explore"}
                    className="relative w-full h-max flex items-center justify-start p-[8px] box-border text-[32px] transition-colors duration-[200ms] ease-in-out  hover:bg-second-primary-icon-btn dark:hover:bg-dark-second-primary-icon-btn rounded-[4px] "
                  >
                    {({ isActive }) => (
                      <>
                        <div className="w-[32px] h-[32px] flex items-center justify-center">
                          {isActive ? (
                            <svg
                              fill="rgba(255, 59, 92, 1)"
                              width="1em"
                              height="1em"
                              viewBox="0 0 48 48"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M24 40.5a16.5 16.5 0 1 0 0-33 16.5 16.5 0 0 0 0 33Zm4.43-14.54c-.12.6-.49 1.12-1.01 1.44l-8.88 5.37a.65.65 0 0 1-.98-.69l2.01-10.18c.12-.6.49-1.12 1.01-1.44l8.88-5.37a.65.65 0 0 1 .98.69l-2.01 10.18Z"
                              />
                              <path d="m21.92 26.89 3.4-2.05.76-3.9-3.4 2.06-.76 3.89Z" />
                            </svg>
                          ) : (
                            <svg
                              width="1em"
                              height="1em"
                              viewBox="0 0 48 48"
                              xmlns="http://www.w3.org/2000/svg"
                              className="fill-third-primary-icon-color dark:fill-dark-third-primary-icon-color"
                            >
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M24 37.4a13.4 13.4 0 1 0 0-26.8 13.4 13.4 0 0 0 0 26.8ZM40.5 24a16.5 16.5 0 1 1-33 0 16.5 16.5 0 0 1 33 0Z"
                              ></path>
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M27.13 27.18a2 2 0 0 0 .93-1.32l1.84-9.33a.6.6 0 0 0-.9-.63l-8.14 4.92a2 2 0 0 0-.92 1.32l-1.84 9.33c-.1.52.45.9.9.63l8.13-4.92Zm-5.04-.45 3.11-1.89.7-3.57-3.1 1.89-.7 3.57Z"
                              ></path>
                            </svg>
                          )}
                        </div>
                        <span
                          className={`font-semibold text-[18px] leading-[24px] ml-[8px] font-sans  ${
                            isActive
                              ? "text-frist-primary-text"
                              : "text-second-primary-text dark:text-dark-second-primary-text"
                          }`}
                        >
                          Explore
                        </span>
                      </>
                    )}
                  </NavLink>
                </div>
              </li>

              {/* <li>
                <div>
                  <NavLink
                    to={"/live"}
                    className="relative w-full h-max flex items-center justify-start p-[8px] box-border text-[32px] transition-colors duration-[200ms] ease-in-out  hover:bg-second-primary-icon-btn dark:hover:bg-dark-second-primary-icon-btn rounded-[4px] lg:justify-center"
                  >
                    {({ isActive }) => (
                      <>
                        <div className="w-[32px] h-[32px] flex items-center justify-center">
                          {isActive ? (
                            <svg
                              width={32}
                              data-e2e=""
                              height={32}
                              viewBox="0 0 48 48"
                              fill="rgba(255, 59, 92, 1)"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M6.5 17.5714C6.5 14.7292 8.86029 12.5 11.6782 12.5H27.8621C30.6799 12.5 33.0402 14.7292 33.0402 17.5714V18.6843L36.745 15.9435C37.6399 15.2815 38.8324 15.1731 39.8318 15.6537C40.8365 16.1369 41.5 17.1486 41.5 18.2857V29.7143C41.5 30.8514 40.8365 31.8631 39.8318 32.3463C38.8324 32.8269 37.6399 32.7185 36.745 32.0565L33.0402 29.3158V30.4286C33.0402 33.2708 30.6799 35.5 27.8621 35.5H11.6782C8.86029 35.5 6.5 33.2708 6.5 30.4286V17.5714Z" />
                              <path
                                d="M23.25 23.134C23.9167 23.5189 23.9167 24.4811 23.25 24.866L17.25 28.3301C16.5833 28.715 15.75 28.2339 15.75 27.4641L15.75 20.5359C15.75 19.7661 16.5833 19.285 17.25 19.6699L23.25 23.134Z"
                                fill="white"
                              />
                            </svg>
                          ) : (
                            <svg
                              width={32}
                              data-e2e=""
                              height={32}
                              viewBox="0 0 32 32"
                              xmlns="http://www.w3.org/2000/svg"
                              className="fill-third-primary-icon-color dark:fill-dark-third-primary-icon-color"
                            >
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M7.78511 10.3334C6.95518 10.3334 6.33301 10.9792 6.33301 11.7143V20.2858C6.33301 21.0209 6.95518 21.6667 7.78511 21.6667H18.5744C19.4043 21.6667 20.0265 21.0209 20.0265 20.2858V17.5602C20.0265 17.1826 20.2392 16.8372 20.5763 16.6672C20.9135 16.4973 21.3177 16.5317 21.6212 16.7563L25.6663 19.7488V12.2513L21.6212 15.2439C21.3177 15.4684 20.9135 15.5029 20.5763 15.3329C20.2392 15.1629 20.0265 14.8175 20.0265 14.4399V11.7143C20.0265 10.9792 19.4043 10.3334 18.5744 10.3334H7.78511ZM25.6855 12.2371C25.6831 12.2388 25.6839 12.2383 25.6839 12.2383L25.6855 12.2371ZM25.6716 12.2177C25.673 12.2212 25.6746 12.2243 25.6763 12.2269C25.6798 12.2324 25.6834 12.2355 25.6855 12.2371L25.6874 12.2383C25.6874 12.2383 25.6865 12.238 25.6839 12.2383M4.33301 11.7143C4.33301 9.81952 5.90653 8.33337 7.78511 8.33337H18.5744C20.453 8.33337 22.0265 9.81953 22.0265 11.7143V12.4562L24.4963 10.629C25.0929 10.1877 25.8879 10.1155 26.5542 10.4359C27.224 10.758 27.6663 11.4325 27.6663 12.1905V19.8096C27.6663 20.5676 27.224 21.2421 26.5542 21.5642C25.888 21.8846 25.0929 21.8124 24.4963 21.371L22.0265 19.5439V20.2858C22.0265 22.1806 20.453 23.6667 18.5744 23.6667H7.78511C5.90653 23.6667 4.33301 22.1806 4.33301 20.2858V11.7143Z"
                              />
                              <path d="M15 15.134C15.6667 15.5189 15.6667 16.4811 15 16.866L12 18.5981C11.3333 18.983 10.5 18.5019 10.5 17.7321L10.5 14.2679C10.5 13.4981 11.3333 13.017 12 13.4019L15 15.134Z" />
                            </svg>
                          )}
                        </div>
                        <span
                          className={`font-semibold text-[18px] leading-[24px] ml-[8px] font-sans lg:hidden  ${
                            isActive
                              ? "text-frist-primary-text"
                              : "text-second-primary-text dark:text-dark-second-primary-text"
                          }`}
                        >
                          LIVE
                        </span>
                      </>
                    )}
                  </NavLink>
                </div>
              </li>

              <li>
                <div>
                  <NavLink
                    to={"/profile"}
                    className="relative w-full h-max flex items-center justify-start p-[8px] box-border text-[32px] transition-colors duration-[200ms] ease-in-out  hover:bg-second-primary-icon-btn dark:hover:bg-dark-second-primary-icon-btn rounded-[4px] lg:justify-center"
                  >
                    {({ isActive }) => (
                      <>
                        <div className="w-[32px] h-[32px] flex items-center justify-center p[4px]">
                          {isActive ? (
                            <svg
                              width={24}
                              data-e2e=""
                              height={24}
                              viewBox="0 0 48 48"
                              fill="rgba(255, 59, 92, 1)"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M24.0002 3C17.9251 3 13.0002 7.92487 13.0002 14C13.0002 20.0751 17.9251 25 24.0002 25C30.0754 25 35.0002 20.0751 35.0002 14C35.0002 7.92487 30.0754 3 24.0002 3ZM10.4885 44C8.69328 44 7.28076 42.4175 7.8388 40.7112C10.0625 33.9118 16.4577 29 24 29C31.5424 29 37.9375 33.9118 40.1612 40.7112C40.7193 42.4175 39.3067 44 37.5115 44H10.4885Z"
                              />
                            </svg>
                          ) : (
                            <svg
                              width="24"
                              data-e2e=""
                              height="24"
                              viewBox="0 0 48 48"
                              xmlns="http://www.w3.org/2000/svg"
                              className="fill-third-primary-icon-color dark:fill-dark-third-primary-icon-color"
                            >
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M24.0003 7C20.1343 7 17.0003 10.134 17.0003 14C17.0003 17.866 20.1343 21 24.0003 21C27.8663 21 31.0003 17.866 31.0003 14C31.0003 10.134 27.8663 7 24.0003 7ZM13.0003 14C13.0003 7.92487 17.9252 3 24.0003 3C30.0755 3 35.0003 7.92487 35.0003 14C35.0003 20.0751 30.0755 25 24.0003 25C17.9252 25 13.0003 20.0751 13.0003 14ZM24.0003 33C18.0615 33 13.0493 36.9841 11.4972 42.4262C11.3457 42.9573 10.8217 43.3088 10.2804 43.1989L8.32038 42.8011C7.77914 42.6912 7.4266 42.1618 7.5683 41.628C9.49821 34.358 16.1215 29 24.0003 29C31.8792 29 38.5025 34.358 40.4324 41.628C40.5741 42.1618 40.2215 42.6912 39.6803 42.8011L37.7203 43.1989C37.179 43.3088 36.6549 42.9573 36.5035 42.4262C34.9514 36.9841 29.9391 33 24.0003 33Z"
                              ></path>
                            </svg>
                          )}
                        </div>
                        <span
                          className={`font-semibold text-[18px] leading-[24px] ml-[8px] font-sans lg:hidden  ${
                            isActive
                              ? "text-frist-primary-text"
                              : "text-second-primary-text dark:text-dark-second-primary-text"
                          }`}
                        >
                          Profile
                        </span>
                      </>
                    )}
                  </NavLink>
                </div>
              </li> */}
            </ul>
          </nav>
        </div>

        <div className="w-full py-[16px] text-[14px] leading-[18px] font-semibold relative text-fifth-primary-text dark:text-dark-fifth-primary-text border-t border-second-primary-border dark:border-dark-second-primary-border border-solid">
          <div>
            <h2 className="px-[8px] mb-[8px] text-[14px] leading-[18px] font-semibold">
              Following accounts
            </h2>
            <p className="font-[400] text-[14px] leading-[18px] px-[8px] text-third-primary-text dark:text-dark-third-primary-text">
              Accounts you follow will appear here{" "}
            </p>
          </div>
        </div>

        <div className="relative pt-[16px] pl-[8px] border-t border-second-primary-border dark:border-dark-second-primary-border border-solid">
          <div>
            <div className="mb-[8px]">
              <Link className="dark:text-dark-third-primary-text text-third-primary-text font-semibold text-[12px] inline-block mr-[6px] mt-[5px] hover:underline">
                About
              </Link>
              <Link className="dark:text-dark-third-primary-text text-third-primary-text font-semibold text-[12px] inline-block mr-[6px] mt-[5px] hover:underline">
                Newsroom
              </Link>
              <Link className="dark:text-dark-third-primary-text text-third-primary-text font-semibold text-[12px] inline-block mr-[6px] mt-[5px] hover:underline">
                Contact
              </Link>
              <Link className="dark:text-dark-third-primary-text text-third-primary-text font-semibold text-[12px] inline-block mr-[6px] mt-[5px] hover:underline">
                Careers
              </Link>
            </div>

            <div className="mb-[8px]">
              <Link className="dark:text-dark-third-primary-text text-third-primary-text font-semibold text-[12px] inline-block mr-[6px] mt-[5px] hover:underline">
                TikTok for Good
              </Link>
              <Link className="dark:text-dark-third-primary-text text-third-primary-text font-semibold text-[12px] inline-block mr-[6px] mt-[5px] hover:underline">
                Advertise
              </Link>
              <Link className="dark:text-dark-third-primary-text text-third-primary-text font-semibold text-[12px] inline-block mr-[6px] mt-[5px] hover:underline">
                TikTok LIVE Creator Networks
              </Link>
              <Link className="dark:text-dark-third-primary-text text-third-primary-text font-semibold text-[12px] inline-block mr-[6px] mt-[5px] hover:underline">
                Developers
              </Link>
              <Link className="dark:text-dark-third-primary-text text-third-primary-text font-semibold text-[12px] inline-block mr-[6px] mt-[5px] hover:underline">
                Transparency
              </Link>
              <Link className="dark:text-dark-third-primary-text text-third-primary-text font-semibold text-[12px] inline-block mr-[6px] mt-[5px] hover:underline">
                TikTok Rewards
              </Link>
              <Link className="dark:text-dark-third-primary-text text-third-primary-text font-semibold text-[12px] inline-block mr-[6px] mt-[5px] hover:underline">
                TikTok Embeds
              </Link>
            </div>

            <div className="mb-[8px]">
              <Link className="dark:text-dark-third-primary-text text-third-primary-text font-semibold text-[12px] inline-block mr-[6px] mt-[5px] hover:underline">
                Help
              </Link>
              <Link className="dark:text-dark-third-primary-text text-third-primary-text font-semibold text-[12px] inline-block mr-[6px] mt-[5px] hover:underline">
                Safety
              </Link>
              <Link className="dark:text-dark-third-primary-text text-third-primary-text font-semibold text-[12px] inline-block mr-[6px] mt-[5px] hover:underline">
                Terms
              </Link>
              <Link className="dark:text-dark-third-primary-text text-third-primary-text font-semibold text-[12px] inline-block mr-[6px] mt-[5px] hover:underline">
                Privacy Policy
              </Link>
              <Link className="dark:text-dark-third-primary-text text-third-primary-text font-semibold text-[12px] inline-block mr-[6px] mt-[5px] hover:underline">
                Privacy Center
              </Link>
              <Link className="dark:text-dark-third-primary-text text-third-primary-text font-semibold text-[12px] inline-block mr-[6px] mt-[5px] hover:underline">
                Creator Portal
              </Link>
              <Link className="dark:text-dark-third-primary-text text-third-primary-text font-semibold text-[12px] inline-block mr-[6px] mt-[5px] hover:underline">
                Community Guildelines
              </Link>
            </div>

            <span className="text-third-primary-text dark:text-dark-third-primary-text font-semibold text-[12px] leading-[16px] inline-block mr-[6px] mt-[5px]">
              © 2024 TikTok
            </span>
          </div>
        </div>

        {/* <div className="absolute px-[4px] top-0 opacity-1 right-0 origin-top-right transition-opacity  duration-[0.5s] ease-linear w-max h-full">
          <div className="w-[6px] h-full rounded-[3px] bg-first-primary-icon-btn dark:bg-dark-second-primary-btn"></div>
        </div> */}
      </div>
    </div>
  );
};

export default NavBar;
