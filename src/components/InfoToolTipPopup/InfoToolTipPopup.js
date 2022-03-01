import React from "react";
import "./InfoToolTipPopup.css"

export default function InfoTooltipPopup(props) {
  const { isOpen, onClose, message } = props;

  return (
    <div className={`popup ${isOpen && "popup_opened"}`}>
        <p className="popup__text">{message}</p>
        <button type="button" className="popup__reset-button link-hover" onClick={onClose} />
    </div>
  );
}
