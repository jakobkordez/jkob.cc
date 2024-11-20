import {
  faGithub,
  faInstagram,
  faLinkedin,
} from '@fortawesome/free-brands-svg-icons';
import { faGlobe } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
      <div className="prose prose-invert">
        <h1>About me</h1>
        <p>
          Hi, my name is Jakob and I&apos;m a software developer from Slovenia.
          I&apos;m currently working at{' '}
          <strong className="inline-block">Metrel d. o. o.</strong> as a
          software developer.
        </p>
        <p>
          In 2024 I graduated with a Master&apos;s degree in Computer Science
          and Information Technologies from the{' '}
          <strong>University of Maribor</strong>.
        </p>
        <p>
          I&apos;m also an amateur radio operator. My callsign is S52KJ. I
          passed my exam in december of 2021 with the extra CW exam.
        </p>
      </div>

      <Image
        className="m-auto max-w-xs overflow-hidden rounded-full shadow-2xl"
        src="/images/portrait.jpg"
        alt="Portrait"
        width={320}
        height={320}
        priority
      />

      <div>
        <h2 className="mb-2 text-xl font-medium">Most proficient with</h2>
        <div className="flex flex-wrap gap-2 text-white">
          <Tag color="bg-sky-700" href="https://www.python.org/">
            Python
          </Tag>
          <Tag color="bg-blue-700" href="https://flutter.dev/">
            Flutter
          </Tag>
          <Tag color="bg-sky-600" href="https://dart.dev/">
            Dart
          </Tag>
          <Tag color="bg-blue-800">C++</Tag>
          <Tag color="bg-green-600" href="https://nodejs.org/">
            Node.js
          </Tag>
          <Tag color="bg-red-600" href="https://nestjs.com/">
            NestJS
          </Tag>
          <Tag color="bg-white text-black" href="https://nextjs.org/">
            Next.js
          </Tag>
          <Tag color="bg-[#f73c00]" href="https://svelte.dev/">
            Svelte
          </Tag>
          <Tag color="bg-purple-700" href="https://dotnet.microsoft.com/">
            .NET
          </Tag>
        </div>

        <h2 className="mb-2 mt-6 text-xl font-medium">Tools I use</h2>
        <div className="flex flex-wrap gap-2 text-white">
          <Tag color="bg-sky-600">Visual Studio Code</Tag>
          <Tag color="bg-orange-600">Git</Tag>
          <Tag color="bg-sky-500">Docker</Tag>
        </div>
      </div>

      <div>
        <h2 className="mb-2 text-xl font-medium">Find me on</h2>
        <div className="flex flex-wrap gap-2">
          <Link className="button" href="https://github.com/jakobkordez">
            <FontAwesomeIcon icon={faGithub} />
            <span>Github</span>
          </Link>
          <Link className="button" href="https://www.qrz.com/db/s52kj">
            <FontAwesomeIcon icon={faGlobe} />
            <span>QRZ.com</span>
          </Link>
          <Link className="button" href="https://www.instagram.com/jakoob99/">
            <FontAwesomeIcon icon={faInstagram} />
            <span>Instagram</span>
          </Link>
          <Link
            className="button"
            href="https://www.linkedin.com/in/jakob-kordez-02644028a/"
          >
            <FontAwesomeIcon icon={faLinkedin} />
            <span>LinkedIn</span>
          </Link>
        </div>
      </div>

      <div className="col-span-2 flex flex-col gap-4">
        <h2 className="text-2xl font-medium">Education</h2>
        <div>
          <div>
            <div className="text-lg font-semibold">Technical Gymnasium</div>
          </div>
          <div className="font-light">Vegova Ljubljana</div>
          <div className="opacity-70">2014 - 2018</div>
        </div>
        <div>
          <div>
            <div className="text-lg font-semibold">
              Undergraduate Computer Science and Information Technologies
            </div>
          </div>
          <div className="font-light">University of Maribor</div>
          <div className="opacity-70">2018 - 2021</div>
        </div>
        <div>
          <div>
            <div className="text-lg font-semibold">
              Postgraduate Computer Science and Information Technologies
            </div>
          </div>
          <div className="font-light">University of Maribor</div>
          <div className="opacity-70">2021 - 2024</div>
        </div>
      </div>
    </div>
  );
}

interface TagProps {
  color?: string;
  children: React.ReactNode;
  href?: string;
}

function Tag({ color, children, href }: TagProps) {
  const className = 'rounded-full py-1 px-3 font-semibold text-base ' + color;

  return href ? (
    <Link href={href} className={className}>
      {children}
    </Link>
  ) : (
    <span className={className}>{children}</span>
  );
}
