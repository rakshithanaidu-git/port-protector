import { Clock, Target } from "lucide-react";

export interface ScanRecord {
  id: string;
  target: string;
  portRange: string;
  openPorts: number;
  timestamp: Date;
}

interface ScanHistoryProps {
  history: ScanRecord[];
}

const ScanHistory = ({ history }: ScanHistoryProps) => {
  if (history.length === 0) {
    return (
      <div className="bg-card border border-border rounded-lg p-4">
        <div className="flex items-center gap-2 mb-4">
          <Clock className="h-4 w-4 text-secondary" />
          <h3 className="text-sm font-medium">Scan History</h3>
        </div>
        <p className="text-xs text-muted-foreground text-center py-4">
          No previous scans
        </p>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-lg p-4">
      <div className="flex items-center gap-2 mb-4">
        <Clock className="h-4 w-4 text-secondary" />
        <h3 className="text-sm font-medium">Scan History</h3>
      </div>
      <div className="space-y-2">
        {history.slice(0, 5).map((record) => (
          <div
            key={record.id}
            className="flex items-center justify-between p-2 rounded bg-muted/30 text-xs"
          >
            <div className="flex items-center gap-2">
              <Target className="h-3 w-3 text-primary" />
              <span className="font-mono">{record.target}</span>
            </div>
            <div className="flex items-center gap-3 text-muted-foreground">
              <span>{record.portRange}</span>
              <span className="text-success">{record.openPorts} open</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScanHistory;
