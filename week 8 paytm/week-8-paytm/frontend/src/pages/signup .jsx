import { HeadingComponent } from "../components/Heading";
import { SubHeadingComponent } from "../components/SubHeading";
import { InputBox } from "../components/InputBox";
import { Button } from "../components/Button";
import { ButtonWarning } from "../components/ButtonWarning";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export function Signup() {
  const [FirstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  const [Username, setUserName] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const navigate = useNavigate();
  return (
    <div className="flex bg-slate-300  h-screen justify-center">
      <div className="flex flex-col justify-center bg-white p-4 m-12 w-120 rounded-4xl text-center">
        <HeadingComponent label={"Sign Up"} />
        <SubHeadingComponent
          label={"Enter your information to create an account"}
        />
        <InputBox
          label={"First Name"}
          placeholder={"Enter your First Name"}
          onChange={(e) => {
            setFirstName(e.target.value);
          }}
        ></InputBox>
        <InputBox
          label={"Last Name"}
          placeholder={"Enter your Last Name"}
          onChange={(e) => {
            setLastName(e.target.value);
          }}
        ></InputBox>
        <InputBox
          label={"Username"}
          placeholder={"Enter your Username"}
          onChange={(e) => {
            setUserName(e.target.value);
          }}
        ></InputBox>
        <InputBox
          label={"Email"}
          placeholder={"Enter your email"}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        ></InputBox>
        <InputBox
          label={"Pasword"}
          placeholder={"Enter your password"}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        ></InputBox>
        <Button
          label={"Sign Up"}
          onClick={async () => {
            const response = await axios.post(
              "http://localhost:3000/api/v1/user/signup",
              {
                firstName: FirstName,
                lastName: LastName,
                username: Username,
                email: Email,
                password: Password,
              }
            );

            localStorage.setItem("token", response.data.token);
            navigate("/dashboard");
          }}
        ></Button>
        <ButtonWarning
          label={"Already have an account? "}
          buttonText={"Sign in"}
          to={"/signin"}
        ></ButtonWarning>
      </div>
    </div>
  );
}
