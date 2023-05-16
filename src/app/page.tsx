import { LinkButton } from '@/components/button';
import { faGithub, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faGlobe } from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
      <div className="content">
        <h1>Jakob Kordež</h1>
        <p>
          Hi, my name is Jakob and I&apos;m a software developer from Slovenia.
          I&apos;m currently working at{' '}
          <strong className="inline-block">Metrel d. d.</strong> as a software
          developer.
        </p>
        <p>
          I&apos;m a student at the <strong>University of Maribor</strong> where
          I&apos;m studying computer science. I&apos;m currently in my 2
          <sup>nd</sup> year of the postgraduate study program.
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

      <div className="content">
        <h2>Most proficient with</h2>
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
          <Tag color="bg-purple-700" href="https://dotnet.microsoft.com/">
            .NET
          </Tag>
        </div>

        <h2>Tools I use</h2>
        <div className="flex flex-wrap gap-2 text-white">
          <Tag color="bg-sky-600">Visual Studio Code</Tag>
          <Tag color="bg-orange-600">Git</Tag>
          <Tag color="bg-sky-500">Docker</Tag>
        </div>
      </div>

      <div className="content">
        <h2>Find me on</h2>
        <div className="flex flex-wrap gap-2">
          <LinkButton icon={faGithub} href="https://github.com/jakobkordez">
            Github
          </LinkButton>
          <LinkButton icon={faGlobe} href="https://www.qrz.com/db/s52kj">
            QRZ.com
          </LinkButton>
          <LinkButton
            icon={faInstagram}
            href="https://www.instagram.com/jakoob99/"
          >
            Instagram
          </LinkButton>
        </div>
      </div>

      <div className="content flex flex-col gap-4">
        <h2>Education</h2>
        <div>
          <div>
            <strong>Technical Gymnasium</strong>
          </div>
          <div>Vegova Ljubljana</div>
          <div>2014 - 2018</div>
        </div>
        <div>
          <div>
            <strong>
              Undergraduate Computer Science and Information Technologies
            </strong>
          </div>
          <div>University of Maribor</div>
          <div>2018 - 2021</div>
        </div>
        <div>
          <div>
            <strong>
              Postgraduate Computer Science and Information Technologies
            </strong>
          </div>
          <div>University of Maribor</div>
          <div>2021 - present</div>
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
  const className = 'rounded-full py-1 px-3 font-bold ' + color;

  return href ? (
    <Link href={href} className={className}>
      {children}
    </Link>
  ) : (
    <span className={className}>{children}</span>
  );
}
