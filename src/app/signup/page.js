"use client";
import React from "react";
import signUp from "@/firebase/auth/signup";
import { useRouter } from "next/navigation";
import {
  RecaptchaVerifier,
  getAuth,
  signInWithPhoneNumber,
} from "firebase/auth";
import firebase_app from "@/firebase/config";

function Page() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [mobile, setMobile] = React.useState("");
  const [otp, setOtp] = React.useState("");
  const [getotp, setGetOtp] = React.useState(1);
  const [emailValue, setEmailValue] = React.useState(1);
  const [mobileValue, setMobileValue] = React.useState(0);
  const router = useRouter();
  
  const auth = getAuth(firebase_app);
  const handleForm = async (event) => {
    event.preventDefault();

    const { result, error } = await signUp(email, password);
    console.log("result", result);
    if (error) {
      return console.log(error);
    }
    // else successful
    console.log(result);
    return router.push("/admin");
  };
  const handleOtp = async (event) => {
    event.preventDefault();
    console.log("mobile", mobile);
    setGetOtp(0);
    captchaVerify();
    const verifyApp = window.recaptchaVerifier;
    console.log("verify app",verifyApp);
    signInWithPhoneNumber(auth, mobile, verifyApp)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
      })
      .catch((error) => {
        console.log("oops", error);
      });
  };
  const captchaVerify = () => {
    console.log("here?");
    if (!window.recaptchaVerifier) {
      console.log("here inside capta if?");
      window.recaptchaVerifier = new RecaptchaVerifier(
        "recaptcha-container",
        {
          size: "invisible",
          callback: (response) => {
            console.log("response", response);
          },
          "expired-callback": () => {
            console.log("expired?");
          },
        },
        auth
      );
      console.log("end?");
    }
  };
  const onOtpVerify = () => {
    window.confirmationResult
      .confirm(otp)
      .then((result) => {
        // User signed in successfully.
        console.log("result", result);
        // ...
      })
      .catch((error) => {
        // User couldn't sign in (bad verification code?)
        // ...
      });
  };
  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="form-wrapper">
        <h1 className="mt-60 mb-30">Sign up</h1>

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
          <div className="form">
            <label htmlFor="mobile">
              <p>Mobile</p>
              <input
                onChange={(e) => setMobile(e.target.value)}
                required
                type="mobile"
                name="mobile"
                id="mobile"
                placeholder="10 digit mobile number"
              />
            </label>
            {getotp ? (
              <button type="button" className="m-3" onClick={handleOtp}>
                Get otp
              </button>
            ) : (
              <>
                {" "}
                <label htmlFor="password">
                  <p>OTP</p>
                  <input
                    onChange={(e) => setOtp(e.target.value)}
                    required
                    type="text"
                    name="OTP"
                    id="OTP"
                    placeholder="OTP"
                  />
                </label>
                <div id="recaptcha-container"></div>
                <button type="button" onClick={onOtpVerify}>
                  Verify
                </button>
              </>
            )}
          </div>
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
            <button type="submit">Sign up</button>
          </form>
        )}
      </div>
    </div>
  );
}

export default Page;
