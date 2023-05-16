'use client';

import { useEffect, useState } from 'react';

export default function RelativeTime({ date }: { date: string }) {
  const [time, setTime] = useState(date);

  useEffect(() => {
    const min = (new Date().valueOf() - new Date(date).valueOf()) / 60000;

    let res = '';
    if (min < 1) {
      res = 'less than a minute ago';
    } else if (min < 2) {
      res = 'a minute ago';
    } else if (min < 60) {
      res = `${Math.floor(min)} minutes ago`;
    } else if (min < 120) {
      res = 'an hour ago';
    } else if (min < 1440) {
      res = `${Math.floor(min / 60)} hours ago`;
    } else {
      res = new Date(date).toLocaleString();
    }

    setTime(res);
  }, [date]);

  return <span>{time}</span>;
}
