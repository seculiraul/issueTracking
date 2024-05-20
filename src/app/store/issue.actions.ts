import {
  createAction,
  createActionGroup,
  emptyProps,
  props,
} from '@ngrx/store';
import { Issue } from '../models/Issue';

export const issueActions = createActionGroup({
  source: 'issues',
  events: {
    'Create Issue': props<{ issue: Issue }>(),
    'Create Issue Success': props<{ issue: Issue }>(),
    'Create Issue Fail': props<{ error: string }>(),
    'Get Issues': props<{ page: string; limit: string }>(),
    'Get Issues Success': props<{ issues: Issue[] }>(),
    'Get Issues Fail': props<{ error: string }>(),
    'Get Single Issue': props<{ id: string }>(),
    'Get Single Issue Success': props<{ issue: Issue }>(),
    'Get Single Issue Fail': props<{ error: string }>(),
    'Edit Issue': props<{ issue: Issue }>(),
    'Edit Issue Success': props<{ issue: Issue }>(),
    'Edit Issue Fail': props<{ error: string }>(),
  },
});
