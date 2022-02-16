import React from "react";
import "./Register.css";
import FormSign from "../FormSign/FormSign";
import InputFormSign from "../InputFormSign/InputFormSign";
import { inputConfig } from "../../utils/constants/inputConfig";
import Logo from "../Logo/Logo";

function Register() {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  React.useEffect(() => {
    setName("");
    setEmail("");
    setPassword("");
  }, []);

  function handleChangeInputName(e) {
    setName(e.target.value);
  }

  function handleChangeInputEmail(e) {
    setEmail(e.target.value);
  }

  function handleChangeInputPassword(e) {
    setPassword(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
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
        >
          <InputFormSign
            value={name}
            onChange={handleChangeInputName}
            config={inputConfig.name}
          />
          <InputFormSign
            value={email}
            onChange={handleChangeInputEmail}
            config={inputConfig.email}
          />
          <InputFormSign
            value={password}
            onChange={handleChangeInputPassword}
            config={inputConfig.password}
          />
        </FormSign>
      </main>
    </>
  );
}

export default Register;
