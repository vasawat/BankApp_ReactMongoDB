import React, { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import Swal from "sweetalert2";
export const BankContext = createContext();

export const BankProvider = ({ children }) => {
  const [userLogined, setUserLogined] = useState(null);
  const [loginShow, setLoginShow] = useState(false);
  const [registerShow, setRegisterShow] = useState(false);
  const [transferShow, setTransferShow] = useState(false);
  const [wrongPass, setWrongPass] = useState(false);
  const [registerError, setRegisterError] = useState(false);
  const [PassNotMatch, setPassNotMatch] = useState(false);
  const [userTransection, setUserTransection] = useState([]);

  const checkToken = () => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      fetch(`http://localhost:5000/user/token`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ userId: decodedToken.sub }),
      })
        .then((res) => res.json())
        .then((data) => setUserLogined(data));
    } else {
    }
  };
  const fetchTransection = () => {
    if (userLogined) {
      fetch(`http://localhost:5000/user/transaction`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userEmail: userLogined.email }),
      })
        .then((res) => res.json())
        .then((data) => setUserTransection(data));
    } else {
    }
  };
  const handleLogin = (data) => {
    fetch("http://localhost:5000/auth/login", {
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
          const isMobile = window.innerWidth <= 768;
          if (isMobile) {
            Swal.fire({
              title: "login successfully",
              icon: "success",
              showConfirmButton: false,
              timer: 1500,
            });
          } else {
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
        }
      });
  };
  const handleRegister = (data) => {
    if (data.passwordRegister !== data.confirmPasswordRegister) {
      setPassNotMatch(true);
    } else {
      setPassNotMatch(false);
      fetch("http://localhost:5000/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            setRegisterError(true);
          } else {
            setRegisterShow(false);
            const isMobile = window.innerWidth <= 768;
            if (isMobile) {
              Swal.fire({
                title: "Register successfully",
                icon: "success",
                showConfirmButton: false,
                timer: 1500,
              });
            } else {
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
          }
        });
    }
  };
  const createTransection = async (data) => {
    await fetch("http://localhost:5000/user/createtransaction", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  };
  const handleDeposit = async (data) => {
    let newData = { ...data, userId: userLogined._id };
    await fetch("http://localhost:5000/user/deposit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newData),
    })
      .then((res) => res.json())
      .then((data) => setUserLogined(data));
    const isMobile = window.innerWidth <= 768;
    if (isMobile) {
      Swal.fire({
        title: "Deposit successfully",
        icon: "success",
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      const Toast = Swal.mixin({
        toast: true,
        showConfirmButton: false,
        position: "top-end",
        timer: 1500,
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
    }
  };
  const handleWithdrew = async (data) => {
    let newData = { ...data, userId: userLogined._id };
    await fetch("http://localhost:5000/user/withdrew", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newData),
    })
      .then((res) => res.json())
      .then((data) => {
        const isMobile = window.innerWidth <= 768;
        if (data.error) {
          if (isMobile) {
            Swal.fire({
              title: data.error,
              icon: "error",
              showConfirmButton: false,
              timer: 1500,
            });
          } else {
            const Toast = Swal.mixin({
              toast: true,
              position: "top-end",
              showConfirmButton: false,
              timer: 1500,
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
          }
        } else {
          setUserLogined(data);

          if (isMobile) {
            Swal.fire({
              title: "Withdrew successfully",
              icon: "success",
              showConfirmButton: false,
              timer: 1500,
            });
          } else {
            const Toast = Swal.mixin({
              toast: true,
              showConfirmButton: false,
              position: "top-end",
              timer: 1500,
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
        }
      });
  };
  const handleTransfer = async (data) => {
    let newData = { ...data, userId: userLogined._id };
    await fetch("http://localhost:5000/user/transfer", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newData),
    })
      .then((res) => res.json())
      .then((data) => {
        const isMobile = window.innerWidth <= 768;
        if (data.error) {
          if (isMobile) {
            Swal.fire({
              title: data.error,
              icon: "error",
              showConfirmButton: false,
              timer: 1500,
            });
          } else {
            const Toast = Swal.mixin({
              toast: true,
              position: "top-end",
              showConfirmButton: false,
              timer: 1500,
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
          }
        } else {
          createTransection(newData);
          setUserLogined(data);
          setTransferShow(false);
          if (isMobile) {
            Swal.fire({
              title: "Transfer successfully",
              icon: "success",
              showConfirmButton: false,
              timer: 1500,
            });
          } else {
            const Toast = Swal.mixin({
              toast: true,
              position: "top-end",
              showConfirmButton: false,
              timer: 1500,
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
        }
      });
  };

  useEffect(() => {
    checkToken();
  }, []);
  useEffect(() => {
    fetchTransection();
    // eslint-disable-next-line
  }, [userLogined]);
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
        PassNotMatch,
        userTransection,
        fetchTransection,
        checkToken,
        registerError,
      }}
    >
      {children}
    </BankContext.Provider>
  );
};
