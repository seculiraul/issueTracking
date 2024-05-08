import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { Store } from '@ngrx/store';
import {
  selectIssueById,
  selectedIssueSelector,
} from '../store/issue.selectors';
import { issueActions } from '../store/issue.actions';
import { map } from 'rxjs';

export const issueGuard: CanActivateFn = (route, state) => {
  const store = inject(Store);
  return store.select(selectedIssueSelector).pipe(
    map((issue) => {
      if (issue) {
        return true;
      }
      store.dispatch(issueActions.getSingleIssue({ id: route.params?.['id'] }));
      return true;
    })
  );
};
