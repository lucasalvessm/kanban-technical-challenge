import { of } from 'rxjs';
import { cardsMock } from './mock.data';

export const getCardServiceSpy = () => {
  const spy = jasmine.createSpyObj(
    'CardService',
    ['getCards', 'editCard', 'triggerCardEdit', 'addNewCard', 'deleteCard'],
    {
      editCard$: of(undefined),
    }
  );

  spy.getCards.and.returnValue(of(cardsMock));
  spy.editCard.and.returnValue(of(cardsMock[0]));
  spy.addNewCard.and.returnValue(of(cardsMock[0]));
  spy.deleteCard.and.returnValue(of(undefined));
  return spy;
};

export const getHttpCliSpy = () => {
  return jasmine.createSpyObj('HttpClient', ['get', 'post', 'put', 'delete']);
};
