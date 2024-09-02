import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Card, Column } from '../../board.models';
import { CardComponent } from '../card/card.component';
import { MaterialModule } from '../../../shared/material/material.module';
import {
  CdkDrag,
  CdkDragDrop,
  CdkDropList,
  CdkDropListGroup,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-column',
  standalone: true,
  imports: [
    CardComponent,
    MaterialModule,
    CdkDropListGroup,
    CdkDropList,
    CdkDrag,
  ],
  templateUrl: './column.component.html',
  styleUrl: './column.component.scss',
})
export class ColumnComponent {
  @Input() column: Column | null = null;
  @Input() columnKeys: string[] = [];
  @Output() updateCardDropped = new EventEmitter<CdkDragDrop<Card[]>>();

  drop(event: CdkDragDrop<Card[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      this.updateCardDropped.emit(event);
    }
  }
}
