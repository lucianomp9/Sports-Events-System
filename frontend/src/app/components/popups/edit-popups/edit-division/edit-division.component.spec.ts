import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDivisionComponent } from './edit-division.component';

describe('EditDivisionComponent', () => {
  let component: EditDivisionComponent;
  let fixture: ComponentFixture<EditDivisionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditDivisionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditDivisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
