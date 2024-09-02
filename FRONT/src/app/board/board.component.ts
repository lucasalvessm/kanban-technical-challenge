import { Component, inject, OnInit } from '@angular/core';
import { CardService } from './services/card.service';
import { ColumnComponent } from './components/column/column.component';
import { Card, Column } from './board.models';
import { filter, first } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { CardComponent, DialogResult } from './components/card/card.component';
import { MaterialModule } from '../shared/material/material.module';
import { CdkDragDrop, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [MaterialModule, ColumnComponent, CardComponent],
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss',
})
export class BoardComponent implements OnInit {
  columns: Column[] = [
    { title: 'To Do', key: 'todo', cards: [] },
    { title: 'Doing', key: 'doing', cards: [] },
    { title: 'Done', key: 'done', cards: [] },
  ];

  get columnKeys(): string[] {
    return this.columns.map((column) => column.key);
  }

  readonly dialog = inject(MatDialog);
  constructor(private cardService: CardService) {}

  ngOnInit(): void {
    this.cardService
      .getCards()
      .pipe(first())
      .subscribe((cards) => {
        this.columns.forEach((column) => {
          column.cards = cards.filter((card) => card.lista === column.key);
          console.log('column', column);
        });
      });

    this.cardService.editCard$
      .pipe(filter((card) => !!card))
      .subscribe((card) => {
        this.editCard(card);
      });
  }

  updateCardColumn(event: CdkDragDrop<Card[]>): void {
    const previousColumn = this.findColumnByKey(event.previousContainer.id)!;
    const currentColumn = this.findColumnByKey(event.container.id)!;

    const card = previousColumn.cards[event.previousIndex];
    card.lista = currentColumn.key;
    this.cardService.editCard(card).subscribe(() => {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    });
  }

  addCard(): void {
    this.dialog
      .open(CardComponent, {
        data: { mode: 'add' },
      })
      .afterClosed()
      .subscribe((result: DialogResult) => {
        if (result?.card) {
          const column = this.findColumnByKey(result.card.lista);

          if (column) {
            column.cards.push(result.card);
          }
        }
      });
  }

  editCard(card: Card): void {
    this.dialog
      .open(CardComponent, {
        data: { mode: 'edit', card },
      })
      .afterClosed()
      .subscribe((result: DialogResult) => {
        if (!result) {
          return;
        }
        if (result.edited && result.card) {
          this.updateCardInColumn(result);
        } else if (result.deleted) {
          this.removeCardFromColumn(result);
        }
      });
  }

  private findColumnByKey(key: string): Column | undefined {
    return this.columns.find((column) => column.key === key);
  }

  private removeCardFromColumn(result: any): void {
    const deletedCard = result.card;

    const column = this.findColumnByKey(deletedCard.lista);

    column!.cards = column!.cards.filter((card) => card.id !== deletedCard.id);
  }

  private updateCardInColumn(result: any): void {
    const column = this.findColumnByKey(result.card.lista);

    if (column) {
      const index = column.cards.findIndex((c) => c.id === result.card?.id);

      if (index >= 0) {
        column.cards[index] = result.card;
      }
    }
  }
}
