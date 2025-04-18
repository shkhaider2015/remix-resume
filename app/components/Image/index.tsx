"use client";
import React, { useEffect, useState } from "react";
import "./image.css";

interface IImage extends React.ImgHTMLAttributes<HTMLImageElement> {
  error?: string;
}

const MyImage = (props: IImage) => {
  const { error, className, ...rest } = props;
  const [loaded, setLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isClientSide, setIsClientSide] = useState(false);

  useEffect(() => {
    setIsClientSide(true);
  }, []);


  return ( 
    <div className={` ${loaded ? "" : "image-wrapper" } ${className || ""}`}>
      {!loaded && !hasError && <div className="image-placeholder" />}
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
