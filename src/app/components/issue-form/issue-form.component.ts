import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Issue } from '../../models/Issue';

@Component({
  selector: 'app-issue-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './issue-form.component.html',
  styleUrl: './issue-form.component.scss',
})
export class IssueFormComponent {
  @Input() initForm!: {
    name: string;
    description: string;
    date: string;
    hour: string;
    active: boolean;
    new: boolean;
  };

  @Output() onSumbitForm = new EventEmitter<Issue>();
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
    const { name, description, date, active } = this.form.value;
    const issue: Issue = {
      id: '11-22-33',
      name,
      description,
      date,
      active,
    };
    this.onSumbitForm.emit(issue);
  }
}
