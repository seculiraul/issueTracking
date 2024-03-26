import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IssueViewComponent } from './issue-view.component';

describe('IssueViewComponent', () => {
  let component: IssueViewComponent;
  let fixture: ComponentFixture<IssueViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IssueViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IssueViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
