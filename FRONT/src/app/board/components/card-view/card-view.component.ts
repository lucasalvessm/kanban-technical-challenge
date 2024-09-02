import { Component, Input } from '@angular/core';
import { Card } from '../../board.models';
import { MaterialModule } from '../../../shared/material/material.module';
import * as marked from 'marked';

@Component({
  selector: 'app-card-view',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './card-view.component.html',
  styleUrl: './card-view.component.scss',
})
export class CardViewComponent {
  @Input() card: Card | undefined;

  parseMarkdown(text: string): string | Promise<string> {
    return marked.parse(text);
  }
}
