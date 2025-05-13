import { useEffect, useState } from "react";
import Prism from "prismjs";

// Load the theme
import "prismjs/themes/prism-tomorrow.css"; // or another like prism.css, prism-okaidia.css

// // Load the language you need
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-jsx";

const CodeBlock = (props: CodeBlockProps) => {
  const { code, language } = props;

  useEffect(() => {
    if(typeof window !== "undefined") {
    Prism.highlightAll();
    }
  }, [code]);

  return (
    <pre className={`language-${language}`}>
      <code className={`language-${language}`}>{code}</code>
    </pre>
  );
};

interface CodeBlockProps {
  code?: string;
  language: string;
}

export default CodeBlock;
