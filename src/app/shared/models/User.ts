import { Insurance } from "./Insurance";

export interface User {
  name: {
    firstname: string;
    lastname: string;
  };
  email: string;
  password: string;
  insurances: Insurance[];
  expired_insurances: Insurance[];
}