import React from "react";
import "./InputFormSign.css";

function Input({ value, onChange, config }) {
  const { label, type, minLength = "", maxLength = "", name } = config;

  return (
    <label className="input__field">
      {label}
      <input
        type={type}
        className="input"
        name={name}
        required
        minLength={minLength}
        maxLength={maxLength}
        value={value}
        onChange={onChange}
      />
      <span className="input__error"></span>
    </label>
  );
}

export default Input;
