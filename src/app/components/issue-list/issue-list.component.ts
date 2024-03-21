import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Issue } from '../../models/Issue';
import { IssueService } from '../../services/issue.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { CommonModule } from '@angular/common';

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

  constructor(private service: IssueService) {}

  ngOnInit(): void {
    this.issues$ = this.service.getIssues().pipe(untilDestroyed(this));
  }
}
