import { rotatingWords as WORDS } from "@/lib/sections-data";

export function RotatingWord() {
  return (
    <span className="relative inline-block h-[1.4em] overflow-hidden align-middle mb-1">
      <span className="rotating-word-track flex flex-col">
        {[...WORDS, WORDS[0]].map((word, i) => (
          <span key={i} className="block h-[1.4em] text-primary">
            {word}
          </span>
        ))}
      </span>
    </span>
  );
}
