import Image from "next/image";
import { ContactDetails, LeadForm } from "@/components/site/lead-form";

export function ContactSection() {
  return (
    <section
      id="contact"
      className="relative overflow-hidden border-t border-border/60 py-24"
    >
      <div className="absolute inset-0 opacity-20">
        <Image
          src="./images/wood-texture.png"
          alt=""
          fill
          className="object-cover"
        />
      </div>
      <div className="absolute inset-0 bg-linear-to-b from-background via-background/95 to-background" />

      <div className="relative mx-auto grid max-w-360 grid-cols-1 gap-16 px-4 md:grid-cols-2 md:px-6">
        <ContactDetails />
        <LeadForm />
      </div>
    </section>
  );
}
