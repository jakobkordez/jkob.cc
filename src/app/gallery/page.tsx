import ExpandableImage from '@/components/expandable_image';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Gallery',
  description: 'My latest Instagram posts',
  keywords: ['gallery', 'instagram'],
};

interface Post {
  id: string;
  media_type: string;
  media_url: string;
  thumbnail_url: string;
  timestamp: string;
}

export default async function Gallery() {
  let posts, username;

  try {
    [posts, username] = await Promise.all([
      fetchInstagramPosts(),
      fetchInstagramUser(),
    ]);
  } catch (error) {
    console.log(error);
  }

  return (
    <>
      <div className="content mb-8">
        <h1>Gallery</h1>
        <p>
          These are my latest Instagram posts. If you like what you see, follow
          me on my Instagram profile{' '}
          <Link className="link" href={`https://www.instagram.com/${username}`}>
            @{username}
          </Link>
          .
        </p>
        <p>
          To find out how I integrated this check out{' '}
          <Link className="link" href="/projects/ig-feed">
            Instagram integration
          </Link>
          .
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        {posts
          ?.slice(0, 24)
          .filter((post) => post.media_type !== 'VIDEO')
          .map((post) => (
            <IgImage key={post.id} src={post.media_url} />
          ))}
      </div>
    </>
  );
}

async function fetchInstagramPosts(): Promise<Post[]> {
  const res = await fetch(
    `https://graph.instagram.com/v16.0/${process.env.USER_ID}/media?access_token=${process.env.ACCESS_TOKEN}&fields=id,media_type,media_url,thumbnail_url,timestamp`,
    { next: { revalidate: 1800 } }
  );
  const data = await res.json();

  return data.data;
}

async function fetchInstagramUser(): Promise<string> {
  const res = await fetch(
    `https://graph.instagram.com/v16.0/${process.env.USER_ID}?access_token=${process.env.ACCESS_TOKEN}&fields=username`
  );
  const data = await res.json();

  return data.username;
}

function IgImage({ src }: { src: string }) {
  return (
    <ExpandableImage src={src} alt="">
      <Image
        src={src}
        alt=""
        height={500}
        width={500}
        className="aspect-square h-full w-full cursor-pointer rounded bg-white/20 object-fill shadow-2xl transition-all ease-in-out hover:brightness-75"
      />
    </ExpandableImage>
  );
}
