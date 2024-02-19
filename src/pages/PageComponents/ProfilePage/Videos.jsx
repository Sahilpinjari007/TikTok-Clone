import React from "react";

const Videos = () => {
  return (
    <div className="w-full h-full">
      <div className="flex flex-col items-center justify-center text-center mx-auto">
        <svg
          width={90}
          data-e2e=""
          height={90}
          viewBox="0 0 72 72"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
          style={{ fillOpacity: "0.34" }}
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M16.6276 20.2241C16.6276 30.8074 25.2394 39.4192 35.8227 39.4192C46.4059 39.4192 55.0178 30.8074 55.0178 20.2241C55.0178 9.64086 46.4059 1.02899 35.8227 1.02899C25.2394 1.02899 16.6276 9.64086 16.6276 20.2241ZM19.7405 20.2244C19.7405 11.3583 26.9568 4.14202 35.8229 4.14202C44.689 4.14202 51.9053 11.3583 51.9053 20.2244C51.9053 29.0905 44.689 36.3068 35.8229 36.3068C26.9568 36.3068 19.7405 29.0905 19.7405 20.2244Z"
          />
          <path d="M6.69813 70.9717C6.56844 70.9717 6.43874 70.9562 6.30904 70.9199C5.47898 70.7072 4.97576 69.8563 5.19365 69.0263C8.79922 55.045 21.3954 45.2762 35.8228 45.2762C50.2503 45.2762 62.8465 55.0398 66.4572 69.0211C66.6699 69.8512 66.1719 70.702 65.3366 70.9147C64.5014 71.1326 63.6558 70.6293 63.4379 69.7941C60.1851 57.1876 48.8288 48.3837 35.8176 48.3837C22.8117 48.3837 11.4554 57.1876 8.19743 69.7941C8.02104 70.5048 7.39331 70.9717 6.69813 70.9717Z" />
        </svg>
        <p className="text-[24px] leading-[30px] font-bold mt-[24px] text-second-primary-text dark:text-dark-second-primary-text">Upload your first video</p>
        <p className="text-[16px] leading-[21px] font-[400] mt-[8px] text-fifth-primary-text dark:text-dark-fifth-primary-text">Your videos will appear here</p>
      </div>
    </div>
  );
};

export default Videos;
