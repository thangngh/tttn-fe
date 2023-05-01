interface IProp {
  concurrency: string;
}

export default function Concurrency({ concurrency }: IProp) {
  return (
    <div className="relative flex items-center  rounded-full  badge badge-outline cursor-pointer badge-success px-2.5 py-0.5 ">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="-ms-1 me-1.5 h-4 w-4"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M14.25 7.756a4.5 4.5 0 100 8.488M7.5 10.5h5.25m-5.25 3h5.25M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>

      <span className="whitespace-nowrap text-sm">{concurrency}</span>
    </div>
  );
}
