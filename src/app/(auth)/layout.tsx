import { Logomark } from "@/components/ui/icons";
import Link from "next/link";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-canvas">
      <header className="flex h-14 items-center border-b border-hairline px-4 lg:px-6">
        <Link href="/" className="flex items-center gap-2">
          <Logomark className="size-6" />
          <span className="text-sm font-semibold text-ink">Propel</span>
        </Link>
      </header>
      <main className="flex flex-1 items-center justify-center p-4">
        <div className="w-full max-w-sm animate-slide-up">{children}</div>
      </main>
    </div>
  );
}
