import React from "react";

export default function HistoryCard({ transaction, findwallet }) {
  const { description, balance, act } = transaction;
  const { name, type } = findwallet;
  const isAct = act === "deposit";
  const cardImg = {
    Cash: "https://tse4.mm.bing.net/th?id=OIP.fhq2dGyLs36KZIiDxZj7kwHaKj&pid=Api&P=0&h=220",
    Humo: "https://trustbank.uz/bitrix/templates/main_2020/tb/images/card__logo_humo.png",
    Uzcard: "https://anhor.uz/wp-content/uploads/2020/11/8579.jpg",
  };
  return (
    <div className="flex items-center justify-between p-2">
      <div className="flex items-center gap-[8px]">
        <div className="w-[36px] h-[36px] border-2 rounded-full overflow-hidden">
          <img
            src={cardImg[type]}
            alt={type}
            className="w-[36px] h-[36px] object-cover object-center"
          />
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

      <div className="self-end flex flex-col gap-2">
        <h3 className={`${isAct ? "text-[#2cb33e]" : "text-[#c93030]"} text-[16px] leading-3 font-bold`}>
          {isAct ? "+" : "-"}<span>{balance}</span> so'm
        </h3>

        <p className="text-right text-white text-sm font-thin tracking-wide font-mono">
          {description}
        </p>
      </div>
    </div>
  );
}
