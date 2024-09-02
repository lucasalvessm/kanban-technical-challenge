import { Component, Inject, Input, Optional } from '@angular/core';
import { Card } from '../../board.models';
import { MaterialModule } from '../../../shared/material/material.module';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CardEditComponent, EditCard } from '../card-edit/card-edit.component';
import { CardViewComponent } from '../card-view/card-view.component';
import { CardService } from '../../services/card.service';

interface DialogData {
  mode: DialogMode;
  card?: Card;
}

type DialogMode = 'view' | 'edit' | 'add';

export interface DialogResult {
  added?: boolean;
  edited?: boolean;
  deleted?: boolean;
  card: Card;
}

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [MaterialModule, CardEditComponent, CardViewComponent],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent {
  @Input() card: Card | undefined;
  public mode: DialogMode;

  constructor(
    @Optional() public dialogRef: MatDialogRef<CardComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private cardService: CardService
  ) {
    this.mode = data.mode || 'view';

    if (data.card) {
      this.card = data.card;
    }
  }

  cancelEdition(): void {
    this.dialogRef.close();
  }

  addOrEditCard(card: EditCard): void {
    if (this.mode === 'add') {
      this.addNewCard(card);
    } else {
      this.editCard(card);
    }
  }

  private addNewCard(card: EditCard) {
    this.cardService
      .addNewCard(card.title, card.description)
      .subscribe((card) => {
        this.dialogRef.close({ added: true, card } as DialogResult);
      });
  }

  private editCard({ title, description }: EditCard) {
    const newCard = { ...this.card!, titulo: title, conteudo: description };
    this.cardService.editCard(newCard).subscribe((card) => {
      this.dialogRef.close({ edited: true, card } as DialogResult);
    });
  }

  openEditView(): void {
    if (this.mode === 'view') {
      this.cardService.triggerCardEdit(this.card!);
    }
  }

  deleteCard(card: Card): void {
    this.cardService.deleteCard(this.card!).subscribe(() => {
      this.dialogRef.close({ deleted: true, card } as DialogResult);
    });
  }
}
