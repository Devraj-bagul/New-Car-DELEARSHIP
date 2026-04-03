import React from "react";
import { FaCheck } from "react-icons/fa";

const Features = ({ features }) => {
  // Safety: Ensure features is an object
  const featureList =
    typeof features === "object" && features !== null ? features : {};

  return (
    <div className="p-10 border shadow-md rounded-xl my-7">
      <h2 className="font-medium text-2xl">Features</h2>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-5 gap-7">
        {Object.entries(featureList).map(([key, value]) =>
          value ? (
            <div key={key} className="flex gap-2 items-center">
              <FaCheck className="text-lg rounded-full bg-blue-100 text-blue-500" />
              <h2 className="capitalize">
                {key.replace(/([A-Z])/g, " $1")}
              </h2>
            </div>
          ) : null
        )}
      </div>
    </div>
  );
};

export default Features;
