# Flashcard Study Deck

A modern, interactive flashcard application built with React, TypeScript, and Tailwind CSS. Perfect for studying and memorizing content with a beautiful, user-friendly interface.

## Features

- **Beautiful 3D Flip Animation**: Cards flip smoothly to reveal answers
- **Progress Tracking**: Visual progress bar showing your study progress
- **Keyboard Navigation**: Use arrow keys (← → or ↑ ↓) to navigate between cards
- **CSV Upload**: Upload your own flashcard decks in CSV format
- **Default AWS IAM Deck**: Comes pre-loaded with 59 AWS IAM certification flashcards
- **Responsive Design**: Works great on desktop and mobile devices
- **Mark as Reviewed**: Track which cards you've already studied

## Getting Started

### Prerequisites

- Node.js 20.19+ or 22.12+ (recommended)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser to the URL shown (typically http://localhost:5173)

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` folder.

## CSV Format

To upload your own flashcards, create a CSV file with the following format:

```csv
"Question 1","Answer 1"
"Question 2","Answer 2"
"Question 3","Answer 3"
```

Each line should contain:
- Question in quotes
- Comma separator
- Answer in quotes

Example:
```csv
"What is React?","A JavaScript library for building user interfaces"
"What is TypeScript?","A typed superset of JavaScript that compiles to plain JavaScript"
```

## Usage

1. **View a Card**: Click on any flashcard to flip it and reveal the answer
2. **Navigate**: Use the Previous/Next buttons or arrow keys
3. **Track Progress**: The progress bar automatically updates as you move through cards
4. **Mark as Reviewed**: Click "Mark as Reviewed" to track your study progress
5. **Upload New Deck**: Click "Load New Deck" to upload your own CSV file
6. **Use Default Deck**: Return to the pre-loaded AWS IAM flashcards anytime

## Keyboard Shortcuts

- `→` or `↓`: Next card
- `←` or `↑`: Previous card
- `Click on card`: Flip card

## Technology Stack

- **React 18**: Modern UI framework
- **TypeScript**: Type-safe development
- **Vite**: Fast build tool and dev server
- **Tailwind CSS**: Utility-first CSS framework
- **CSS 3D Transforms**: Smooth card flip animations

## Project Structure

```
src/
├── components/
│   ├── Flashcard.tsx          # Individual flashcard component with flip animation
│   ├── FlashcardDeck.tsx      # Deck manager with navigation and progress
│   └── CSVUploader.tsx        # File upload component
├── utils/
│   └── csvParser.ts           # CSV parsing utility
├── App.tsx                     # Main application component
├── App.css                     # Application styles
└── index.css                   # Global styles with Tailwind
```

## Future Enhancement Ideas

- Add spaced repetition algorithm
- Save progress to localStorage
- Support for multiple decks
- Quiz mode with scoring
- Export/import deck functionality
- Dark mode toggle
- Audio pronunciation support
- Image support in cards

## License

MIT

## Created By

Built with React, TypeScript, and Tailwind CSS for effective studying and knowledge retention.
