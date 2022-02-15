import React from "react";
import "./Register.css";
import Header from "../Header/Header";
import FormSign from "../FormSign/FormSign";

function Register() {

  function handleSubmit(e) {
    e.preventDefault();
  }

  return (
    <>
      <Header />
      <main className="register">
        <FormSign name="register" title="Добро пожаловать!" buttonSubmit="Зарегистрироваться" onSubmit={handleSubmit}>
          
        </FormSign>
      </main>
    </>
  );
}

export default Register;
