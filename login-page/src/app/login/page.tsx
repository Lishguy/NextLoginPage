'use client'

import React, {useState, useEffect} from 'react'
import Link from 'next/link'
import GoogleLogin from '@/components/GoogleLogin'
import GithubLogin from '@/components/GithubLogin'
import LinkedinLogin from '@/components/LinkedinLogin'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useRouter } from 'next/navigation'
// import Success from '../success/page'

type Inputs = {
  email: string
  password: string
}

const page = () => {
    const { register, handleSubmit, reset, setValue } = useForm<Inputs>()
  const [loading, setLoading] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const router = useRouter()

   // ✅ Auto-fill if details are remembered
  useEffect(() => {
    const savedEmail = localStorage.getItem('rememberEmail')
    const savedPassword = localStorage.getItem('rememberPassword')

    if (savedEmail && savedPassword) {
      setValue('email', savedEmail)
      setValue('password', savedPassword)
      setRememberMe(true)
    }
  }, [setValue])

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setLoading(true)
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })

      const result = await res.json()

      if (!res.ok) {
        alert(result.message || 'Something went wrong')
      } else {
        alert('Login successful')

         // ✅ Remember Me Logic
        if (rememberMe) {
          localStorage.setItem('rememberEmail', data.email)
          localStorage.setItem('rememberPassword', data.password)
        } else {
          localStorage.removeItem('rememberEmail')
          localStorage.removeItem('rememberPassword')
        }

        reset()
        router.push('/success')
      }


    } catch (err) {
      alert('Something went wrong')
    } finally {
      setLoading(false)
    }
  }
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
                        {...register('email', { required: true })}
                        />

                    </div>
                     <div className=" flex flex-col gap-2 mt-5">
                        <label>Password</label>
                        <input className="text-black border border-black/20 rounded-lg p-1 shadow-md bg-white" type="password" 
                        {...register('password', { required: true })}
                        />
                        
                    </div>

                    <div className="flex gap-2 mt-5">
                        <input 
                            type="checkbox"
                            checked={rememberMe}
                            onChange={() => setRememberMe(!rememberMe)}
                         />
                        <label>Remember me</label>
                    </div>

                    <input 
                    type="submit" 
                    disabled={loading}
                    value={loading ? 'Logging in...' : 'Login'}
                    className="w-full cursor-pointer bg-gray-200 rounded-md p-1 hover:shadow-md mt-5 font-bold text-gray-700" />
                    <div className="mt-5">
                        <span>Dont have an account with us?</span><Link href="/register" className="text-orange-300 ml-1 cursor-pointer">Register Now</Link>
                    </div>
                </form>
            </div>
        </div>  
    </>
  )
}

export default page
