import { allProjects } from 'contentlayer/generated';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Projects',
  description: 'Projects I have worked on.',
  keywords: ['projects', 'blog'],
};

export default function Projects() {
  return (
    <div className="content mx-auto max-w-4xl">
      <h1>Projects</h1>

      <div className="mt-8 flex flex-col gap-6">
        {allProjects
          .sort((a, b) => {
            const dateA = new Date(a.date).valueOf();
            const dateB = new Date(b.date).valueOf();
            if (dateA !== dateB) {
              return dateB - dateA;
            }

            return a.title.localeCompare(b.title);
          })
          .map((project) => (
            <Link
              key={project.slug}
              className="flex h-28 flex-row overflow-hidden rounded transition-all hover:scale-[1.02]"
              href={`/projects/${project.slug}`}
            >
              {project.image ? (
                <Image
                  src={project.image}
                  width={300}
                  height={112}
                  alt={project.title}
                  className="aspect-video bg-gray-500/10 object-cover object-top"
                />
              ) : (
                <div className="aspect-video bg-white/30" />
              )}
              <div className="flex-1 bg-gradient-to-br from-white/10 to-white/20 py-4 px-6">
                <div className="mb-2 text-xl font-bold">{project.title}</div>
                {project.description && (
                  <div className="text-sm">{project.description}</div>
                )}
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
}
