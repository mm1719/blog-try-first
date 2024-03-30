import React from 'react';
import {marked} from 'marked';
import DOMPurify from 'isomorphic-dompurify';
import hljs from 'highlight.js';
import 'highlight.js/styles/github.css';
import { language } from 'gray-matter';

declare module 'marked' {
    export interface MarkedOptions {
      highlight?: (code: string, language: string) => string;
    }
}

// TypeScript interface for props
interface MarkdownRendererProps {
  markdownText: string;
}

// Configure `marked` to use `highlight.js` for code blocks
marked.setOptions({
    highlight: function (code, language) {
        const validLanguage = hljs.getLanguage(language) ? language : 'plaintext';
        return hljs.highlight(code, { language: validLanguage }).value;
    },
    gfm: true,
    breaks: true,
});

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ markdownText }) => {
        // Convert Markdown to HTML
        const rawMarkup = marked.parse(markdownText);

        // Ensure rawMarkup is a string
        const sanitizedMarkup = DOMPurify.sanitize(rawMarkup.toString());

        // Render the sanitized HTML
        return <section dangerouslySetInnerHTML={{ __html: sanitizedMarkup }} />;
};

export default MarkdownRenderer;