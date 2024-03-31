import React, { useState, useEffect } from 'react';
import { RepoOwner, RepoName } from '@/src/app/lib/env'
import { useRouter } from 'next/navigation';

interface CreatePostProps {
    onClose: () => void;
}

export const CreatePostModal: React.FC<CreatePostProps> = ({ onClose }) => {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleCreateIssue = async () => {
        if (!title.trim()) {
            setError('Title must be filled out.');
            return;
        }
        if (!body || body.trim().length < 30) {
            setError('Content must contain at least 30 characters.');
            return;
        }
        setError('');

        try {
            const response = await fetch('/api/createIssue', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title, body }),
            });
    
            if (!response.ok) {
                // Handle error
                console.error('Failed to create the issue');
                return;
            }
            setError('');
            onClose();
            router.refresh();
        } catch (error){
            console.error('Fetch error:', error);
            setError('An error occurred while creating the issue.');
        }
    };
    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={onClose}>&times;</span>
                <h3>Create Post</h3>
                {error && <div className="error">{error}</div>}
                <div className="form-control">
                    <label htmlFor="title">Title:</label>
                    <input
                        id="title"
                        type="text"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                    />
                </div>
                <div className="form-control">
                    <label htmlFor="body">Content:</label>
                    <textarea
                        id="body"
                        rows={7}
                        value= {body}
                        onChange={e => setBody(e.target.value)}
                    ></textarea>
                </div>
                <button onClick={handleCreateIssue}>Create</button>
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
                    background-color: #f0f0f0;
                    margin: 10% auto;
                    padding: 20px;
                    border: 1px solid #ccc;
                    width: 50%;
                    max-width: 600px;
                    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                }
                .form-control {
                    margin-bottom: 8px; // Adds space between each label-input pair
                }
                label {
                    display: block; // Ensures the label takes up its own line
                    text-align: left; // Explicitly aligns text to the left
                }
                input {
                    width: 100%;
                }
                textarea {
                    width: 100%; // Make textarea span the full width of its container
                    padding: 8px;
                    font-size: 16px; // Adjust font size as needed
                    border: 1px solid #ccc;
                    border-radius: 4px;
                    margin-top: 8px; // Add some margin above the textarea
                    resize: vertical; // Allow vertical resizing
                }
                .mardwon {
                    display: inline-block;
                    text-align: left;
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
    )
}