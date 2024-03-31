"use client"

import { useSession } from "next-auth/react";
import { useState } from 'react'
import { FaPencilAlt } from 'react-icons/fa'
import { EditPostModal } from '@/src/app/components/Modal_Edit'

const EditButton = ({post}: {post: any}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);
    const { data: session } = useSession();
    if (session?.user?.isWriter) {
        return (
            <button>
                <FaPencilAlt onClick={handleOpenModal} />
                {isModalOpen && (
                    <EditPostModal
                        issue={post}
                        onClose={handleCloseModal}
                    />
                )}
            </button>
        );
    }
    return null;
}

export default EditButton