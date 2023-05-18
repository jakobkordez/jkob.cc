export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
    sitemap: 'https://jkob.cc/sitemap.xml',
    host: 'https://jkob.cc',
  };
}
