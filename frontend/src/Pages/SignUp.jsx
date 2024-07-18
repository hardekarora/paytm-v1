import {Heading} from "../components/Heading"
import { Subheading} from "../components/Subheading"
import {InputBox} from "../components/InputBox"
import axios from "axios"
import { Button} from "../components/Button"
import {BottomWarning} from "../components/BottomWarning"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

export const SignUp=()=>{
    const navigate = useNavigate()
    const [ firstname , setFirstName] = useState("")
    const [ lastname , setLastName] = useState("")
    const [ username , setUsername] = useState("")
    const [ password, setPassword] = useState("")
    return <div className="bg-slate-300 h-screen flex justify-center">
         <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
        <Heading label={"Sign Up"}></Heading>
        <Subheading text ={"Enter your information to create an account"}></Subheading>
        <InputBox onchange={e=>{
            setFirstName(e.target.value) ;
        }} label={"First Name"} placeholder={"John"}></InputBox>
        <InputBox onchange={e=>{
            setLastName(e.target.value);
        }} label={"Last Name"} placeholder={"Doe"}></InputBox>
        <InputBox onchange={e=>{
            setUsername(e.target.value);
        }} label={"Email"} placeholder={"hardikarora411@gmail.com"}></InputBox>
        <InputBox onchange={e=>{
            setPassword(e.target.value)
        }} label={"Password"} placeholder={"123456gigachad"}></InputBox>
        <div className="pt-4">
        <Button label={"Sign Up"} onClickhandler={async()=>{
         const response = await  axios.post("http://localhost:3000/api/v1/user/signup", {
             firstName: firstname ,
             lastName : lastname ,
             username : username ,
             password : password
            })
            localStorage.setItem("token",response.data.token);
            navigate("/dashboard") ;
        }}></Button>
        </div>
        <BottomWarning label={"Already have an account"} buttontext={"Sign in"} to={"/signin"}></BottomWarning>
        </div>
        </div>
    </div>
}