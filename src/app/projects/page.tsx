import { allProjects } from "contentlayer/generated";
import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Projects",
  description: "Projects I have worked on.",
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
              className="mb-auto break-inside-avoid overflow-clip rounded"
              href={`/projects/${project.slug}`}
            >
              {project.image && (
                <Image
                  src={project.image}
                  width={400}
                  height={300}
                  alt={project.title}
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
