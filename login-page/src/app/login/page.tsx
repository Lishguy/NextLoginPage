"use client"

import GithubLogin from "@/components/GithubLogin";
import GoogleLogin from "@/components/GoogleLogin";
import LinkedinLogin from "@/components/LinkedinLogin";
import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
    email: string;
    password: string;
};

const Login = () => {
    const {
        register, 
        handleSubmit, 
        formState: {errors},
        reset,
} = useForm<Inputs>();
const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log("data", data);
    reset();
  
};  
  return (
    <>
        <div className="w-full min-h-screen grid bg-orange-300/20">
            <div className="m-auto my-7">
                <h1 className="w-full font-bold text-3xl mb-5 text-center uppercase text-gray-800/80">
                    Hey There 👋
                </h1>
                <form
                onSubmit={handleSubmit(onSubmit)}
                className="border border-white/40 p-16 bg-white/30 rounded-lg shadow-md">
                    <h1 className="text-center font-semibold text-3xl mb-4">Login</h1>
                    <div className="flex gap-3 mb-5">
                         <GoogleLogin />
                          <GithubLogin />
                          <LinkedinLogin />
                    </div>
                    <div className="text-center font-bold text-lg mt-5 ">or login with</div>
                   
                    <div className=" flex flex-col gap-2">
                        <label>Email</label>
                        <input className="text-black border border-black/20 rounded-lg p-1 shadow-md bg-white" type="email"
                        {...register("email")}
                        />

                    </div>
                     <div className=" flex flex-col gap-2 mt-5">
                        <label>Password</label>
                        <input className="text-black border border-black/20 rounded-lg p-1 shadow-md bg-white" type="password" 
                        {...register("password")}
                        />
                        
                    </div>

                    <div className="flex gap-2 mt-5">
                        <input type="checkbox" />
                        <label>Remember me</label>
                    </div>

                    <input type="submit" className="w-full cursor-pointer bg-gray-200 rounded-md p-1 hover:shadow-md mt-5 font-bold text-gray-700" />
                    <div className="mt-5">
                        <span>Dont have an account with us?</span><Link href="/register" className="text-orange-300 ml-1 cursor-pointer">Register Now</Link>
                    </div>
                </form>
            </div>
        </div>  
    </>
  )
}

export default Login;
