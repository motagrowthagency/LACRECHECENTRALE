interface MarqueeProps {
  items: string[];
  className?: string;
}

export default function Marquee({ items, className = "" }: MarqueeProps) {
  const loop = [...items, ...items];
  return (
    <div className={`overflow-hidden whitespace-nowrap select-none ${className}`}>
      <div className="inline-flex animate-marquee">
        {loop.map((item, i) => (
          <span key={i} className="inline-flex items-center text-xs sm:text-sm font-bold uppercase tracking-wider px-6">
            {item}
            <span className="ml-6 text-current opacity-40">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
