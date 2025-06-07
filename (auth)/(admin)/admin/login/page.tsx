import React from "react";
import FormLogin from "./components/form-login";

const LoginPage = () => {
  return (
    <div className="rounded-sm shadow-sm bg-white p-6 w-[500px]">
      <h1 className="flex justify-center text-2xl pb-4 text-black">Authentication</h1>
      <FormLogin />
    </div>
  );
};

export default LoginPage;
