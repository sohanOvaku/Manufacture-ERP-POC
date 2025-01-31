import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LineChartNickelComponent } from './line-chart-nickel.component';

describe('LineChartNickelComponent', () => {
  let component: LineChartNickelComponent;
  let fixture: ComponentFixture<LineChartNickelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LineChartNickelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LineChartNickelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
