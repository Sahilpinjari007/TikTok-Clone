import React from "react";
import { Link, NavLink } from "react-router-dom";

const NavBarMobile = () => {
  return (
    <div className="w-full h-max bottom-0 bg-dark-frist-primary-bg">
      <nav className="w-full h-max">
        <ul className="w-full h-max flex flex-row items-center justify-evenly">
          <li className="w-full">
            <NavLink
              to={"/"}
              className="w-full h-full px-[8px] box-border inline-block"
            >
              {({ isActive }) => (
                <div className="w-full h-full flex flex-col items-start justify-center">
                  <div className="w-max h-max m-auto">
                    {isActive ? (
                      <svg
                        width="32px"
                        data-e2e=""
                        height="32px"
                        viewBox="0 0 48 48"
                        fill="#fff"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M24.9505 7.84001C24.3975 7.38666 23.6014 7.38666 23.0485 7.84003L6.94846 21.04C6.45839 21.4418 6.2737 22.1083 6.48706 22.705C6.70041 23.3017 7.26576 23.7 7.89949 23.7H10.2311L11.4232 36.7278C11.5409 38.0149 12.6203 39 13.9128 39H21.5C22.0523 39 22.5 38.5523 22.5 38V28.3153C22.5 27.763 22.9477 27.3153 23.5 27.3153H24.5C25.0523 27.3153 25.5 27.763 25.5 28.3153V38C25.5 38.5523 25.9477 39 26.5 39H34.0874C35.3798 39 36.4592 38.0149 36.577 36.7278L37.7691 23.7H40.1001C40.7338 23.7 41.2992 23.3017 41.5125 22.705C41.7259 22.1082 41.5412 21.4418 41.0511 21.04L24.9505 7.84001Z"
                        />
                      </svg>
                    ) : (
                      <svg
                        width="32px"
                        data-e2e=""
                        height="32px"
                        viewBox="0 0 48 48"
                        fill="#fff"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M23.0484 7.84003C23.6014 7.38666 24.3975 7.38666 24.9504 7.84001L41.051 21.04C41.5411 21.4418 41.7258 22.1082 41.5125 22.705C41.2991 23.3017 40.7338 23.7 40.1 23.7H37.769L36.5769 36.7278C36.4592 38.0149 35.3798 39 34.0873 39H13.9127C12.6202 39 11.5409 38.0149 11.4231 36.7278L10.231 23.7H7.89943C7.2657 23.7 6.70035 23.3017 6.487 22.705C6.27364 22.1083 6.45833 21.4418 6.9484 21.04L23.0484 7.84003ZM23.9995 10.9397L12.0948 20.7H12.969L14.369 36H22.4994V28.3138C22.4994 27.7616 22.9471 27.3138 23.4994 27.3138H24.4994C25.0517 27.3138 25.4994 27.7616 25.4994 28.3138V36H33.631L35.031 20.7H35.9045L23.9995 10.9397Z"
                        />
                      </svg>
                    )}
                  </div>
                  <span className="inline-block m-auto font-semibold text-[10px] text-center text-dark-second-primary-text opacity-[0.75]">
                    Home
                  </span>
                </div>
              )}
            </NavLink>
          </li>

          <li className="w-full">
            <NavLink
              className="w-full h-full px-[8px] box-border inline-block"
            >
              {({ isActive }) => (
                <div className="w-full min-h-[47px] h-full flex flex-col items-start justify-center relative">
                  <div className="w-max h-max m-auto absolute left-[50%] translate-x-[-50%]">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 75 49"
                      width="75px"
                      height="45px"
                    >
                      <path
                        fill="#D8D8D8"
                        stroke="#979797"
                        strokeWidth="0.5"
                        d="M.25.25h74.5v48.5H.25z"
                        opacity="0.01"
                      />
                      <path
                        fill="#FA2D6C"
                        fillRule="evenodd"
                        d="M23.5 23.3c0-4.48 0-6.72.872-8.432a8 8 0 013.496-3.496C29.58 10.5 31.82 10.5 36.3 10.5h9.9c4.48 0 6.72 0 8.432.872a8 8 0 013.496 3.496C59 16.58 59 18.82 59 23.3v2.4c0 4.48 0 6.72-.872 8.432a8 8 0 01-3.496 3.496c-1.711.872-3.952.872-8.432.872h-9.9c-4.48 0-6.72 0-8.432-.872a8 8 0 01-3.496-3.496C23.5 32.42 23.5 30.18 23.5 25.7v-2.4z"
                        clipRule="evenodd"
                      />
                      <path
                        fill="#20D5EC"
                        fillRule="evenodd"
                        d="M16 23.3c0-4.48 0-6.72.872-8.432a8 8 0 013.496-3.496C22.08 10.5 24.32 10.5 28.8 10.5h9.9c4.48 0 6.72 0 8.432.872a8 8 0 013.496 3.496c.872 1.711.872 3.952.872 8.432v2.4c0 4.48 0 6.72-.872 8.432a8 8 0 01-3.496 3.496c-1.711.872-3.952.872-8.432.872h-9.9c-4.48 0-6.72 0-8.432-.872a8 8 0 01-3.496-3.496C16 32.42 16 30.18 16 25.7v-2.4z"
                        clipRule="evenodd"
                      />
                      <rect
                        width={36}
                        height={28}
                        x="19.5"
                        y="10.5"
                        fill="#fff"
                        rx={8}
                      />
                      <path
                        fill="#161823"
                        fillRule="evenodd"
                        d="M36.5 18.25a.5.5 0 00-.5.5v4.75h-4.75a.5.5 0 00-.5.5v1.5a.5.5 0 00.5.5H36v4.75a.5.5 0 00.5.5H38a.5.5 0 00.5-.5V26h4.75a.5.5 0 00.5-.5V24a.5.5 0 00-.5-.5H38.5v-4.75a.5.5 0 00-.5-.5h-1.5z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>
              )}
            </NavLink>
          </li>

          <li className="w-full">
            <NavLink
              to={"/explore"}
              className="w-full h-full px-[8px] box-border inline-block"
            >
              {({ isActive }) => (
                <div className="w-full h-full flex flex-col items-start justify-center">
                  <div className="w-max h-max m-auto">
                    {isActive ? (
                      <svg
                        width="32px"
                        height="32px"
                        data-e2e=""
                        viewBox="0 0 36 36"
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M18 30.375C24.8345 30.375 30.375 24.8345 30.375 18C30.375 11.1655 24.8345 5.625 18 5.625C11.1655 5.625 5.625 11.1655 5.625 18C5.625 24.8345 11.1655 30.375 18 30.375ZM21.3223 19.4671C21.2331 19.9188 20.9578 20.312 20.5638 20.5503L13.9071 24.5756C13.5424 24.7961 13.0892 24.4788 13.1717 24.0606L14.6776 16.4287C14.7667 15.977 15.042 15.5837 15.436 15.3455L22.0927 11.3202C22.4574 11.0997 22.9106 11.417 22.8281 11.8351L21.3223 19.4671Z"
                        />
                        <path d="M16.4392 20.1662L18.9851 18.6267L19.5611 15.7077L17.0151 17.2473L16.4392 20.1662Z" />
                      </svg>
                    ) : (
                      <svg
                        width="32px"
                        height="32px"
                        data-e2e=""
                        viewBox="0 0 36 36"
                        fill="#fff"
                        xmlns="http://www.w3.org/2000/svg"
                        style={{ fillOpacity: "0.75" }}
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M18 28.0547C23.553 28.0547 28.0547 23.5531 28.0547 18C28.0547 12.4469 23.553 7.94531 18 7.94531C12.4469 7.94531 7.94531 12.4469 7.94531 18C7.94531 23.5531 12.4469 28.0547 18 28.0547ZM30.375 18C30.375 24.8345 24.8345 30.375 18 30.375C11.1655 30.375 5.625 24.8345 5.625 18C5.625 11.1655 11.1655 5.625 18 5.625C24.8345 5.625 30.375 11.1655 30.375 18Z"
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M20.3508 20.3864C20.712 20.1679 20.9645 19.8074 21.0462 19.3932L22.427 12.3948C22.5027 12.0113 22.0871 11.7204 21.7527 11.9226L15.6486 15.6137C15.2874 15.8322 15.0349 16.1928 14.9532 16.6069L13.5724 23.6053C13.4967 23.9888 13.9123 24.2797 14.2467 24.0775L20.3508 20.3864ZM16.5684 20.0442L18.9029 18.6325L19.431 15.9559L17.0965 17.3676L16.5684 20.0442Z"
                        />
                      </svg>
                    )}
                  </div>
                  <span className="inline-block m-auto font-semibold text-[10px] text-center text-dark-second-primary-text opacity-[0.75]">
                    Discover
                  </span>
                </div>
              )}
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default NavBarMobile;
