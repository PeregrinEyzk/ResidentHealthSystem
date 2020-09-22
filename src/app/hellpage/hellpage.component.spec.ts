import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HellpageComponent } from './hellpage.component';

describe('HellpageComponent', () => {
  let component: HellpageComponent;
  let fixture: ComponentFixture<HellpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HellpageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HellpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
