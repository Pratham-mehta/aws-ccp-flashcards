export interface FlashcardData {
  question: string;
  answer: string;
}

export function parseCSV(csvText: string): FlashcardData[] {
  const lines = csvText.trim().split('\n');
  const flashcards: FlashcardData[] = [];

  for (const line of lines) {
    // Handle CSV with quoted fields containing commas
    const match = line.match(/^"?(.+?)"?\s*,\s*"?(.+?)"?\s*$/);

    if (match) {
      const question = match[1].replace(/^"|"$/g, '').trim();
      const answer = match[2].replace(/^"|"$/g, '').trim();

      if (question && answer) {
        flashcards.push({ question, answer });
      }
    }
  }

  return flashcards;
}
