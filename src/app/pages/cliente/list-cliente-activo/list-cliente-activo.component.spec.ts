import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListClienteActivoComponent } from './list-cliente-activo.component';

describe('ListClienteActivoComponent', () => {
  let component: ListClienteActivoComponent;
  let fixture: ComponentFixture<ListClienteActivoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListClienteActivoComponent]
    });
    fixture = TestBed.createComponent(ListClienteActivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
