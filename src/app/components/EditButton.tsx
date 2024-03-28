import { useSession } from "next-auth/react";
import { FaPencilAlt } from 'react-icons/fa'

const EditButton = () => {
    const { data: session } = useSession();
    if (session?.user?.isWriter) {
        return 
    }
    return null;
}

export default EditButton