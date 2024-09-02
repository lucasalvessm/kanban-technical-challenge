import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardComponent } from './card.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { getCardServiceSpy } from '../../../shared/testing/obj-spy.shared';
import { CardService } from '../../services/card.service';
import { cardsMock } from '../../../shared/testing/mock.data';

describe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;
  const cardService = getCardServiceSpy();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardComponent],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: CardService, useValue: cardService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
    component.card = cardsMock[0];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
