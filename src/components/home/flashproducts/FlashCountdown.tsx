'use client';
import { formatTime } from '@/utils/formatters';
import { Clock } from 'lucide-react';
import { FC, useEffect, useState } from 'react';

const DURATION_HOURS = 3;
const TOTAL_SECONDS = DURATION_HOURS * 60 * 60;

const FlashCountdown: FC = () => {
  const [timeLeft, setTimeLeft] = useState<number>(TOTAL_SECONDS);
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 0) {
          return TOTAL_SECONDS;
        }
        return prev - 1;
      });

      return () => clearInterval(timer);
    }, 1000);
  }, []);

  const time = formatTime(timeLeft);

  if (!mounted) return null;

  return (
    <div className="flex items-center gap-2 bg-black/20 px-4 py-2 rounded-lg backdrop-blur-sm border border-white/10 shadow-inner">
      <Clock size={16} className="text-white/80 animate-pulse" />
      <div className="flex items-center gap-1 text-sm font-mono font-bold text-white tracking-wider">
        <span className="bg-white/10 px-1 rounded">{time.hours}</span>
        <span className="animate-pulse">:</span>
        <span className="bg-white/10 px-1 rounded">{time.minutes}</span>
        <span className="animate-pulse">:</span>
        <span className="bg-white/10 px-1 rounded text-yellow-300">{time.seconds}</span>
      </div>
      <span className="text-[10px] text-white/70 ml-1 uppercase font-semibold hidden sm:inline-block">
        Kaldı
      </span>
    </div>
  );
};

export default FlashCountdown;
