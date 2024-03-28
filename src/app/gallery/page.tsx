import ExpandableImage from '@/components/expandable_image';
import LoadingText from '@/components/loading_text';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Gallery',
  description: 'My latest Instagram posts',
  keywords: ['gallery', 'instagram'],
  openGraph: {
    title: 'Gallery',
    description: 'My latest Instagram posts',
  },
};

interface Post {
  id: string;
  media_type: string;
  media_url: string;
  thumbnail_url: string;
  timestamp: string;
}

export default function Gallery() {
  return (
    <>
      <div className="content mb-8">
        <h1>Gallery</h1>
        <p>
          These are my latest Instagram posts. If you like what you see, follow
          me on my Instagram profile{' '}
          <Suspense fallback={<LoadingText expectedText="@jakoob99" />}>
            <ProfileLink />
          </Suspense>
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
        <Suspense fallback={<IgPostsLoading />}>
          <IgPosts />
        </Suspense>
      </div>
    </>
  );
}

async function ProfileLink() {
  const username = await fetchInstagramUser();

  return (
    <Link className="link" href={`https://www.instagram.com/${username}`}>
      @{username}
    </Link>
  );
}

async function IgPosts() {
  const posts = await fetchInstagramPosts();

  return (
    <>
      {posts
        ?.filter((post) => post.media_type !== 'VIDEO')
        .slice(0, 24)
        .map((post) => (
          <ExpandableImage key={post.id} src={post.media_url} alt="">
            <Image
              src={post.media_url}
              alt=""
              height={500}
              width={500}
              className="aspect-square h-full w-full cursor-pointer rounded bg-white/20 object-fill shadow-2xl transition-all ease-in-out hover:brightness-75"
            />
          </ExpandableImage>
        ))}
    </>
  );
}

const IgPostsLoading = function IgPostsLoading() {
  return (
    <>
      {new Array(24).fill(null).map((_, index) => (
        <div
          className="aspect-square h-full w-full animate-pulse cursor-pointer rounded bg-white/20 object-fill shadow-2xl transition-all ease-in-out hover:brightness-75"
          key={index}
        />
      ))}
    </>
  );
};

const IG_API = 'https://graph.instagram.com/v16.0';

async function fetchInstagramPosts(): Promise<Post[]> {
  const res = await fetch(
    `${IG_API}/${process.env.USER_ID}/media?access_token=${process.env.ACCESS_TOKEN}&fields=id,media_type,media_url,thumbnail_url,timestamp`,
    { next: { revalidate: 1800 } },
  );
  const data = await res.json();

  return data.data;
}

async function fetchInstagramUser(): Promise<string> {
  const res = await fetch(
    `${IG_API}/${process.env.USER_ID}?access_token=${process.env.ACCESS_TOKEN}&fields=username`,
  );
  const data = await res.json();

  return data.username;
}
