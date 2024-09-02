import { of } from 'rxjs';
import { cardsMock } from './mock.data';

export const getCardServiceSpy = () => {
  const spy = jasmine.createSpyObj('CardService', ['getCards', 'editCard'], {
    editCard$: of(undefined),
  });

  spy.getCards.and.returnValue(of(cardsMock));
  return spy;
};
