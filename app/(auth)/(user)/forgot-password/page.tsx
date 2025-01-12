import React from "react";
import FormForgotPassword from "./components/form-forgot-password";

const ForgotPassword = () => {
  return (
    <div className="rounded-sm shadow-sm bg-white p-6 w-[500px]">
      <h1 className="flex justify-center text-2xl pb-4 text-black">Forgot Password?</h1>
      <p className="flex justify-center text-sm pb-4 text-zinc-400">Enter the email address registered on your account</p>
      <FormForgotPassword />
    </div>
  );
};

export default ForgotPassword;
