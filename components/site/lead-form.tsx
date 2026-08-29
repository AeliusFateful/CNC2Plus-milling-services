"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Loader2, Phone, Send } from "lucide-react";
import { SocialLinks } from "@/components/site/social-links";
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
import { phones, siteConfig } from "@/lib/site-config";

const SERVICE_OPTIONS = [
  "Мебельные фасады",
  "Декоративные панели",
  "Вывески и таблички",
  "Перегородки и решётки",
  "Упаковка и тара",
  "Другое",
] as const;

type Status = "idle" | "loading" | "success" | "error";

export function LeadForm() {
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

    if (name.trim().length === 0) {
      setError("Укажите ваше имя");
      return;
    }
    if (phone.trim().length < 5) {
      setError("Укажите корректный телефон");
      return;
    }
    if (!consent) {
      setError("Подтвердите согласие на обработку персональных данных");
      return;
    }

    setStatus("loading");
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, service, comment }),
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Не удалось отправить заявку");
      }

      setStatus("success");
      toast.success("Заявка отправлена", {
        description: "Мы свяжемся с вами в ближайшее время.",
      });
      setName("");
      setPhone("");
      setService(null);
      setComment("");
      setConsent(false);
    } catch (err) {
      setStatus("error");
      const message =
        err instanceof Error ? err.message : "Что-то пошло не так";
      setError(message);
      toast.error(message);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-md border border-border/60 bg-card p-6 md:p-8"
    >
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="name">Имя</FieldLabel>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Как вас зовут"
            autoComplete="name"
            maxLength={100}
            minLength={2}
          />
        </Field>

        <Field>
          <FieldLabel htmlFor="phone">Телефон</FieldLabel>
          <Input
            id="phone"
            type="number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+7 (___) ___-__-__"
            autoComplete="tel"
            maxLength={15}
            autoCapitalize="none"
            autoCorrect="off"
          />
        </Field>

        <Field>
          <FieldLabel htmlFor="service">Услуга</FieldLabel>
          <Select
            value={service}
            onValueChange={(value) => setService(value as string)}
          >
            <SelectTrigger id="service" className="w-full">
              <SelectValue placeholder="Выберите услугу" />
            </SelectTrigger>
            <SelectContent>
              {SERVICE_OPTIONS.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>

        <Field>
          <FieldLabel htmlFor="comment">Комментарий</FieldLabel>
          <Textarea
            id="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Расскажите о задаче: материал, размеры, чертёж"
            rows={4}
            maxLength={1000}
          />
        </Field>

        {error && (
          <Field data-invalid>
            <FieldError>{error}</FieldError>
          </Field>
        )}

        <label
          htmlFor="consent"
          className="flex cursor-pointer items-start gap-3 text-xs leading-relaxed text-muted-foreground"
        >
          <input
            id="consent"
            type="checkbox"
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
            className="mt-0.5 size-4 shrink-0 rounded border-border/60 bg-card text-primary accent-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
          />
          <span>
            Я согласен на обработку персональных данных в соответствии с{" "}
            <a
              href="/privacy"
              className="text-foreground underline underline-offset-4 hover:text-primary"
            >
              политикой конфиденциальности
            </a>
          </span>
        </label>

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
          Отправить заявку
        </Button>
      </FieldGroup>
    </form>
  );
}

export function ContactDetails() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <span className="font-mono text-xs uppercase tracking-[0.2em] text-primary">
          Контакты
        </span>
        <h2 className="mt-4 text-balance text-4xl font-bold tracking-tight text-foreground md:text-5xl">
          Обсудим ваш проект
        </h2>
        <p className="mt-4 max-w-md text-pretty text-lg leading-relaxed text-muted-foreground">
          Оставьте заявку - рассчитаем стоимость и сроки в течение рабочего дня.
          Или свяжитесь с нами напрямую.
        </p>
      </div>

      <div className="flex flex-col gap-4">
        <a
          href={`tel:${phones.href}`}
          className="flex items-center gap-3 text-foreground transition-colors hover:text-primary"
        >
          <span className="flex size-10 items-center justify-center rounded-md border border-border/60 bg-card">
            <Phone className="size-4 text-primary" />
          </span>
          {phones.display}
        </a>
        <SocialLinks />
      </div>

      <div className="border-t border-border/60 pt-6 text-sm leading-relaxed text-muted-foreground">
        {siteConfig.address.workshop}
        <br />
        {siteConfig.schedule.weekdaysWeekendShort}
      </div>
    </div>
  );
}
