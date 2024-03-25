import {
  createAction,
  createActionGroup,
  emptyProps,
  props,
} from '@ngrx/store';
import { Issue } from '../models/Issue';

export const createIssueActions = createActionGroup({
  source: 'issues',
  events: {
    'Create Issue': props<{ issue: Issue }>(),
    'Create Issue Success': props<{ issue: Issue }>(),
    'Create Issue Fail': props<{ error: string }>(),
    'Get Issues': emptyProps(),
    'Get Issues Success': props<{ issues: Issue[] }>(),
    'Get Issues Fail': props<{ error: string }>(),
  },
});
