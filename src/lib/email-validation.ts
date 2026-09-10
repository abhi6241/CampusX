const VCE_EMAIL_REGEX = /^1602-(\d{2})-(\d{3})-(\d{3})@vce\.ac\.in$/i;

const BRANCH_CODES: Record<string, string> = {
  "001": "CSE",
  "002": "ECE",
  "003": "EEE",
  "004": "MECH",
  "005": "CIVIL",
  "007": "CSE-AI",
  "008": "CSE-DS",
};

export interface ParsedEmail {
  isValid: boolean;
  rollNumber?: string;
  branch?: string;
  year?: number;
  error?: string;
}

export function parseVceEmail(email: string): ParsedEmail {
  const match = email.match(VCE_EMAIL_REGEX);

  if (!match) {
    return {
      isValid: false,
      error: "Only official Vasavi College email addresses are allowed",
    };
  }

  const [, yearCode, branchCode, rollSuffix] = match;

  const year = 2000 + parseInt(yearCode, 10);
  const branch = BRANCH_CODES[branchCode];

  if (!branch) {
    return {
      isValid: true,
      rollNumber: `1602-${yearCode}-${branchCode}-${rollSuffix}`,
      branch: branchCode,
      year,
    };
  }

  return {
    isValid: true,
    rollNumber: `1602-${yearCode}-${branchCode}-${rollSuffix}`,
    branch,
    year,
  };
}

export function isValidVceEmail(email: string): boolean {
  return VCE_EMAIL_REGEX.test(email);
}
