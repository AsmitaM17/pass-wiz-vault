import { useState } from "react";
import { Copy, Check, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";

interface PasswordDisplayProps {
  password: string;
  onRegenerate: () => void;
  isGenerating: boolean;
}

export function PasswordDisplay({ password, onRegenerate, isGenerating }: PasswordDisplayProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!password) return;
    
    await navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="glass-card rounded-lg p-4 glow">
      <div className="flex items-center gap-3">
        <div className="flex-1 min-w-0 overflow-hidden">
          <p 
            className={cn(
              "font-mono text-lg md:text-xl tracking-wider truncate transition-all duration-300",
              password ? "text-foreground" : "text-muted-foreground",
              isGenerating && "animate-shimmer"
            )}
          >
            {password || "Click generate to create password"}
          </p>
        </div>
        
        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            onClick={onRegenerate}
            disabled={isGenerating}
            className={cn(
              "p-2 rounded-md transition-all duration-200",
              "bg-secondary hover:bg-secondary/80",
              "text-muted-foreground hover:text-foreground",
              "disabled:opacity-50 disabled:cursor-not-allowed",
              isGenerating && "animate-spin"
            )}
            aria-label="Regenerate password"
          >
            <RefreshCw className="w-5 h-5" />
          </button>
          
          <button
            onClick={handleCopy}
            disabled={!password}
            className={cn(
              "p-2 rounded-md transition-all duration-200",
              "bg-primary/20 hover:bg-primary/30",
              "text-primary hover:text-primary",
              "disabled:opacity-50 disabled:cursor-not-allowed",
              copied && "bg-strength-strong/20 text-strength-strong"
            )}
            aria-label="Copy password"
          >
            {copied ? (
              <Check className="w-5 h-5" />
            ) : (
              <Copy className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
