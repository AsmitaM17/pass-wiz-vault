import { cn } from "@/lib/utils";

interface OptionToggleProps {
  label: string;
  description: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export function OptionToggle({ label, description, checked, onChange }: OptionToggleProps) {
  return (
    <button
      onClick={() => onChange(!checked)}
      className={cn(
        "w-full p-4 rounded-lg text-left transition-all duration-200",
        "border",
        checked 
          ? "border-primary/50 bg-primary/10" 
          : "border-border bg-secondary/30 hover:bg-secondary/50"
      )}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className={cn(
            "font-medium transition-colors",
            checked ? "text-foreground" : "text-muted-foreground"
          )}>
            {label}
          </p>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
        
        <div className={cn(
          "w-12 h-6 rounded-full p-1 transition-all duration-200",
          checked ? "bg-primary" : "bg-muted"
        )}>
          <div className={cn(
            "w-4 h-4 rounded-full transition-all duration-200",
            checked 
              ? "translate-x-6 bg-primary-foreground" 
              : "translate-x-0 bg-muted-foreground"
          )} />
        </div>
      </div>
    </button>
  );
}
