import React from "react";
import "./Login.css";
import FormSign from "../FormSign/FormSign";
import InputFormSign from "../InputFormSign/InputFormSign";
import { inputConfig } from "../../utils/constants/inputConfig";
import Logo from "../Logo/Logo";

function Login() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  React.useEffect(() => {
    setEmail("");
    setPassword("");
  }, []);

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
      <main className="login">
      <Logo />
        <FormSign
          name="login"
          title="Рады видеть!"
          buttonSubmit="Войти"
          onSubmit={handleSubmit}
        >
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

export default Login;
