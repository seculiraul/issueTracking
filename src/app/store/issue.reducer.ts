import { createReducer, on } from '@ngrx/store';
import { Issue } from '../models/Issue';
import { IssuesStateInterface } from './issuesStateInterface';
import { createIssueActions } from './issue.actions';

export interface State {
  issues: Issue[];
}

export const initialState: IssuesStateInterface = {
  isLoading: false,
  issues: [],
  error: null,
};

export const issueReducers = createReducer(
  initialState,
  on(createIssueActions.getIssues, (state) => {
    return {
      ...state,
      isLoading: true,
    };
  }),
  on(createIssueActions.getIssuesSuccess, (state, action) => {
    return {
      ...state,
      isLoading: false,
      issues: action?.issues,
    };
  }),
  on(createIssueActions.getIssuesFail, (state, action) => {
    return {
      ...state,
      isLoading: false,
      error: action?.error,
    };
  }),
  on(createIssueActions.createIssue, (state) => {
    return {
      ...state,
      isLoading: true,
    };
  }),
  on(createIssueActions.createIssueSuccess, (state, action) => {
    return {
      ...state,
      isLoading: false,
      issues: [...state.issues, action?.issue],
    };
  }),
  on(createIssueActions.createIssueFail, (state, action) => {
    return {
      ...state,
      isLoading: false,
      error: action?.error,
    };
  })
);
