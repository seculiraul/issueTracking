import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Issue } from '../../models/Issue';
import { IssueService } from '../../services/issue.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { CommonModule } from '@angular/common';
import { Store, select } from '@ngrx/store';
import { isLoading } from '../../store/issue.selectors';
import { AppStateInterface } from '../../store/appStateInterface';
import * as IssueActions from '../../store/issue.actions';

@UntilDestroy()
@Component({
  selector: 'app-issue-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './issue-list.component.html',
  styleUrl: './issue-list.component.scss',
})
export class IssueListComponent implements OnInit {
  issues$!: Observable<Issue[]>;
  isLoading$!: Observable<boolean>;

  constructor(
    private service: IssueService,
    private store: Store<AppStateInterface>
  ) {
    this.isLoading$ = this.store.pipe(select(isLoading));
  }

  ngOnInit(): void {
    this.store.dispatch(IssueActions.getIssues());
  }
}
