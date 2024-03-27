import { Issue } from '../models/Issue';

export interface IssuesStateInterface {
  isLoading: boolean;
  issues: Issue[];
  selectedIssue: Issue | null;
  error: string | null;
}
