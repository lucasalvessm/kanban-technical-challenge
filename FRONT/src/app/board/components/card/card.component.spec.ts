import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardComponent } from './card.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { getCardServiceSpy } from '../../../shared/testing/obj-spy.shared';
import { CardService } from '../../services/card.service';
import { getCardsMock } from '../../../shared/testing/mock.data';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;
  let cardService: jasmine.SpyObj<CardService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardComponent, NoopAnimationsModule],
      providers: [
        {
          provide: MAT_DIALOG_DATA,
          useValue: {
            card: getCardsMock()[0],
          },
        },
        { provide: CardService, useValue: getCardServiceSpy() },
        {
          provide: MatDialogRef,
          useValue: jasmine.createSpyObj('MatDialogRef', ['close']),
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CardComponent);
    cardService = TestBed.inject(CardService) as jasmine.SpyObj<CardService>;
    component = fixture.componentInstance;
    component.card = getCardsMock()[0];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('view mode', () => {
    it('should set mode to view', () => {
      expect(component.mode).toBe('view');
    });

    it('should render app-card-view component', () => {
      const cardView = fixture.nativeElement.querySelector('app-card-view');
      expect(cardView).toBeTruthy();

      const cardEdit = fixture.nativeElement.querySelector('app-card-edit');
      expect(cardEdit).toBeFalsy();
    });

    it('should open edit view dialog when the card is clicked', () => {
      const cardView = fixture.nativeElement.querySelector('app-card-view');
      cardView.click();
      expect(cardService.triggerCardEdit).toHaveBeenCalled();
    });
  });

  describe('edit mode', () => {
    beforeEach(() => {
      component.mode = 'edit';
      fixture.detectChanges();
    });

    it('should set mode to edit', () => {
      expect(component.mode).toBe('edit');
    });

    it('should render app-card-edit component', () => {
      const cardEdit = fixture.nativeElement.querySelector('app-card-edit');
      expect(cardEdit).toBeTruthy();
      const cardView = fixture.nativeElement.querySelector('app-card-view');
      expect(cardView).toBeFalsy();
    });

    it('should close the dialog when cancelEdition is called', () => {
      component.cancelEdition();
      expect(component.dialogRef.close).toHaveBeenCalled();
    });

    it('should call addNewCard when mode is add', () => {
      component.mode = 'add';
      const card = { title: 'title', description: 'description' };
      component.addOrEditCard(card);
      expect(cardService.addNewCard).toHaveBeenCalledWith(
        card.title,
        card.description
      );
    });

    it('should call editCard when mode is edit', () => {
      const card = { title: 'title', description: 'description' };
      component.addOrEditCard(card);
      expect(cardService.editCard).toHaveBeenCalledWith({
        ...getCardsMock()[0],
        titulo: card.title,
        conteudo: card.description,
      });
    });

    it('should delete card when deleteCard is called', () => {
      component.deleteCard(getCardsMock()[0]);
      expect(cardService.deleteCard).toHaveBeenCalledWith(getCardsMock()[0]);
    });
  });
});
