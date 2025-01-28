import { useNavigation } from "@remix-run/react";
import "./Loader.css";

const Loader = ({ isSubmitting = false }: { isSubmitting?: boolean }) => {
  const navigation = useNavigation();

  if (isSubmitting)
    return (
      <div className="loader-con">
        <div className="loader" />
      </div>
    );

  if (navigation.state !== "idle")
    return (
      <div className="loader-con">
        <div className="loader" />
      </div>
    );
  return null;
};

export default Loader;
