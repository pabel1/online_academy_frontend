import React from "react";

const SingleCardSk = () => {
  return (
    <div class="">
      <div class="animate-pulse space-y-1">
        <div class="bg-gray-200 h-48 rounded-t-xl"></div>
        {/* <div class="h-16 bg-gray-200 full rounded-b-xl"></div> */}
        <div className="space-y-1">
          <div className="flex gap-2 justify-between">
            <div class="h-4 bg-gray-200 rounded w-full"></div>
            <div class="h-4 bg-gray-200 rounded w-full"></div>
            <div class="h-4 bg-gray-200 rounded w-full"></div>
          </div>
          <div class="h-12 bg-gray-200 rounded w-full"></div>
        </div>
      </div>
    </div>
  );
};

export default SingleCardSk;
