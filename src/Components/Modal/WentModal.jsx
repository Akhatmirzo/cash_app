import React, { useContext, useEffect, useState } from "react";
import { ControlContext } from "../../App";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { TEInput } from "tw-elements-react";
import { toast } from "react-toastify";

export default function WentModal({ modal, payload }) {
  const [wallets, setWallets] = useState(
    JSON.parse(localStorage.getItem("wallet")) || []
  );
  const { setWentModal1, setWentModal2, walletDispatch } =
    useContext(ControlContext);
  const { register, handleSubmit, reset } = useForm();

  const onSubmitForm = async (data) => {
    if (data.wallet && data.wallet !== undefined) {
      await walletDispatch({ type: payload.ModalName, payload: data });
      setWentModal1(false);
      setWentModal2(false);
      reset();
    }else {
      toast.error("Please enter a select wallet");
    }
  };

  let defaultPos = { top: "-100%" };
  let anim = {};

  if (modal) {
    defaultPos = modal ? { top: "-100%" } : { top: 0 };
    anim = modal ? { top: 0 } : { top: "-100%" };
  }

  useEffect(() => {
    setWallets(JSON.parse(localStorage.getItem("wallet")) || [])
  }, [modal])

  const close = function () {
    setWentModal1(false);
    setWentModal2(false);
  };
  return (
    <motion.div
      initial={defaultPos}
      animate={anim}
      transition={{ duration: 0.5, ease: "linear" }}
      className="w-full h-screen fixed top-0 left-0 z-[99999] bgGradient p-5"
    >
      <h2 className="text-white text-2xl text-center capitalize">
        {payload.ModalName}
      </h2>

      <form
        onSubmit={handleSubmit(onSubmitForm)}
        className=" w-full flex flex-col justify-center gap-5 mt-[70px]"
      >
        <select
          required
          {...register("wallet")}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          <option>Choose a wallet</option>
          {wallets.map((wallet, index) => {
            return (
              <option
                key={index}
                value={wallet.id}
                className="flex items-center"
              >
                {wallet.name}
                &nbsp;&nbsp;
                Balance:{wallet.balance}
                &nbsp;&nbsp;
                Type:{wallet.type}
              </option>
            );
          })}
        </select>

        <TEInput
          type="text"
          label="Deposit text"
          required
          {...register("description")}
          maxLength={10}
        ></TEInput>

        <TEInput
          type="number"
          label="Enter Balance"
          required
          {...register("balance")}
          maxLength={15}
        ></TEInput>

        <button className="relative inline-flex items-center justify-center p-0.5 mb-2 overflow-hidden text-sm font-medium text-white rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800">
          <span className="relative px-5 py-2.5 transition-all ease-in duration-75 capitalize">
            {payload.ModalName}
          </span>
        </button>
        <button
          onClick={() => close()}
          type="button"
          className="relative inline-flex items-center justify-center p-0.5 mb-2 overflow-hidden text-sm font-medium text-white rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800"
        >
          <span className="relative px-5 py-2.5 transition-all ease-in duration-75">
            Close
          </span>
        </button>
      </form>
    </motion.div>
  );
}
