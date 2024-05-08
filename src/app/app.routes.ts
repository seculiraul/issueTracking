import { Routes } from '@angular/router';
import { issueGuard } from './guards/issue.guard';

export const routes: Routes = [
  {
    path: 'new',
    loadComponent: () =>
      import('./components/new-issue/new-issue.component').then(
        (m) => m.NewIssueComponent
      ),
  },
  {
    path: 'list',
    loadComponent: () =>
      import('./components/issue-list/issue-list.component').then(
        (m) => m.IssueListComponent
      ),
  },
  {
    path: 'issue/:id',
    loadComponent: () =>
      import('./components/issue-view/issue-view.component').then(
        (m) => m.IssueViewComponent
      ),
    canActivate: [issueGuard],
  },
];
