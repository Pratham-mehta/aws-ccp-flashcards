import { useRef, type ChangeEvent } from 'react';
import { parseCSV } from '../utils/csvParser';
import type { FlashcardData } from '../utils/csvParser';

interface CSVUploaderProps {
  onUpload: (flashcards: FlashcardData[]) => void;
}

export default function CSVUploader({ onUpload }: CSVUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = (e) => {
      const text = e.target?.result as string;
      const flashcards = parseCSV(text);

      if (flashcards.length > 0) {
        onUpload(flashcards);
      } else {
        alert('No valid flashcards found in the CSV file. Please check the format.');
      }
    };

    reader.readAsText(file);
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="w-full max-w-3xl">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept=".csv"
        className="hidden"
      />
      <div className="bg-white/10 backdrop-blur-lg border-2 border-white/30 rounded-3xl p-8 shadow-2xl">
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-full mb-4 shadow-lg">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-white mb-2">Upload Your Flashcards</h2>
          <p className="text-white/70 text-lg">Choose a CSV file to begin studying</p>
        </div>

        <button
          onClick={handleClick}
          className="w-full bg-gradient-to-r from-white to-gray-50 hover:from-gray-50 hover:to-white text-teal-700 font-bold py-6 px-8 rounded-2xl shadow-xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 border-2 border-teal-200 group"
        >
          <div className="flex items-center justify-center gap-4">
            <div className="bg-teal-100 p-3 rounded-xl group-hover:bg-teal-200 transition-colors">
              <svg className="w-7 h-7 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div className="text-left">
              <span className="block text-xl">Choose CSV File</span>
              <span className="block text-sm text-teal-500 font-normal">Click to browse</span>
            </div>
          </div>
        </button>

        <div className="mt-6 bg-white/5 backdrop-blur-sm rounded-xl p-5 border border-white/10">
          <div className="flex items-start gap-3">
            <svg className="w-5 h-5 text-blue-300 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            <div className="flex-1">
              <p className="text-white/90 font-semibold text-sm mb-1">CSV Format Required:</p>
              <p className="text-white/70 text-sm">
                Each line should contain: <code className="bg-white/10 px-2 py-0.5 rounded text-purple-200 font-mono text-xs">"question","answer"</code>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
