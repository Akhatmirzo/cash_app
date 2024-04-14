import React, { useEffect, useState, useContext } from "react";
import { ControlContext } from "../../App";
import DebitCards from "../../Components/Cards/DebitCards";

// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Link } from "react-router-dom";
import image from "../../assets/image";
import HistoryCard from "../../Components/Cards/HistoryCard";
import PrimaryBtn from "../../Components/Buttons/PrimaryBtn";
import SecondaryBtn from "../../Components/Buttons/SecondaryBtn";
import { v4 as v4444 } from "uuid";

export default function Wallet() {
  const [user] = useState(JSON.parse(localStorage.getItem("user")) || "");
  const {
    navigate,
    setModal,
    setWentModal1,
    setWentModal2,
    balance,
    walletDispatch,
    wallets,
    transaction,
  } = useContext(ControlContext);

  useEffect(() => {
    walletDispatch({ type: "balanceCalc" });
  }, [wallets]);

  useEffect(() => {
    const username = JSON.parse(localStorage.getItem("user")) || "";
    if (!username) {
      navigate("/");
    }
  }, [user]);

  function findWalletFn(walletId) {
    return wallets.find((wallet) => wallet.id === walletId);
  }

  return (
    <div className=" pt-[30px] w-full">
      <div className="flex items-center justify-between px-3">
        <div>
          <h2 className="text-white opacity-[0.6] text-[16px] leading-[19px]">
            Welcome Back
          </h2>
          <h2 className="text-white text-[28px] font-bold leading-[29px]">
            {user}
          </h2>
        </div>

        <div className="w-[50px] h-[50px] rounded-full overflow-hidden border-2">
          <img
            src={
              "https://cdn.dribbble.com/users/14268/screenshots/5583545/unold_icon1_animation_loop_f.gif"
            }
            alt="Img"
            className="w-full h-full"
          />
        </div>
      </div>

      <div className="w-full mt-[25px] px-3 pb-[30px]">
        <h2 className="text-white opacity-[0.6] text-[16px] leading-[19px]">
          Balance
        </h2>
        <h2 className="text-white text-[28px] font-bold leading-[29px]">
          <span>{balance}</span> so'm
        </h2>
      </div>

      <div className="pl-3">
        <Swiper spaceBetween={20} slidesPerView={1.8}>
          {wallets.map((wallet, index) => {
            return (
              <SwiperSlide key={wallet.id}>
                <DebitCards wallet={wallet} />
              </SwiperSlide>
            );
          })}

          <SwiperSlide>
            <div className="w-full h-[155px] bg-[rgba(255,_255,_255,_0.12)] backdrop-blur-[80px] rounded-[18px] flex items-center justify-center">
              <button
                onClick={() => setModal(true)}
                className="relative w-[45px] h-[45px] bg-[#4376FE] rounded-full p-[4px] flex items-center justify-center"
              >
                <span className="w-[70%] h-[2px] bg-white block absolute rotate-90"></span>
                <span className="w-[70%] h-[2px] bg-white block absolute"></span>
              </button>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>

      <div className="px-3 pt-[30px] flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <h2 className="text-white text-[20px] leading-[26px] font-bold">
            Transaction history
          </h2>
          <Link to={"transactions"} className="flex items-center gap-[10px]">
            <span className="block text-white text-[16px] font-bold">All</span>
            <img src={image.icon__right__arrow} alt="right_arrow" />
          </Link>
        </div>

        <div className="min-h-[300px]">
          <div>
            {transaction.length > 0 ? (
              transaction.map((item, index) => {
                const findWallet = findWalletFn(item.wallet);
                const id = v4444();
                if (index <= 4) {
                  return (
                    <div key={id}>
                      <HistoryCard transaction={item} findwallet={findWallet} />
                      <hr className=" opacity-[0.2]" />
                    </div>
                  );
                }
              })
            ) : (
              <h1 className="text-white text-center w-full p-3" >No Transactions</h1>
            )}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between gap-2 p-4">
        <PrimaryBtn btnText={"Deposit"} clickFunc={setWentModal1} />
        <SecondaryBtn btnText={"Withdraw"} clickFunc={setWentModal2} />
      </div>
    </div>
  );
}
