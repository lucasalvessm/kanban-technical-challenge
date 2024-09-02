import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardViewComponent } from './card-view.component';
import { getCardsMock } from '../../../shared/testing/mock.data';

describe('CardViewComponent', () => {
  let component: CardViewComponent;
  let fixture: ComponentFixture<CardViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardViewComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CardViewComponent);
    component = fixture.componentInstance;
    component.card = getCardsMock()[0];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
