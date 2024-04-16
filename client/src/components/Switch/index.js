import React from "react";
import "./switch.css";
import COLORS from "../../constants/color";

const Switch = (props) => {
  return (
    <>
      <input
        checked={props.isOn}
        onChange={props.handleToggle}
        type="checkbox"
        id={"react-switch-new"}
        className="react-switch-checkbox"
      />
      <label
        style={{ background: props.isOn && props.onColor }}
        className="react-switch-label"
        htmlFor={"react-switch-new"}
      >
        <span
          className={"react-switch-button"}
          style={{ background: COLORS.SECONDARY }}
        />
      </label>
    </>
  );
};

export default Switch;
