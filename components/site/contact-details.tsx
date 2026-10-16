"use client";

import { Phone } from "lucide-react";
import { useI18n } from "@/components/i18n-provider";
import { SectionHeading } from "@/components/site/section-heading";
import { SocialLinks } from "@/components/site/social-links";
import { WorkSchedule } from "@/components/site/work-schedule";
import { phones } from "@/lib/site-config";

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
