
import { useState } from 'react';
import './App.css';

function App() {
  const days = ['Vasárnap', 'Hétfő', 'Kedd', 'Szerda', 'Csütörtök', 'Péntek', 'Szombat'];
  const months = ['Január', 'Február', 'Március', 'Április', 'Május', 'Június', 'Július', 'Augusztus', 'Szeptember', 'Október', 'November', 'December'];
  const [numbers, setNumbers] = useState<number[]>([]);

  const dislayNumbers = (): string => {
    if (numbers.length === 0) return '-';
    return numbers.join('');
  }

  const toExactNumber = (): number => {
    return parseInt(dislayNumbers());
  };

  const afterDays = (): Date => {
    const date = new Date();
    date.setDate(date.getDate() + toExactNumber());
    return date;
  };

  const formatDate = (date: Date): string => {

    const day = days[date.getDay()];
    const month = months[date.getMonth()];

    return `${month} ${date.getDate()}. ${day}, ${date.getFullYear()}`;
  };

  return (
    <>
      <div
        className="current-number text-white text-4xl flex flex-row justify-center items-center align-middle border-1 w-auto h-12 bg-slate-600"
      >
        {dislayNumbers()}
      </div>

      <div className='grid text-fuchsia-200'>
        <div>
          <h1>Idő</h1>
        </div>
        <div className=''>
          <span>{dislayNumbers()} nap múlva lesz: {formatDate(afterDays())}</span>
        </div>
      </div>

      <div className="flex align-middle items-center justify-center h-[100vh]">
        <div className="control-buttons"></div>
        {
          Array.from({ length: 10 }).map((_, number) => (
            <button
              onClick={() => setNumbers([...numbers, number])}
              key={number}
              className=" mx-2 px-4 py-2 bg-gray-400 rounded-md text-lg font-semibold hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
            >
              {number}
            </button>
          ))
        }
        <button
          onClick={() => setNumbers([])}
          className="mx-2 px-4 py-2 bg-gray-400 rounded-md text-lg font-semibold hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
        >
          Reset
        </button>
      </div>
    </>
  );
}

export default App;
