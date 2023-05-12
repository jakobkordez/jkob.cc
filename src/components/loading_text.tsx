interface LoadingTextProps {
  expectedText: string;
}

export default function LoadingText({ expectedText }: LoadingTextProps) {
  return (
    <span className="inline-block animate-pulse rounded bg-white/40">
      <span className="invisible">{expectedText}</span>
    </span>
  );
}
