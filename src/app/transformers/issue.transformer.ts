import { Injectable } from '@angular/core';
import { Issue } from '../models/Issue';
import { issueActions } from '../store/issue.actions';

@Injectable({
  providedIn: 'root',
})
export class IssueTransformer {
  createIssueWithTransformedData(issue: Issue): any {
    const transformedIssue: Issue = {
      ...issue,
      id: Math.random().toString(),
      date: this.transformDateFormat(issue?.date ?? ''),
      hour: this.transformHourFormat(issue?.hour ?? ''),
    };
    return issueActions.createIssue({ issue: transformedIssue });
  }

  transformDateFormat(date: string): string {
    return date.split('-').reverse().join('-');
  }

  transformHourFormat(hour: string): string {
    return hour.split(':').slice(0, 2).join(':');
  }
}
