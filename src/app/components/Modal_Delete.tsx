import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

interface DeletePostProps {
    issue: {
        id: string,
    };
    onClose: () => void;
}

export const DeleteConfirmModal: React.FC<DeletePostProps> =({ issue, onClose }) => {
    const [error, setError] = useState('')
    const router = useRouter()

    const handleDelete = async () => {
        try{
            const response = await fetch('/api/closeIssue', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ issueNumber: issue.id }),
            })
            if (!response.ok) {
                // Handle error (e.g., show an error message)
                console.error('Failed to delete the post');
                return;
            }
            setError('');
            onClose();
            router.push('/');
        } catch (error) {
            console.error('Fetch error:', error);
            setError('An error occurred while delete the issue.');
        }
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={onClose}>&times;</span>
                <h3>Confirm Delete</h3>
                {error && <div className="error">{error}</div>}
                <p>Are you sure you want to delete this post?</p>
                <button onClick={handleDelete} style={{ marginRight: '100px' }}>Delete</button>
                <button onClick={onClose}>Cancel</button>
            </div>
            <style jsx>{`
                .modal {
                    position: fixed;
                    z-index: 1;
                    left: 0;
                    top: 0;
                    width: 100%;
                    height: 100%;
                    overflow: auto;
                    background-color: rgba(0,0,0,0.6);
                }
                .modal-content {
                    flex-direction: column;
                    align-items: start;
                    background-color: #1e1e1e;
                    margin: 10% auto;
                    padding: 20px;
                    border: 1px solid #ccc;
                    width: 50%;
                    max-width: 600px;
                    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                }
                .close {
                    color: #888;
                    float: right;
                    font-size: 28px;
                    font-weight: bold;
                }
                .close:hover,
                .close:focus {
                    color: #555;
                    text-decoration: none;
                    cursor: pointer;
                }
                .error {
                    color: #d8000c; // A more subdued red for errors
                    background-color: #ffbaba; // Light background color for error messages, for better visibility
                    padding: 10px;
                    margin: 10px 0;
                    border-radius: 5px;
                }
            `}
            </style>
        </div>
    );
}