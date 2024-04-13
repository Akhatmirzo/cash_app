import React from "react";
import image from "../../assets/image";
import { motion } from "framer-motion";

export default function StartLoading({ loading }) {
  return (
    loading && (
      <div className="absolute top-0 left-0 z-[99999999] w-full h-screen bgGradient overflow-hidden">
        <img
          src={image.position_top_vector}
          alt="img_position_top"
          className="absolute top-0 right-0 translate-x-[180px] translate-y-[-130px]"
        />

        <motion.div
          initial={{ rotate: 0 }}
          animate={{ rotate: 360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          className=" absolute top-[calc(50%_-_100px)] left-[calc(50%_-_100px)] w-[200px] h-[200px] border-2 border-transparent rounded-full"
        >
          <motion.div
            initial={{ rotate: 0 }}
            animate={{ rotate: -360 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            className="absolute top-0 left-0 myClass flex items-center justify-center"
          >
            <h1 className="text-2xl text-white tracking-widest">Loading...</h1>
          </motion.div>
          <motion.span
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="block w-[40px] h-[40px] rounded-full bg-gradient-to-r from-[#FF2CDF] to-[#0014FF] absolute top-[-45px]"
          ></motion.span>
        </motion.div>

        <img
          src={image.position_bottom_vector}
          alt="img_position_top"
          className="absolute bottom-0 left-0 translate-x-[-230px] translate-y-[182px]"
        />
      </div>
    )
  );
}
