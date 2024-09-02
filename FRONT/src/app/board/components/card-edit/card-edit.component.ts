import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MaterialModule } from '../../../shared/material/material.module';
import { FormsModule } from '@angular/forms';
import { Card } from '../../board.models';
import { AutosizeModule } from 'ngx-autosize';

export interface EditCard {
  title: string;
  description: string;
}

@Component({
  selector: 'app-card-edit',
  standalone: true,
  imports: [MaterialModule, FormsModule, AutosizeModule],
  templateUrl: './card-edit.component.html',
  styleUrl: './card-edit.component.scss',
})
export class CardEditComponent implements OnInit {
  title: string = '';
  description: string = '';
  @Input() card: Card | undefined;
  @Input() hideDelete: boolean = false;

  @Output() cancel = new EventEmitter<void>();
  @Output() saveChanges = new EventEmitter<EditCard>();
  @Output() delete = new EventEmitter<Card>();

  ngOnInit(): void {
    if (this.card) {
      this.title = this.card.titulo;
      this.description = this.card.conteudo;
    }
  }

  onSaveChanges(): void {
    this.saveChanges.emit({ title: this.title, description: this.description });
  }

  onCancel(): void {
    this.cancel.emit();
  }

  onDelete(): void {
    this.delete.emit(this.card);
  }
}
