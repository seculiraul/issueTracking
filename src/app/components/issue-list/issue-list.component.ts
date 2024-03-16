import { Component } from '@angular/core';

@Component({
  selector: 'app-issue-list',
  standalone: true,
  imports: [],
  templateUrl: './issue-list.component.html',
  styleUrl: './issue-list.component.scss',
})
export class IssueListComponent {
  issues: { name: string; desc: string; date: string; active: boolean }[] = [
    {
      name: 'issue1',
      desc: 'desc issue1',
      date: '20-01-2020',
      active: true,
    },
    {
      name: 'issue2',
      desc: 'desc issue2',
      date: '01-01-2020',
      active: false,
    },
  ];
}
