export interface Summary {
  total_findings: number;
  critical: number;
  high: number;
  medium: number;
  low: number;
  compliance_score: number;
}

export interface Finding {
  finding_id: string;
  title: string;
  description: string;
  severity: string;
  resource_type: string;
  resource_id: string;
  created_at: string;
}