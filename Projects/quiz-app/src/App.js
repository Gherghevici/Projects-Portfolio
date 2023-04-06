import React, { useState } from 'react';

function App() {
  const arr = [
    {
      question: ['Which animal can be seen on the Porsche logo?'],
      raspunsuri: [
        { raspuns: 'Dog', isTrue: false },
        { raspuns: 'Cat', isTrue: false },
        { raspuns: 'Horse', isTrue: true },
        { raspuns: 'Bull', isTrue: false },
      ],
    },
    {
      question: ['How long is an Olympic swimming pool (in meters)?'],
      raspunsuri: [
        { raspuns: '60 meters', isTrue: false },
        { raspuns: '50 meters', isTrue: true },
        { raspuns: '200 meters', isTrue: false },
        { raspuns: '100 meters', isTrue: false },
      ],
    },
    {
      question: ['What is the name of the World\'s largest ocean?'],
      raspunsuri: [
        { raspuns: 'Pacific Ocean', isTrue: true },
        { raspuns: 'Atlantic', isTrue: false },
        { raspuns: 'Arctic', isTrue: false },
        { raspuns: 'Indian', isTrue: false },
      ],
    },
    {
      question: ['What color is a ruby?'],
      raspunsuri: [
        { raspuns: 'Red', isTrue: true },
        { raspuns: 'Blue', isTrue: false },
        {
          raspuns: 'Green',
          isTrue: false,
        },
        { raspuns: 'Brown', isTrue: false },
      ],
    },
  ];
  const [newQuestion, setNewQuestion] = useState(0);
  const [rezultatDis, setRezultatDis] = useState(false);
  const [rezultat, setRezultat] = useState(0);
  const [nume, setNume] = useState(true);
  const [numeAles, setNumeAles] = useState('');
  const [btnClassName, setBtnClassName] = useState('btn');
  const validate = (e) => {
    if (newQuestion + 1 === arr.length) {
      setTimeout(() => setRezultatDis(true), 1000);
    }
    setTimeout(() => {
      setNewQuestion(newQuestion + 1);
      setBtnClassName('btn');
    }, 1000);

    if (e.target.value === 'true') {
      setRezultat(rezultat + 1);
      setBtnClassName('btn green');
    } else {
      setBtnClassName('btn red');
    }
  };
  const reset = () => {
    setNewQuestion(0);
    setRezultat(0);
    setRezultatDis(false);
    setNume(true);
  };
  const checkName = (e) => {
    if (e.target.value.length > 10) {
      alert('Numele e prea mare');
      e.target.value = '';
    } else {
      setNumeAles(e.target.value);
    }
  };

  return rezultatDis ? (
    <div className="container rezultat-display">
      <h1>
        {numeAles} a ghicit {rezultat} din {arr.length} intrebari
      </h1>
      <button onClick={reset} className="btn btn-reset">
        reset
      </button>
    </div>
  ) : nume ? (
    <div className="container rezultat-display">
      <form>
        <h1>Numele jucatorului</h1>
        <input type="text" onChange={(e) => checkName(e)}></input>
        <input
          className="btn btn-reset"
          type="submit"
          value="Start"
          onClick={() => setNume(false)}
        ></input>
      </form>
    </div>
  ) : (
    <div className="container">
      <div className="sub-container">
        <h1>
          Question {newQuestion + 1}/{arr.length}
        </h1>
        {arr[newQuestion].question.map((value) => (
          <h3>{value}</h3>
        ))}
      </div>
      <div className="sub-container">
        {arr[newQuestion].raspunsuri.map((value) => (
          <button
            className={btnClassName}
            onClick={(e) => validate(e)}
            value={value.isTrue}
          >
            {value.raspuns}{' '}
          </button>
        ))}
      </div>
    </div>
  );
}


export default App;
