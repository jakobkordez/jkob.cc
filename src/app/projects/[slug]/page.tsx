import { allProjects } from 'contentlayer/generated';
import { notFound } from 'next/navigation';
import { useMDXComponent } from 'next-contentlayer/hooks';
import { Metadata } from 'next';
import Image from 'next/image';
import ExpandableImage from '@/components/expandable_image';

interface ProjectPageProps {
  params: {
    slug: string;
  };
}

export function generateMetadata({ params }: ProjectPageProps): Metadata {
  const project = allProjects.find((project) => project.slug === params.slug);

  if (!project) return {};

  return {
    title: project.title,
    description: project.description,
    keywords: project.tags,
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function CustomLink(props: any) {
  return <a className="link" {...props} />;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function MdxImage(props: any) {
  return <ExpandableImage width={1000} height={1000} {...props} />;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function Paragraph(props: any) {
  return <div className="mb-4" {...props} />;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function List(props: any) {
  return <ul className="mb-4 ml-8 list-disc" {...props} />;
}

const components = {
  img: MdxImage,
  p: Paragraph,
  a: CustomLink,
  ul: List,
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
          <div className="relative h-60 w-full overflow-hidden rounded">
            <Image
              width={700}
              height={240}
              src={project.image}
              alt=""
              className="object-cover object-top"
            />
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
