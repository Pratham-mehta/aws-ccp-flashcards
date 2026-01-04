import { useState, useEffect, useCallback } from 'react';
import Flashcard from './Flashcard';
import type { FlashcardData } from '../utils/csvParser';

interface FlashcardDeckProps {
  flashcards: FlashcardData[];
  onReset: () => void;
}

export default function FlashcardDeck({ flashcards, onReset }: FlashcardDeckProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [reviewedCards, setReviewedCards] = useState<Set<number>>(new Set());

  const handleNext = useCallback(() => {
    if (currentIndex < flashcards.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setReviewedCards(new Set(reviewedCards).add(currentIndex));
    }
  }, [currentIndex, flashcards.length, reviewedCards]);

  const handlePrevious = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  }, [currentIndex]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        handleNext();
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        handlePrevious();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handleNext, handlePrevious]);

  const handleMarkAsReviewed = () => {
    setReviewedCards(new Set(reviewedCards).add(currentIndex));
  };

  const progress = ((reviewedCards.size + 1) / flashcards.length) * 100;

  if (flashcards.length === 0) {
    return null;
  }

  return (
    <div className="w-full max-w-5xl mx-auto px-4">
      {/* Progress Bar */}
      <div className="mb-10">
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center gap-2">
            <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
              <span className="text-white font-bold text-sm">
                Card {currentIndex + 1} <span className="text-white/60">of</span> {flashcards.length}
              </span>
            </div>
          </div>
          <div className="bg-green-500/20 backdrop-blur-sm px-4 py-2 rounded-full border border-green-400/30">
            <span className="text-green-100 font-bold text-sm flex items-center gap-2">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              {reviewedCards.size + 1} reviewed
            </span>
          </div>
        </div>
        <div className="w-full bg-white/20 backdrop-blur-sm rounded-full h-4 overflow-hidden shadow-inner border border-white/30">
          <div
            className="bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400 h-full transition-all duration-500 rounded-full shadow-lg"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Flashcard */}
      <div className="flex justify-center mb-8">
        <Flashcard
          question={flashcards[currentIndex].question}
          answer={flashcards[currentIndex].answer}
        />
      </div>

      {/* Navigation Controls */}
      <div className="flex flex-col gap-6">
        <div className="flex justify-center gap-4">
          <button
            onClick={handlePrevious}
            disabled={currentIndex === 0}
            className="group bg-white/95 hover:bg-white disabled:bg-white/30 disabled:cursor-not-allowed text-teal-700 disabled:text-gray-400 font-bold py-4 px-10 rounded-2xl shadow-xl transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 disabled:transform-none disabled:shadow-none flex items-center gap-3 border-2 border-teal-200 disabled:border-transparent"
          >
            <svg className="w-6 h-6 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
            </svg>
            <span className="text-lg">Previous</span>
          </button>

          <button
            onClick={handleNext}
            disabled={currentIndex === flashcards.length - 1}
            className="group bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed text-white font-bold py-4 px-10 rounded-2xl shadow-xl transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 disabled:transform-none disabled:shadow-none flex items-center gap-3"
          >
            <span className="text-lg">Next</span>
            <svg className="w-6 h-6 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Additional Controls */}
        <div className="flex justify-center gap-4 flex-wrap">
          <button
            onClick={handleMarkAsReviewed}
            className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold py-3 px-8 rounded-xl shadow-lg transition-all duration-200 transform hover:scale-105 flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            Mark as Reviewed
          </button>
          <button
            onClick={onReset}
            className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-semibold py-3 px-8 rounded-xl shadow-lg transition-all duration-200 transform hover:scale-105 flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
            </svg>
            Load New Deck
          </button>
        </div>

        {/* Keyboard Shortcuts Hint */}
        <div className="text-center bg-white/10 backdrop-blur-sm rounded-xl py-3 px-6 mx-auto">
          <p className="text-white/90 text-sm font-medium flex items-center justify-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            Use arrow keys to navigate: ← → or ↑ ↓
          </p>
        </div>
      </div>

      {/* Completion Message */}
      {currentIndex === flashcards.length - 1 && (
        <div className="mt-10 bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl p-8 text-center shadow-2xl border-2 border-green-200">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full mb-4 shadow-lg">
            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          </div>
          <h3 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-3">
            Congratulations! 🎉
          </h3>
          <p className="text-gray-700 text-lg mb-2">
            You've reached the last card!
          </p>
          <p className="text-gray-600 text-sm">
            Great job completing your study session
          </p>
        </div>
      )}
    </div>
  );
}
