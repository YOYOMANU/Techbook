import { CheckCircle } from "lucide-react";

export function SuccessBanner({ message }: { message: string }) {
  return (
    <div className="flex items-center gap-2 text-sm text-emerald-600 bg-emerald-50 dark:bg-emerald-950/30 dark:text-emerald-400 px-3 py-2 rounded-md">
      <CheckCircle className="h-4 w-4 shrink-0" />
      {message}
    </div>
  );
}
