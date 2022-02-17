import React from "react";
import "./InfoToolTipPopup.css"

export default function InfoTooltipPopup(props) {
  const { isOpen, onClose, serverMessage } = props;

  return (
    <div className={`popup ${isOpen && "popup_opened"}`}>
        <p className="popup__text">{serverMessage}</p>
        <button type="button" className="popup__reset-button" onClick={onClose} />
    </div>
  );
}
