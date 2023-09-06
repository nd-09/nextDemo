"use client";
import React from "react";
import signIn from "@/firebase/auth/signin";
import { useRouter } from "next/navigation";
import phoneAuth from "@/firebase/auth/phoneAuth";
import { RecaptchaVerifier } from "firebase/auth";

function Page() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [mobile, setMobile] = React.useState("");
  const [otp, setOtp] = React.useState("");
  const router = useRouter();
  const [emailValue, setEmailValue] = React.useState(1);
  const [mobileValue, setMobileValue] = React.useState(0);
  const handleForm = async (event) => {
    event.preventDefault();

    const { result, error } = await signIn(email, password);

    if (error) {
      return console.log(error);
    }

    // else successful
    console.log(result);
    return router.push("/admin");
  };


  const handleOtp = async (event) => {
    event.preventDefault();

    const { result, error } = await phoneAuth(mobile,RecaptchaVerifier);
    console.log("result",result)
    if (error) {
      return console.log(error);
    }

    // else successful
    console.log(result);
    return router.push("/admin");
  };
  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="form-wrapper">
        <h1 className="mt-60 mb-30">Sign in</h1>
        <div className="flex flex-wrap m-1">
          <input
            className="m-1"
            type="radio"
            checked={emailValue}
            onChange={() => {
              setEmailValue(1);
              setMobileValue(0);
            }}
          />
          <label>Email</label>

          <input
            className="m-1"
            type="radio"
            checked={mobileValue}
            onChange={() => {
              setEmailValue(0);
              setMobileValue(1);
            }}
          />
          <label>Mobile</label>
        </div>

        {mobileValue ? (
          <form onSubmit={handleOtp} className="form">
            <label htmlFor="mobile">
              <p>Mobile</p>
              <input
                onChange={(e) => setMobile(e.target.value)}
                required
                type="mobile"
                name="mobile"
                id="mobile"
                placeholder="+91 000-000-00-00"
              />
              <button type="button" className="m-3" onClick={handleOtp}>
              Get otp
            </button>
            </label>
            <label htmlFor="password">
              <p>OTP</p>
              <input
                onChange={(e) => setOtp(e.target.value)}
                required
                type="password"
                name="password"
                id="password"
                placeholder="otp"
              />
            </label>

            <button type="submit" className="m-3">
              Sign in
            </button>
          </form>
        ) : (
          <form onSubmit={handleForm} className="form">
            <label htmlFor="email">
              <p>Email</p>
              <input
                onChange={(e) => setEmail(e.target.value)}
                required
                type="email"
                name="email"
                id="email"
                placeholder="example@mail.com"
              />
            </label>
            <label htmlFor="password">
              <p>Password</p>
              <input
                onChange={(e) => setPassword(e.target.value)}
                required
                type="password"
                name="password"
                id="password"
                placeholder="password"
              />
            </label>

            <button type="submit" className="">
              Sign in
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default Page;
