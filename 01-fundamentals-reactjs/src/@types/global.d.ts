export {};

declare global {
  interface Content {
    type: "paragraph" | "link";
    content: string;
  }

  interface Author {
    avatarUrl: string;
    name: string;
    role: string;
  }

  interface Post {
    id: number;
    author: Author;
    contents: Content[];
    publishedAt: Date;
  }
}
