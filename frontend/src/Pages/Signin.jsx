import {Heading} from "../components/Heading"
import { Subheading} from "../components/Subheading"
import {InputBox} from "../components/InputBox"
import axios from "axios"
import { Button} from "../components/Button"
import {BottomWarning} from "../components/BottomWarning"


export const  Signin = ()=>{
  return <div className="bg-slate-300 h-screen flex justify-center">
    <div className="flex flex-col justify-center">
    <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
    <Heading label={"Sign In"}></Heading>
    <Subheading text={"Enter your credentials to access your account"}></Subheading>
    <InputBox label={"Email"} placeholder={"hardikarora@gmail.com"}></InputBox>
    <InputBox label={"Password"} placeholder={"123456"}></InputBox>
    <div className="pt-4">
    <Button label={"Sign In"} onClickhandler={()=>{
        const response = axios.post("http://localhost:3000/api/v1/user/signup", {

        })
    }}></Button>
    </div>
    <BottomWarning label={"Dont have an account?"} buttontext={"Signup"} to={"/signup"}></BottomWarning>
  </div>
  </div>
  </div>
}