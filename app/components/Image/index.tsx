"use client";
import React, { useEffect, useState } from "react";
import "./image.css";
import { useTheme } from "~/context/theme";

interface IImage extends React.ImgHTMLAttributes<HTMLImageElement> {
  error?: string;
}

const MyImage = (props: IImage) => {
  const { error, className, ...rest } = props;
  const [loaded, setLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isClientSide, setIsClientSide] = useState(false);
  let { theme } = useTheme();

  theme = theme || "light"; 

  useEffect(() => {
    setIsClientSide(true);
  }, []);


  return ( 
    <div className={` ${loaded ? "" : "image-wrapper" } ${className || ""}`}>
      {!loaded && !hasError && <div className={`image-placeholder ${theme} `} />}
      {!hasError && isClientSide ? (
        <img
          {...rest}
          style={{
            visibility: loaded ? "visible" : "hidden",
            position: loaded ? "relative" : "absolute",
          }}
          onLoad={() => setLoaded(true)}
          onError={() => setHasError(true)}
        />
      ) : (
        error && <span className="image-error">{error}</span>
      )}
    </div>
  );
};

export default MyImage;
