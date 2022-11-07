import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MscStudentsComponent } from './msc-students.component';

describe('MscStudentsComponent', () => {
  let component: MscStudentsComponent;
  let fixture: ComponentFixture<MscStudentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MscStudentsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MscStudentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
