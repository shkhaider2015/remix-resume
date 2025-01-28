import { useNavigation } from "@remix-run/react";
import './Loader.css';

const Loader = () => {
  const navigation = useNavigation();

  if (navigation.state !== "idle") return <div className="loader-con">
    <div className="loader" />
  </div>;
  return null;
};

export default Loader;
