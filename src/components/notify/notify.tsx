export default function Notify() {
  return (
    <div className="absolute top-[50px] left-[-280px]">
      <div className="max-w-full text-sm rounded border shadow-sm pointer-events-auto bg-clip-padding w-80">
        <div className="flex items-center px-3 py-2 text-gray-500 bg-gray-100 border-b-2 rounded-t bg-clip-padding">
          <svg
            className="mr-2 text-lg rounded select-none"
            width="20"
            height="20"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 54 33"
          >
            <path
              fill="#06B6D4"
              fill-rule="evenodd"
              d="M27 0c-7.2 0-11.7 3.6-13.5 10.8 2.7-3.6 5.85-4.95 9.45-4.05 2.054.513 3.522 2.004 5.147 3.653C30.744 13.09 33.808 16.2 40.5 16.2c7.2 0 11.7-3.6 13.5-10.8-2.7 3.6-5.85 4.95-9.45 4.05-2.054-.513-3.522-2.004-5.147-3.653C36.756 3.11 33.692 0 27 0zM13.5 16.2C6.3 16.2 1.8 19.8 0 27c2.7-3.6 5.85-4.95 9.45-4.05 2.054.514 3.522 2.004 5.147 3.653C17.244 29.29 20.308 32.4 27 32.4c7.2 0 11.7-3.6 13.5-10.8-2.7 3.6-5.85 4.95-9.45 4.05-2.054-.513-3.522-2.004-5.147-3.653C23.256 19.31 20.192 16.2 13.5 16.2z"
              clip-rule="evenodd"
            />
          </svg>
          <strong className="mr-auto">Tailwind</strong>
          <small>11 mins ago</small>
          <button
            type="button"
            className="box-content p-1 ml-3 -mr-1 text-black rounded opacity-50 hover:opacity-100"
          >
            <svg
              className="w-5 h-5"
              xmlns="http://www.w3.org/2000/svg"
              width="192"
              height="192"
              fill="#000000"
              viewBox="0 0 256 256"
            >
              <rect width="256" height="256" fill="none"></rect>
              <line
                x1="200"
                y1="56"
                x2="56"
                y2="200"
                stroke="#000000"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="24"
                fill="none"
              ></line>
              <line
                x1="200"
                y1="200"
                x2="56"
                y2="56"
                stroke="#000000"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="24"
                fill="none"
              ></line>
            </svg>
          </button>
        </div>
        <div className="p-3 bg-white text-black">
          Hello, Tailwind! Bye Bye Boostrap.
        </div>
      </div>
    </div>
  );
}
