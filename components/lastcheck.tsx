"use client";
import React, { useEffect, useState } from "react";

export default function Lastcheck(): JSX.Element {
  const [lastChecked, setLastChecked] = useState("");

  useEffect(() => {
    const intervalId = setInterval(() => {
      const now = new Date();
      const diffInSeconds = now.getMinutes() * 60 + now.getSeconds();
      if (diffInSeconds < 60) {
        if (diffInSeconds === 0) {
          setLastChecked(`Just now`);
        } else {
          setLastChecked(`${diffInSeconds} seconds ago`);
        }
      } else {
        const diffInMinutes = now.getMinutes();
        setLastChecked(`${diffInMinutes} minutes ago`);
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="absolute top-4 right-4 text-sm text-gray-400">
      Last checked: {lastChecked || "0 minutes ago"}
    </div>
  );
}
