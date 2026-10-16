"use client";

import Link from "next/link";
import { ArrowRight, FileText, Mail, ShieldCheck } from "lucide-react";
import { useI18n } from "@/components/i18n-provider";
import { privacyKk } from "@/lib/legal/privacy-kk";
import { privacyRu } from "@/lib/legal/privacy-ru";

const EMAIL = "cnc2plus@gmail.com";
const POLICY_URL = "https://cnc2plus.kz/privacy";

export function ConsentDocument() {
  const { lang, t, path } = useI18n();
  const doc = lang === "kk" ? privacyKk : privacyRu;
  const updated = doc.details.at(-1);

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 md:px-6 md:py-16">
      <header>
        <span className="font-mono text-sm uppercase tracking-[0.2em] text-primary">
          {t.legal.consentEyebrow}
        </span>
        <h1 className="mt-4 text-balance text-3xl font-bold leading-snug tracking-[0.03em] text-foreground md:text-4xl lg:text-5xl">
          {t.legal.consentTitle}
        </h1>
        <p className="mt-5 max-w-3xl text-pretty text-lg leading-relaxed text-muted-foreground">
          {t.legal.consentIntro}
        </p>
        {updated && (
          <p className="mt-6 inline-block rounded-full border border-primary/40 bg-card px-3 py-1 text-sm text-muted-foreground">
            {updated.label}: <span className="text-foreground">{updated.value}</span>
          </p>
        )}
      </header>

      <article className="mt-10 rounded-xl border border-primary/40 bg-card p-6 md:p-10">
        <FileText className="size-8 text-primary" strokeWidth={1.5} />
        <p className="mt-6 text-pretty text-lg leading-8 text-foreground/90">
          {t.legal.consentText}{" "}
          <Link
            href={path("/privacy")}
            className="break-words text-foreground underline decoration-primary/60 underline-offset-[6px] transition-colors hover:text-primary"
          >
            {POLICY_URL}
          </Link>
          . {t.legal.consentRevokeBefore}
          <a
            href={`mailto:${EMAIL}`}
            className="break-words text-foreground underline decoration-primary/60 underline-offset-[6px] transition-colors hover:text-primary"
          >
            {EMAIL}
          </a>
          {t.legal.consentRevokeAfter}
        </p>
      </article>

      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <section className="rounded-xl border border-border/60 bg-card/40 p-6">
          <h2 className="flex items-center gap-3 font-semibold text-foreground">
            <Mail className="size-5 text-primary" />
            {t.legal.revokeTitle}
          </h2>
          <p className="mt-3 text-pretty leading-relaxed text-muted-foreground">
            {t.legal.revokeText}
          </p>
          <a
            href={`mailto:${EMAIL}?subject=${encodeURIComponent(lang === "kk" ? "Дербес деректер" : "Персональные данные")}`}
            className="mt-4 inline-block text-foreground underline decoration-primary/60 underline-offset-[6px] transition-colors hover:text-primary"
          >
            {EMAIL}
          </a>
        </section>

        <section className="rounded-xl border border-border/60 bg-card/40 p-6">
          <h2 className="flex items-center gap-3 font-semibold text-foreground">
            <ShieldCheck className="size-5 text-primary" />
            {t.legal.operatorTitle}
          </h2>
          <p className="mt-3 text-pretty leading-relaxed text-muted-foreground">
            {doc.details[0].value}
          </p>
        </section>
      </div>

      <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
        <Link
          href={path("/privacy")}
          className="group inline-flex items-center gap-2 font-medium text-foreground transition-colors hover:text-primary"
        >
          {t.legal.policyLinkLabel}
          <ArrowRight className="size-4 text-primary transition-transform group-hover:translate-x-1" />
        </Link>
        <Link
          href={path("/")}
          className="text-sm text-muted-foreground underline underline-offset-[6px] transition-colors hover:text-foreground"
        >
          {t.legal.backHome}
        </Link>
      </div>
    </div>
  );
}
