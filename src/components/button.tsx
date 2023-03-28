import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

interface ButtonProps {
  icon?: IconProp;
  children: React.ReactNode;
  onClick?: () => void;
}

export function Button({ children, icon, onClick }: ButtonProps) {
  return (
    <button
      className="inline-flex items-center rounded bg-gray-300 py-2 px-4 font-bold text-gray-800 hover:bg-gray-400"
      onClick={onClick}
    >
      {icon && (
        <FontAwesomeIcon icon={icon} className="mr-2 h-4 w-4 fill-current" />
      )}
      <span>{children}</span>
    </button>
  );
}

interface LinkButtonProps {
  icon?: IconProp;
  children: React.ReactNode;
  href: string;
}

export function LinkButton({ children, icon, href }: LinkButtonProps) {
  return (
    <Link
      className="inline-flex items-center rounded border border-white/90 py-2 px-4 font-bold transition-colors hover:bg-white/20"
      href={href}
    >
      {icon && (
        <FontAwesomeIcon icon={icon} className="mr-2 h-4 w-4 fill-current" />
      )}
      <span>{children}</span>
    </Link>
  );
}
