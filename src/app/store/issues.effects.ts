import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as IssueActions from './issue.actions';
import { catchError, map, mergeMap, of } from 'rxjs';
import { IssueService } from '../services/issue.service';

@Injectable()
export class IssuesEffects {
  getIssues$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(IssueActions.getIssues),
      mergeMap(() => {
        return this.issueService.getIssues().pipe(
          map((issues) => IssueActions.getIssuesSuccess({ issues })),
          catchError(({ message }) =>
            of(IssueActions.getIssuesFail({ error: message }))
          )
        );
      })
    );
  });

  //   createIssue = createEffect(() => {
  //     return this.actions$.pipe(ofType(IssueActions.createIssue), mergeMap(() => {
  //         return this.issueService.createIssue(data)
  //     }))
  //   })

  constructor(private actions$: Actions, private issueService: IssueService) {}
}
