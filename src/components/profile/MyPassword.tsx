import ProfileLayout from "@/layouts/ProfileLayout";
import { useRouter } from "next/router";

export default function MyPassword() {
  const router = useRouter();
  return (
    <div>
      <form action="">
        <div className="flex flex-col space-y-5">
          <label
            htmlFor="Current-password"
            className="flex items-center space-x-2 space-y-2 gap-2"
          >
            <span className="font-medium text-slate-700 w-1/4 ">
              Current password
            </span>
            <input
              id="Current-password"
              name="Current-password"
              type="password"
              className="w-2/4 py-3 border border-slate-200 bg-white rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
              placeholder="Enter current password"
            />
            <span
              onClick={() => router.push("/reset-password")}
              className="hover:underline text-primary font-medium cursor-pointer"
            >
              Forgot password ?
            </span>
          </label>
          <label
            htmlFor="new-password"
            className="flex items-center space-x-2 space-y-2 gap-2"
          >
            <span className="font-medium text-slate-700 w-1/4  ">
              New password
            </span>
            <input
              id="new-password"
              name="new-password"
              type="password"
              className="w-2/4 py-3 border border-slate-200 bg-white rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
              placeholder="Enter new password"
            />
          </label>
          <label
            htmlFor="confirm-password"
            className="flex items-center space-x-2 space-y-2 gap-2"
          >
            <span className="font-medium text-slate-700  w-1/4 ">
              Confirm password
            </span>
            <input
              id="confirm-password"
              name="confirm-password"
              type="password"
              className="w-2/4 py-3 border border-slate-200 bg-white rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
              placeholder="Enter confirm password"
            />
          </label>

          <button className="w-full py-3 font-medium text-white btn bg-primary-focus btn-outline  inline-flex space-x-2 items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z"
              />
            </svg>

            <span>Approved</span>
          </button>
        </div>
      </form>
    </div>
  );
}
