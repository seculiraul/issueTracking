import { Injectable } from '@angular/core';
import { Issue } from '../../models/Issue';
import { issueActions } from '../../store/issue.actions';
import { Store } from '@ngrx/store';
import { AppStateInterface } from '../../store/appStateInterface';
import { IssueTransformer } from '../../transformers/issue.transformer';

@Injectable({
  providedIn: 'root',
})
export class IssueService {
  constructor(
    private store: Store<AppStateInterface>,
    private transformer: IssueTransformer
  ) {}

  createNewIssue(issue: Issue) {
    this.store.dispatch(this.transformer.createIssueWithTransformedData(issue));
  }
}
