import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListEstilistaComponent } from './list-estilista.component';

describe('ListEstilistaComponent', () => {
  let component: ListEstilistaComponent;
  let fixture: ComponentFixture<ListEstilistaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListEstilistaComponent]
    });
    fixture = TestBed.createComponent(ListEstilistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
