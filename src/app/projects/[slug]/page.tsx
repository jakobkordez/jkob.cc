import { allProjects } from "contentlayer/generated";
import { notFound } from "next/navigation";
import { useMDXComponent } from "next-contentlayer/hooks";
import { Metadata } from "next";
import ModalImage from "@/components/modal_image";

interface ProjectPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata | undefined> {
  const project = allProjects.find((project) => project.slug === params.slug);

  if (!project) return;

  return {
    title: project.title,
    description: project.description,
    keywords: project.tags,
  };
}

function CustomLink(props: any) {
  return <a className="link" {...props} />;
}

function MdxImage(props: any) {
  return <ModalImage width={1000} height={1000} {...props} />;
}

function Paragraph(props: any) {
  return <div className="mb-4" {...props} />;
}

const components = {
  img: MdxImage,
  p: Paragraph,
  a: CustomLink,
};

export default function ProjectPage({ params }: ProjectPageProps) {
  const project = allProjects.find((project) => project.slug === params.slug);

  if (!project) {
    notFound();
  }

  const Component = useMDXComponent(project.body.code);

  return (
    <div className="content">
      <article className="blog">
        {project.image && (
          <div className="h-60 overflow-clip rounded">
            <ModalImage width={700} height={240} src={project.image} alt="" />
          </div>
        )}
        <h1>{project.title}</h1>
        <div className="mb-8 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <div
              key={tag}
              className="rounded-full bg-gray-400/20 px-3 py-1 text-sm font-medium"
            >
              {tag}
            </div>
          ))}
        </div>

        <Component components={components} />
      </article>
    </div>
  );
}

export async function generateStaticParams() {
  return allProjects.map((project) => ({
    slug: project.slug,
  }));
}
