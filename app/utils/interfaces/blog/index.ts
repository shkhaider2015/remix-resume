type BlogPost = {
    id: string;
    title: string;
    slug: string;
    authorId: string;
    createdAt: string;
    updatedAt: string;
    isPublished: boolean;
    content: BlogBlock[];
  };
  
  type BlogBlock =
    | ParagraphBlock
    | HeadingBlock
    | ListBlock
    | CodeBlock
    | ImageBlock
    | QuoteBlock;
  
  type ParagraphBlock = {
    type: 'paragraph';
    text: string;
  };
  
  type HeadingBlock = {
    type: 'heading';
    level: 1 | 2 | 3; // corresponds to <h1>, <h2>, <h3>
    text: string;
  };
  
  type ListBlock = {
    type: 'list';
    style: 'ordered' | 'unordered';
    items: string[];
  };
  
  type CodeBlock = {
    type: 'code';
    language: string;
    code: string;
  };
  
  type ImageBlock = {
    type: 'image';
    url: string;
    alt?: string;
    caption?: string;
  };
  
  type QuoteBlock = {
    type: 'quote';
    text: string;
    author?: string;
  };
  