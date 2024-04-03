import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Issue } from '../../models/Issue';
import { CommonModule } from '@angular/common';
import { IssueFormComponent } from '../issue-form/issue-form.component';
import { IssueFormInput } from '../../models/issueFormInput';
import { IssueService } from '../../services/issue/issue.service';

@Component({
  selector: 'app-new-issue',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, IssueFormComponent],
  templateUrl: './new-issue.component.html',
  styleUrl: './new-issue.component.scss',
})
export class NewIssueComponent implements OnInit {
  initForm: IssueFormInput = {
    name: '',
    description: '',
    date: '',
    hour: '',
    active: false,
    new: true,
  };
  constructor(private service: IssueService) {}

  ngOnInit(): void {}

  onSub(issue: Issue) {
    this.service.createNewIssue(issue);
  }
}
