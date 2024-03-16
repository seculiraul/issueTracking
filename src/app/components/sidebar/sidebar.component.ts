import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  active = false;

  constructor(private router: Router) {}

  onClick() {
    this.active = !this.active;
  }

  onItemsClick(value: string): void {
    this.router.navigate([`/${value}`]);
  }
}
