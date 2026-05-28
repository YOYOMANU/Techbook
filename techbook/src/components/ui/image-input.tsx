import { useState, type ChangeEventHandler, type ComponentProps } from "react";
import { Input } from "./input";
import { cn } from "../../lib/utils";
import { UploadIcon } from "lucide-react";

type Props = ComponentProps<"input"> & {
  progress?: number;
};

export function ImageInput({
  className,
  progress,
  defaultValue,
  onChange, // ← extraire onChange des props
  ...props
}: Props) {
  const [hover, setHover] = useState(false);
  const [preview, setPreview] = useState(defaultValue?.toString() ?? null);

  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setHover(false);
    const file = event.target.files?.[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
    onChange?.(event); // ✅ notifie RHF après le preview
  };

  return (
    <div
      className={cn(
        className,
        "relative group mb-2 grid place-items-center rounded-md overflow-hidden transition-all",
        props["aria-invalid"] && "ring-destructive ring-2 bg-destructive",
        hover && "bg-primary/10 text-primary ring-primary ring-2",
      )}
      onMouseOver={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <Input
        type="file"
        {...props} // ← onChange n'est plus dedans, pas de conflit
        onChange={handleChange}
        onDragOver={() => setHover(true)}
        onDragLeave={() => setHover(false)}
        className="absolute inset-0 top-1 w-full opacity-0 h-40 cursor-pointer z-10"
      />
      <UploadIcon size={16} />
      {preview && (
        <img
          src={preview}
          className={cn(
            "absolute inset-0 object-cover w-full h-full transition-all",
            (hover || props["aria-invalid"]) && "opacity-20",
          )}
          alt=""
        />
      )}
      {progress && (
        <div
          className="h-2 opacity-80 w-full absolute bottom-0 left-0 pointer-none origin-left bg-primary"
          style={{ transform: `scaleX(${progress.toFixed(2)})` }}
        />
      )}
    </div>
  );
}
