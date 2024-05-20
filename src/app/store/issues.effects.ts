import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { Issue } from '../models/Issue';
import { issueActions } from './issue.actions';
import { ApiService } from '../services/api/api.service';

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
  (actions$ = inject(Actions), service = inject(ApiService)) => {
    return actions$.pipe(
      ofType(issueActions.getIssues),
      switchMap(({ page, limit }) => {
        return service.getIssues(page, limit).pipe(
          map((issues: Issue[]) => {
            return issueActions.getIssuesSuccess({ issues });
          }),
          catchError((error: Error) => {
            return of(issueActions.getIssuesFail({ error: error?.message }));
          })
        );
      })
    );
  },
  { functional: true }
);

export const createIssueEffect = createEffect(
  (actions$ = inject(Actions), issueService = inject(ApiService)) => {
    return actions$?.pipe(
      ofType(issueActions.createIssue),
      switchMap(({ issue }) => {
        return issueService.createIssue(issue).pipe(
          map((crtIssue: Issue) => {
            return issueActions.createIssueSuccess({
              issue: crtIssue,
            });
          }),
          catchError((error: Error) => {
            return of(
              issueActions.createIssueFail({
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

export const getSingleIssue = createEffect(
  (actions$ = inject(Actions), service = inject(ApiService)) => {
    return actions$?.pipe(
      ofType(issueActions.getSingleIssue),
      switchMap(({ id }) => {
        return service.getIssueById(id).pipe(
          map((issue) => {
            return issueActions.getSingleIssueSuccess({ issue });
          }),
          catchError((error: Error) => {
            return of(
              issueActions.getSingleIssueFail({ error: error?.message })
            );
          })
        );
      })
    );
  },
  { functional: true }
);

export const editIssue = createEffect(
  (actions$ = inject(Actions), service = inject(ApiService)) => {
    return actions$?.pipe(
      ofType(issueActions.editIssue),
      switchMap(({ issue }) => {
        return service.editIssue(issue).pipe(
          map((issue) => {
            return issueActions.editIssueSuccess({ issue });
          }),
          catchError((error: Error) => {
            return of(issueActions.editIssueFail({ error: error?.message }));
          })
        );
      })
    );
  },
  { functional: true }
);
