import { useState, useCallback, useEffect } from "react";
import { Shield, Sparkles } from "lucide-react";
import { generatePassword, calculateStrength, PasswordOptions, StrengthResult } from "@/lib/passwordGenerator";
import { PasswordDisplay } from "./PasswordDisplay";
import { StrengthMeter } from "./StrengthMeter";
import { LengthSlider } from "./LengthSlider";
import { OptionToggle } from "./OptionToggle";
import { cn } from "@/lib/utils";

export function PasswordGenerator() {
  const [password, setPassword] = useState("");
  const [strength, setStrength] = useState<StrengthResult | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  
  const [options, setOptions] = useState<PasswordOptions>({
    length: 16,
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: false,
  });

  const handleGenerate = useCallback(() => {
    setIsGenerating(true);
    
    // Small delay for visual effect
    setTimeout(() => {
      const newPassword = generatePassword(options);
      setPassword(newPassword);
      setStrength(calculateStrength(newPassword, options));
      setIsGenerating(false);
    }, 150);
  }, [options]);

  // Update strength when options change and password exists
  useEffect(() => {
    if (password) {
      const newPassword = generatePassword(options);
      setPassword(newPassword);
      setStrength(calculateStrength(newPassword, options));
    }
  }, [options]);

  const updateOption = <K extends keyof PasswordOptions>(
    key: K,
    value: PasswordOptions[K]
  ) => {
    setOptions(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="w-full max-w-lg mx-auto space-y-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 mb-4 glow">
          <Shield className="w-8 h-8 text-primary" />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
          Password <span className="text-primary text-glow">Generator</span>
        </h1>
        <p className="text-muted-foreground">
          Create strong, secure passwords instantly
        </p>
      </div>

      {/* Password Display */}
      <PasswordDisplay 
        password={password} 
        onRegenerate={handleGenerate}
        isGenerating={isGenerating}
      />

      {/* Strength Meter */}
      {strength && <StrengthMeter strength={strength} />}

      {/* Length Slider */}
      <div className="glass-card rounded-lg p-6">
        <LengthSlider 
          value={options.length} 
          onChange={(v) => updateOption("length", v)} 
        />
      </div>

      {/* Character Options */}
      <div className="space-y-3">
        <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
          Character Types
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <OptionToggle
            label="Uppercase"
            description="A-Z"
            checked={options.uppercase}
            onChange={(v) => updateOption("uppercase", v)}
          />
          <OptionToggle
            label="Lowercase"
            description="a-z"
            checked={options.lowercase}
            onChange={(v) => updateOption("lowercase", v)}
          />
          <OptionToggle
            label="Numbers"
            description="0-9"
            checked={options.numbers}
            onChange={(v) => updateOption("numbers", v)}
          />
          <OptionToggle
            label="Symbols"
            description="!@#$%^&*"
            checked={options.symbols}
            onChange={(v) => updateOption("symbols", v)}
          />
        </div>
      </div>

      {/* Generate Button */}
      <button
        onClick={handleGenerate}
        disabled={isGenerating}
        className={cn(
          "w-full py-4 px-6 rounded-lg font-semibold text-lg",
          "bg-primary text-primary-foreground",
          "transition-all duration-300",
          "hover:scale-[1.02] active:scale-[0.98]",
          "disabled:opacity-70 disabled:cursor-not-allowed",
          "animate-pulse-glow"
        )}
      >
        <span className="flex items-center justify-center gap-2">
          <Sparkles className="w-5 h-5" />
          Generate Password
        </span>
      </button>

      {/* Footer */}
      <p className="text-center text-xs text-muted-foreground">
        Passwords are generated locally and never stored
      </p>
    </div>
  );
}
