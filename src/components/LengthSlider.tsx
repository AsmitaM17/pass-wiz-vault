import { Slider } from "@/components/ui/slider";

interface LengthSliderProps {
  value: number;
  onChange: (value: number) => void;
}

export function LengthSlider({ value, onChange }: LengthSliderProps) {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <span className="text-sm text-muted-foreground">Password Length</span>
        <span className="font-mono text-2xl font-bold text-primary text-glow">
          {value}
        </span>
      </div>
      
      <Slider
        value={[value]}
        onValueChange={([v]) => onChange(v)}
        min={4}
        max={64}
        step={1}
        className="w-full"
      />
      
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>4</span>
        <span>64</span>
      </div>
    </div>
  );
}
