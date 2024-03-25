import { getPosts } from '@/util/posts';

const baseUrl = 'https://jkob.cc';

export default async function sitemap() {
  const projects = (await getPosts()).map((project) => ({
    url: `${baseUrl}/projects/${project.slug}`,
    lastModified: project.date,
  }));

  const pages = ['', '/projects', '/gallery', '/hamradio'].map((page) => ({
    url: `${baseUrl}${page}`,
    lastModified: new Date().toISOString(),
  }));

  return [...pages, ...projects];
}
