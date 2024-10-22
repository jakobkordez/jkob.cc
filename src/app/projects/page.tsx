import { getPosts } from '@/util/posts';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Posts',
  description: 'Things I have worked on.',
  keywords: ['posts', 'projects', 'blog', 'portfolio', 'work'],
  openGraph: {
    title: 'Posts',
    description: 'Things I have worked on.',
  },
};

export default async function Projects() {
  return (
    <div className="content mx-auto max-w-4xl">
      <h1>Projects</h1>

      <div className="mt-8 flex flex-col gap-6">
        {(await getPosts())
          .sort((a, b) => {
            const dateA = new Date(a.date).valueOf();
            const dateB = new Date(b.date).valueOf();
            if (dateA !== dateB) {
              return dateB - dateA;
            }

            return a.title.localeCompare(b.title);
          })
          .map((post) => (
            <Link
              key={post.slug}
              className="flex h-28 flex-row overflow-hidden rounded transition-all hover:scale-[1.02]"
              href={`/projects/${post.slug}`}
            >
              {post.image ? (
                <Image
                  src={post.image}
                  width={300}
                  height={112}
                  alt={post.title}
                  className="aspect-video bg-gray-500/10 object-cover object-top"
                />
              ) : (
                <div className="aspect-video bg-white/30" />
              )}
              <div className="flex-1 bg-gradient-to-br from-white/10 to-white/20 px-6 py-4">
                <div className="mb-2 text-xl font-bold">{post.title}</div>
                {post.description && (
                  <div className="text-sm">{post.description}</div>
                )}
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
}
