import React, { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import Swal from "sweetalert2";
export const BankContext = createContext();

export const BankProvider = ({ children }) => {
  const [userLogined, setUserLogined] = useState(null);
  const [loginShow, setLoginShow] = useState(false);
  const [userToken, setUserToken] = useState(null);
  const [registerShow, setRegisterShow] = useState(false);
  const [transferShow, setTransferShow] = useState(false);
  const [wrongPass, setWrongPass] = useState(false);
  const [PassNotMatch, setPassNotMatch] = useState(false);
  const [userTransection, setUserTransection] = useState([]);

  const checkToken = () => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.userId;
      setUserToken(userId);
      fetch(`https://bankapp-reactmongodb-backend.onrender.com/user/token`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ userId: userId }),
      })
        .then((res) => res.json())
        .then((data) => setUserLogined(data));
    } else {
    }
  };

  const fetchTransection = ()=> {
    if (userLogined){
    fetch(`https://bankapp-reactmongodb-backend.onrender.com/user/transaction`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userEmail: userLogined.email }),
    })
      .then((res) => res.json())
      .then((data) => setUserTransection(data));
    }else{
    }

  }
  const handleLogin = (data) => {
    fetch("https://bankapp-reactmongodb-backend.onrender.com/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          setWrongPass(true);
        } else {
          setWrongPass(false);
          setUserLogined(data);
          setLoginShow(false);
          localStorage.setItem("token", data.token);
          checkToken();
          const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.onmouseenter = Swal.stopTimer;
              toast.onmouseleave = Swal.resumeTimer;
            },
          });
          Toast.fire({
            icon: "success",
            title: "login successfully",
          });
        }
      });
  };
  const handleRegister = (data) => {
    if (data.passwordRegister !== data.confirmPasswordRegister) {
      alert("password not match");
      setPassNotMatch(true);
    } else {
      fetch("https://bankapp-reactmongodb-backend.onrender.com/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      setRegisterShow(false);
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        },
      });
      Toast.fire({
        icon: "success",
        title: "Register successfully",
      });
    }
  };
  const createTransection = async (data) => {
    await fetch("https://bankapp-reactmongodb-backend.onrender.com/user/createtransaction", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  };
  const handleDeposit = async (data) => {
    let newData = { ...data, userId: userLogined._id };
    await fetch("https://bankapp-reactmongodb-backend.onrender.com/user/deposit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newData),
    })
      .then((res) => res.json())
      .then((data) => setUserLogined(data));
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      },
    });
    Toast.fire({
      icon: "success",
      title: "Deposit successfully",
    });
  };
  const handleWithdrew = async (data) => {
    let newData = { ...data, userId: userLogined._id };
    await fetch("https://bankapp-reactmongodb-backend.onrender.com/user/withdrew", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.onmouseenter = Swal.stopTimer;
              toast.onmouseleave = Swal.resumeTimer;
            },
          });
          Toast.fire({
            icon: "error",
            title: data.error,
          });
        } else {
          setUserLogined(data);
          const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.onmouseenter = Swal.stopTimer;
              toast.onmouseleave = Swal.resumeTimer;
            },
          });
          Toast.fire({
            icon: "success",
            title: "Withdrew successfully",
          });
        }
      });
  };
  const handleTransfer = async (data) => {
    let newData = { ...data, userId: userLogined._id };
    await fetch("https://bankapp-reactmongodb-backend.onrender.com/user/transfer", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.onmouseenter = Swal.stopTimer;
              toast.onmouseleave = Swal.resumeTimer;
            },
          });
          Toast.fire({
            icon: "error",
            title: "not enough balance",
          });
        } else {
          createTransection(newData);
          setUserLogined(data);
          setTransferShow(false);
          const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.onmouseenter = Swal.stopTimer;
              toast.onmouseleave = Swal.resumeTimer;
            },
          });
          Toast.fire({
            icon: "success",
            title: "Transfer successfully",
          });
        }
      });
  };

  useEffect(() => {
    checkToken();
  }, []);
  useEffect(() => {
    fetchTransection();
    // eslint-disable-next-line
  }, [userLogined, handleTransfer]);
  return (
    <BankContext.Provider
      value={{
        handleLogin,
        handleRegister,
        userLogined,
        setUserLogined,
        loginShow,
        setLoginShow,
        registerShow,
        setRegisterShow,
        wrongPass,
        handleDeposit,
        handleWithdrew,
        transferShow,
        setTransferShow,
        handleTransfer,
        userToken,
        setUserToken,
        PassNotMatch,
        userTransection,
      }}
    >
      {children}
    </BankContext.Provider>
  );
};
