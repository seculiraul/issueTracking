import { Component, OnInit, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Issue } from '../../models/Issue';
import { IssueService } from '../../services/issue/issue.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { CommonModule } from '@angular/common';
import { Store, select } from '@ngrx/store';
import { isLoading, issuesSelector } from '../../store/issue.selectors';
import { AppStateInterface } from '../../store/appStateInterface';
import { issueActions } from '../../store/issue.actions';
import { Router } from '@angular/router';
import {
  MatChipEditedEvent,
  MatChipInputEvent,
  MatChipsModule,
} from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { LiveAnnouncer } from '@angular/cdk/a11y';

export interface Fruit {
  name: string;
}
@UntilDestroy()
@Component({
  selector: 'app-issue-list',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatChipsModule, MatIconModule],
  templateUrl: './issue-list.component.html',
  styleUrl: './issue-list.component.scss',
})
export class IssueListComponent implements OnInit {
  issues$!: Observable<Issue[]>;
  isLoading$!: Observable<boolean>;
  test$!: Observable<Issue | undefined>;

  constructor(
    private service: IssueService,
    private store: Store<AppStateInterface>,
    private router: Router
  ) {
    this.isLoading$ = this.store.pipe(select(isLoading));
  }

  ngOnInit(): void {
    this.store.dispatch(issueActions.getIssues());
    this.issues$ = this.store.pipe(
      untilDestroyed(this),
      select(issuesSelector)
    );
  }

  onRowClick(id?: string): void {
    if (id) {
      this.store.dispatch(issueActions.getSingleIssue({ id }));
      this.router.navigate(['issue', id]);
    }
  }

  addOnBlur = true;
  readonly separatorKeysCodes = [1, 2];
  fruits: Fruit[] = [{ name: 'Lemon' }, { name: 'Lime' }, { name: 'Apple' }];

  announcer = inject(LiveAnnouncer);

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.fruits.push({ name: value });
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  remove(fruit: Fruit): void {
    const index = this.fruits.indexOf(fruit);

    if (index >= 0) {
      this.fruits.splice(index, 1);

      this.announcer.announce(`Removed ${fruit}`);
    }
  }

  edit(fruit: Fruit, event: MatChipEditedEvent) {
    const value = event.value.trim();

    // Remove fruit if it no longer has a name
    if (!value) {
      this.remove(fruit);
      return;
    }

    // Edit existing fruit
    const index = this.fruits.indexOf(fruit);
    if (index >= 0) {
      this.fruits[index].name = value;
    }
  }
}
