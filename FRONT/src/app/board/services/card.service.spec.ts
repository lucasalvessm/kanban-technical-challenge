import { TestBed } from '@angular/core/testing';

import { CardService } from './card.service';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { getHttpCliSpy } from '../../shared/testing/obj-spy.shared';
import { cardsMock } from '../../shared/testing/mock.data';
import { of } from 'rxjs';
import { environment } from '../../../environments/environment';

describe('CardService', () => {
  let service: CardService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        {
          provide: HttpClient,
          useValue: getHttpCliSpy(),
        },
      ],
    });
    service = TestBed.inject(CardService);
    httpClientSpy = TestBed.inject(HttpClient) as jasmine.SpyObj<HttpClient>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get all cards', () => {
    httpClientSpy.get.and.returnValue(of(cardsMock));

    service.getCards().subscribe((cards) => {
      expect(httpClientSpy.get).toHaveBeenCalled();
      expect(cards).toEqual(cardsMock);
    });
  });

  it('should add a card', () => {
    httpClientSpy.post.and.returnValue(of(cardsMock[0]));

    service.addNewCard('titulo', 'conteudo').subscribe((card) => {
      expect(httpClientSpy.post).toHaveBeenCalledWith(
        `${environment.apiUrl}/cards`,
        {
          titulo: 'titulo',
          conteudo: 'conteudo',
          lista: 'todo',
        }
      );
      expect(card).toEqual(cardsMock[0]);
    });
  });

  it('should edit a card', () => {
    httpClientSpy.put.and.returnValue(of(cardsMock[0]));

    service.editCard(cardsMock[0]).subscribe((card) => {
      expect(httpClientSpy.put).toHaveBeenCalledWith(
        `${environment.apiUrl}/cards/${cardsMock[0].id}`,
        cardsMock[0]
      );
      expect(card).toEqual(cardsMock[0]);
    });
  });

  it('should delete a card', () => {
    httpClientSpy.delete.and.returnValue(of(undefined));

    service.deleteCard(cardsMock[0]).subscribe(() => {
      expect(httpClientSpy.delete).toHaveBeenCalledWith(
        `${environment.apiUrl}/cards/${cardsMock[0].id}`
      );
    });
  });

  it('should trigger card edit', () => {
    service.triggerCardEdit(cardsMock[0]);
    service.editCard$.subscribe((card) => {
      expect(card).toEqual(cardsMock[0]);
    });
  });
});
