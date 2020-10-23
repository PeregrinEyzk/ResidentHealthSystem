import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiseaseRegisterComponent } from './disease-register.component';

describe('DiseaseRegisterComponent', () => {
  let component: DiseaseRegisterComponent;
  let fixture: ComponentFixture<DiseaseRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiseaseRegisterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DiseaseRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
