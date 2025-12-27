import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Scan, Target } from "lucide-react";

interface ScannerInputProps {
  onScan: (target: string, startPort: number, endPort: number) => void;
  isScanning: boolean;
}

const ScannerInput = ({ onScan, isScanning }: ScannerInputProps) => {
  const [target, setTarget] = useState("127.0.0.1");
  const [startPort, setStartPort] = useState("1");
  const [endPort, setEndPort] = useState("1024");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onScan(target, parseInt(startPort), parseInt(endPort));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 md:grid-cols-3">
        <div className="space-y-2">
          <Label htmlFor="target" className="flex items-center gap-2 text-sm">
            <Target className="h-4 w-4 text-secondary" />
            Target IP/Hostname
          </Label>
          <Input
            id="target"
            type="text"
            value={target}
            onChange={(e) => setTarget(e.target.value)}
            placeholder="e.g., 192.168.1.1"
            className="bg-input border-border focus:border-primary focus:ring-primary/20 placeholder:text-muted-foreground/50"
            disabled={isScanning}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="startPort" className="text-sm">
            Start Port
          </Label>
          <Input
            id="startPort"
            type="number"
            min="1"
            max="65535"
            value={startPort}
            onChange={(e) => setStartPort(e.target.value)}
            className="bg-input border-border focus:border-primary focus:ring-primary/20"
            disabled={isScanning}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="endPort" className="text-sm">
            End Port
          </Label>
          <Input
            id="endPort"
            type="number"
            min="1"
            max="65535"
            value={endPort}
            onChange={(e) => setEndPort(e.target.value)}
            className="bg-input border-border focus:border-primary focus:ring-primary/20"
            disabled={isScanning}
          />
        </div>
      </div>
      <Button
        type="submit"
        disabled={isScanning}
        className="w-full bg-primary text-primary-foreground hover:bg-primary/90 box-glow transition-all duration-300 hover:shadow-[0_0_30px_hsl(142_70%_45%/0.6)]"
      >
        {isScanning ? (
          <>
            <Scan className="mr-2 h-4 w-4 animate-spin" />
            SCANNING...
          </>
        ) : (
          <>
            <Scan className="mr-2 h-4 w-4" />
            INITIATE SCAN
          </>
        )}
      </Button>
    </form>
  );
};

export default ScannerInput;
