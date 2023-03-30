"use client";

import { useEffect, useState } from "react";

export default function DateTime({ date }: { date: string }) {
  const [time, setTime] = useState(date);

  useEffect(() => setTime(new Date(date).toLocaleString()));

  return <span>{time}</span>;
}
