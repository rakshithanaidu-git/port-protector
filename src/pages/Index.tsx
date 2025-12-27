import { useState, useCallback } from "react";
import TerminalHeader from "@/components/TerminalHeader";
import ScannerInput from "@/components/ScannerInput";
import ScanProgress from "@/components/ScanProgress";
import ScanResults, { PortResult } from "@/components/ScanResults";
import CommonPorts from "@/components/CommonPorts";
import ScanHistory, { ScanRecord } from "@/components/ScanHistory";
import { simulateScan } from "@/lib/portScanner";
import { toast } from "@/hooks/use-toast";

const Index = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [results, setResults] = useState<PortResult[]>([]);
  const [progress, setProgress] = useState({ current: 0, total: 0, currentPort: 0 });
  const [history, setHistory] = useState<ScanRecord[]>([]);

  const handleScan = useCallback(async (target: string, startPort: number, endPort: number) => {
    if (startPort > endPort) {
      toast({
        title: "Invalid Port Range",
        description: "Start port must be less than or equal to end port",
        variant: "destructive",
      });
      return;
    }

    if (startPort < 1 || endPort > 65535) {
      toast({
        title: "Invalid Port Range",
        description: "Ports must be between 1 and 65535",
        variant: "destructive",
      });
      return;
    }

    setIsScanning(true);
    setResults([]);
    
    const totalPorts = endPort - startPort + 1;
    setProgress({ current: 0, total: totalPorts, currentPort: startPort });

    toast({
      title: "Scan Initiated",
      description: `Scanning ${target} ports ${startPort}-${endPort}`,
    });

    const scanResults: PortResult[] = [];

    for (let port = startPort; port <= endPort; port++) {
      await simulateScan(port, (result) => {
        if (result.status === "open") {
          scanResults.push(result);
          setResults([...scanResults]);
        }
      });

      setProgress({
        current: port - startPort + 1,
        total: totalPorts,
        currentPort: port,
      });
    }

    setIsScanning(false);

    // Add to history
    const newRecord: ScanRecord = {
      id: Date.now().toString(),
      target,
      portRange: `${startPort}-${endPort}`,
      openPorts: scanResults.length,
      timestamp: new Date(),
    };
    setHistory((prev) => [newRecord, ...prev]);

    toast({
      title: "Scan Complete",
      description: `Found ${scanResults.length} open ports on ${target}`,
    });
  }, []);

  return (
    <div className="min-h-screen bg-background relative">
      {/* Scanline overlay effect */}
      <div className="fixed inset-0 scanline pointer-events-none z-50" />
      
      {/* Gradient background */}
      <div className="fixed inset-0 bg-gradient-to-br from-background via-background to-primary/5 pointer-events-none" />

      <TerminalHeader />

      <main className="container mx-auto px-4 py-8 relative z-10">
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Main Scanner Panel */}
          <div className="lg:col-span-2 space-y-6">
            {/* Scanner Input Card */}
            <div className="bg-card border border-border rounded-lg p-6 space-y-6">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span className="text-primary">&gt;</span>
                <span>SCANNER TERMINAL</span>
                <span className="animate-blink">_</span>
              </div>
              <ScannerInput onScan={handleScan} isScanning={isScanning} />
            </div>

            {/* Progress */}
            {isScanning && (
              <ScanProgress
                current={progress.current}
                total={progress.total}
                currentPort={progress.currentPort}
              />
            )}

            {/* Results */}
            <div className="bg-card border border-border rounded-lg p-6">
              <ScanResults results={results} isScanning={isScanning} />
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <CommonPorts />
            <ScanHistory history={history} />

            {/* Info Panel */}
            <div className="bg-card border border-border rounded-lg p-4 space-y-3">
              <h3 className="text-sm font-medium text-secondary">About This Tool</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                This is an educational port scanner simulation demonstrating how 
                security tools identify open network ports. In real scenarios, 
                port scanning helps discover potential security vulnerabilities.
              </p>
              <div className="pt-2 border-t border-border">
                <p className="text-xs text-warning">
                  ⚠️ Only scan networks you own or have permission to test.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border mt-8">
        <div className="container mx-auto px-4 py-4 text-center text-xs text-muted-foreground">
          <span className="text-primary">CyberScan</span> • Educational Port Scanner • Use Responsibly
        </div>
      </footer>
    </div>
  );
};

export default Index;
