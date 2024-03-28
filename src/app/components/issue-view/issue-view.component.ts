import { Component, Input, OnInit } from '@angular/core';
import { Issue } from '../../models/Issue';
import { AppStateInterface } from '../../store/appStateInterface';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { selectIssueById } from '../../store/issue.selectors';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@UntilDestroy()
@Component({
  selector: 'app-issue-view',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './issue-view.component.html',
  styleUrl: './issue-view.component.scss',
})
export class IssueViewComponent implements OnInit {
  issueId!: string;
  issue$!: Observable<Issue | undefined>;

  constructor(
    private store: Store<AppStateInterface>,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params
      .pipe(untilDestroyed(this))
      .subscribe((param) => (this.issueId = param['id']));

    this.issue$ = this.store
      .select(selectIssueById(this.issueId))
      .pipe(untilDestroyed(this));
  }
}
