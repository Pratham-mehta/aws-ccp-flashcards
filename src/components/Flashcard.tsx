import { useState } from 'react';

interface FlashcardProps {
  question: string;
  answer: string;
}

export default function Flashcard({ question, answer }: FlashcardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className="perspective-1000 w-full max-w-3xl h-[28rem]">
      <div
        className={`relative w-full h-full transition-transform duration-700 transform-style-3d cursor-pointer group ${
          isFlipped ? 'rotate-y-180' : ''
        }`}
        onClick={handleFlip}
      >
        {/* Front Side - Question */}
        <div className="absolute w-full h-full backface-hidden bg-gradient-to-br from-white to-blue-50 rounded-3xl shadow-2xl border border-blue-100 p-10 flex flex-col items-center justify-center transition-all hover:shadow-blue-200/50">
          <div className="absolute top-6 left-6 bg-blue-100 text-blue-700 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
            Question
          </div>
          <div className="flex-1 flex items-center justify-center w-full">
            <p className="text-3xl text-gray-800 text-center font-semibold leading-relaxed px-4">
              {question}
            </p>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-400 animate-pulse">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
            </svg>
            <span>Click to reveal answer</span>
          </div>
        </div>

        {/* Back Side - Answer */}
        <div className="absolute w-full h-full backface-hidden bg-gradient-to-br from-teal-500 via-cyan-600 to-blue-700 rounded-3xl shadow-2xl border border-teal-300 p-10 flex flex-col items-center justify-center rotate-y-180">
          <div className="absolute top-6 left-6 bg-white/20 backdrop-blur-sm text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
            Answer
          </div>
          <div className="flex-1 flex items-center justify-center w-full">
            <p className="text-2xl text-white text-center font-medium leading-relaxed px-4">
              {answer}
            </p>
          </div>
          <div className="flex items-center gap-2 text-sm text-teal-100">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Click to see question</span>
          </div>
        </div>
      </div>
    </div>
  );
}
