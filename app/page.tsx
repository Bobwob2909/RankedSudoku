import Image from "next/image";
import Board from "@/components/Board";
import Game from '@/components/Game';

// This is temporary mock data - replace with your API call
// const initialBoard = [
//   [0, 0, 1, 5, 0, 8, 0, 0, 9],
//   [0, 0, 7, 0, 0, 6, 0, 1, 0],
//   [0, 0, 0, 4, 9, 0, 5, 0, 0],
//   [0, 0, 0, 0, 4, 3, 8, 0, 0],
//   [8, 0, 0, 0, 0, 0, 1, 0, 0],
//   [0, 0, 0, 0, 0, 2, 3, 4, 0],
//   [0, 8, 0, 1, 0, 0, 7, 3, 0],
//   [1, 7, 5, 9, 0, 4, 2, 8, 0],
//   [0, 0, 3, 0, 8, 7, 0, 0, 1]
// ];

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <header>
        <h1>Ranked Sudoku</h1>
      </header>

      <main className="flex flex-col items-center">
        <Game />
      </main>

      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}
