import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IssueFormComponent } from '../issue-form/issue-form.component';
import { IssueFormInput } from '../../models/issueFormInput';
import { IssueService } from '../../services/issue/issue.service';
import { IssueFormOutput } from '../../models/IssueFormOutput';

@Component({
  selector: 'app-new-issue',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, IssueFormComponent],
  templateUrl: './new-issue.component.html',
  styleUrl: './new-issue.component.scss',
})
export class NewIssueComponent implements OnInit {
  initForm!: IssueFormInput;
  constructor(private service: IssueService) {}

  ngOnInit(): void {
    this.initForm = {
      name: '',
      description: '',
      date: '',
      hour: '',
      active: false,
      new: true,
    };
  }

  onSub(issue: IssueFormOutput) {
    this.service.createNewIssue(issue);
  }
}
