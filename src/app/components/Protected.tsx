"use client"

import { useSession, signIn, signOut } from 'next-auth/react'

export default function Protected() {
  const { data: session } = useSession()

  if (session) {
    return (
      <div>
        Welcome {session.user?.name} <br /> !
        <button onClick={() => signOut()}>Sign Out</button>
      </div>
    )
  }

  return (
    <div>
      <button onClick={() => signIn('github')}>Sign In with GitHub</button>
    </div>
  )
}
