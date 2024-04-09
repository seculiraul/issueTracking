import { createReducer, on } from '@ngrx/store';
import { Issue } from '../models/Issue';
import { IssuesStateInterface } from './issuesStateInterface';
import { issueActions } from './issue.actions';

export interface State {
  issues: Issue[];
}

export const initialState: IssuesStateInterface = {
  isLoading: false,
  issues: [],
  selectedIssue: null,
  error: null,
};

export const issueReducers = createReducer(
  initialState,
  on(issueActions.getIssues, (state) => {
    return {
      ...state,
      isLoading: true,
    };
  }),
  on(issueActions.getIssuesSuccess, (state, action) => {
    return {
      ...state,
      isLoading: false,
      issues: action?.issues,
    };
  }),
  on(issueActions.getIssuesFail, (state, action) => {
    return {
      ...state,
      isLoading: false,
      error: action?.error,
    };
  }),
  on(issueActions.createIssue, (state) => {
    return {
      ...state,
      isLoading: true,
    };
  }),
  on(issueActions.createIssueSuccess, (state, action) => {
    return {
      ...state,
      isLoading: false,
      issues: [...state.issues, action?.issue],
    };
  }),
  on(issueActions.createIssueFail, (state, action) => {
    return {
      ...state,
      isLoading: false,
      error: action?.error,
    };
  }),
  on(issueActions.getSingleIssue, (state) => {
    return {
      ...state,
      isLoading: true,
    };
  }),
  on(issueActions.getSingleIssueSuccess, (state, action) => {
    return {
      ...state,
      isLoading: false,
      selectedIssue: action?.issue,
    };
  }),
  on(issueActions.getSingleIssueFail, (state, action) => {
    return {
      ...state,
      isLoading: false,
      error: action?.error,
    };
  }),
  on(issueActions.editIssue, (state, action) => {
    return {
      ...state,
      isLoading: true,
    };
  }),
  on(issueActions.editIssueSuccess, (state, action) => {
    return {
      ...state,
      isLoading: false,
      selectedIssue: action?.issue,
    };
  }),
  on(issueActions.editIssueFail, (state, action) => {
    return {
      ...state,
      isLoading: false,
      error: action?.error,
    };
  })
);
