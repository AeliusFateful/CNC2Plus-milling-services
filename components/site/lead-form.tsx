"use client";

import { useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { Loader2, Phone, Send } from "lucide-react";
import { useI18n } from "@/components/i18n-provider";
import { SectionHeading } from "@/components/site/section-heading";
import { SocialLinks } from "@/components/site/social-links";
import { WorkSchedule } from "@/components/site/work-schedule";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldError,
} from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { phones } from "@/lib/site-config";
import { ru } from "@/lib/i18n/ru";
import { formatPhone, isPhoneComplete, isPhoneEmpty } from "@/lib/phone";

// Оператору в Telegram услуга приходит всегда на русском, независимо от языка сайта.
const SERVICE_VALUES = ru.form.serviceOptions;

type Status = "idle" | "loading" | "success" | "error";

export function LeadForm() {
  const { lang, t, path } = useI18n();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState<string | null>(null);
  const [comment, setComment] = useState("");
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    if (!consent) {
      setError(t.form.errors.consent);
      return;
    }
    if (name.trim().length === 0) {
      setError(t.form.errors.name);
      return;
    }
    if (!isPhoneComplete(phone)) {
      setError(t.form.errors.phone);
      return;
    }
    setStatus("loading");
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          phone,
          service,
          comment,
          consent,
          lang,
        }),
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || t.form.errors.failed);
      }

      setStatus("success");
      toast.success(t.form.success, {
        description: t.form.successDescription,
      });
      setName("");
      setPhone("");
      setService(null);
      setComment("");
      setConsent(false);
    } catch (err) {
      setStatus("error");
      const message =
        err instanceof Error ? err.message : t.form.errors.generic;
      setError(message);
      toast.error(message);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col self-center rounded-md border border-border/60 bg-card p-5 md:p-6"
    >
      <FieldGroup className="gap-7">
        <Field>
          <FieldLabel htmlFor="name">{t.form.name}</FieldLabel>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={t.form.namePlaceholder}
            autoComplete="name"
            maxLength={100}
            minLength={2}
          />
        </Field>

        <Field>
          <FieldLabel htmlFor="phone">{t.form.phone}</FieldLabel>
          <Input
            id="phone"
            type="tel"
            inputMode="tel"
            value={phone}
            onChange={(e) => {
              const deleting = (
                e.nativeEvent as InputEvent
              ).inputType?.startsWith("delete");
              setPhone(formatPhone(e.target.value, phone, Boolean(deleting)));
            }}
            onFocus={() => {
              if (!phone) setPhone(formatPhone("", "", false));
            }}
            onBlur={() => {
              if (isPhoneEmpty(phone)) setPhone("");
            }}
            onPaste={(e) => {
              e.preventDefault();
              setPhone(formatPhone(e.clipboardData.getData("text"), "", false));
            }}
            placeholder="+7 (___) ___-__-__"
            autoComplete="tel"
            maxLength={18}
            autoCapitalize="none"
            autoCorrect="off"
          />
          <p className="text-sm text-muted-foreground">{t.form.whatsappNote}</p>
        </Field>

        <Field>
          <FieldLabel htmlFor="service">{t.form.service}</FieldLabel>
          <Select
            value={service}
            onValueChange={(value) => setService(value as string)}
          >
            <SelectTrigger id="service" className="w-full">
              <SelectValue placeholder={t.form.servicePlaceholder}>
                {(value: string | null) => {
                  const index = value ? SERVICE_VALUES.indexOf(value) : -1;
                  return index >= 0 ? t.form.serviceOptions[index] : t.form.servicePlaceholder;
                }}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              {SERVICE_VALUES.map((value, index) => (
                <SelectItem key={value} value={value}>
                  {t.form.serviceOptions[index]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>

        <Field>
          <FieldLabel htmlFor="comment">{t.form.comment}</FieldLabel>
          <Textarea
            id="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder={t.form.commentPlaceholder}
            rows={4}
            className="min-h-40"
            maxLength={2000}
          />
        </Field>

        <label className="flex cursor-pointer items-start gap-3 text-sm leading-relaxed text-muted-foreground">
          <input
            type="checkbox"
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
            className="mt-0.5 size-4 shrink-0 cursor-pointer accent-primary"
          />
          <span>
            {t.form.consentPrefix}{" "}
            <Link
              href={path("/consent")}
              target="_blank"
              className="text-foreground underline underline-offset-4 transition-colors hover:text-primary"
            >
              {t.form.consentLink}
            </Link>
            {t.form.consentSuffix}
          </span>
        </label>

        {error && (
          <Field data-invalid>
            <FieldError>{error}</FieldError>
          </Field>
        )}

        <Button
          type="submit"
          size="lg"
          disabled={status === "loading" || !consent}
          className="w-full"
        >
          {status === "loading" ? (
            <Loader2 data-icon="inline-start" className="animate-spin" />
          ) : (
            <Send data-icon="inline-start" />
          )}
          {t.form.submit}
        </Button>
      </FieldGroup>
    </form>
  );
}

export function ContactDetails() {
  const { t } = useI18n();

  return (
    // До md корень «растворяется»: заголовок и блоки становятся элементами flex-ряда секции, карта встаёт справа от блоков.
    <div className="flex flex-col gap-8 max-md:contents">
      <SectionHeading
        eyebrow={t.contact.eyebrow}
        title={t.contact.title}
        description={t.contact.description}
        className="max-w-xl max-md:mr-auto max-md:basis-full"
      />

      {/*
        До md и пока в колонке меньше 28rem блоки стоят только друг под другом: колонка по ширине самого широкого
        блока, остальные растянуты до неё. Иначе — телефон с соцсетями и график в ряд (с переносом).
      */}
      <div className="md:@container max-md:self-start">
        <div className="flex w-fit flex-col gap-y-6 md:max-lg:mx-auto md:@md:w-auto md:@md:flex-row md:@md:flex-wrap md:@md:items-start md:@md:gap-x-12 md:max-lg:@md:justify-center">
          <div className="flex flex-col gap-6">
            <a
              href={`tel:${phones.href}`}
              className="flex items-center gap-3 text-foreground transition-colors hover:text-primary"
            >
              <span className="flex size-10 items-center justify-center rounded-md border-[0.5px] border-primary/40 bg-card">
                <Phone className="size-4 text-primary" />
              </span>
              {phones.display}
            </a>
            <SocialLinks className="w-full justify-between gap-0" />
          </div>
          <WorkSchedule className="md:@md:w-fit w-full" />
        </div>
      </div>
    </div>
  );
}
