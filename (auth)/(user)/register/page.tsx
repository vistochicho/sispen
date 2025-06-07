import React from "react";
import FormRegister from "./components/form-register";

const RegisterPage = () => {
  return (
    <div className="rounded-sm shadow-sm bg-white p-6 max-w-2xl w-full">
      <h1 className="flex justify-center text-2xl pb-8 text-black">Sign Up</h1>
      <FormRegister />
    </div>
  );
};

export default RegisterPage;
