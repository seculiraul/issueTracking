import { Component, OnInit } from '@angular/core';
import { Issue } from '../../models/Issue';
import { ActivatedRoute } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { CommonModule } from '@angular/common';
import { IssueFormComponent } from '../issue-form/issue-form.component';
import { IssueFormInput } from '../../models/issueFormInput';
import { IssueTransformer } from '../../transformers/issue.transformer';
import { IssueService } from '../../services/issue/issue.service';

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

  constructor(private service: IssueService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params
      .pipe(untilDestroyed(this))
      .subscribe((param) => (this.issueId = param['id']));

    this.service
      .getSelectedIssue(this.issueId)
      .pipe(untilDestroyed(this))
      .subscribe((issue?: Issue) => {
        this.issueDetails = {
          name: issue?.name ?? '',
          description: issue?.description ?? '',
          date: this.service.transformDateFormat(issue?.date ?? ''),
          hour: this.service.transformDateFormat(issue?.hour ?? ''),
          active: issue?.active ?? false,
          new: false,
        };
      });
  }

  onSub(event: Issue): void {
    console.log('sumbit');
  }
}
