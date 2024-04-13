import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import Wallet from "./Pages/Wallet/Wallet";

import { createContext, useReducer, useState } from "react";
import StartLoading from "./Components/Loadings/StartLoading";
import NotFound from "./Pages/NotFound";
import CreateWallet from "./Components/Modal/CreateWallet";
import WentModal from "./Components/Modal/WentModal";
import User from "./Pages/User";
import Transaction from "./Pages/Wallet/Transaction";
import { toast } from "react-toastify";

const ControlContext = createContext();
const nowDate = new Date();

function App() {
  const [modal, setModal] = useState(false);
  const [wentModal, setWentModal1] = useState(false);
  const [wentModal2, setWentModal2] = useState(false);
  const navigate = useNavigate();

  const [start, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case "start":
        return true;
      case "stop":
        return false;
      default:
        return state;
    }
  }, false);

  const [balance, setBalance] = useState(0);

  const [transaction, transactionDispatch] = useReducer((state, action) => {
    switch (action.type) {
      case "add":
        const newTransaction = [...state, action.payload];
        localStorage.setItem("transaction", JSON.stringify(newTransaction));
        return newTransaction;
      case "remove":
        const newArr = state.filter((item) => item.id !== action.payload);
        localStorage.setItem("transaction", JSON.stringify(newArr));
        return newArr;
      default:
        return state;
    }
  }, JSON.parse(localStorage.getItem("transaction")) || []);

  const [wallets, walletDispatch] = useReducer((state, action) => {
    switch (action.type) {
      case "add":
        const newWallets = [...state, action.payload];
        localStorage.setItem("wallet", JSON.stringify(newWallets));
        return newWallets;
      case "remove":
        return state.filter((item) => item.id !== action.payload);
      case "balanceCalc":
        const newBalance = state.reduce((acc, item) => {
          return acc + +item.balance;
        }, 0);
        setBalance(newBalance);
        return state;
      case "withdraw":
        const withdraw = state.map((wallet) => {
          if (wallet.id === action.payload.wallet) {
            if (wallet.balance >= action.payload.balance) {
              transactionDispatch({
                type: "add",
                payload: {
                  ...action.payload,
                  act: "withdraw",
                  createdAt: Date.parse(nowDate),
                  date: nowDate,
                },
              });
              toast.success("withdraw saved successfully")
              return {
                ...wallet,
                balance: +wallet.balance - +action.payload.balance,
              };
            } else {
              toast.error("Balance calculation failed");
              return wallet;
            }
          } else {
            return wallet;
          }
        });

        localStorage.setItem("wallet", JSON.stringify(withdraw));
        return withdraw;
      case "deposit":
        const deposit = state.map((wallet) => {
          if (wallet.id === action.payload.wallet) {
            transactionDispatch({
              type: "add",
              payload: {
                ...action.payload,
                act: "deposit",
                createdAt: Date.parse(nowDate),
                date: nowDate,
              },
            });
            toast.success("deposit saved successfully")
            return {
              ...wallet,
              balance: +wallet.balance + +action.payload.balance,
            };
          } else {
            return wallet;
          }
        });

        localStorage.setItem("wallet", JSON.stringify(deposit));
        return deposit;
      default:
        return state;
    }
  }, JSON.parse(localStorage.getItem("wallet")) || []);

  return (
    <ControlContext.Provider
      value={{
        dispatch,
        navigate,
        setModal,
        setWentModal1,
        setWentModal2,
        walletDispatch,
        transactionDispatch,
        transaction,
        balance,
        wallets,
      }}
    >
      <CreateWallet modal={modal} />
      <WentModal modal={wentModal} payload={{ ModalName: "deposit" }} />
      <WentModal modal={wentModal2} payload={{ ModalName: "withdraw" }} />

      <Routes>
        <Route exact path="*" element={<NotFound />} />
        <Route path="/" element={<User />} />
        <Route path="/wallet">
          <Route index element={<Wallet />} />
          <Route path="transactions" element={<Transaction />} />
        </Route>
      </Routes>

      <StartLoading loading={start} />
    </ControlContext.Provider>
  );
}

export { ControlContext };
export default App;
