import React from "react";

const Favorites = () => {
  return (
    <div className="w-full h-full">
      <div className="flex flex-col items-center justify-center text-center mx-auto">
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={72}
            height={72}
            fill="currentColor"
          >
            <path
              fill="currentColor"
              d="m36.206 48.785 24.891 18.36V7.676c0-1.317-.406-2.162-.884-2.658-.463-.482-1.25-.903-2.563-.903H14.76c-1.312 0-2.1.421-2.563.903-.478.496-.884 1.34-.884 2.657v59.472l24.892-18.36Zm0 3.835L11.944 70.516a2.331 2.331 0 0 1-3.715-1.877V7.674c0-3.934 2.481-6.646 6.533-6.646H57.65c4.051 0 6.533 2.712 6.533 6.646V68.64a2.331 2.331 0 0 1-3.716 1.877L36.206 52.62Z"
            ></path>
          </svg>
        </div>

        <p className="text-[24px] leading-[30px] font-bold mt-[24px] text-second-primary-text dark:text-dark-second-primary-text">
          Favorite posts
        </p>
        <p className="text-[16px] leading-[21px] font-[400] mt-[8px] text-fifth-primary-text dark:text-dark-fifth-primary-text">
          Your favorite posts will appear here.
        </p>
      </div>
    </div>
  );
};

export default Favorites;
