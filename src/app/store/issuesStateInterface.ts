import { Issue } from '../models/Issue';

export interface IssuesStateInterface {
  isLoading: boolean;
  issues: Issue[];
  error: string | null;
}
