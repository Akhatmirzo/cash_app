import React from "react";

export default function PrimaryBtn({ btnText, clickFunc }) {
  return (
    <button
      onClick={() => clickFunc(true)}
      className={`w-[160px] bg-[#45B68D] text-white rounded-[18px] py-[15px]`}
    >
      {btnText}
    </button>
  );
}
