import { ErrorMessage } from "@hookform/error-message";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Input from "../../components/Input";
import { FormValues } from "../../types";

import "./index.scss";

const loginUrl = "http://dev.rapptrlabs.com/Tests/scripts/user-login.php";

const Login: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<FormValues>({ mode: "onChange", reValidateMode: "onChange" });
  const [axiosError, setAxiosError] = useState(false);
  const navigate = useNavigate();
  const onSubmit = async (data: FormValues) => {
    await axios({
      method: "post",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      url: loginUrl,
      data,
    })
      .then((res) => {
        localStorage.setItem("info", JSON.stringify(res.data));
        navigate("/");
      })
      .catch((err) => setAxiosError(true));
  };

  useEffect(() => {
    const data: string | null = localStorage.getItem("info");
    const userInfo = data && JSON.parse(data);
    if (userInfo) {
      navigate("/");
    }
  });
  return (
    <div className="login--container">
      <div className="login--container__avatar">
        <img
          src='data:image/svg+xml,%3Csvg xmlns="http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg" width="1rem" height="1rem" preserveAspectRatio="xMidYMid meet" viewBox="0 0 32 32"%3E%3Cpath fill="none" d="M8.007 24.93A4.996 4.996 0 0 1 13 20h6a4.996 4.996 0 0 1 4.993 4.93a11.94 11.94 0 0 1-15.986 0ZM20.5 12.5A4.5 4.5 0 1 1 16 8a4.5 4.5 0 0 1 4.5 4.5Z"%2F%3E%3Cpath fill="teal" d="M26.749 24.93A13.99 13.99 0 1 0 2 16a13.899 13.899 0 0 0 3.251 8.93l-.02.017c.07.084.15.156.222.239c.09.103.187.2.28.3c.28.304.568.596.87.87c.092.084.187.162.28.242c.32.276.649.538.99.782c.044.03.084.069.128.1v-.012a13.901 13.901 0 0 0 16 0v.012c.044-.031.083-.07.128-.1c.34-.245.67-.506.99-.782c.093-.08.188-.159.28-.242c.302-.275.59-.566.87-.87c.093-.1.189-.197.28-.3c.071-.083.152-.155.222-.24ZM16 8a4.5 4.5 0 1 1-4.5 4.5A4.5 4.5 0 0 1 16 8ZM8.007 24.93A4.996 4.996 0 0 1 13 20h6a4.996 4.996 0 0 1 4.993 4.93a11.94 11.94 0 0 1-15.986 0Z"%2F%3E%3C%2Fsvg%3E'
          alt="user_avatar"
        />
      </div>
      <h1 className="login--container__title">Rapptr Labs</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="login--container__form"
      >
        <div>
          <Input
            type="text"
            register={register}
            name="email"
            error={!!errors.email}
            placeholder="user@rapptrlabs.com"
            pattern={/[a-z0-9]+@[a-z]+\.[a-z]{2,3}/}
          />
          <ErrorMessage
            errors={errors}
            name="email"
            render={({ message }) => (
              <p className="login--container__form__error">{message}</p>
            )}
          />
        </div>
        <div>
          <Input
            type="password"
            register={register}
            error={!!errors.password}
            name="password"
            placeholder="Must be at least 4 characters"
          />
          <ErrorMessage
            errors={errors}
            name="password"
            render={({ message }) => (
              <p className="login--container__form__error">{message}</p>
            )}
          />
        </div>
        <div className="login--container__form__submit">
          <input
            type="submit"
            value="Login"
            disabled={isSubmitting || !isValid}
          />
          {axiosError && (
            <span>The Server could not be reached, Please try again later</span>
          )}
        </div>
      </form>
    </div>
  );
};

export default Login;
