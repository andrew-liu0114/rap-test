import React from "react";
import { IInput } from "../../types";
import { capitalizeFirstLetter } from "../../utils";
import classnames from "classnames";

import "./index.scss";

const Input = ({
  type,
  register,
  name,
  placeholder,
  pattern,
  error,
}: IInput) => {
  return (
    <div className="form-control">
      <label className="form-control__label">
        {capitalizeFirstLetter(name)}
      </label>
      <input
        type={type}
        className={classnames(
          `form-control__input--${name}`,
          error && `form-control__input--${name}__error`
        )}
        placeholder={placeholder}
        {...register(name, {
          required: "This field is required.",
          maxLength: {
            value: name === "email" ? 50 : 16,
            message:
              name === "email"
                ? "Email length should be less than 50"
                : "Password length should be between 4 and 16",
          },
          minLength: {
            value: name === "password" && 4,
            message:
              name === "password" &&
              "Password length should be between 4 and 16",
          },
          pattern: { value: pattern, message: "Not a valid email" },
        })}
      />
    </div>
  );
};

export default Input;
