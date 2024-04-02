import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Issue } from '../../models/Issue';
import { AppStateInterface } from '../../store/appStateInterface';
import { CommonModule } from '@angular/common';
import { IssueFormComponent } from '../issue-form/issue-form.component';
import { IssueFormInput } from '../../models/issueFormInput';

@Component({
  selector: 'app-new-issue',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, IssueFormComponent],
  templateUrl: './new-issue.component.html',
  styleUrl: './new-issue.component.scss',
})
export class NewIssueComponent implements OnInit {
  //form!: FormGroup;
  //isLoading$!: Observable<boolean>;
  initForm: IssueFormInput = {
    name: '',
    description: '',
    date: '',
    hour: '',
    active: false,
    new: true,
  };
  constructor(
    private fb: FormBuilder,
    private store: Store<AppStateInterface>
  ) {}

  ngOnInit(): void {}

  onSub(issue: Issue) {
    console.log('new issue submitted', issue);
  }
}
