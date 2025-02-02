import React from "preact/compat";
import { useEffect, useState } from "preact/hooks";

interface StatusClockProps {
  clockIcon: string;
  timeFormat: string;
}

export const StatusClock: React.FC<StatusClockProps> = ({
  clockIcon,
  timeFormat,
}) => {
  const currentTime = useCurrentTime();
  const formatTime = (date: Date): string => {
    try {
      return date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        second: timeFormat.includes("s") ? "2-digit" : undefined,
      });
    } catch (e) {
      console.error(e);
      return date.toLocaleTimeString();
    }
  };

  return (
    <div>
      {clockIcon} {formatTime(currentTime)}
    </div>
  );
};

const useCurrentTime = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return currentTime;
};
