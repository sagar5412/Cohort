import { HeadingComponent } from "../components/Heading";
import { SubHeadingComponent } from "../components/SubHeading";
import { InputBox } from "../components/InputBox";
import { Button } from "../components/Button";
import { ButtonWarning } from "../components/ButtonWarning";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function Signin() {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  return (
    <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-4xl bg-white w-140 text-center p-2 h-max px-4">
          <HeadingComponent label={"Sign In"} />
          <SubHeadingComponent
            label={"Enter your credentials to access your account"}
          />
          <InputBox
            label={"Email or Username"}
            placeholder={"Enter your email or username"}
            onChange={(e) => {
              setIdentifier(e.target.value);
            }}
          />
          <InputBox
            label={"Password"}
            placeholder={"Enter your password"}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <Button
            label={"Sign In"}
            onClick={async () => {
              const response = await axios.post(
                "http://localhost:3000/api/v1/user/signin",
                {
                  identifier,
                  password,
                }
              );
              localStorage.setItem("token", response.data.token);
              navigate("/dashboard");
            }}
          />
          <ButtonWarning
            label={"Don't have an account? "}
            buttonText={"Sign Up"}
            to={"/signup"}
          />
        </div>
      </div>
    </div>
  );
}
