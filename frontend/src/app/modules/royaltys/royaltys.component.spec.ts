import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoyaltysComponent } from './royaltys.component';

describe('RoyaltysComponent', () => {
  let component: RoyaltysComponent;
  let fixture: ComponentFixture<RoyaltysComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoyaltysComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoyaltysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
