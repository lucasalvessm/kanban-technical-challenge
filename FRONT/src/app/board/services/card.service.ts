import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Card, ColumnKey } from '../board.models';

@Injectable({
  providedIn: 'root',
})
export class CardService {
  private api = `${environment.apiUrl}/cards`;
  private editCardSubject = new BehaviorSubject<Card | undefined>(undefined);
  public editCard$ = this.editCardSubject.asObservable();

  constructor(private http: HttpClient) {}

  getCards(): Observable<Card[]> {
    return this.http.get<Card[]>(this.api);
  }

  addNewCard(titulo: string, conteudo: string): Observable<Card> {
    const lista: ColumnKey = 'todo';
    return this.http.post<Card>(this.api, {
      titulo,
      conteudo,
      lista,
    });
  }

  editCard(editedCard: Card): Observable<Card> {
    return this.http.put<Card>(`${this.api}/${editedCard.id}`, editedCard);
  }

  deleteCard(card: Card): Observable<void> {
    return this.http.delete<void>(`${this.api}/${card.id}`);
  }

  triggerCardEdit(card: Card): void {
    this.editCardSubject.next(card);
  }
}
