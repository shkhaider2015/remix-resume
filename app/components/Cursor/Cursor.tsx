import React, { useEffect } from "react";
import { gsap } from "gsap";
import "./Cursor.css"; // Assuming you move Stylus to CSS or use a preprocessor

const Cursor: React.FC = () => {
  useEffect(() => {
    const bigBall = document.querySelector(".cursor__ball--big") as HTMLDivElement;
    const smallBall = document.querySelector(".cursor__ball--small") as HTMLDivElement;
    const hoverables = document.querySelectorAll(".hoverable");

    const onMouseMove = (e: MouseEvent) => {
      gsap.to(bigBall, {
        x: e.pageX - 15,
        y: e.pageY - 15,
        duration: 0.4,
      });
      gsap.to(smallBall, {
        x: e.pageX - 5,
        y: e.pageY - 7,
        duration: 0.1,
      });
    };

    const onMouseHover = () => {
      gsap.to(bigBall, {
        scale: 4,
        duration: 0.3,
      });
    };

    const onMouseHoverOut = () => {
      gsap.to(bigBall, {
        scale: 1,
        duration: 0.3,
      });
    };

    document.body.addEventListener("mousemove", onMouseMove);

    hoverables.forEach((hoverable) => {
      hoverable.addEventListener("mouseenter", onMouseHover);
      hoverable.addEventListener("mouseleave", onMouseHoverOut);
    });

    return () => {
      document.body.removeEventListener("mousemove", onMouseMove);
      hoverables.forEach((hoverable) => {
        hoverable.removeEventListener("mouseenter", onMouseHover);
        hoverable.removeEventListener("mouseleave", onMouseHoverOut);
      });
    };
  }, []);

  return (
    <div className="cursor">
      <div className="cursor__ball cursor__ball--big">
        <svg height="60" width="60">
          <circle cx="30" cy="30" r="24" strokeWidth="0" />
        </svg>
      </div>

      <div className="cursor__ball cursor__ball--small">
        <svg height="10" width="10">
          <circle cx="5" cy="5" r="4" strokeWidth="0" />
        </svg>
      </div>
    </div>
  );
};

export default Cursor;
