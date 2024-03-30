import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Issue } from '../../models/Issue';
import { AppStateInterface } from '../../store/appStateInterface';
import { CommonModule } from '@angular/common';
import { issueActions } from '../../store/issue.actions';
import { IssueFormComponent } from '../issue-form/issue-form.component';

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
  initForm = {
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
  ) {
    //this.isLoading$ = this.store.pipe(select(isLoading));
  }

  ngOnInit(): void {
    // this.form = this.fb.group({
    //   name: [''],
    //   description: [''],
    //   date: [''],
    //   hour: [''],
    //   active: [false],
    // });
  }

  // onSubmit(): void {
  //   const { name, description, date, active } = this.form.value;
  //   const issue: Issue = {
  //     id: '11-22-33',
  //     name,
  //     description,
  //     date,
  //     active,
  //   };
  //   console.log(this.form.value);
  // }

  onSub(issue: Issue) {
    console.log('new issue submitted', issue);
  }
}
