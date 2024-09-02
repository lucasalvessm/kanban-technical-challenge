import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColumnComponent } from './column.component';
import { columnsMock } from '../../../shared/testing/mock.data';

describe('ColumnComponent', () => {
  let component: ColumnComponent;
  let fixture: ComponentFixture<ColumnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ColumnComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ColumnComponent);
    component = fixture.componentInstance;
    component.column = columnsMock[0];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
