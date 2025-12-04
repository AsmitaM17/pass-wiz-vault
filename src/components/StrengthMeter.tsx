import { cn } from "@/lib/utils";
import { StrengthResult } from "@/lib/passwordGenerator";

interface StrengthMeterProps {
  strength: StrengthResult | null;
}

export function StrengthMeter({ strength }: StrengthMeterProps) {
  if (!strength) return null;

  const strengthColors = {
    weak: "bg-strength-weak",
    fair: "bg-strength-fair",
    good: "bg-strength-good",
    strong: "bg-strength-strong",
  };

  const strengthTextColors = {
    weak: "text-strength-weak",
    fair: "text-strength-fair",
    good: "text-strength-good",
    strong: "text-strength-strong",
  };

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-sm text-muted-foreground">Strength</span>
        <span className={cn("text-sm font-medium", strengthTextColors[strength.level])}>
          {strength.label}
        </span>
      </div>
      
      <div className="h-2 bg-secondary rounded-full overflow-hidden">
        <div
          className={cn(
            "h-full rounded-full transition-all duration-500 ease-out",
            strengthColors[strength.level]
          )}
          style={{ width: `${strength.score}%` }}
        />
      </div>
    </div>
  );
}
