/** Ячейка таблицы: строка или список пунктов. */
export type LegalCell = string | readonly string[];

export type LegalBlock =
  /** Абзац; `num` — номер пункта («1.1»), `lead` — вводная фраза перед списком. */
  | { type: "p"; text: string; num?: string }
  | { type: "list"; items: readonly string[]; num?: string; lead?: string }
  | { type: "terms"; items: readonly { term: string; text: string }[] }
  | { type: "table"; head: readonly string[]; rows: readonly (readonly LegalCell[])[]; num?: string; lead?: string };

export type LegalSection = {
  id: string;
  title: string;
  blocks: readonly LegalBlock[];
};

export type PrivacyDoc = {
  title: string;
  subtitle: string;
  contentsTitle: string;
  sections: readonly LegalSection[];
  /** Реквизиты оператора внизу документа. */
  details: readonly { label: string; value: string; href?: string }[];
};
