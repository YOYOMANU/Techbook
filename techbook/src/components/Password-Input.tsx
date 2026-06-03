import { EyeClosedIcon, EyeIcon } from "lucide-react";
import { Input } from "./ui/input";
import { useState } from "react";

export function PasswordInput({
  id,
  placeholder = "••••••••",
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { id: string }) {
  const [show, setShow] = useState(false);
  return (
    <div className="relative">
      <Input
        id={id}
        type={show ? "text" : "password"}
        placeholder={placeholder}
        className="pr-10"
        {...props}
      />
      <button
        type="button"
        onClick={() => setShow((v) => !v)}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
        aria-label={show ? "Masquer" : "Afficher"}
      >
        {show ? (
          <EyeIcon className="h-4 w-4" />
        ) : (
          <EyeClosedIcon className="h-4 w-4" />
        )}
      </button>
    </div>
  );
}
