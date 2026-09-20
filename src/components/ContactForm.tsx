"use client";

import { AnimatePresence, motion } from "motion/react";
import { useActionState, useEffect, useId, useRef } from "react";
import { useFormStatus } from "react-dom";
import { sendMessage } from "@/app/actions";
import { initialContactState } from "@/lib/contact";

function Field({
  id,
  label,
  error,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="mono-label block text-stone-500">
        {label}
      </label>
      <div className="mt-2.5">{children}</div>
      <AnimatePresence>
        {error && (
          <motion.p
            id={`${id}-error`}
            role="alert"
            className="mono-label mt-2 flex items-start gap-1.5 text-accent"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <StatusIcon kind="error" />
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

/** Success and error must be tellable apart with colour ignored (WCAG 1.4.1). */
function StatusIcon({ kind }: { kind: "success" | "error" }) {
  return (
    <svg
      viewBox="0 0 16 16"
      className="mt-px h-3.5 w-3.5 shrink-0"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden="true"
    >
      {kind === "success" ? (
        <>
          <circle cx="8" cy="8" r="6.25" />
          <path d="m5.2 8.3 1.9 1.9 3.7-4" strokeLinecap="round" strokeLinejoin="round" />
        </>
      ) : (
        <>
          <path
            d="M8 2.2 14.4 13.2H1.6L8 2.2Z"
            strokeLinejoin="round"
          />
          <path d="M8 6.6v2.9" strokeLinecap="round" />
          <circle cx="8" cy="11.4" r="0.55" fill="currentColor" stroke="none" />
        </>
      )}
    </svg>
  );
}

const INPUT =
  "w-full rounded-lg border border-stone-100/12 aria-[invalid=true]:border-accent/60 bg-stone-100/[0.03] px-4 py-3 text-[15px] text-stone-100 placeholder:text-stone-700 transition-colors duration-300 hover:border-stone-100/22 focus:border-accent/60 focus:bg-stone-100/[0.05] focus:outline-none";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="group relative inline-flex items-center gap-2.5 overflow-hidden rounded-pill bg-cream px-6 py-3 text-stone-1100 transition-colors duration-300 hover:bg-white disabled:cursor-not-allowed disabled:opacity-60"
    >
      <span className="mono-label relative z-10">
        {pending ? "Sending" : "Send message"}
      </span>
      {pending ? (
        <span
          className="relative z-10 h-3 w-3 animate-spin rounded-full border border-stone-1100/30 border-t-stone-1100"
          aria-hidden="true"
        />
      ) : (
        <svg
          viewBox="0 0 16 16"
          className="relative z-10 h-3 w-3 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          aria-hidden="true"
        >
          <path d="M2 8h11M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </button>
  );
}

export default function ContactForm() {
  const [state, formAction] = useActionState(sendMessage, initialContactState);
  const formRef = useRef<HTMLFormElement>(null);
  const uid = useId();

  const nameId = `${uid}-name`;
  const emailId = `${uid}-email`;
  const messageId = `${uid}-message`;

  useEffect(() => {
    if (state.status === "success") formRef.current?.reset();
  }, [state.status]);

  return (
    <div className="relative overflow-hidden rounded-2xl border border-stone-100/10 bg-stone-1000/60 p-6 backdrop-blur-sm md:p-8">
      <div className="dot-grid pointer-events-none absolute inset-0 opacity-25" />

      <div className="relative">
        <h3 className="display text-[1.5rem] leading-none text-stone-100">
          Send a message
        </h3>
        <p className="mt-3 text-[14.5px] leading-relaxed text-stone-600">
          Tell me which practice you need — web development, AI automation, or
          both as separate pieces of work.
        </p>

        <form ref={formRef} action={formAction} className="mt-7 space-y-5">
          {/* Honeypot — visually and programmatically hidden from people */}
          <div aria-hidden="true" className="absolute left-[-9999px] top-0">
            <label htmlFor={`${uid}-company`}>Company</label>
            <input
              id={`${uid}-company`}
              type="text"
              name="company"
              tabIndex={-1}
              autoComplete="off"
            />
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <Field id={nameId} label="Name" error={state.errors?.name}>
              <input
                id={nameId}
                name="name"
                type="text"
                required
                maxLength={100}
                autoComplete="name"
                defaultValue={state.values?.name}
                placeholder="Your name"
                aria-invalid={Boolean(state.errors?.name)}
                aria-describedby={state.errors?.name ? `${nameId}-error` : undefined}
                className={INPUT}
              />
            </Field>

            <Field id={emailId} label="Email" error={state.errors?.email}>
              <input
                id={emailId}
                name="email"
                type="email"
                required
                maxLength={200}
                autoComplete="email"
                defaultValue={state.values?.email}
                placeholder="you@company.com"
                aria-invalid={Boolean(state.errors?.email)}
                aria-describedby={state.errors?.email ? `${emailId}-error` : undefined}
                className={INPUT}
              />
            </Field>
          </div>

          <Field id={messageId} label="Message" error={state.errors?.message}>
            <textarea
              id={messageId}
              name="message"
              required
              rows={5}
              maxLength={5000}
              defaultValue={state.values?.message}
              placeholder="What are you building, and which practice do you need?"
              aria-invalid={Boolean(state.errors?.message)}
              aria-describedby={state.errors?.message ? `${messageId}-error` : undefined}
              className={`${INPUT} resize-y min-h-[130px]`}
            />
          </Field>

          <div className="flex flex-wrap items-center gap-4 pt-1">
            <SubmitButton />

            <AnimatePresence mode="wait">
              {state.message && (
                <motion.p
                  key={state.message}
                  role="status"
                  className="mono-label flex max-w-[38ch] items-start gap-2 text-accent"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                >
                  <StatusIcon kind={state.status === "success" ? "success" : "error"} />
                  {state.message}
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </form>
      </div>
    </div>
  );
}
