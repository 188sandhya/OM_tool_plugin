export interface Id {
  id: number;
}

export interface User {
  id: number;
  name: string;
  login: string;
}

export interface TeamUser {
  userId: number;
  login: string;
  name: string;
}

export interface MissingUser {
  userId: number;
  login: string;
}

export interface HappinessMetric {
  id?: number;
  orgId: number;
  userId: number;
  happiness: number;
  safety: number;
  date?: string;
  enabled: boolean;
}

// plugin config
export interface Jenkins {
  jobs_scoring_whitelist: string[];
  jobs_scraping_whitelist: string[];
  url: string;
}

export interface Git {
  url: string;
}

export interface Jira {
  project: string;
  url: string;
  jql_filter: string;
}

export interface Sonarqube {
  project: string;
  url: string;
  qualifier: string;
}

export interface SdaConfig {
  git_team?: string;
  git_autodiscover?: boolean;
  enabled: boolean;
  sharing_allowed: boolean;
  cicd: Jenkins[];
  git: Git[];
  jira: Jira[];
  sonarqube: Sonarqube[];
  harbor_project: string;
}

export type RecommendationLevel = 'high' | 'medium' | 'low';

export interface LevelEnabled {
  high: boolean;
  medium: boolean;
  low: boolean;
}

export interface RecommendationsConfig {
  levelEnabled: LevelEnabled;
}

export interface OmaConfig {
  sda: SdaConfig;
  recommendations: RecommendationsConfig;
}

export interface GitProject {
  name: string;
  fullName: string;
  sshUrl: string;
  webUrl: string;
  visibility: string;
  type: string;
  selected: boolean;
  imported: boolean;
}

export interface Org {
  id: number;
  name: string;
}
