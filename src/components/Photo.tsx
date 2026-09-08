interface PhotoProps {
  src: string;
  alt: string;
  ratio?: string;
  className?: string;
  rounded?: string;
}

export default function Photo({ src, alt, ratio = "aspect-[4/3]", className = "", rounded = "rounded-2xl" }: PhotoProps) {
  return (
    <div className={`relative ${ratio} w-full ${rounded} overflow-hidden ${className}`}>
      <img src={src} alt={alt} className="absolute inset-0 w-full h-full object-cover" />
    </div>
  );
}
