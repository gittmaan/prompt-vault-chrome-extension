import React from 'react';
import Prism from 'prismjs';

const CodeBlock: React.FC<{ code: string; language?: string }> = ({ code, language }) => {
  const highlightedCode = Prism.highlight(code, Prism.languages[language || 'javascript'], language || 'javascript');
  return (
    <pre className="code-block">
      <code>{highlightedCode}</code>
    </pre>
  );
};

export default CodeBlock;