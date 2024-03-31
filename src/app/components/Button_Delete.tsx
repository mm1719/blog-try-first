"use client"

import { useSession } from "next-auth/react";
import { useState } from 'react'
import { FaRegTrashCan } from "react-icons/fa6";
import { DeleteConfirmModal } from '@/src/app/components/Modal_Delete'

const DeleteButton = ({post}: {post: any}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);
    const { data: session } = useSession();
    if (session?.user?.isWriter) {
        return (
            <button style={{ marginRight: '10px' }}>
                <FaRegTrashCan onClick={handleOpenModal} />
                {isModalOpen && (
                    <DeleteConfirmModal
                        issue={post}
                        onClose={handleCloseModal}
                    />
                )}
            </button>
        );
    }
    return null;
}

export default DeleteButton