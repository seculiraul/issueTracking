import { createReducer, on } from '@ngrx/store';
import { Issue } from '../models/Issue';
import { IssuesStateInterface } from './issuesStateInterface';
import * as IssueActions from './issue.actions';

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
  on(IssueActions.getIssues, (state) => {
    return {
      ...state,
      isLoading: true,
    };
  }),
  on(IssueActions.getIssuesSuccess, (state, action) => {
    return {
      ...state,
      isLoading: false,
      issues: action?.issues,
    };
  }),
  on(IssueActions.getIssuesFail, (state, action) => {
    return {
      ...state,
      isLoading: false,
      error: action?.error,
    };
  }),
  on(IssueActions.createIssue, (state) => {
    return {
      ...state,
      isLoading: true,
    };
  }),
  on(IssueActions.createIssueSuccess, (state, action) => {
    return {
      ...state,
      isLoading: false,
      issues: [...state.issues, action?.issue],
    };
  }),
  on(IssueActions.createIssuesFail, (state, action) => {
    return {
      ...state,
      isLoading: false,
      error: action?.error,
    };
  })
);
