import Link from "next/link";

const projects = [
  {
    name: "this.website",
    description: "The website you are currently on.",
    href: "/",
  },
  {
    name: "Radioklub Vegova Website",
    description:
      "Designing and developing the website for the amateur radio club Radioklub Vegova.",
    href: "https://rklub.vegova.si/",
  },
  {
    name: "Callsign lookup",
    description: "Lookup callsign prefixes and learn how a callsign is formed.",
    href: "https://cq.jkob.cc/#/callsign",
  },
];

export const metadata = {
  title: 'Projects',
  description: 'Projects I have worked on.',
};

export default function Projects() {
  return (
    <div className="content">
      <h1>Projects</h1>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <Link
            key={project.name}
            className="break-inside-avoid rounded bg-gradient-to-br from-white/10 to-white/20 p-4"
            href={project.href}
          >
            <div className="mb-2 text-2xl font-bold">{project.name}</div>
            {project.description && (
              <div className="text-sm">{project.description}</div>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
}
