"use client";

import Link from "next/link";
import { ArrowRight, FileCheck2 } from "lucide-react";
import { useI18n } from "@/components/i18n-provider";
import { RichText } from "@/components/legal/rich-text";
import { privacyKk } from "@/lib/legal/privacy-kk";
import { privacyRu } from "@/lib/legal/privacy-ru";
import type { LegalBlock, LegalCell, LegalSection } from "@/lib/legal/types";

const pad = (n: number) => String(n).padStart(2, "0");

/** Номер пункта: на lg+ — отдельная колонка слева («1.1»), ниже lg — в начале первой строки текста. */
function Num({ value }: { value?: string }) {
  return (
    <span className="hidden pt-0.5 font-mono text-sm tabular-nums text-primary/80 lg:block">
      {value}
    </span>
  );
}

function InlineNum({ value }: { value?: string }) {
  if (!value) return null;
  return (
    <span className="mr-2 font-mono text-sm tabular-nums text-primary/80 lg:hidden">{value}</span>
  );
}

/** Сетка «номер | содержимое» только на lg+; ниже — обычный поток. */
const rowClassName = "lg:grid lg:grid-cols-[2.75rem_1fr] lg:gap-x-2";
/** Небольшой отступ первой строки пункта на узких экранах: номер не прижат к краю, пункты визуально разделены. */
const firstLineClassName = "max-lg:indent-3";

