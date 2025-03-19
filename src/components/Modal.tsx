import React, { useState } from "react";

interface modalProps {
  children: React.ReactNode;
  title: string;
  isVisible:boolean
  setIsVisible:Function 
}

function Modal({ children, title ,isVisible,setIsVisible}: modalProps) {
//   const [isVisible, setIsVisible] = useState(isVisibleFlag);

  return (
    <>
      <div
        className={`${
          isVisible ? "" : "hidden"
        } bg-gray-100 backdrop-blur-sm bg-opacity-50 w-screen h-screen overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0`}
        onClick={() => setIsVisible(false)}
      >
        <div
          className="min-h-fit z-20 bg-white fixed top-1/2 left-1/2 h-2/3 w-1/3 shadow-lg rounded-xl transform -translate-x-1/2 -translate-y-1/2"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between items-center">
            <p className="p-5 font-bold text-lg">{title}</p>
            <svg
              className="w-3 h-3 m-4 cursor-pointer"
              aria-hidden="true"
              onClick={() => setIsVisible(false)}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
          </div>
            <hr />
          <div className="p-4 ">{children}</div>
        </div>
      </div>
    </>
  );
}

export default Modal;
