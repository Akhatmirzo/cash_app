import React from 'react'

export default function SecondaryBtn({btnText, clickFunc}) {
  return (
    <button
    onClick={() => clickFunc(true)}
      className={`w-[160px] bg-[#E8503A] text-white rounded-[18px] py-[15px]`}
    >
      {btnText}
    </button>
  )
}
