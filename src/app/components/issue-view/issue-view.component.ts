import { Component, Input, OnInit } from '@angular/core';
import { Issue } from '../../models/Issue';
import { AppStateInterface } from '../../store/appStateInterface';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { selectIssueById } from '../../store/issue.selectors';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { IssueFormComponent } from '../issue-form/issue-form.component';
import { IssueFormInput } from '../../models/issueFormInput';

@UntilDestroy()
@Component({
  selector: 'app-issue-view',
  standalone: true,
  imports: [CommonModule, IssueFormComponent],
  templateUrl: './issue-view.component.html',
  styleUrl: './issue-view.component.scss',
})
export class IssueViewComponent implements OnInit {
  issueId!: string;
  issueDetails!: IssueFormInput;

  constructor(
    private store: Store<AppStateInterface>,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params
      .pipe(untilDestroyed(this))
      .subscribe((param) => (this.issueId = param['id']));

    this.store
      .select(selectIssueById(this.issueId))
      .pipe(untilDestroyed(this))
      .subscribe((issue?: Issue) => {
        this.issueDetails = {
          name: issue?.name ?? '',
          description: issue?.description ?? '',
          date: issue?.date ?? '',
          hour: '12:15:00',
          active: issue?.active ?? false,
          new: false,
        };
      });
  }

  onSub(event: Issue): void {
    console.log('sumbit');
  }
}
