/**
 * Shared contact-form types and initial state.
 *
 * These live outside `src/app/actions.ts` on purpose: a `"use server"` module
 * may only export async functions, so a plain state object cannot sit there.
 */
export type ContactState = {
  status: "idle" | "success" | "error";
  message?: string;
  errors?: Partial<Record<"name" | "email" | "message", string>>;
  /** Echoed back so a failed submit does not wipe what was typed. */
  values?: { name: string; email: string; message: string };
};

export const initialContactState: ContactState = { status: "idle" };
