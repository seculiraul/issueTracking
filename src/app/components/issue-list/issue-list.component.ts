import { Component, OnInit, inject } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  combineLatest,
  forkJoin,
  take,
  zip,
} from 'rxjs';
import { Issue } from '../../models/Issue';
import { IssueService } from '../../services/issue/issue.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { CommonModule } from '@angular/common';
import { Store, select } from '@ngrx/store';
import { isLoading, issuesSelector } from '../../store/issue.selectors';
import { AppStateInterface } from '../../store/appStateInterface';
import { issueActions } from '../../store/issue.actions';
import { ActivatedRoute, Router } from '@angular/router';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { editIssue } from '../../store/issues.effects';

@UntilDestroy()
@Component({
  selector: 'app-issue-list',
  standalone: true,
  imports: [CommonModule, InfiniteScrollModule],
  templateUrl: './issue-list.component.html',
  styleUrl: './issue-list.component.scss',
})
export class IssueListComponent implements OnInit {
  issues$!: Observable<Issue[]>;
  isLoading$!: Observable<boolean>;
  test$!: Observable<Issue | undefined>;

  isue!: Issue[];

  issues = new BehaviorSubject([]);
  page = 1;

  route = inject(ActivatedRoute);

  limit = 10;
  lastKey = '';
  finished = false;

  constructor(
    private service: IssueService,
    private store: Store<AppStateInterface>,
    private router: Router
  ) {
    this.isLoading$ = this.store.pipe(select(isLoading));
  }

  ngOnInit(): void {
    this.route.queryParams.pipe(untilDestroyed(this)).subscribe((params) => {
      console.log(params);
    });
    this.issues$ = this.store.pipe(
      untilDestroyed(this),
      select(issuesSelector)
    );
    this.getIssues();

    //this.store.dispatch(issueActions.getIssues());
    // this.getIssues();
  }

  onScroll() {
    console.log('hello');
    this.page += 1;
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { page: this.page },
    });
    //this.getIssues();
  }

  getIssues() {
    this.store.dispatch(
      issueActions.getIssues({ page: `${this.page}`, limit: `${this.limit}` })
    );
    this.page++;
  }

  onRowClick(id?: string): void {
    if (id) {
      this.store.dispatch(issueActions.getSingleIssue({ id }));
      this.router.navigate(['issue', id]);
    }
  }
}
