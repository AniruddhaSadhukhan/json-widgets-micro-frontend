import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmallStatComponent } from './small-stat.component';

describe('SmallStatComponent', () => {
  let component: SmallStatComponent;
  let fixture: ComponentFixture<SmallStatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SmallStatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SmallStatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
