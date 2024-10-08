import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardEditComponent } from './card-edit.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('CardEditComponent', () => {
  let component: CardEditComponent;
  let fixture: ComponentFixture<CardEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardEditComponent, NoopAnimationsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(CardEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
