// Common port to service mapping
const portServices: Record<number, string> = {
  20: "FTP-DATA",
  21: "FTP",
  22: "SSH",
  23: "Telnet",
  25: "SMTP",
  53: "DNS",
  67: "DHCP",
  68: "DHCP",
  69: "TFTP",
  80: "HTTP",
  110: "POP3",
  119: "NNTP",
  123: "NTP",
  135: "MS-RPC",
  137: "NetBIOS",
  138: "NetBIOS",
  139: "NetBIOS",
  143: "IMAP",
  161: "SNMP",
  162: "SNMP-Trap",
  389: "LDAP",
  443: "HTTPS",
  445: "SMB",
  465: "SMTPS",
  514: "Syslog",
  587: "SMTP-Submit",
  636: "LDAPS",
  993: "IMAPS",
  995: "POP3S",
  1433: "MSSQL",
  1521: "Oracle",
  3306: "MySQL",
  3389: "RDP",
  5432: "PostgreSQL",
  5900: "VNC",
  6379: "Redis",
  8080: "HTTP-Alt",
  8443: "HTTPS-Alt",
  27017: "MongoDB",
};

export const getServiceName = (port: number): string => {
  return portServices[port] || "Unknown";
};

export interface ScanResult {
  port: number;
  status: "open" | "closed" | "filtered";
  service: string;
}

// Simulated port scanner for educational purposes
// In a real environment, this would require backend implementation
export const simulateScan = async (
  port: number,
  onResult: (result: ScanResult) => void
): Promise<void> => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, Math.random() * 50 + 20));

  // Common open ports for simulation
  const commonOpenPorts = [22, 80, 443, 8080, 3000, 5000];
  
  // Determine status based on simulation logic
  let status: "open" | "closed" | "filtered";
  
  if (commonOpenPorts.includes(port)) {
    status = "open";
  } else if (Math.random() < 0.05) {
    // 5% chance of being open for other ports
    status = "open";
  } else if (Math.random() < 0.1) {
    // 10% chance of being filtered
    status = "filtered";
  } else {
    status = "closed";
  }

  const result: ScanResult = {
    port,
    status,
    service: getServiceName(port),
  };

  onResult(result);
};
