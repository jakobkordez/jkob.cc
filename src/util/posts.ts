import fs from 'fs';
import { serialize } from 'next-mdx-remote/serialize';
import path from 'path';

export interface Post {
  title: string;
  description: string;
  slug: string;
  date: string;
  tags: string[];
  image?: string;
  content: string;
}

export const getPosts = async (): Promise<Post[]> => {
  const fPath = path.join(process.cwd(), 'content/posts');
  const files = fs.readdirSync(fPath);

  return await Promise.all(
    files.map(async (file) => {
      const source = fs.readFileSync(path.join(fPath, file), 'utf8');
      const x = await serialize(source, { parseFrontmatter: true });
      return {
        title: x.frontmatter.title as string,
        description: x.frontmatter.description as string,
        date: x.frontmatter.date as string,
        tags: x.frontmatter.tags as string[],
        image: x.frontmatter.image as string | undefined,
        slug: file.replace(/\.mdx$/, ''),
        content: source,
      };
    }),
  );
};
