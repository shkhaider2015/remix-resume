import { NavLink } from "@remix-run/react";
import { NavIconProps } from "~/utils/interfaces/components";

const BlogIcon = (props: NavIconProps) => {
  const {
    width = 20,
    height = 20,
    color = "#BCBCBC",
    color2 = "#3fff6f",
    label = "",
    selected = false,
    name = "blog",
  } = props;

  return (
    <NavLink
      to={name}
      className={({ isActive, isPending }) => {
        return `nav-item-container ${
          isActive ? "active" : isPending ? "pending" : ""
        }`;
      }}
    >
      <svg
        width={width}
        height={height}
        viewBox={`0 0 24 24`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M20.2685 2.18077L20.2546 14.0708C20.2535 15.0408 19.4625 15.9298 18.4923 16.0487L18.1823 16.0883C16.542 16.3064 14.2312 16.9837 12.3703 17.7616C11.72 18.0308 11.0006 17.54 11.0014 16.83L11.0176 2.92C11.018 2.55 11.2284 2.21024 11.5586 2.03063C13.3898 1.04276 16.1608 0.165984 18.041 0.00817289L18.101 0.00824275C19.301 0.00963982 20.2699 0.980768 20.2685 2.18077Z"
          fill="#737373"
        />
        <path
          d="M0.00253355 2.18077L0.0163762 14.0708C0.0175055 15.0408 0.808541 15.9298 1.77868 16.0487L2.08873 16.0883C3.72898 16.3064 6.03977 16.9837 7.90068 17.7616C8.55099 18.0308 9.27042 17.54 9.26959 16.83L9.2534 2.92C9.25297 2.55 9.04257 2.21024 8.71236 2.03063C6.88121 1.04276 4.11019 0.165984 2.23 0.00817289L2.17001 0.00824275C0.970006 0.00963982 0.00113647 0.980768 0.00253355 2.18077Z"
          fill="#737373"
        />
        <rect
          x="2.81006"
          y="5.15234"
          width="4.97041"
          height="1"
          rx="0.5"
          transform="rotate(7.50489 2.81006 5.15234)"
          fill="#BCBCBC"
        />
        <rect
          x="2.82178"
          y="9.18799"
          width="4.78429"
          height="1"
          rx="0.5"
          transform="rotate(7.50489 2.82178 9.18799)"
          fill="#BCBCBC"
        />
        <rect
          x="2.81104"
          y="7.16943"
          width="4.90914"
          height="1"
          rx="0.5"
          transform="rotate(7.50489 2.81104 7.16943)"
          fill="#BCBCBC"
        />
      </svg>
      <p className="nav-label">{label}</p>
    </NavLink>
  );
};

export default BlogIcon;
