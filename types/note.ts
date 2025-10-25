export interface Note {
    id: string;
    title: string;
    content: string;
    createdAt: string;
    tag: string;
    updatedAt: string;
}

export interface DraftNote {
  title: string;
  content: string;
  tag: string;
}
