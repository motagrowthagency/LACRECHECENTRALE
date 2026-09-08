interface BlobProps {
  color?: string;
  className?: string;
  animate?: boolean;
}

export default function Blob({ color = "#F4B23E", className = "", animate = true }: BlobProps) {
  return (
    <svg
      viewBox="0 0 200 200"
      className={`${className} ${animate ? "animate-blob-float" : ""}`}
      style={{ filter: "blur(2px)" }}
    >
      <path
        fill={color}
        d="M45.6,-58.3C58.2,-49.9,67,-34.9,71.4,-18.5C75.8,-2.1,75.8,15.7,68.6,29.9C61.4,44.1,47,54.7,31.2,61.8C15.4,68.9,-1.8,72.5,-18.2,69.4C-34.6,66.3,-50.2,56.5,-60.5,42.6C-70.8,28.7,-75.8,10.7,-73.6,-6.1C-71.4,-22.9,-62,-38.5,-49,-47.4C-36,-56.3,-19.4,-58.5,-1.7,-56.2C16,-53.9,33,-66.7,45.6,-58.3Z"
        transform="translate(100 100)"
      />
    </svg>
  );
}
