import validator from "validator";
import { UserType } from "../models/models";

export const validateUserInput = (user: UserType) => {
  const { email, password } = user;

  if (validator.isEmpty(email)) {
    throw Error("Email field is empty");
  }

  if (validator.isEmpty(password)) {
    throw Error("Password field is empty");
  }

  if (!validator.isLength(password,{min:7})) {
    throw Error("Password must be 7 caracters long");
  }

};
