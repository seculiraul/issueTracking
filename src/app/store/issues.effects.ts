import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of, switchMap } from 'rxjs';
import { IssueService } from '../services/issue.service';
import { Issue } from '../models/Issue';
import { createIssueActions } from './issue.actions';

// @Injectable()
// export class IssuesEffects {
//   getIssues$ = createEffect(() => {
//     return this.actions$.pipe(
//       ofType(IssueActions.getIssues),
//       mergeMap(() => {
//         return this.issueService.getIssues().pipe(
//           map((issues) => IssueActions.getIssuesSuccess({ issues })),
//           catchError(({ message }) =>
//             of(IssueActions.getIssuesFail({ error: message }))
//           )
//         );
//       })
//     );
//   });

//   //   createIssue = createEffect(() => {
//   //     return this.actions$.pipe(ofType(IssueActions.createIssue), mergeMap(() => {
//   //         return this.issueService.createIssue(data)
//   //     }))
//   //   })

//   constructor(private actions$: Actions, private issueService: IssueService) {}
// }

export const getIssuesEffect = createEffect(
  (actions$ = inject(Actions), service = inject(IssueService)) => {
    return actions$.pipe(
      ofType(createIssueActions.getIssues),
      switchMap(() => {
        return service.getIssues().pipe(
          map((issues: Issue[]) => {
            return createIssueActions.getIssuesSuccess({ issues });
          }),
          catchError((error: Error) => {
            return of(
              createIssueActions.getIssuesFail({ error: error?.message })
            );
          })
        );
      })
    );
  },
  { functional: true }
);

export const createIssueEffect = createEffect(
  (actions$ = inject(Actions), issueService = inject(IssueService)) => {
    return actions$?.pipe(
      ofType(createIssueActions.createIssue),
      switchMap(({ issue }) => {
        return issueService.createIssue(issue).pipe(
          map((crtIssue: Issue) => {
            return createIssueActions.createIssueSuccess({
              issue: crtIssue,
            });
          }),
          catchError((error: Error) => {
            return of(
              createIssueActions.createIssueFail({
                error: error.message,
              })
            );
          })
        );
      })
    );
  },
  { functional: true }
);
