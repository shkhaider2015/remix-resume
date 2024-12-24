import { NavLink } from "@remix-run/react";
import { NavIconProps } from "utils/interfaces/components";

const ResumeIcon = (props: NavIconProps) => {
  const {
    width = 24,
    height = 24,
    color = "#BCBCBC",
    color2 = "#3fff6f",
    label = "",
    selected = false,
    name = "home",
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
        viewBox={`0 0 ${24} ${24}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          opacity="0.4"
          d="M22 7.81V16.19C22 19 20.71 20.93 18.44 21.66C17.78 21.89 17.02 22 16.19 22H7.81C6.98 22 6.22 21.89 5.56 21.66C3.29 20.93 2 19 2 16.19V7.81C2 4.17 4.17 2 7.81 2H16.19C19.83 2 22 4.17 22 7.81Z"
          fill={color}
          className="svg-path"
        />
        <path
          d="M18.4401 21.6597C17.7801 21.8897 17.0201 21.9998 16.1901 21.9998H7.81006C6.98006 21.9998 6.22006 21.8897 5.56006 21.6597C5.91006 19.0197 8.67006 16.9697 12.0001 16.9697C15.3301 16.9697 18.0901 19.0197 18.4401 21.6597Z"
          fill={color}
          className="svg-path"
        />
        <path
          d="M15.5799 11.58C15.5799 13.56 13.9799 15.17 11.9999 15.17C10.0199 15.17 8.41992 13.56 8.41992 11.58C8.41992 9.60002 10.0199 8 11.9999 8C13.9799 8 15.5799 9.60002 15.5799 11.58Z"
          fill={color}
          className="svg-path"
        />
      </svg>
      <p className="nav-label">{label}</p>
    </NavLink>
  );
};

export default ResumeIcon;