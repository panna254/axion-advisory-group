/**
 * One of the firm's core values, `VALUE-0n` in `CONTENT.md` §8a.
 *
 * Supplied by the client. The render order is theirs and is not a ranking,
 * so components list these without re-sorting and without implying sequence.
 */
export interface CoreValue {
  /** `VALUE-0n`. */
  id: string;
  /** `VALUE-0n-NAME`. The client's own wording, title case as supplied. */
  name: string;
  /** `VALUE-0n-DESC`. One sentence. */
  description: string;
}
