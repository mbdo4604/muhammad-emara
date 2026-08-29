import Image from "next/image";

/** Wordmark locked to surrounding title font-size (1em = same height as Nour text). */
export function ProjectWordmark({
  src,
  title,
  priority = false,
  className = "",
}: {
  src: string;
  title: string;
  priority?: boolean;
  className?: string;
}) {
  return (
    <span className={`inline-flex items-center leading-none ${className}`}>
      <span className="sr-only">{title}</span>
      <Image
        src={src}
        alt=""
        width={818}
        height={341}
        priority={priority}
        unoptimized
        draggable={false}
        className="!relative !h-[1.35em] !w-auto !max-w-none object-contain object-left"
        style={{ height: "1.35em", width: "auto" }}
      />
    </span>
  );
}
