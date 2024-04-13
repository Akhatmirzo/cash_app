import React, { useContext, useEffect, useState } from "react";
import { ControlContext } from "../../App";
import { v4 as v4444 } from "uuid";
import HistoryCard from "../../Components/Cards/HistoryCard";
import { TEInput } from "tw-elements-react";
import { Link } from "react-router-dom";

export default function Transaction() {
  const { wallets, transaction } = useContext(ControlContext);
  const [inputs, setInputs] = useState({
    search: "",
    withdraw: false,
    deposit: false,
    range: 0,
  });
  const [current, setCurrent] = useState(transaction);

  const handleChangeSearch = () => {
    let findSearch = transaction.filter((item) => {
      const wallet = findWalletFn(item.wallet);
      const desc = item.description;
      const name = wallet.name;
      const type = item.type;
      const balance = item.balance;

      return name.includes(inputs.search)
        ? name.includes(inputs.search) : desc.includes(inputs.search);
    });

    // type.includes(inputs.search)
    //     : balance.includes(inputs.search)

    if (inputs.deposit && !inputs.withdraw) {
      findSearch = findSearch.filter((item) => item.act === "deposit");
    }

    if (!inputs.deposit && inputs.withdraw) {
      findSearch = findSearch.filter((item) => item.act === "withdraw");
    }

    if (inputs.range) {
      findSearch = findSearch.filter(
        (item) => item.balance >= inputs.range * 10000
      );
    }

    setCurrent(findSearch);
  };

  useEffect(() => {
    handleChangeSearch();
  }, [inputs]);

  function findWalletFn(walletId) {
    return wallets.find((wallet) => wallet.id === walletId);
  }
  return (
    <div className="py-3">
      <Link className="text-white p-2" to={"/wallet"}>
        {"<"} Back
      </Link>
      <div className="p-2 flex flex-col gap-2">
        <TEInput
          type="search"
          label="Transaction Search"
          value={inputs.search}
          name="search"
          onChange={(e) =>
            setInputs({ ...inputs, [e.target.name]: e.target.value })
          }
        ></TEInput>

        <div className="flex items-center justify-between">
          <div className="mb-[0.125rem] block min-h-[1.5rem] pl-[1.5rem]">
            <input
              className="relative float-left -ml-[1.5rem] mr-[6px] mt-[0.15rem] h-[1.125rem] w-[1.125rem] appearance-none rounded-[0.25rem] border-[0.125rem] border-solid border-neutral-300 outline-none before:pointer-events-none before:absolute before:h-[0.875rem] before:w-[0.875rem] before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] checked:border-primary checked:bg-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:-mt-px checked:after:ml-[0.25rem] checked:after:block checked:after:h-[0.8125rem] checked:after:w-[0.375rem] checked:after:rotate-45 checked:after:border-[0.125rem] checked:after:border-l-0 checked:after:border-t-0 checked:after:border-solid checked:after:border-white checked:after:bg-transparent checked:after:content-[''] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:transition-[border-color_0.2s] focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-[0.875rem] focus:after:w-[0.875rem] focus:after:rounded-[0.125rem] focus:after:content-[''] checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:after:-mt-px checked:focus:after:ml-[0.25rem] checked:focus:after:h-[0.8125rem] checked:focus:after:w-[0.375rem] checked:focus:after:rotate-45 checked:focus:after:rounded-none checked:focus:after:border-[0.125rem] checked:focus:after:border-l-0 checked:focus:after:border-t-0 checked:focus:after:border-solid checked:focus:after:border-white checked:focus:after:bg-transparent dark:border-neutral-600 dark:checked:border-primary dark:checked:bg-primary dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]"
              type="checkbox"
              name="deposit"
              id="checkboxDefault1"
              onChange={(e) =>
                e.target.checked
                  ? setInputs({ ...inputs, [e.target.name]: e.target.checked })
                  : setInputs({ ...inputs, [e.target.name]: e.target.checked })
              }
            />
            <label
              className="inline-block pl-[0.15rem] text-white hover:cursor-pointer"
              htmlFor="checkboxDefault1"
            >
              Deposit
            </label>
          </div>
          <div className="mb-[0.125rem] block min-h-[1.5rem] pl-[1.5rem]">
            <input
              className="relative float-left -ml-[1.5rem] mr-[6px] mt-[0.15rem] h-[1.125rem] w-[1.125rem] appearance-none rounded-[0.25rem] border-[0.125rem] border-solid border-neutral-300 outline-none before:pointer-events-none before:absolute before:h-[0.875rem] before:w-[0.875rem] before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] checked:border-primary checked:bg-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:-mt-px checked:after:ml-[0.25rem] checked:after:block checked:after:h-[0.8125rem] checked:after:w-[0.375rem] checked:after:rotate-45 checked:after:border-[0.125rem] checked:after:border-l-0 checked:after:border-t-0 checked:after:border-solid checked:after:border-white checked:after:bg-transparent checked:after:content-[''] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:transition-[border-color_0.2s] focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-[0.875rem] focus:after:w-[0.875rem] focus:after:rounded-[0.125rem] focus:after:content-[''] checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:after:-mt-px checked:focus:after:ml-[0.25rem] checked:focus:after:h-[0.8125rem] checked:focus:after:w-[0.375rem] checked:focus:after:rotate-45 checked:focus:after:rounded-none checked:focus:after:border-[0.125rem] checked:focus:after:border-l-0 checked:focus:after:border-t-0 checked:focus:after:border-solid checked:focus:after:border-white checked:focus:after:bg-transparent dark:border-neutral-600 dark:checked:border-primary dark:checked:bg-primary dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]"
              type="checkbox"
              name="withdraw"
              id="checkboxDefault2"
              onChange={(e) =>
                e.target.checked
                  ? setInputs({ ...inputs, [e.target.name]: e.target.checked })
                  : setInputs({ ...inputs, [e.target.name]: e.target.checked })
              }
            />
            <label
              className="inline-block pl-[0.15rem] text-white hover:cursor-pointer"
              htmlFor="checkboxDefault2"
            >
              Withdraw
            </label>
          </div>
        </div>

        <div>
          <label
            htmlFor="customRange1"
            className="flex items-center justify-between mb-2 text-neutral-700 dark:text-neutral-200"
          >
            <span>
              Balance: {">="} {inputs.range * 10000}{" "}
            </span>
          </label>
          <input
            type="range"
            className="transparent h-1.5 w-full cursor-pointer appearance-none rounded-lg border-transparent bg-neutral-200"
            id="customRange1"
            value={inputs.range}
            onChange={(e) => setInputs({ ...inputs, range: e.target.value })}
          />
        </div>
      </div>

      <div>
        {current.length > 0 ? (
          current.map((item) => {
            const findWallet = findWalletFn(item.wallet);
            const id = v4444();
            return (
              <div key={id}>
                <HistoryCard transaction={item} findwallet={findWallet} />
                <hr className=" opacity-[0.2]" />
              </div>
            );
          })
        ) : (
          <h1>No Transactions</h1>
        )}
      </div>
    </div>
  );
}
