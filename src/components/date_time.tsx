"use client";

export default function DateTime({ date }: { date: string }) {
  return <span>{new Date(date).toLocaleString()}</span>;
}
