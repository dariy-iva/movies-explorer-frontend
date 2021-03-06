import React from "react";
import "./Login.css";
import useFormValidator from "../../hooks/useFormValidator";
import FormSign from "../FormSign/FormSign";
import InputFormSign from "../FormSign/InputFormSign/InputFormSign";
import { inputConfig } from "../../utils/constants/inputsConfig";
import Logo from "../Logo/Logo";

export default function Login({ handleLogin }) {
  const { values, handleChange, errors, isValid } =
  useFormValidator({});

  function handleSubmit(e) {
    e.preventDefault();
    handleLogin(values);
  }

  return (
    <>
      <main className="login">
        <Logo />
        <FormSign
          name="login"
          title="Рады видеть!"
          buttonSubmit="Войти"
          onSubmit={handleSubmit}
          isNewUser={false}
          isValid={isValid}
        >
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
