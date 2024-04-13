import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { TEInput } from "tw-elements-react";
import { ControlContext } from "../../App";
import { v4 as var4 } from "uuid";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

export default function CreateWallet({ modal }) {
  const { walletDispatch, setModal } = useContext(ControlContext);
  const { register, handleSubmit } = useForm();

  const id = var4();

  const onSubmitForm = async (data) => {
    try {
      const wallet = {
        id: id,
        ...data,
      };

      walletDispatch({ type: "add", payload: wallet });
      setModal(false);
      toast.success("Wallet Created Successfully");
    } catch (error) {
      toast.error("Error creating a new Wallet");
      console.log(error);
    }
  };

  let defaultPos = { top: "-100%" };
  let anim = {};

  if (modal) {
    defaultPos = modal ? { top: "-100%" } : { top: 0 };
    anim = modal ? { top: 0 } : { top: "-100%" };
  }

  return (
    <motion.div
      initial={defaultPos}
      animate={anim}
      transition={{ duration: 0.5, ease: "linear" }}
      className="w-full h-screen fixed top-0 left-0 z-[99999] bgGradient p-5"
    >
      <h2 className="text-white text-2xl text-center">Create new Wallet </h2>

      <form
        onSubmit={handleSubmit(onSubmitForm)}
        className=" w-full flex flex-col justify-center gap-5 mt-[70px]"
      >
        <TEInput
          type="text"
          id="exampleFormControlInput12"
          label="Enter your Wallet Name"
          required
          {...register("name")}
          maxLength={10}
        ></TEInput>

        <select
          required
          {...register("type")}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          <option>Choose a Card Type</option>
          <option value="Uzcard">Uzcard</option>
          <option value="Humo">Humo</option>
          <option value="Cash">Cash</option>
        </select>

        <TEInput
          type="number"
          id="exampleFormControlInput22"
          label="Enter your Wallet Balance"
          required
          {...register("balance")}
          maxLength={15}
        ></TEInput>

        <button className="relative inline-flex items-center justify-center p-0.5 mb-2 overflow-hidden text-sm font-medium text-white rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800">
          <span className="relative px-5 py-2.5 transition-all ease-in duration-75">
            Create Wallet
          </span>
        </button>
        <button
          onClick={() => setModal(false)}
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
