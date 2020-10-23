import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClinicDrawerComponent } from './clinic-drawer.component';

describe('ClinicDrawerComponent', () => {
  let component: ClinicDrawerComponent;
  let fixture: ComponentFixture<ClinicDrawerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClinicDrawerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClinicDrawerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
