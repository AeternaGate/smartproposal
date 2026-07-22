"use client";

import { Trash2 } from "lucide-react";
import { useFormStatus } from "react-dom";
import { deleteDocument } from "./actions";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      variant="ghost"
      size="sm"
      disabled={pending}
      className="text-ink-tertiary hover:text-red-500"
    >
      <Trash2 className="size-3.5" />
      Delete
    </Button>
  );
}

import { Button } from "@/components/ui/button";

export function DeleteButton({ id }: { id: string }) {
  return (
    <form action={deleteDocument.bind(null, id)}>
      <SubmitButton />
    </form>
  );
}
