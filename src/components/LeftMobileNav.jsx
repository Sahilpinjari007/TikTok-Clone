import { React, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { setIsOpenNav } from "../features/menul/menulSlice";

const LeftMobileNav = () => {
  const isOpenNav = useSelector((state) => state.app.isOpenNav);
  const dispatch = useDispatch();

  return (
    <div
      className={`z-[999999] fixed ${
        isOpenNav ? "left-0" : "left-[-100%]"
      } top-0 w-full h-full max-h-[calc(100%-52.8px)] transition-all duration-[.3s] inset-0`}
      onClick={() => dispatch(setIsOpenNav(!isOpenNav))}
    >
      <div className="box-border h-full w-[240px] overflow-y-auto bg-frist-primary-bg dark:bg-dark-frist-primary-bg">
        <div className="py-[5px] mssm:px-[20px]  border-solid border-second-primary-border dark:border-dark-second-primary-border w-full h-full p-0 px-[8px]  border-r pt-[20px] pr-0 pb-[26px] pl-[8px] ">
          <div className="pt-[12px] pb-[26px] p-0">
            <nav>
              <ul className="flex justify-around flex-col">
                <li>
                  <div>
                    <NavLink
                      to={"/"}
                      className="relative w-full h-max flex items-center justify-start p-[8px] box-border text-[32px] transition-colors duration-[200ms] ease-in-out hover:bg-second-primary-icon-btn dark:hover:bg-dark-second-primary-icon-btn rounded-[4px]"
                    >
                      <div className="flex items-center justify-center mb-[20px]">
                        <svg
                          width="29px"
                          height="32px"
                          viewBox="0 0 29 32"
                          version="1.1"
                          xmlns="http://www.w3.org/2000/svg"
                          xmlnsXlink="http://www.w3.org/1999/xlink"
                          className="w-[26px]"
                        >
                          <title>编组 2</title>
                          <desc>Created with Sketch.</desc>
                          <g
                            id="页面1"
                            stroke="none"
                            strokeWidth={1}
                            fill="none"
                            fillRule="evenodd"
                          >
                            <g
                              id="编组-2"
                              transform="translate(0.979236, 0.000000)"
                              fillRule="nonzero"
                            >
                              <path
                                d="M10.7907645,12.33 L10.7907645,11.11 C10.3672629,11.0428887 9.93950674,11.0061284 9.51076448,10.9999786 C5.35996549,10.9912228 1.68509679,13.6810205 0.438667694,17.6402658 C-0.807761399,21.5995112 0.663505842,25.9093887 4.07076448,28.28 C1.51848484,25.5484816 0.809799545,21.5720834 2.26126817,18.1270053 C3.71273679,14.6819273 7.05329545,12.4115428 10.7907645,12.33 L10.7907645,12.33 Z"
                                id="路径"
                                fill="#25F4EE"
                              />
                              <path
                                d="M11.0207645,26.15 C13.3415287,26.1468776 15.2491662,24.3185414 15.3507645,22 L15.3507645,1.31 L19.1307645,1.31 C19.0536068,0.877682322 19.0167818,0.439130992 19.0207645,0 L13.8507645,0 L13.8507645,20.67 C13.764798,23.0003388 11.8526853,24.846212 9.52076448,24.85 C8.82390914,24.844067 8.13842884,24.6726969 7.52076448,24.35 C8.33268245,25.4749154 9.63346203,26.1438878 11.0207645,26.15 Z"
                                id="路径"
                                fill="#25F4EE"
                              />
                              <path
                                d="M26.1907645,8.33 L26.1907645,7.18 C24.79964,7.18047625 23.4393781,6.76996242 22.2807645,6 C23.2964446,7.18071769 24.6689622,7.99861177 26.1907645,8.33 L26.1907645,8.33 Z"
                                id="路径"
                                fill="#25F4EE"
                              />
                              <path
                                d="M22.2807645,6 C21.1394675,4.70033161 20.5102967,3.02965216 20.5107645,1.3 L19.1307645,1.3 C19.4909812,3.23268519 20.6300383,4.93223067 22.2807645,6 L22.2807645,6 Z"
                                id="路径"
                                fill="#FE2C55"
                              />
                              <path
                                d="M9.51076448,16.17 C7.51921814,16.1802178 5.79021626,17.544593 5.31721201,19.4791803 C4.84420777,21.4137677 5.74860956,23.4220069 7.51076448,24.35 C6.55594834,23.0317718 6.42106871,21.2894336 7.16162883,19.8399613 C7.90218896,18.3904889 9.39306734,17.4787782 11.0207645,17.48 C11.4547752,17.4854084 11.8857908,17.5527546 12.3007645,17.68 L12.3007645,12.42 C11.8769919,12.3565056 11.4492562,12.3230887 11.0207645,12.32 L10.7907645,12.32 L10.7907645,16.32 C10.3736368,16.2081544 9.94244934,16.1576246 9.51076448,16.17 Z"
                                id="路径"
                                fill="#FE2C55"
                              />
                              <path
                                d="M26.1907645,8.33 L26.1907645,12.33 C23.61547,12.3250193 21.107025,11.5098622 19.0207645,10 L19.0207645,20.51 C19.0097352,25.7544158 14.7551919,30.0000116 9.51076448,30 C7.56312784,30.0034556 5.66240321,29.4024912 4.07076448,28.28 C6.72698674,31.1368108 10.8608257,32.0771989 14.4914706,30.6505586 C18.1221155,29.2239183 20.5099375,25.7208825 20.5107645,21.82 L20.5107645,11.34 C22.604024,12.8399663 25.1155724,13.6445013 27.6907645,13.64 L27.6907645,8.49 C27.1865925,8.48839535 26.6839313,8.43477816 26.1907645,8.33 Z"
                                id="路径"
                                fill="#FE2C55"
                              />
                              <path
                                d="M19.0207645,20.51 L19.0207645,10 C21.1134087,11.5011898 23.6253623,12.3058546 26.2007645,12.3 L26.2007645,8.3 C24.6792542,7.97871265 23.3034403,7.17147491 22.2807645,6 C20.6300383,4.93223067 19.4909812,3.23268519 19.1307645,1.3 L15.3507645,1.3 L15.3507645,22 C15.2751521,23.8467664 14.0381991,25.4430201 12.268769,25.9772302 C10.4993389,26.5114403 8.58570942,25.8663815 7.50076448,24.37 C5.73860956,23.4420069 4.83420777,21.4337677 5.30721201,19.4991803 C5.78021626,17.564593 7.50921814,16.2002178 9.50076448,16.19 C9.934903,16.1938693 10.3661386,16.2612499 10.7807645,16.39 L10.7807645,12.39 C7.0223379,12.4536691 3.65653929,14.7319768 2.20094561,18.1976761 C0.745351938,21.6633753 1.47494493,25.6617476 4.06076448,28.39 C5.66809542,29.4755063 7.57158782,30.0378224 9.51076448,30 C14.7551919,30.0000116 19.0097352,25.7544158 19.0207645,20.51 Z"
                                id="路径"
                                className="fill-black dark:fill-white"
                              />
                            </g>
                          </g>
                        </svg>

                        <svg
                          width="97px"
                          height="22px"
                          viewBox="0 0 97 22"
                          version="1.1"
                          xmlns="http://www.w3.org/2000/svg"
                          xmlnsXlink="http://www.w3.org/1999/xlink"
                          className="w-[88px] ml-[4px] relative top-[3px] "
                        >
                          <title>编组</title>
                          <desc>Created with Sketch.</desc>
                          <g
                            id="页面1"
                            stroke="none"
                            strokeWidth={1}
                            fill="none"
                            fillRule="evenodd"
                          >
                            <g
                              id="编组"
                              transform="translate(0.770000, 0.280000)"
                              fillRule="nonzero"
                            >
                              <polygon
                                id="路径"
                                className="fill-black dark:fill-white"
                                points="3.55271368e-15 0.06 16.12 0.06 14.64 4.72 10.46 4.72 10.46 21.72 5.23 21.72 5.23 4.72 0.01 4.72"
                              />
                              <polygon
                                id="路径"
                                className="fill-black dark:fill-white"
                                points="42.52 0.06 59.01 0.06 57.53 4.72 52.99 4.72 52.99 21.72 47.77 21.72 47.77 4.72 42.53 4.72"
                              />
                              <polygon
                                id="路径"
                                className="fill-black dark:fill-white"
                                points="17.1 6.95 22.27 6.95 22.27 21.72 17.14 21.72"
                              />
                              <polygon
                                id="路径"
                                className="fill-black dark:fill-white"
                                points="24.32 0 29.48 0 29.48 10.09 34.6 5.09 40.76 5.09 34.29 11.37 41.54 21.72 35.85 21.72 31.01 14.53 29.48 16.01 29.48 21.72 24.32 21.72"
                              />
                              <polygon
                                id="路径"
                                className="fill-black dark:fill-white"
                                points="79.01 0 84.23 0 84.23 10.09 89.34 5.09 95.5 5.09 89.03 11.37 96.23 21.72 90.54 21.72 85.71 14.53 84.23 16.01 84.23 21.72 79.06 21.72"
                              />
                              <circle
                                id="椭圆形"
                                className="fill-black dark:fill-white"
                                cx="19.69"
                                cy="2.66"
                                r="2.6"
                              />
                              <path
                                d="M58.35,12.88 C58.3515814,8.26657269 61.9006475,4.43009758 66.5,4.07 C66.27,4.07 65.96,4.07 65.73,4.07 C61.0556946,4.34264957 57.4047572,8.21274958 57.4047572,12.895 C57.4047572,17.5772504 61.0556946,21.4473504 65.73,21.72 C65.96,21.72 66.27,21.72 66.5,21.72 C61.8891307,21.3590221 58.3358914,17.5049564 58.35,12.88 Z"
                                id="路径"
                                fill="#25F4EE"
                              />
                              <path
                                d="M68.51,4.04 C68.27,4.04 67.96,4.04 67.73,4.04 C72.31446,4.41865637 75.8423325,8.24992889 75.8423325,12.85 C75.8423325,17.4500711 72.31446,21.2813436 67.73,21.66 C67.96,21.66 68.27,21.66 68.51,21.66 C73.3921972,21.66 77.35,17.7021972 77.35,12.82 C77.35,7.93780281 73.3921972,3.98 68.51,3.98 L68.51,4.04 Z"
                                id="路径"
                                fill="#FE2C55"
                              />
                              <path
                                d="M67.11,17.18 C64.7351756,17.18 62.81,15.2548244 62.81,12.88 C62.81,10.5051756 64.7351756,8.58 67.11,8.58 C69.4848244,8.58 71.41,10.5051756 71.41,12.88 C71.4045016,15.2525432 69.4825432,17.1745016 67.11,17.18 L67.11,17.18 Z M67.11,4.04 C62.2278028,4.04 58.27,7.99780281 58.27,12.88 C58.27,17.7621972 62.2278028,21.72 67.11,21.72 C71.9921972,21.72 75.95,17.7621972 75.95,12.88 C75.95,10.5354862 75.0186455,8.28699764 73.3608239,6.62917605 C71.7030024,4.97135447 69.4545138,4.04 67.11,4.04 Z"
                                id="形状"
                                className="fill-black dark:fill-white"
                              />
                            </g>
                          </g>
                        </svg>
                      </div>
                    </NavLink>
                  </div>
                </li>

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
    </div>
  );
};

export default LeftMobileNav;
