"use client"

import React from 'react'
import { useSession } from "next-auth/react";

export default function LoginName() {
    const { data: session } = useSession();
    let message = ""
    
    if (session) {
        message = `Hi ${session.user?.username}!`
    }
    return message
}
