import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-new-issue',
  standalone: true,
  imports: [],
  templateUrl: './new-issue.component.html',
  styleUrl: './new-issue.component.scss',
})
export class NewIssueComponent implements OnInit {
  form!: FormGroup;
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      name: [''],
      description: [''],
      active: [false],
    });
  }
}
