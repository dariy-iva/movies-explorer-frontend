import React from "react";
import "./Register.css";
import useFormWithValidation from "../../utils/FormValidator";
import FormSign from "../FormSign/FormSign";
import InputFormSign from "../FormSign/InputFormSign/InputFormSign";
import { inputConfig } from "../../utils/constants/inputsConfig";
import Logo from "../Logo/Logo";

export default function Register() {
  const { values, handleChange, errors, isValid, resetForm } =
    useFormWithValidation();

  function handleSubmit(e) {
    e.preventDefault();
    resetForm();
  }

  return (
    <>
      <main className="register">
        <Logo />
        <FormSign
          name="register"
          title="Добро пожаловать!"
          buttonSubmit="Зарегистрироваться"
          onSubmit={handleSubmit}
          isNewUser={true}
          isValid={isValid}
        >
          <InputFormSign
            value={values.name || ""}
            onChange={handleChange}
            config={inputConfig.name}
            error={errors.name || ""}
          />
          <InputFormSign
            value={values.email || ""}
            onChange={handleChange}
            config={inputConfig.email}
            error={errors.email || ""}
            pattern="^([^ ]+@[^ ]+\.[a-z]{2,6}|)$"
          />
          <InputFormSign
            value={values.password || ""}
            onChange={handleChange}
            config={inputConfig.password}
            error={errors.password || ""}
          />
        </FormSign>
      </main>
    </>
  );
}
