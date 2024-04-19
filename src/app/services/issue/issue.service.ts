import { Injectable } from '@angular/core';
import { Issue } from '../../models/Issue';
import { Store } from '@ngrx/store';
import { AppStateInterface } from '../../store/appStateInterface';
import { IssueTransformer } from '../../transformers/issue.transformer';
import {
  selectIssueById,
  selectedIssueSelector,
} from '../../store/issue.selectors';
import { Observable } from 'rxjs';
import { IssueFormOutput } from '../../models/IssueFormOutput';
import { issueActions } from '../../store/issue.actions';

@Injectable({
  providedIn: 'root',
})
export class IssueService {
  constructor(
    private store: Store<AppStateInterface>,
    private transformer: IssueTransformer
  ) {}

  createNewIssue(issue: IssueFormOutput) {
    this.store.dispatch(this.transformer.createIssueWithTransformedData(issue));
  }

  editIssue(issue: Issue) {
    const editedIssue: Issue = {
      ...issue,
      hour: this.transformHourFormat(issue.hour ?? ''),
      date: this.transformDateFormat(issue?.date ?? ''),
    };

    this.store.dispatch(issueActions.editIssue({ issue: editedIssue }));
  }

  getSelectedIssue(id: string): any {
    let issue;
    this.store.select(selectIssueById(id)).subscribe((selectedIssue) => {
      issue = selectedIssue;
    });

    if (issue) {
      return issue;
    }
    this.store.dispatch(issueActions.getSingleIssue({ id }));
    this.store.select(selectedIssueSelector).subscribe((selectedIssue) => {
      issue = selectedIssue;
    });
    return issue;
  }

  transformDateFormat(date: string): string {
    return this.transformer.transformDateFormat(date);
  }

  transformHourFormat(hour: string): string {
    return this.transformer.transformHourFormat(hour);
  }
}
