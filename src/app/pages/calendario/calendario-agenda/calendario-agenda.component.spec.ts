import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarioAgendaComponent } from './calendario-agenda.component';

describe('CalendarioAgendaComponent', () => {
  let component: CalendarioAgendaComponent;
  let fixture: ComponentFixture<CalendarioAgendaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CalendarioAgendaComponent]
    });
    fixture = TestBed.createComponent(CalendarioAgendaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
