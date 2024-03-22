import { createAction, props } from '@ngrx/store';
import { Issue } from '../models/Issue';

export const getIssues = createAction('[Issues] Get Issues');
export const getIssuesSuccess = createAction(
  '[Issues] Get Issues Success',
  props<{ issues: Issue[] }>()
);
export const getIssuesFail = createAction(
  '[Issues] Get Issues Fail',
  props<{ error: string }>()
);

export const createIssue = createAction('[Issue] Post Issue');

export const createIssueSuccess = createAction(
  '[Issue] Post Issue Succcess',
  props<{ issue: Issue }>()
);

export const createIssuesFail = createAction(
  '[Issues] Post Issue Fail',
  props<{ error: string }>()
);
