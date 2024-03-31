"use client"

import React from 'react'
import Link from 'next/link'
import { FaGithub } from 'react-icons/fa'
import { signIn } from 'next-auth/react';
import UserSignIn from '@/src/app/components/UserSignIn'
import { useSession } from 'next-auth/react';

// div wrapper
export default function NavBar() {
  return (
    <nav className="bg-slate-600 p-4 sticky top-0 drop-shadow-xl z-10" style={{ height: '80px', padding: '0 20px' }}>
        <div className="prose prose-xl mx-auto flex justify-between flex-col sm:flex-row" style={{ position: 'relative' }}> 
            {/*<EditButton />*/}
            <h1 className="text-3xl font-bold text-white grid place-content-center mb-2 md:mb-0" style={{position: 'absolute', top: '20px'}}>
                    <Link href="/" className="text-white/90 no-underline hover:text-white">Blog</Link>
            </h1>
            <div className="flex flex-row justify-center sm:justify-evenly align-middle gap-4 text-white text-4xl lg:text-5xl">
                <div>
                  <UserSignIn />
                </div>
            </div>
        </div>
    </nav>
  )
}
