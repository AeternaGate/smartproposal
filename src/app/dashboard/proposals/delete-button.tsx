"use client";

import { Trash2 } from "lucide-react";
import { useFormStatus } from "react-dom";
import { deleteProposal } from "./actions";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="p-1.5 text-ink-tertiary hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all disabled:opacity-30"
    >
      <Trash2 className="size-3.5" />
    </button>
  );
}

export function DeleteButton({ id }: { id: string }) {
  return (
    <form action={deleteProposal.bind(null, id)}>
      <SubmitButton />
    </form>
  );
}
