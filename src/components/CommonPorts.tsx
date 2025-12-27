import { Info } from "lucide-react";

const commonPorts = [
  { port: 21, service: "FTP", description: "File Transfer Protocol" },
  { port: 22, service: "SSH", description: "Secure Shell" },
  { port: 23, service: "Telnet", description: "Telnet Protocol" },
  { port: 25, service: "SMTP", description: "Simple Mail Transfer" },
  { port: 53, service: "DNS", description: "Domain Name System" },
  { port: 80, service: "HTTP", description: "Web Server" },
  { port: 110, service: "POP3", description: "Post Office Protocol" },
  { port: 143, service: "IMAP", description: "Internet Mail Access" },
  { port: 443, service: "HTTPS", description: "Secure Web Server" },
  { port: 993, service: "IMAPS", description: "Secure IMAP" },
  { port: 3306, service: "MySQL", description: "MySQL Database" },
  { port: 5432, service: "PostgreSQL", description: "PostgreSQL Database" },
];

const CommonPorts = () => {
  return (
    <div className="bg-card border border-border rounded-lg p-4 space-y-4">
      <div className="flex items-center gap-2">
        <Info className="h-4 w-4 text-secondary" />
        <h3 className="text-sm font-medium">Common Ports Reference</h3>
      </div>
      <div className="grid grid-cols-2 gap-2 text-xs">
        {commonPorts.map((item) => (
          <div
            key={item.port}
            className="flex items-center justify-between p-2 rounded bg-muted/30 hover:bg-muted/50 transition-colors"
          >
            <span className="text-primary font-mono">{item.port}</span>
            <span className="text-muted-foreground">{item.service}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommonPorts;
