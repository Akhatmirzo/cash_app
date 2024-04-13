import React from "react";

export default function DebitCards({ wallet }) {
  const { balance, name, type } = wallet;
  const cardImg = {
    Cash: "https://tse4.mm.bing.net/th?id=OIP.fhq2dGyLs36KZIiDxZj7kwHaKj&pid=Api&P=0&h=220",
    Humo: "https://trustbank.uz/bitrix/templates/main_2020/tb/images/card__logo_humo.png",
    Uzcard: "https://anhor.uz/wp-content/uploads/2020/11/8579.jpg",
  };
  return (
    <div className="w-full h-[155px] bg-[rgba(255,_255,_255,_0.12)] backdrop-blur-[80px] p-[16px] rounded-[18px] flex flex-col justify-between">
      <div className="flex items-center gap-[8px]">
        <div className="w-[36px] h-[36px] border-2 rounded-full overflow-hidden">
          <img src={cardImg[type]} alt="" className="w-[36px] h-[36px] object-cover object-center" />
        </div>

        <div>
          <h2 className="text-white text-[16px] font-bold leading-[29px]">
            {name}
          </h2>
          <h2 className="text-white opacity-[0.6] text-[12px] leading-[19px]">
            {type}
          </h2>
        </div>
      </div>

      <h3 className="text-white text-[16px] leading-3 font-bold">
        <span>{balance}</span> so'm
      </h3>
    </div>
  );
}
