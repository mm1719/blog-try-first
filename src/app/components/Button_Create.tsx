"use client"

import { useSession } from "next-auth/react";
import { useState } from 'react'
import { IoCreate } from "react-icons/io5"
import { CreatePostModal } from '@/src/app/components/Modal_Create'

const CreateButton = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);
    const { data: session } = useSession();
    if (session?.user?.isWriter) {
        return (
            <button>
                <IoCreate onClick={handleOpenModal} />
                {isModalOpen && (
                    <CreatePostModal
                        onClose={handleCloseModal}
                    />
                )}
            </button>
        );
    }
    return null;
}

export default CreateButton