import { Progress } from "@/components/ui/progress";

interface ScanProgressProps {
  current: number;
  total: number;
  currentPort: number;
}

const ScanProgress = ({ current, total, currentPort }: ScanProgressProps) => {
  const percentage = Math.round((current / total) * 100);

  return (
    <div className="space-y-3 p-4 bg-card border border-border rounded-lg">
      <div className="flex items-center justify-between text-sm">
        <span className="text-muted-foreground">Scan Progress</span>
        <span className="text-primary text-glow">{percentage}%</span>
      </div>
      <Progress value={percentage} className="h-2 bg-muted" />
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span>
          Scanned: <span className="text-primary">{current}</span> / {total} ports
        </span>
        <span>
          Current Port: <span className="text-secondary">{currentPort}</span>
        </span>
      </div>
      <div className="relative h-1 overflow-hidden rounded bg-muted">
        <div className="absolute inset-0 w-1/3 bg-gradient-to-r from-transparent via-primary to-transparent animate-scan" />
      </div>
    </div>
  );
};

export default ScanProgress;
