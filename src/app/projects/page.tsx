import { allProjects } from "contentlayer/generated";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Projects",
  description: "Projects I have worked on.",
  keywords: ["projects", "blog"],
};

export default function Projects() {
  return (
    <div className="content">
      <h1>Projects</h1>

      <div className="mt-4 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
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
              className="mb-auto break-inside-avoid overflow-hidden rounded transition-all hover:scale-[1.02]"
              href={`/projects/${project.slug}`}
            >
              {project.image && (
                <Image
                  src={project.image}
                  width={400}
                  height={300}
                  alt={project.title}
                  className="aspect-[3] w-full bg-gray-500/10 object-cover object-top"
                />
              )}
              <div className="bg-gradient-to-br from-white/10 to-white/20 p-4">
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
