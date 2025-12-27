import { Shield, Terminal } from "lucide-react";

const TerminalHeader = () => {
  return (
    <header className="border-b border-border bg-card/50 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Shield className="h-8 w-8 text-primary animate-pulse-glow" />
            <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full" />
          </div>
          <div className="flex flex-col">
            <h1 className="text-xl font-bold text-glow tracking-wider">
              CYBER<span className="text-secondary">SCAN</span>
            </h1>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Terminal className="h-3 w-3" />
              <span>Port Scanner v1.0</span>
            </div>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-success animate-pulse" />
            <span className="text-xs text-muted-foreground">SYSTEM ONLINE</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default TerminalHeader;
