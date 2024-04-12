import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Issue } from '../../models/Issue';
import { IssueFormInput } from '../../models/issueFormInput';
import { IssueFormOutput } from '../../models/IssueFormOutput';

@Component({
  selector: 'app-issue-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './issue-form.component.html',
  styleUrl: './issue-form.component.scss',
})
export class IssueFormComponent {
  @Input() initForm!: IssueFormInput;

  @Output() onSumbitForm = new EventEmitter<IssueFormOutput>();
  form!: FormGroup;
  constructor(private fb: FormBuilder) {}
  ngOnInit(): void {
    this.form = this.fb.group({
      name: [this.initForm.name],
      description: [this.initForm.description],
      date: [this.initForm.date],
      hour: [this.initForm.hour],
      active: [this.initForm.active],
    });
  }

  onSubmit(): void {
    const { name, description, date, hour, active } = this.form.value;
    const issue: IssueFormOutput = {
      name,
      description,
      date,
      hour,
      active,
    };
    this.onSumbitForm.emit(issue);
  }
}
