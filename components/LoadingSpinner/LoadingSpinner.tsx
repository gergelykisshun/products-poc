import { FC } from "react";
import SyncLoader from "react-spinners/SyncLoader";

type Props = {
  isFullscreen: boolean;
};

const LoadingSpinner: FC<Props> = ({ isFullscreen }) => {
  return (
    <div
      className={`flex justify-center ${isFullscreen && "h-96 items-center"}`}
    >
      <SyncLoader color="#6100ff" aria-label="Loading Spinner" />
    </div>
  );
};

export default LoadingSpinner;
