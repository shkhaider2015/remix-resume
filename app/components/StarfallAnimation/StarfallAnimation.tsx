import "./StarfallAnimation.css"; // Ensure you have the CSS file for styles

const StarffallAnimation = () => {
  const bubbles = Array.from({ length: 8 }, (_, i) => (
    <Bubble
      key={i}
      left={Math.random() * 100}
      size={`${6 + Math.random() * 10}px`}
      duration={5 + Math.random() * 2}
    />
  ));
  return <div className="starfall-container">{bubbles}</div>;
};

const Bubble = ({ left, duration, size }: any) => {
  return (
    <div
      className="star"
      style={{
        left: `${left}%`,
        width: '2px',
        height: size,
        animationDuration: `${duration}s`,
      }}
    />
  );
};

export default StarffallAnimation;
