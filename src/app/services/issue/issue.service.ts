import { Injectable } from '@angular/core';
import { Issue } from '../../models/Issue';
import { Store } from '@ngrx/store';
import { AppStateInterface } from '../../store/appStateInterface';
import { IssueTransformer } from '../../transformers/issue.transformer';
import { selectIssueById } from '../../store/issue.selectors';
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

    console.log(editedIssue);
  }

  getSelectedIssue(id: string): Observable<Issue | undefined> {
    return this.store.select(selectIssueById(id));
  }

  transformDateFormat(date: string): string {
    return this.transformer.transformDateFormat(date);
  }

  transformHourFormat(hour: string): string {
    return this.transformer.transformHourFormat(hour);
  }
}
