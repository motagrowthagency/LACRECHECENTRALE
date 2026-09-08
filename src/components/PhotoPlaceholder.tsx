import { SvgIcons } from "./icons";

interface PhotoPlaceholderProps {
  label: string;
  ratio?: string;
  className?: string;
  rounded?: string;
}

export default function PhotoPlaceholder({
  label,
  ratio = "aspect-[4/3]",
  className = "",
  rounded = "rounded-2xl",
}: PhotoPlaceholderProps) {
  return (
    <div
      className={`relative ${ratio} w-full ${rounded} overflow-hidden bg-[#12101A] border border-white/10 flex flex-col items-center justify-center gap-2.5 text-white/60 ${className}`}
    >
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, #fff 0, #fff 1px, transparent 1px, transparent 14px)",
        }}
      />
      <SvgIcons.Camera className="w-8 h-8 relative z-10" />
      <span className="relative z-10 text-[11px] font-bold uppercase tracking-wider text-center px-6 leading-relaxed">
        Photo à venir
      </span>
      <span className="relative z-10 text-[10px] text-white/40 text-center px-6 leading-relaxed max-w-[280px]">
        {label}
      </span>
    </div>
  );
}
