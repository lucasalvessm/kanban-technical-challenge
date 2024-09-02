import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardComponent } from './board.component';
import { CardService } from './services/card.service';
import { getCardServiceSpy } from '../shared/testing/obj-spy.shared';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BehaviorSubject } from 'rxjs';
import { getCardsMock } from '../shared/testing/mock.data';
import { DialogModule } from '@angular/cdk/dialog';
import { CardComponent } from './components/card/card.component';

describe('BoardComponent', () => {
  let component: BoardComponent;
  let fixture: ComponentFixture<BoardComponent>;
  let cardService: jasmine.SpyObj<CardService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BoardComponent, DialogModule],
      providers: [
        { provide: CardService, useValue: getCardServiceSpy() },
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: {} },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(BoardComponent);
    cardService = TestBed.inject(CardService) as jasmine.SpyObj<CardService>;
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should trigger editCard when editCard$ emits with a card', () => {
    const dialogSpy = spyOn(component.dialog, 'open').and.callThrough();
    (cardService.editCard$ as any).next(getCardsMock()[0]);

    expect(dialogSpy).toHaveBeenCalled();
  });

  describe('addCard', () => {
    it('should open the dialog with mode add when addCard is called', () => {
      const dialogSpy = spyOn(component.dialog, 'open').and.callThrough();
      component.addCard();

      expect(dialogSpy).toHaveBeenCalledWith(CardComponent, {
        data: { mode: 'add' },
      });
    });

    it('should push the new card to the correct column when the dialog is closed', () => {
      expect(component.columns[0].cards.length).toBe(2);

      spyOn(component.dialog, 'open').and.returnValue({
        afterClosed: () =>
          new BehaviorSubject({
            card: {
              titulo: 'test',
              conteudo: 'test',
              lista: 'todo',
              id: '1',
            },
          }),
      } as any);

      component.addCard();

      expect(component.columns[0].cards.length).toBe(3);
    });
  });

  describe('editCard', () => {
    it('should open the dialog with mode edit when editCard is called', () => {
      const dialogSpy = spyOn(component.dialog, 'open').and.callThrough();
      component.editCard(getCardsMock()[0]);

      expect(dialogSpy).toHaveBeenCalledWith(CardComponent, {
        data: { mode: 'edit', card: getCardsMock()[0] },
      });
    });

    it('should update the card in the correct column when the dialog is closed', () => {
      const cardToEdit = component.columns[0].cards[0];

      expect(cardToEdit.titulo).toBe('Plantar banana');

      spyOn(component.dialog, 'open').and.returnValue({
        afterClosed: () =>
          new BehaviorSubject({
            card: {
              titulo: 'test',
              conteudo: 'test',
              lista: 'todo',
              id: cardToEdit.id,
            },
            edited: true,
          }),
      } as any);

      component.editCard(cardToEdit);

      expect(component.columns[0].cards[0].titulo).toBe('test');
    });

    it('should remove the card from the correct column when the dialog is closed and the card is deleted', () => {
      const cardToDelete = component.columns[0].cards[0];

      expect(component.columns[0].cards.length).toBe(2);

      spyOn(component.dialog, 'open').and.returnValue({
        afterClosed: () =>
          new BehaviorSubject({
            card: cardToDelete,
            deleted: true,
          }),
      } as any);

      component.editCard(cardToDelete);

      expect(component.columns[0].cards.length).toBe(1);
      expect(
        component.columns[0].cards.find((c) => c.id === cardToDelete.id)
      ).toBeUndefined();
    });
  });

  it('should move the card to the correct column when updateCardColumn is called', () => {
    const card = getCardsMock()[0];
    const column = component.columns[0];

    expect(column.cards.length).toBe(2);

    component.updateCardColumn({
      previousContainer: { id: 'todo', data: {} },
      container: { id: 'doing', data: {} },
      previousIndex: 0,
    } as any);

    expect(cardService.editCard).toHaveBeenCalledWith({
      ...card,
      lista: 'doing',
    });
  });
});
