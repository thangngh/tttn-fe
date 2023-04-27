import { DrawerHeader } from "@/components/mui/CustomSideBar";
import AdminLayout from "@/layouts/AdminLayout";
import Image from "next/image";
const ViewBox = () => {
  return (
    <AdminLayout>
      <div className="h-full w-full overflow-x-auto  my-4 p-4">
        <DrawerHeader />
        <div className="my-6  w-full  min-w-[800px] overflow-x-auto ">
          <h4 className="text-lg text-gray-800 font-bold pb-2 mb-4 border-b-2">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit
          </h4>
          <div className="flex items-center justify-between">
            <div className="flex items-center relative">
              <Image
                src="https://vojislavd.com/ta-template-demo/assets/img/message3.jpg"
                alt=""
                width={40}
                height={40}
                className="rounded-full w-8 h-8 border border-gray-500"
              />
              <div className="flex flex-col ml-2">
                <span className="text-sm font-semibold">Betty Garmon</span>
                <span className="text-xs text-gray-400">
                  From: bettygarmon@example.com
                </span>
              </div>
            </div>
            <span className="text-sm text-gray-500">
              Jan 30, 2022, 10:23 AM
            </span>
          </div>
          <div className="py-6 pl-2 text-gray-700">
            <p>Hi John!</p>
            <p className="mt-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.{" "}
            </p>
            <p className="mt-4">
              Duis aute irure dolor in reprehenderit in voluptate velit esse
              cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
              cupidatat non proident, sunt in culpa qui officia deserunt mollit
              anim id est laborum.
            </p>
            <p className="mt-4">
              Sed ut perspiciatis unde omnis iste natus error sit:
            </p>
            <ul className="ml-12 list-disc">
              <li>voluptatem accusantium</li>
              <li>doloremque laudantium</li>
              <li>totam rem aperiam</li>
              <li>eaque ipsa quae ab illo inventore veritatis</li>
              <li>quasi architecto</li>
            </ul>
            <p className="mt-4">
              Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit
              aut fugit, sed quia consequuntur magni dolores eos qui ratione
              voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem
              ipsum quia dolor sit amet, consectetur.
            </p>
            <p className="mt-4">Regards,</p>
            <p>Betty Garmon</p>
          </div>
          {/* <div className="border-t-2 flex space-x-4 py-4">
                        <div className="w-70 flex items-center py-2.5 px-2 border-2 border-gray-300 rounded-lg hover:bg-gray-200">
                            <div className="flex items-center">
                                <div className="w-10 flex items-center justify-center">
                                    <svg
                                        className="h-6 w-6"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 122.88 121.83"
                                    >
                                        <path
                                            className="cls-1"
                                            d="M102.42,37H81.92a8.52,8.52,0,0,1-8.85-8.7V7.53H21a.58.58,0,0,0-.41.18.45.45,0,0,0-.18.42V113.71a.7.7,0,0,0,.18.41.51.51,0,0,0,.41.18h80.84c.18,0,.17-.09.26-.18s.34-.28.34-.41V37Zm7.47,79.08a5.77,5.77,0,0,1-5.76,5.76H18.66a5.77,5.77,0,0,1-5.76-5.76V5.76a5.7,5.7,0,0,1,1.69-4.07A5.77,5.77,0,0,1,18.66,0H76.9a4.22,4.22,0,0,1,2.46.82l29.75,30.12a2.57,2.57,0,0,1,.78,2.6v82.53ZM80,27.69,79.57,9.63,100.66,31l-18.14-.81A2.4,2.4,0,0,1,80,27.69Z"
                                        ></path>
                                        <path
                                            className="cls-2"
                                            d="M6.71,46.28H116.17A6.73,6.73,0,0,1,122.88,53v45.1a6.73,6.73,0,0,1-6.71,6.71H6.71A6.73,6.73,0,0,1,0,98.09V53a6.73,6.73,0,0,1,6.71-6.71Z"
                                        ></path>
                                        <path
                                            className="cls-3"
                                            d="M16.33,59.78h16.2c3.53,0,6.17.83,7.94,2.51s2.63,4.08,2.63,7.18a9.71,9.71,0,0,1-2.88,7.47c-1.91,1.8-4.84,2.69-8.77,2.69H26.1V91.3H16.33V59.78ZM26.1,73.25h2.4a6.22,6.22,0,0,0,4-1,3.17,3.17,0,0,0,1.14-2.51,3.51,3.51,0,0,0-1-2.52c-.66-.69-1.91-1-3.75-1H26.1v7ZM48.3,59.78H62.78a17.47,17.47,0,0,1,6.92,1.16,11.23,11.23,0,0,1,4.35,3.33,13.66,13.66,0,0,1,2.49,5,23.36,23.36,0,0,1,.78,6.11,21.16,21.16,0,0,1-1.15,7.84A13,13,0,0,1,73,87.93a10.38,10.38,0,0,1-4.39,2.51,22.39,22.39,0,0,1-5.81.86H48.3V59.78ZM58,66.91V84.13h2.4a10.16,10.16,0,0,0,4.36-.68,4.65,4.65,0,0,0,2-2.36,14.84,14.84,0,0,0,.73-5.48q0-5-1.63-6.85c-1.09-1.23-2.91-1.85-5.44-1.85Zm24.43-7.13h24.09v6.78H92.24v5.5h12.24v6.39H92.24V91.3H82.46V59.78Z"
                                        ></path>
                                    </svg>
                                </div>
                                <div className="w-48 ml-2 flex flex-col">
                                    <a
                                        href="#"
                                        className="text-sm text-gray-700 font-bold truncate"
                                    >
                                        Terms and Conditions.pdf
                                    </a>
                                    <span className="text-gray-500 text-xs">
                                        1.5 MB
                                    </span>
                                </div>
                            </div>
                            <button
                                className="w-6 flex items-center justify-center"
                                title="Download"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="text-gray-500 hover:text-gray-600 h-6 w-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                                    ></path>
                                </svg>
                            </button>
                        </div>
                    </div> */}
          <div className="my-4 flex items-center space-x-4">
            <button className="w-32 flex items-center justify-center space-x-2 py-1.5 text-gray-600 border border-gray-400 rounded-lg hover:bg-gray-200">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M7.707 3.293a1 1 0 010 1.414L5.414 7H11a7 7 0 017 7v2a1 1 0 11-2 0v-2a5 5 0 00-5-5H5.414l2.293 2.293a1 1 0 11-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              <span>Reply</span>
            </button>
            <button className="w-32 flex items-center justify-center space-x-2 py-1.5 text-gray-600 border border-gray-400 rounded-lg hover:bg-gray-200">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                ></path>
              </svg>
              <span>Forward</span>
            </button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default ViewBox;
