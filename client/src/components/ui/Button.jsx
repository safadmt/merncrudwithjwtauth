import React, { memo } from "react";
function Button(props) {
  const { className, label, type="button", onClick , disabled = false} = props;

  return (
    <>
      <button
        type={type}
        onClick={onClick}
        disabled = {disabled}
        className={`px-4 py-2 mt-2 ${className}`}
      >
        {label}
      </button>
    </>
  );
}
export default memo(Button)