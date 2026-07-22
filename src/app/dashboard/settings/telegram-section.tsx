"use client";

import { Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { generateTelegramCode, unlinkTelegram } from "./actions";
import { useState } from "react";

interface Props {
  telegramChatId: string | null;
  verificationCode: string | null;
  verificationExpiresAt: string | null;
}

export function TelegramSection({ telegramChatId, verificationCode, verificationExpiresAt }: Props) {
  const [code, setCode] = useState(verificationCode);
  const [copied, setCopied] = useState(false);
  const isLinked = !!telegramChatId;
  const isExpired = verificationExpiresAt ? new Date(verificationExpiresAt) < new Date() : true;

  return (
    <div className="rounded-lg border border-hairline bg-surface-1 p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Smartphone className="size-4 text-primary" />
          <div>
            <p className="text-sm text-ink">Telegram</p>
            <p className="text-xs text-ink-tertiary">
              {isLinked
                ? "Your Telegram account is linked."
                : "Get notified about proposal updates via Telegram."}
            </p>
          </div>
        </div>
        {isLinked ? (
          <form action={unlinkTelegram}>
            <Button type="submit" variant="ghost" size="sm" className="text-ink-muted hover:text-red-500">
              Unlink
            </Button>
          </form>
        ) : (
          <div className="flex items-center gap-2">
            {code && !isExpired ? (
              <div className="flex items-center gap-2">
                <code className="rounded bg-surface-2 px-2 py-1 text-xs text-ink font-mono">{code}</code>
                <button
                  type="button"
                  onClick={async () => {
                    await navigator.clipboard.writeText(code);
                    setCopied(true);
                    setTimeout(() => setCopied(false), 2000);
                  }}
                  className="text-xs text-primary hover:text-primary/80"
                >
                  {copied ? "Copied!" : "Copy"}
                </button>
              </div>
            ) : (
              <form
                action={async () => {
                  const result = await generateTelegramCode();
                  setCode(result.code);
                }}
              >
                <Button type="submit" size="sm">
                  Generate Code
                </Button>
              </form>
            )}
          </div>
        )}
      </div>
      {code && !isExpired && !isLinked && (
        <p className="mt-2 text-xs text-ink-tertiary">
          Open Telegram, find your bot, and send: <code className="text-primary">/start {code}</code>
          <br />
          Code expires in 15 minutes.
        </p>
      )}
    </div>
  );
}
