import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListVentasInactivasComponent } from './list-ventas-inactivas.component';

describe('ListVentasInactivasComponent', () => {
  let component: ListVentasInactivasComponent;
  let fixture: ComponentFixture<ListVentasInactivasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListVentasInactivasComponent]
    });
    fixture = TestBed.createComponent(ListVentasInactivasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
