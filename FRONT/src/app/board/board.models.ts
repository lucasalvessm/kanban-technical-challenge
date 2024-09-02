export interface Card {
  id?: string;
  titulo: string;
  conteudo: string;
  lista: string;
}

export interface Column {
  title: string;
  key: string;
  cards: Card[];
}

export type ColumnKey = 'todo' | 'doing' | 'done';
