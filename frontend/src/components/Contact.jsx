import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { Loader2, Send, CheckCircle2, XCircle } from "lucide-react";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";

// zod describes the *shape* the form data must have. react-hook-form calls
// this on every submit and blocks the request until it passes.
const contactSchema = z.object({
  name: z.string().trim().min(2, "Enter your full name"),
  email: z.string().trim().email("Enter a valid email address"),
  organization: z.string().trim().optional(),
  purpose: z.string().trim().min(10, "Tell me a bit more (10+ characters)"),
});

export default function Contact() {
  // "status" tracks the network round-trip so the button/message can react to it.
  const [status, setStatus] = useState("idle"); // idle | submitting | success | error

  // Honeypot: a field real users never see or fill, kept outside react-hook-form
  // so it can't accidentally become a validated/required field. Bots that
  // auto-fill every input on a page will fill this one.
  const honeypotRef = useRef(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", organization: "", purpose: "" },
  });

  // Only runs once zod validation above has already passed.
  async function onSubmit(data) {
    if (honeypotRef.current?.value) {
      // Looks like a bot. Pretend it worked so it doesn't learn to adapt.
      setStatus("success");
      reset();
      return;
    }

    setStatus("submitting");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
      reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="contact" className="px-6 py-28">
      <div className="mx-auto max-w-2xl">
        <SectionHeading
          eyebrow="Let's talk"
          title="Connect With Me"
          subtitle="Hiring, collaborating, or just want to say hi — drop a note and it lands straight in my inbox."
        />

        <Reveal>
          <form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="glass glow-border space-y-5 rounded-2xl border border-border p-6 sm:p-8"
          >
            {/* Honeypot — visually and semantically hidden from real users */}
            <input
              ref={honeypotRef}
              type="text"
              name="company_website"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              className="absolute -left-[9999px] h-0 w-0 opacity-0"
            />

            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Name" error={errors.name?.message}>
                <input
                  {...register("name")}
                  type="text"
                  placeholder="Jane Doe"
                  className="field-input"
                />
              </Field>

              <Field label="Email" error={errors.email?.message}>
                <input
                  {...register("email")}
                  type="email"
                  placeholder="jane@company.com"
                  className="field-input"
                />
              </Field>
            </div>

            <Field label="Organization (optional)" error={errors.organization?.message}>
              <input
                {...register("organization")}
                type="text"
                placeholder="Company / Team"
                className="field-input"
              />
            </Field>

            <Field label="Purpose" error={errors.purpose?.message}>
              <textarea
                {...register("purpose")}
                rows={4}
                placeholder="What would you like to connect about?"
                className="field-input resize-none"
              />
            </Field>

            <motion.button
              type="submit"
              disabled={status === "submitting"}
              whileHover={{ scale: status === "submitting" ? 1 : 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-neon-purple px-6 py-3 text-sm font-semibold text-white shadow-[0_0_25px_rgba(168,85,247,0.45)] disabled:opacity-60"
            >
              {status === "submitting" ? (
                <>
                  <Loader2 size={16} className="animate-spin" /> Sending…
                </>
              ) : (
                <>
                  <Send size={16} /> Send Message
                </>
              )}
            </motion.button>

            {status === "success" && (
              <p className="flex items-center gap-2 text-sm text-neon-green">
                <CheckCircle2 size={16} /> Message sent — I'll get back to you soon.
              </p>
            )}
            {status === "error" && (
              <p className="flex items-center gap-2 text-sm text-red-400">
                <XCircle size={16} /> Something went wrong. Try again or email me directly.
              </p>
            )}
          </form>
        </Reveal>
      </div>
    </section>
  );
}

// Small local component: label + input slot + error message, reused for
// every field above so the markup isn't repeated four times.
function Field({ label, error, children }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-medium text-text-dim">{label}</span>
      {children}
      {error && <span className="mt-1 block text-xs text-red-400">{error}</span>}
    </label>
  );
}
