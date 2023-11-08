import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEstilistaComponent } from './create-estilista.component';

describe('CreateEstilistaComponent', () => {
  let component: CreateEstilistaComponent;
  let fixture: ComponentFixture<CreateEstilistaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateEstilistaComponent]
    });
    fixture = TestBed.createComponent(CreateEstilistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
