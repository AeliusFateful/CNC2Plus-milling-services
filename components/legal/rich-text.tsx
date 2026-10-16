import { Fragment } from "react";

// Ссылки и e-mail в тексте превращаются в кликабельные; точка или скобка в конце ссылкой не считается.
const TOKEN_RE = /(https?:\/\/[^\s,;)]*[^\s.,;)]|[\w.+-]+@[\w-]+\.[\w.]*\w)/g;

const linkClassName =
  "break-words text-foreground underline decoration-primary/60 underline-offset-[6px] transition-colors hover:text-primary";

export function RichText({ text }: { text: string }) {
  return text.split(TOKEN_RE).map((part, index) => {
    if (index % 2 === 0) return <Fragment key={index}>{part}</Fragment>;
    const href = part.includes("@") ? `mailto:${part}` : part;
    return (
      <a key={index} href={href} className={linkClassName}>
        {part}
      </a>
    );
  });
}
