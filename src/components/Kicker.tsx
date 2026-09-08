interface KickerProps {
  children: React.ReactNode;
  light?: boolean;
  className?: string;
}

export default function Kicker({ children, light = false, className = "" }: KickerProps) {
  return (
    <div className={`inline-flex items-center space-x-2.5 ${className}`}>
      <span className={`w-6 h-[3px] rounded-full ${light ? "bg-[#F4B23E]" : "bg-[#C86446]"}`} />
      <span
        className={`text-[11px] font-bold uppercase tracking-[0.2em] ${light ? "text-[#F4B23E]" : "text-[#C86446]"}`}
      >
        {children}
      </span>
    </div>
  );
}
