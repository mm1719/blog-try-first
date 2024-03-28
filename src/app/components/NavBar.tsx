"use client"

import React from 'react'
import Link from 'next/link'
import { FaGithub } from 'react-icons/fa'
import { signIn } from 'next-auth/react';

// div wrapper
export default function NavBar() {

  const handleSignInClick = () => {
    signIn('github'); // Specify 'github' to use the GitHub provider
  };

  return (
    <nav className="bg-slate-600 p-4 sticky top-0 drop-shadow-xl z-10">
        <div className="prose prose-xl mx-auto flex justify-between flex-col sm:flex-row"> 
            <h1 className="text-3xl font-bold text-white grid place-content-center mb-2 md:mb-0">
                    <Link href="/" className="text-white/90 no-underline hover:text-white">Daniel</Link>
            </h1>
            <div className="flex flex-row justify-center sm:justify-evenly align-middle gap-4 text-white text-4xl lg:text-5xl">
              <button onClick={handleSignInClick} className="text-white/90 hover:text-white" style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}>
                <FaGithub />
              </button>
            </div>
        </div>
    </nav>
  )
}
