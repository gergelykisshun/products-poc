import { FC } from "react";
import SyncLoader from "react-spinners/SyncLoader";

const LoadingSpinner: FC = () => {
  return <SyncLoader color="#0f0" aria-label="Loading Spinner" />;
};

export default LoadingSpinner;
