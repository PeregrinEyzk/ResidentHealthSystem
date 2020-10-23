import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BudaoComponent } from './budao.component';

describe('BudaoComponent', () => {
  let component: BudaoComponent;
  let fixture: ComponentFixture<BudaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BudaoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BudaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
