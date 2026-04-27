import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { userAuth } from '../hook/useAuth'

const UserIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
  </svg>
)
const MailIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
  </svg>
)
const PhoneIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
  </svg>
)
const LockIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
  </svg>
)
const EyeIcon = ({ open }) => open ? (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
  </svg>
) : (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
  </svg>
)

function InputField({ id, label, type = 'text', icon, value, onChange, placeholder, rightElement }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-xs font-medium tracking-widest uppercase text-[#94a3b8]">
        {label}
      </label>
      <div className="relative flex items-center group">
        {/* left icon */}
        <span className="absolute left-4 text-[#94a3b8] group-focus-within:text-[#6366f1] transition-colors duration-200">
          {icon}
        </span>
        <input
          id={id}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          autoComplete="off"
          className="
            w-full bg-[#0e0e0e] text-[#e5e2e1] placeholder-[#4e4633]
            pl-11 pr-4 py-3.5 rounded-lg text-sm
            border border-transparent
            focus:outline-none focus:border-[#6366f1]/40 focus:ring-0
            transition-colors duration-200
          "
        />
        {rightElement && (
          <span className="absolute right-4 text-[#94a3b8]">{rightElement}</span>
        )}
      </div>
    </div>
  )
}

const Register = () => {
  const navigate = useNavigate()
  const { handleRegister } = userAuth()

  const [form, setForm] = useState({
    username: '',
    email: '',
    contact: '',
    password: '',
    isSeller: false,
  })
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const update = (field) => (e) =>
    setForm((prev) => ({
      ...prev,
      [field]: field === 'isSeller' ? e.target.checked : e.target.value,
    }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      await handleRegister({
        email: form.email,
        contact: form.contact,
        password: form.password,
        username: form.username,
        isSeller: form.isSeller
      })
      navigate('/')

    } catch (err) {
      console.log(err.response?.data)
      setError(err.response?.data?.message || 'Registration failed')
    } finally {
      setLoading(false)
    }

  }

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 py-16"
      style={{ backgroundColor: '#000000', fontFamily: "'Outfit', sans-serif" }}
    >
      {/* Card */}
      <div
        className="w-full max-w-md rounded-2xl px-10 py-12"
        style={{ backgroundColor: '#0a0a0a' }}
      >
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-[#e5e2e1] tracking-tight" style={{ letterSpacing: '-0.02em' }}>
            Create Account
          </h1>
          <p className="mt-2 text-sm text-[#94a3b8]">
            Join our community and start your journey.
          </p>
        </div>

        {/* Error banner */}
        {error && (
          <div className="mb-6 px-4 py-3 rounded-lg bg-[#93000a]/30 text-[#ffb4ab] text-sm">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
          <InputField
            id="username"
            label="Username"
            placeholder="john_doe"
            icon={<UserIcon />}
            value={form.username}
            onChange={update('username')}
          />

          <InputField
            id="email"
            label="Email"
            type="email"
            placeholder="john@example.com"
            icon={<MailIcon />}
            value={form.email}
            onChange={update('email')}
          />

          <InputField
            id="contact"
            label="Contact Number"
            type="tel"
            placeholder="+91 98765 43210"
            icon={<PhoneIcon />}
            value={form.contact}
            onChange={update('contact')}
          />

          <InputField
            id="password"
            label="Password"
            type={showPassword ? 'text' : 'password'}
            placeholder="Min. 8 characters"
            icon={<LockIcon />}
            value={form.password}
            onChange={update('password')}
            rightElement={
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="text-[#94a3b8] hover:text-[#6366f1] transition-colors duration-200 focus:outline-none"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                <EyeIcon open={showPassword} />
              </button>
            }
          />

          {/* isSeller checkbox */}
          <label
            htmlFor="isSeller"
            className="flex items-center gap-3 justify-center cursor-pointer select-none group mt-1"
          >
            <div className="relative flex items-center justify-center w-5 h-5 shrink-0">
              <input
                id="isSeller"
                type="checkbox"
                checked={form.isSeller}
                onChange={update('isSeller')}
                className="peer sr-only"
              />
              <div
                className="
                  w-5 h-5 rounded border border-[#4e4633]
                  bg-[#0e0e0e] transition-all duration-200
                  peer-checked:bg-[#6366f1] peer-checked:border-[#6366f1]
                  group-hover:border-[#6366f1]/50
                "
              />
              {/* Checkmark */}
              {form.isSeller && (
                <svg
                  className="absolute w-3 h-3 text-[#ffffff] pointer-events-none"
                  fill="none"
                  viewBox="0 0 12 12"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2 6l3 3 5-5" />
                </svg>
              )}
            </div>
            <span className="text-sm text-[#d1c5ac] group-hover:text-[#e5e2e1] transition-colors duration-200">
              Register as a Seller
            </span>
          </label>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="
              mt-4 w-full py-3.5 rounded-lg font-semibold text-sm text-[#ffffff]
              transition-all duration-200
              disabled:opacity-50 disabled:cursor-not-allowed
              hover:brightness-105 active:scale-[0.98]
            "
            style={{
              background: loading
                ? '#6366f1'
                : 'linear-gradient(135deg, #818cf8 0%, #6366f1 100%)',
            }}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                </svg>
                Creating account…
              </span>
            ) : 'Create Account'}
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3 my-1">
            <div className="flex-1 h-px bg-[#2e2c2c]" />
            <span className="text-xs text-[#6b6352] tracking-widest uppercase">or</span>
            <div className="flex-1 h-px bg-[#2e2c2c]" />
          </div>

          {/* Continue with Google */}
          <a
            href="/api/auth/google"
            className="
              flex items-center justify-center gap-3
              w-full py-3.5 rounded-lg
              border border-[#2e2c2c] bg-[#0e0e0e]
              text-sm font-medium text-[#d1c5ac]
              hover:border-[#6366f1]/40 hover:text-[#e5e2e1] hover:bg-[#181616]
              active:scale-[0.98]
              transition-all duration-200
            "
          >
            {/* Google "G" logo */}
            <svg width="18" height="18" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
              <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z" />
              <path fill="#FF3D00" d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z" />
              <path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z" />
              <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002 6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z" />
            </svg>
            Continue with Google
          </a>
        </form>

        {/* Footer */}
        <p className="mt-8 text-center text-sm text-[#94a3b8]">
          Already have an account?{' '}
          <Link
            to="/login"
            className="text-[#6366f1] font-medium hover:text-[#818cf8] transition-colors duration-200"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Register