import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, AlertCircle, Activity } from "lucide-react";

export interface PortResult {
  port: number;
  status: "open" | "closed" | "filtered";
  service: string;
}

interface ScanResultsProps {
  results: PortResult[];
  isScanning: boolean;
}

const getStatusIcon = (status: string) => {
  switch (status) {
    case "open":
      return <CheckCircle className="h-4 w-4 text-success" />;
    case "closed":
      return <XCircle className="h-4 w-4 text-destructive" />;
    case "filtered":
      return <AlertCircle className="h-4 w-4 text-warning" />;
    default:
      return null;
  }
};

const getStatusBadge = (status: string) => {
  switch (status) {
    case "open":
      return (
        <Badge className="bg-success/20 text-success border-success/30 hover:bg-success/30">
          OPEN
        </Badge>
      );
    case "closed":
      return (
        <Badge className="bg-destructive/20 text-destructive border-destructive/30 hover:bg-destructive/30">
          CLOSED
        </Badge>
      );
    case "filtered":
      return (
        <Badge className="bg-warning/20 text-warning border-warning/30 hover:bg-warning/30">
          FILTERED
        </Badge>
      );
    default:
      return null;
  }
};

const ScanResults = ({ results, isScanning }: ScanResultsProps) => {
  const openPorts = results.filter((r) => r.status === "open");

  if (results.length === 0 && !isScanning) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
        <Activity className="h-12 w-12 mb-4 opacity-50" />
        <p className="text-sm">No scan results yet</p>
        <p className="text-xs">Configure target and ports, then initiate scan</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-glow">SCAN RESULTS</h3>
        <div className="flex items-center gap-4 text-xs">
          <span className="text-success">
            Open: <span className="font-bold">{openPorts.length}</span>
          </span>
          <span className="text-muted-foreground">
            Total: <span className="font-bold">{results.length}</span>
          </span>
        </div>
      </div>

      <div className="border border-border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="border-border hover:bg-muted/50">
              <TableHead className="text-muted-foreground">PORT</TableHead>
              <TableHead className="text-muted-foreground">STATUS</TableHead>
              <TableHead className="text-muted-foreground">SERVICE</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {results.map((result) => (
              <TableRow
                key={result.port}
                className="border-border hover:bg-muted/30 transition-colors"
              >
                <TableCell className="font-mono">
                  <div className="flex items-center gap-2">
                    {getStatusIcon(result.status)}
                    <span className={result.status === "open" ? "text-success" : ""}>
                      {result.port}
                    </span>
                  </div>
                </TableCell>
                <TableCell>{getStatusBadge(result.status)}</TableCell>
                <TableCell className="text-muted-foreground">
                  {result.service}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ScanResults;
