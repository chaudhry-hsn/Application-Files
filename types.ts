
export interface ProjectInput {
  projectName: string;
  corePurpose: string;
  successDefinition: string;
  constraints: string;
  keyPlayers: string;
}

export interface Risk {
  description: string;
  impact: 'Low' | 'Medium' | 'High';
}

export interface Stakeholder {
  name: string;
  role: string;
  powerInterest: string;
  need: string;
}

export interface ProjectPackage {
  problemStatement: string;
  smartObjectives: string[];
  scope: {
    inScope: string[];
    outScope: string[];
  };
  risks: Risk[];
  stakeholders: Stakeholder[];
  hiddenStakeholders: string[];
  engagementStrategy: string;
  nextSteps: string[];
}

export enum AppStatus {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}
