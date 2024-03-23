import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { Issue } from '../../models/Issue';
import { isLoading } from '../../store/issue.selectors';
import { Observable } from 'rxjs';
import * as IssuesActions from '../../store/issue.actions';
import { AppStateInterface } from '../../store/appStateInterface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-new-issue',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './new-issue.component.html',
  styleUrl: './new-issue.component.scss',
})
export class NewIssueComponent implements OnInit {
  form!: FormGroup;
  isLoading$!: Observable<boolean>;
  constructor(
    private fb: FormBuilder,
    private store: Store<AppStateInterface>
  ) {
    this.isLoading$ = this.store.pipe(select(isLoading));
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      name: [''],
      description: [''],
      date: [''],
      hour: [''],
      active: [false],
    });

    this.store.dispatch(IssuesActions.getIssues());
  }

  onSubmit(): void {
    const { name, description, date, active } = this.form.value;
    const issue: Issue = {
      id: '11-22-33',
      name,
      description,
      date,
      active,
    };
    // this.store.dispatch(addIssue(issue));
    console.log(this.form.value);
  }
}
