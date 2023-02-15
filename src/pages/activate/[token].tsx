import axios from "axios";
import { NextPageContext } from "next";
import { signIn } from "next-auth/react";
import React, { useEffect, useState } from "react";

const activate = ({ token }: { token: string }) => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  useEffect(() => {
    activateAccount();
  }, [token]);
  const activateAccount = async () => {
    try {
      const { data } = await axios.put("/api/auth/activate", { token });
      setSuccess(data.message);
    } catch (error: any) {
      setError((error?.response?.data as Error).message);
    }
  };

  return (
    <div className="bg-neutral-100 h-screen flex items-center justify-center text-center">
      {error && (
        <div>
          <p className="text-red-500 font-bold">{error}</p>
          <button
            className="mg-4 bg-green-400 text-white hover:bg-green-500 text-md uppercase font-bold px-8 py-2 rounded-md sm:mr-2 mb-1 ease-linear transition-all duration-150"
            onClick={() => signIn()}
          >
            Sign in instead
          </button>
        </div>
      )}
      {success && (
        <div>
          <p className="text-black-500 font-bold">{success}</p>
          <button
            className="mg-4 bg-green-400 text-white hover:bg-green-500 text-md uppercase font-bold px-8 py-2 rounded-md sm:mr-2 mb-1 ease-linear transition-all duration-150"
            onClick={() => signIn()}
          >
            Sign in
          </button>
        </div>
      )}
    </div>
  );
};

export default activate;

export async function getServerSideProps(ctx: NextPageContext) {
  const { query } = ctx;
  const token = query.token;
  console.log(token);

  return {
    props: { token },
  };
}
