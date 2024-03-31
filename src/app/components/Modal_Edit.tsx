import React, { useState, useEffect } from 'react';
import { RepoOwner, RepoName } from '@/src/app/lib/env'
import { useRouter } from 'next/navigation';
import TurndownService from 'turndown';

interface EditPostProps {
    issue: {
        id: string,
        title: string,
        contentHtml: string,
    };
    onClose: () => void;
}

export const EditPostModal: React.FC<EditPostProps> = ({ issue, onClose }) => {
    const [title, setTitle] = React.useState(issue.title);
    const [error, setError] = React.useState('');
    const [markdownContent, setMarkdownContent] = React.useState('')
    const router = useRouter();
    const turndownService = new TurndownService();

    useEffect(() => {
        // Initialize markdownContent state only when component mounts or issue.contentHtml changes
        setMarkdownContent(turndownService.turndown(issue.contentHtml));
    }, [issue.contentHtml]); // Add issue.contentHtml to the dependency array

    const validateAndSave = async () => {
        if (!title.trim()) {
            setError('Title must be filled out.');
            return;
        }
        if (!markdownContent || markdownContent.trim().length < 30) {
            setError('Content must contain at least 30 characters.');
            return;
        }
        setError('');
        const issueData = {
            owner: RepoOwner,
            repo: RepoName,
            issueNumber: issue.id, // Assuming issue.id is the GitHub issue number
            title,
            body: markdownContent,
        };
        try {
            // Call the API route
            const response = await fetch('/api/updateIssue', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(issueData),
            });
    
            if (!response.ok) {
                // If the response is not OK, try to parse and log the response body for more details
                const errorBody = await response.text(); // Using .text() in case the response is not JSON-formatted
                console.error('Response error:', errorBody); // Log the raw error response
                throw new Error(`Failed to update the issue: ${response.statusText}`);
            }
            
            setError('');
            onClose();
            router.refresh();
        } catch (error) {
            console.error('Fetch error:', error);
            setError('An error occurred while updating the issue.');
        }
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={onClose}>&times;</span>
                <h3>Edit Post</h3>
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
                    <label htmlFor="body">Modify:</label>
                    <textarea
                        id="body"
                        rows={7}
                        value= {markdownContent}
                        onChange={e => setMarkdownContent(e.target.value)}
                    ></textarea>
                </div>
                <button onClick={validateAndSave}>Save</button>
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
    );
}