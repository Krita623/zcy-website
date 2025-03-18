import React from 'react';
import ReactMarkdown from 'react-markdown';

interface MarkdownProps {
  content: string;
}

export default function Markdown({ content }: MarkdownProps) {
  return (
    <ReactMarkdown
      components={{
        h1: ({ node, ...props }) => (
          <h1 className="text-3xl font-bold mt-8 mb-4" {...props} />
        ),
        h2: ({ node, ...props }) => (
          <h2 className="text-2xl font-bold mt-6 mb-4" {...props} />
        ),
        h3: ({ node, ...props }) => (
          <h3 className="text-xl font-bold mt-5 mb-3" {...props} />
        ),
        h4: ({ node, ...props }) => (
          <h4 className="text-lg font-bold mt-4 mb-2" {...props} />
        ),
        p: ({ node, ...props }) => (
          <p className="my-4" {...props} />
        ),
        ul: ({ node, ...props }) => (
          <ul className="list-disc pl-6 my-4" {...props} />
        ),
        ol: ({ node, ...props }) => (
          <ol className="list-decimal pl-6 my-4" {...props} />
        ),
        li: ({ node, ...props }) => (
          <li className="my-1" {...props} />
        ),
        a: ({ node, ...props }) => (
          <a className="text-blue-600 hover:underline" {...props} />
        ),
        blockquote: ({ node, ...props }) => (
          <blockquote className="border-l-4 border-gray-200 pl-4 py-2 my-4 text-gray-700 italic" {...props} />
        ),
        code: ({ node, inline, ...props }) => (
          inline
            ? <code className="bg-gray-100 rounded px-1 py-0.5 text-sm font-mono" {...props} />
            : <pre className="bg-gray-100 rounded p-4 overflow-auto text-sm font-mono my-4" {...props} />
        ),
        pre: ({ node, ...props }) => (
          <pre className="bg-gray-100 rounded p-4 overflow-auto text-sm font-mono my-4" {...props} />
        ),
        hr: ({ node, ...props }) => (
          <hr className="my-6 border-t border-gray-300" {...props} />
        ),
        img: ({ node, alt, ...props }) => (
          <img alt={alt} className="max-w-full h-auto rounded my-4" {...props} />
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  );
} 