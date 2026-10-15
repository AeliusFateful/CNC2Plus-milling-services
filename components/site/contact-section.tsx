"use client";

import Image from "next/image";
import { useI18n } from "@/components/i18n-provider";
import { withBasePath } from "@/lib/base-path";
import { ContactDetails, LeadForm } from "@/components/site/lead-form";

// Язык подписей на карте — в параметре «!1sru»; для казахской версии он заменяется на «!1skk».
const MAP_SRC =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1000!2d71.43588754926792!3d51.19432428677463!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x424580c0bea701b1%3A0x77efd08e423d9f72!2z0YPQuy4g0J3QuNC60L7Qu9Cw0Y8g0JPQvtCz0L7Qu9GPIDI5LCDQkNGB0YLQsNC90LAgMDIwMDAwLCDQmtCw0LfQsNGF0YHRgtCw0L0!5e0!3m2!1sru!2sru!4v1789983943590!5m2!1sru!2sru";

export function ContactSection() {
  const { lang, t } = useI18n();

  return (
    <section
      id="contact"
      className="relative overflow-hidden border-t border-border/60 py-16 sm:py-24"
    >
      <div className="absolute inset-0">
        <Image
          src={withBasePath("/images/portfolio/7.2.jpg")}
          alt=""
          fill
          className="object-cover"
        />
      </div>
      <div className="absolute inset-0 bg-linear-to-b from-background via-background/95 to-background" />

      <div className="relative mx-auto grid max-w-360 grid-cols-1 gap-6 px-4 md:grid-cols-2 md:px-6">
        <div className="flex h-full flex-col gap-10 max-md:flex-row max-md:flex-wrap max-md:justify-center max-md:gap-x-4 max-md:gap-y-8">
          <ContactDetails />
          <div className="relative min-h-80 flex-1 overflow-hidden rounded-xl border border-border/60 max-md:min-h-64 max-md:basis-56 md:max-h-104">
            <iframe
              src={lang === "kk" ? MAP_SRC.replace("!5m2!1sru!2sru", "!5m2!1skk!2sru") : MAP_SRC}
              title={t.contact.mapTitle}
              className="absolute inset-0 block size-full"
              allowFullScreen
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
            />
          </div>
        </div>
        <LeadForm />
      </div>
    </section>
  );
}
