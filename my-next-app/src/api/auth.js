import { post } from "@/setup/client";

const registerUser = (body) => {
  return post("/api/auth/register", {...body});
};

const loginUser = (body) => {
  return post("/api/auth/login", {...body});
};

export {
  registerUser,
  loginUser
}
