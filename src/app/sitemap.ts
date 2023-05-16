import { allProjects } from 'contentlayer/generated';

const baseUrl = 'https://jkob.cc';

export default function sitemap() {
  const projects = allProjects.map((project) => ({
    url: `${baseUrl}/projects/${project.slug}`,
    lastModified: project.date,
  }));

  const pages = ['', '/projects', '/gallery', '/hamradio'].map((page) => ({
    url: `${baseUrl}${page}`,
    lastModified: new Date().toISOString(),
  }));

  return [...pages, ...projects];
}
