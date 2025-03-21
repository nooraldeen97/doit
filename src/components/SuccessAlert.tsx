import React from "react";

interface AlertProp {
  message: string;
}

function SuccessAlert({ message }: AlertProp) {
  return (
    <div>
      {message ? (
        <div
          className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400"
          role="alert"
        >
          {message}
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default SuccessAlert;
