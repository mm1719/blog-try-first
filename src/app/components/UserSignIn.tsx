// src/components/UserStatus.tsx
import React from 'react';
import { signIn, useSession } from 'next-auth/react';
import { FaGithub } from 'react-icons/fa';
import Image from 'next/image';

const UserSignIn = () => {
    const { data: session } = useSession();

    const handleSignInClick = () => {
        signIn('github'); // Specify 'github' to use the GitHub provider
    };

    if (session) {
        return (
            <button className="text-white/90 hover:text-white" style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', position: 'absolute', top: '-80px', right: '0px'}}>
                <Image 
                    src={session?.user?.image as string}
                    alt="User Avatar"
                    width = {48}
                    height = {48}
                    style={{
                        display: 'block',
                        borderRadius: '50%',
                        cursor: 'pointer',
                        background: 'none'
                      }}
                />
            </button>
        );
    } else {
        return (
            <button className="text-white/90 hover:text-white" style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', position: 'absolute', top: '15px', right: '0px'}}>
                <FaGithub onClick={handleSignInClick}/>
            </button>
        );
    }
};

export default UserSignIn;