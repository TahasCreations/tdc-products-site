'use client'
import {useEffect, useState} from 'react'

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false)
  useEffect(() => {
    const stored = typeof window !== 'undefined' ? localStorage.getItem('theme') : null
    const dark = stored === 'dark'
    setIsDark(dark)
    if (dark) document.documentElement.classList.add('dark')
    else document.documentElement.classList.remove('dark')
  }, [])
  function toggle() {
    const next = !isDark
    setIsDark(next)
    if (next) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }
  return (
    <button className="btn" onClick={toggle} aria-pressed={isDark} aria-label="Tema değiştir">
      {isDark ? 'Dark' : 'Light'}
    </button>
  )
}