function Cell({ value }: { value: LegalCell }) {
  if (typeof value === "string") return <RichText text={value} />;
  return (
    <ul className="space-y-1.5">
      {value.map((item) => (
        <li key={item} className="flex gap-2.5">
          <span aria-hidden className="mt-2.5 size-1 shrink-0 rounded-full bg-primary" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function Bullets({ items }: { items: readonly string[] }) {
  return (
    <ul className="space-y-2.5">
      {items.map((item) => (
        <li key={item} className="flex gap-3">
          <span aria-hidden className="mt-2.5 size-1.5 shrink-0 rounded-full bg-primary" />
          <span>
            <RichText text={item} />
          </span>
        </li>
      ))}
    </ul>
  );
}

function Block({ block }: { block: LegalBlock }) {
  switch (block.type) {
    case "p":
      return (
        <div className={rowClassName}>
          <Num value={block.num} />
          <p className={`text-pretty leading-relaxed text-muted-foreground ${firstLineClassName}`}>
            <InlineNum value={block.num} />
            <RichText text={block.text} />
          </p>
        </div>
      );
    case "list":
      return (
        <div className={rowClassName}>
          <Num value={block.num} />
          <div className="space-y-3 leading-relaxed text-muted-foreground">
            {block.lead && (
              <p className={`text-pretty ${firstLineClassName}`}>
                <InlineNum value={block.num} />
                <RichText text={block.lead} />
              </p>
            )}
            <Bullets items={block.items} />
          </div>
        </div>
      );
    case "terms":
      return (
        <dl className="divide-y divide-border/60 overflow-hidden rounded-lg border border-border/60 bg-card/40">
          {block.items.map(({ term, text }) => (
            <div key={term} className="grid gap-1 px-4 py-3.5 sm:grid-cols-[13rem_1fr] sm:gap-6">
              <dt className="font-medium text-foreground">{term}</dt>
              <dd className="text-pretty leading-relaxed text-muted-foreground">{text}</dd>
            </div>
          ))}
        </dl>
      );
    case "table": {
      const [purposeHead, ...restHead] = block.head;
      return (
        <div className={rowClassName}>
          <Num value={block.num} />
          <div className="min-w-0 space-y-4">
            {block.lead && (
              <p className={`text-pretty leading-relaxed text-muted-foreground ${firstLineClassName}`}>
                <InlineNum value={block.num} />
                {block.lead}
              </p>
            )}
            {block.rows.map((row) => {
              const [purpose, ...cells] = row;
              return (
                <div
                  key={typeof purpose === "string" ? purpose : purpose.join()}
                  className="overflow-hidden rounded-lg border border-border/60 bg-card/40"
                >
                  <div className="border-b border-border/60 bg-card px-4 py-3.5">
                    <p className="font-mono text-xs uppercase tracking-[0.15em] text-primary">
                      {purposeHead}
                    </p>
                    <p className="mt-1.5 font-medium text-foreground">
                      <Cell value={purpose} />
                    </p>
                  </div>
                  <div className="grid divide-y divide-border/60 lg:grid-cols-3 lg:divide-x lg:divide-y-0">
                    {cells.map((cell, i) => (
                      <div key={restHead[i]} className="space-y-2.5 px-4 py-3.5 text-sm">
                        <p className="font-mono text-xs uppercase tracking-[0.15em] text-primary/80">
                          {restHead[i]}
                        </p>
                        <div className="leading-relaxed text-muted-foreground">
                          <Cell value={cell} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      );
    }
  }
}

function Contents({ sections, title }: { sections: readonly LegalSection[]; title: string }) {
  return (
    <ol className="space-y-0.5" aria-label={title}>
      {sections.map((section, index) => (
        <li key={section.id}>
          <a
            href={`#${section.id}`}
            className="flex gap-3 rounded-md px-2 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-card hover:text-foreground"
          >
            <span className="w-5 shrink-0 font-mono text-primary/80">{pad(index + 1)}</span>
            <span>{section.title}</span>
          </a>
        </li>
      ))}
    </ol>
  );
}

export function PrivacyDocument() {
  const { lang, t, path } = useI18n();
  const doc = lang === "kk" ? privacyKk : privacyRu;
  const updated = doc.details.at(-1);

  return (
    <div className="mx-auto max-w-360 px-4 py-12 md:px-6 md:py-16">
      <header className="max-w-4xl">
        <span className="font-mono text-sm uppercase tracking-[0.2em] text-primary">
          {t.legal.privacyEyebrow}
        </span>
        <h1 className="mt-4 text-balance text-3xl font-bold leading-snug tracking-[0.03em] text-foreground md:text-4xl lg:text-5xl">
          {doc.title}
        </h1>
        <p className="mt-5 max-w-3xl text-pretty text-lg leading-relaxed text-muted-foreground">
          <RichText text={doc.subtitle} />
        </p>
        <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-5 text-sm">
          {updated && (
            <span className="rounded-full border border-primary/40 bg-card px-3 py-1 text-muted-foreground">
              {updated.label}: <span className="text-foreground">{updated.value}</span>
            </span>
          )}
          <Link
            href={path("/consent")}
            className="inline-flex items-center gap-2 text-foreground underline decoration-primary/60 underline-offset-4 transition-colors hover:text-primary"
          >
            <FileCheck2 className="size-4 text-primary" />
            {t.legal.consentLinkLabel}
          </Link>
        </div>
      </header>

      <div className="mt-12 grid gap-10 lg:grid-cols-[17rem_minmax(0,1fr)] lg:gap-14">
        <aside>
          <details className="rounded-lg border border-border/60 bg-card/40 p-3 lg:hidden">
            <summary className="cursor-pointer select-none px-2 py-1 font-medium text-foreground">
              {doc.contentsTitle}
            </summary>
            <div className="mt-2">
              <Contents sections={doc.sections} title={doc.contentsTitle} />
            </div>
          </details>
          <nav className="sticky top-24 hidden max-h-[calc(100dvh-8rem)] overflow-y-auto pr-2 lg:block">
            <p className="mb-3 px-2 font-mono text-xs uppercase tracking-[0.2em] text-primary">
              {doc.contentsTitle}
            </p>
            <Contents sections={doc.sections} title={doc.contentsTitle} />
          </nav>
        </aside>

        <article className="mx-auto w-full min-w-0 max-w-4xl space-y-14 lg:mx-0">
          {doc.sections.map((section, index) => (
            <section key={section.id} id={section.id} className="scroll-mt-24">
              <h2 className="flex items-baseline gap-4 border-b border-border/60 pb-4 text-xl font-semibold tracking-[0.02em] text-foreground md:text-2xl">
                <span className="font-mono text-base font-bold text-primary/80">{pad(index + 1)}</span>
                <span className="text-balance">{section.title}</span>
              </h2>
              <div className="mt-6 space-y-5">
                {section.blocks.map((block, i) => (
                  <Block key={i} block={block} />
                ))}
              </div>
            </section>
          ))}

          <section className="rounded-xl border border-primary/40 bg-card p-6 md:p-8">
            <h2 className="font-mono text-sm uppercase tracking-[0.2em] text-primary">
              {t.legal.operatorTitle}
            </h2>
            <dl className="mt-5 space-y-3">
              {doc.details.map(({ label, value, href }) => (
                <div key={label} className="grid gap-1 sm:grid-cols-[13rem_1fr] sm:gap-6">
                  <dt className="text-muted-foreground">{label}</dt>
                  <dd className="min-w-0 break-words text-foreground">
                    {href ? (
                      <a
                        href={href}
                        className="underline decoration-primary/60 underline-offset-4 transition-colors hover:text-primary"
                      >
                        {value}
                      </a>
                    ) : (
                      value
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          </section>

          <Link
            href={path("/consent")}
            className="group flex items-center justify-between gap-4 rounded-xl border border-border/60 bg-card/40 p-5 transition-colors hover:border-primary/60"
          >
            <span className="flex items-center gap-3 font-medium text-foreground">
              <FileCheck2 className="size-5 text-primary" />
              {t.legal.consentLinkLabel}
            </span>
            <ArrowRight className="size-5 text-primary transition-transform group-hover:translate-x-1" />
          </Link>
        </article>
      </div>
    </div>
  );
}
