'use client'
import { useState } from 'react'

export default function Main() {

  const [activeForm, setActiveForm] = useState('login')
  const [bubbleActive, setBubbleActive] = useState(false)

  const [emailValue, setEmailValue] = useState('')
  const [passwordValue, setPasswordValue] = useState('')

  const englishRegex = /^[\x00-\x7F]*$/

  const validateSignUp = () => {
    const emailRegex =
      /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/

    const hasUpper = /[A-Z]/.test(passwordValue)
    const hasLower = /[a-z]/.test(passwordValue)
    const hasNumber = /[0-9]/.test(passwordValue)
    const hasSpecial = /[^A-Za-z0-9]/.test(passwordValue)
    const minLength = passwordValue.length >= 8

    return {
      validEmail: emailRegex.test(emailValue),
      englishOnly:
        englishRegex.test(emailValue) &&
        englishRegex.test(passwordValue),
      hasUpper,
      hasLower,
      hasNumber,
      hasSpecial,
      minLength
    }
  }

  const signUpValidation = validateSignUp()

  const signUpIsValid =
    signUpValidation.validEmail &&
    signUpValidation.englishOnly && signUpValidation.hasUpper && signUpValidation.hasLower && signUpValidation.hasNumber && signUpValidation.hasSpecial &&
    signUpValidation.minLength

  const loginIsValid =
    emailValue.trim() !== '' &&

    passwordValue.trim() !== '' &&

    englishRegex.test(emailValue) && englishRegex.test(passwordValue)

  const passwordStrength =
    [
      signUpValidation.minLength,
      signUpValidation.hasUpper,
      signUpValidation.hasLower, signUpValidation.hasNumber,
      signUpValidation.hasSpecial


    ].filter(Boolean).length

  const handleSwitch = () => {
    setBubbleActive(true)

    setTimeout(() => {
      setActiveForm(prev =>

        prev === 'login' ? 'signup' : 'login'
      )
      setEmailValue('')
      setPasswordValue('')
    }, 350)

    setTimeout(() => {
      setBubbleActive(false)
    }, 700)
  }

  return (
    <div className="relative h-screen w-screen flex items-center justify-center bg-black overflow-hidden">


      <div
        className={`absolute w-[800px] h-[800px] rounded-full 
        bg-gradient-to-br from-purple-600 to-pink-600 
        transition-all duration-700
        ${bubbleActive ? 'scale-150 opacity-100' : 'scale-0 opacity-0'}`}
      />

      <div className="relative z-10 w-[420px] p-10 rounded-3xl 
      bg-white/10 backdrop-blur-xl border border-white/20 
      text-white shadow-2xl">

        <h2 className="text-3xl font-bold text-center mb-8">
          {activeForm === 'login' ? 'Login' : 'Sign Up'}
        </h2>

        <div className="flex flex-col gap-5">

          <input
            type="email"
            placeholder="Email (English only)"
            value={emailValue}
            onChange={(e) => setEmailValue(e.target.value)}
            className="p-4 rounded-xl bg-white/20 border border-white/30 focus:outline-none focus:ring-2 focus:ring-purple-400"
          />

          <div>
            <input
              type="password"
              placeholder="Password (English only)"
              value={passwordValue}
              onChange={(e) => setPasswordValue(e.target.value)}
              className="w-full p-4 rounded-xl bg-white/20 border border-white/30 focus:outline-none focus:ring-2 focus:ring-purple-400"
            />

            {activeForm === 'signup' && (
              <>
                <div className="h-2 bg-white/20 rounded mt-3 overflow-hidden">
                  <div
                    className={`h-full transition-all duration-300
                    ${passwordStrength <= 2
                        ? 'bg-red-500 w-1/4'
                        : passwordStrength === 3
                          ? 'bg-yellow-500 w-2/4'
                          : passwordStrength === 4
                            ? 'bg-blue-500 w-3/4'
                            : 'bg-green-500 w-full'
                      }`}
                  />
                </div>

                <div className="text-sm mt-3 space-y-1 text-white/80">
                  <p className={signUpValidation.minLength ? 'text-green-400' : ''}>
                    • Minimum 8 characters
                  </p>
                  <p className={signUpValidation.hasUpper ? 'text-green-400' : ''}>
                    • One uppercase letter
                  </p>
                  <p className={signUpValidation.hasLower ? 'text-green-400' : ''}>
                    • One lowercase letter
                  </p>
                  <p className={signUpValidation.hasNumber ? 'text-green-400' : ''}>
                    • One number
                  </p>
                  <p className={signUpValidation.hasSpecial ? 'text-green-400' : ''}>
                    • One special character
                  </p>
                </div>
              </>
            )}
          </div>

          {!englishRegex.test(emailValue) ||
            !englishRegex.test(passwordValue) ? (
            <p className="text-red-400 text-sm">
              Only English characters are allowed.
            </p>
          ) : null}

          <button
            disabled={
              activeForm === 'login'
                ? !loginIsValid
                : !signUpIsValid
            }
            className="mt-4 py-3 rounded-xl font-semibold 
            bg-gradient-to-r from-purple-500 to-pink-500 
            hover:scale-105 active:scale-95 transition-all 
            disabled:opacity-40"
          >
            {activeForm === 'login' ? 'Login' : 'Create Account'}
          </button>

          <p className="text-center text-white/70">
            {activeForm === 'login'
              ? "Don't have an account?"
              : 'Already have an account?'}{' '}
            <span
              onClick={handleSwitch}
              className="text-pink-400 cursor-pointer hover:underline"
            >
              {activeForm === 'login' ? 'Sign Up' : 'Login'}
            </span>
          </p>

        </div>
      </div>
    </div>
  )
}