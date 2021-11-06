import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChartData } from '../../classes/ChartData';
import { ChartComponent } from './chart.component';

describe('ChartComponent', () => {
  let component: ChartComponent;
  let fixture: ComponentFixture<ChartComponent>;
  let chartData: ChartData = new ChartData();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChartComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have chartData', () => {
    expect(chartData).toBeTruthy();
  });
});
