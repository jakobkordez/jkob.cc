import { faBuilding } from "@fortawesome/free-regular-svg-icons";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { LinkButton } from "@/components/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
      <div className="content">
        <h1>Hello!</h1>
        <p>
          My name is Jakob and I&apos;m a software developer. I&apos;m currently
          working at Metrel d. d. as a software developer.
        </p>
        <p>
          I&apos;m a student at the University of Maribor where I&apos;m
          studying computer science. I&apos;m currently in my 2nd year of the
          postgraduate study program.
        </p>
        <p>
          I&apos;m also an amateur radio operator. My callsign is S52KJ. I
          passed my exam in december of 2021 with the extra CW exam.
        </p>

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

      <UserCard />
    </div>
  );
}

interface TagProps {
  color?: string;
  children: React.ReactNode;
  href?: string;
}

function Tag({ color, children, href }: TagProps) {
  const className = "rounded-full py-1 px-3 font-bold " + color;

  return href ? (
    <Link href={href} className={className}>
      {children}
    </Link>
  ) : (
    <span className={className}>{children}</span>
  );
}

function UserCard() {
  return (
    <div className="m-auto mt-0 max-w-xs overflow-hidden rounded bg-white/20 shadow-2xl backdrop-blur">
      <Image
        className="w-full"
        src="/images/portrait.jpg"
        alt="Portrait"
        width={320}
        height={320}
      />
      <div className="px-6 py-4">
        <div className="text-xl font-bold">Jakob Kordež</div>
        <div className="mb-2 text-lg font-medium">S52KJ</div>
        <div>
          <FontAwesomeIcon icon={faBuilding} className="mr-2" />
          <span>Metrel d. d.</span>
        </div>
        <div>
          <FontAwesomeIcon icon={faLocationDot} className="mr-2" />
          <span>Slovenia</span>
        </div>
        <div className="mt-4 flex flex-wrap gap-3">
          <LinkButton href="https://github.com/jakobkordez" icon={faGithub}>
            GitHub
          </LinkButton>
          <LinkButton href="https://www.qrz.com/db/s52kj">QRZ.com</LinkButton>
        </div>
      </div>
    </div>
  );
}
