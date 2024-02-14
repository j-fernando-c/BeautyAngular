import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditEstilistaComponent } from './edit-estilista.component';

describe('EditEstilistaComponent', () => {
  let component: EditEstilistaComponent;
  let fixture: ComponentFixture<EditEstilistaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditEstilistaComponent]
    });
    fixture = TestBed.createComponent(EditEstilistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
