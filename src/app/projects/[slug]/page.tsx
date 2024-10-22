import { getPosts } from '@/util/posts';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Image from 'next/image';
import ExpandableImage from '@/components/expandable_image';
import { MDXRemote } from 'next-mdx-remote/rsc';

interface PostPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const post = (await getPosts()).find((post) => post.slug === params.slug);

  if (!post) return {};

  return {
    title: post.title,
    description: post.description,
    keywords: post.tags,
    openGraph: {
      title: post.title,
      description: post.description,
      images: post.image && {
        url: post.image,
      },
    },
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

export default async function PostPage({ params }: PostPageProps) {
  const post = (await getPosts()).find((post) => post.slug === params.slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="prose prose-invert mx-auto">
      <article>
        {post.image && (
          <div className="relative mb-5 w-full">
            <Image
              width={1000}
              height={500}
              src={post.image}
              alt=""
              className="h-64 w-full rounded object-cover object-center"
            />
          </div>
        )}
        <h1 className="mb-2">{post.title}</h1>
        <div className="mb-8 flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <div
              key={tag}
              className="rounded-full bg-gray-400/20 px-3 py-1 text-sm font-medium"
            >
              {tag}
            </div>
          ))}
        </div>

        <MDXRemote
          source={post.content}
          components={components}
          options={{ parseFrontmatter: true }}
        />
      </article>
    </div>
  );
}

export async function generateStaticParams() {
  return (await getPosts()).map((post) => ({
    slug: post.slug,
  }));
}
