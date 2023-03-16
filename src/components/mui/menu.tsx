export const Menu = [
  {
    id: 1,
    title: "dashboard",
    path: "/dashboard",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 9l2-2m0 0l7-7 7 7M5 19v-8a2 2 0 012-2h10a2 2 0 012 2v8m-2 0a2 2 0 01-2 2H7a2 2 0 01-2-2m10 0h2m-2 0v2"
        />
      </svg>
    ),
  },
  {
    id: 2,
    title: "user",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 21v-2a3 3 0 016 0v2m-3-8a3 3 0 11-6 0 3 3 0 016 0z"
        />
      </svg>
    ),
    subItem: [
      {
        id: 1,
        title: "user-list",
        path: "/user/list",
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 9l2-2m0 0l7-7 7 7M5 19v-8a2 2 0 012-2h10a2 2 0 012 2v8m-2 0a2 2 0 01-2 2H7a2 2 0 01-2-2m10 0h2m-2 0v2"
            />
          </svg>
        ),
      },
      {
        id: 2,
        title: "group",
        path: "/user/group",
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 9l2-2m0 0l7-7 7 7M5 19v-8a2 2 0 012-2h10a2 2 0 012 2v8m-2 0a2 2 0 01-2 2H7a2 2 0 01-2-2m10 0h2m-2 0v2"
            />
          </svg>
        ),
      },
    ],
  },
  {
    id: 3,
    title: "inbox",
    path: "/inbox",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 9l2-2m0 0l7-7 7 7M5 19v-8a2 2 0 012-2h10a2 2 0 012 2v8m-2 0a2 2 0 01-2 2H7a2 2 0 01-2-2m10 0h2m-2 0v2"
        />
      </svg>
    ),
  },
];
