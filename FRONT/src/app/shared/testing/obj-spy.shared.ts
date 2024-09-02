import { BehaviorSubject, of } from 'rxjs';
import { getCardsMock } from './mock.data';

export const getCardServiceSpy = () => {
  const spy = jasmine.createSpyObj(
    'CardService',
    ['getCards', 'editCard', 'triggerCardEdit', 'addNewCard', 'deleteCard'],
    {
      editCard$: new BehaviorSubject(undefined),
    }
  );

  spy.getCards.and.returnValue(of(getCardsMock()));
  spy.editCard.and.returnValue(of(getCardsMock()[0]));
  spy.addNewCard.and.returnValue(of(getCardsMock()[0]));
  spy.deleteCard.and.returnValue(of(undefined));
  return spy;
};

export const getHttpCliSpy = () => {
  return jasmine.createSpyObj('HttpClient', ['get', 'post', 'put', 'delete']);
};
