import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Amateur Radio',
  description: 'My amateur radio activities.',
  keywords: [
    'S52KJ',
    'ham radio',
    'amateur radio',
    'antennas',
    'qsl card',
    'sota',
  ],
  openGraph: {
    title: 'Amateur Radio',
    description: 'My amateur radio activities.',
  },
};

export default function HamRadio({ children }: { children: React.ReactNode }) {
  return children;
}
