import React from "react";
import { ProgressSpinner } from "primereact/progressspinner";

function Progress() {
  return (
    <div className="flex flex-wrap gap-2 align-items-center mt-8 justify-content-center">
      <ProgressSpinner />
    </div>
  );
}

export default Progress;
