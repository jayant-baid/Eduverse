import React from "react";
import { HiOutlineVideoCamera } from "react-icons/hi";

function CourseSubSectionAccordion({ subSec }) {
  return (
    <div>
      <div className={`flex items-center gap-2 py-2`}>
        <span>
          <HiOutlineVideoCamera />
        </span>
        <p>{subSec?.title}</p>
      </div>
    </div>
  );
}

export default CourseSubSectionAccordion;
