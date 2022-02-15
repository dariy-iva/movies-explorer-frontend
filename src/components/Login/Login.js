import React from "react";
import "./Login.css";
import Header from "../Header/Header";
import FormSign from "../FormSign/FormSign";

function Login() {

  function handleSubmit(e) {
    e.preventDefault();
  }
  
  return (
    <>
      <Header />
      <main className="login">
        <FormSign
          name="login"
          title="Рады видеть!"
          buttonSubmit="Войти"
          onSubmit={handleSubmit}
        ></FormSign>
      </main>
    </>
  );
}

export default Login;
