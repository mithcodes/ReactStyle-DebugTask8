import React, { useReducer, useEffect } from "react";
import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";

const initialState = {
  enteredEmail: "",
  emailIsValid: undefined,
  enteredPassword: "",
  passwordIsValid: undefined,
  formIsValid: false,
};

const loginReducer = (state, action) => {
  switch (action.type) {
    case "EMAIL_INPUT":
      return {
        ...state,
        enteredEmail: action.value,
      };
    case "PASSWORD_INPUT":
      return {
        ...state,
        enteredPassword: action.value,
      };
    case "VALIDATE_EMAIL":
      return {
        ...state,
        emailIsValid: state.enteredEmail.includes("@"),
      };
    case "VALIDATE_PASSWORD":
      return {
        ...state,
        passwordIsValid: state.enteredPassword.trim().length > 6,
      };
    case "VALIDATE_FORM":
      return {
        ...state,
        formIsValid: state.enteredEmail.includes("@") && state.enteredPassword.trim().length > 6,
      };
    default:
      return state;
  }
};

const Login = (props) => {
  const [state, dispatch] = useReducer(loginReducer, initialState);

  useEffect(() => {
    dispatch({ type: "VALIDATE_FORM" });
  }, [state.enteredEmail, state.enteredPassword]);

  const emailChangeHandler = (event) => {
    dispatch({ type: "EMAIL_INPUT", value: event.target.value });
  };

  const passwordChangeHandler = (event) => {
    dispatch({ type: "PASSWORD_INPUT", value: event.target.value });
  };

  const validateEmailHandler = () => {
    dispatch({ type: "VALIDATE_EMAIL" });
  };

  const validatePasswordHandler = () => {
    dispatch({ type: "VALIDATE_PASSWORD" });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(state.enteredEmail, state.enteredPassword);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            state.emailIsValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={state.enteredEmail}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            state.passwordIsValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={state.enteredPassword}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!state.formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
