import React, { useState } from 'react';

function App() {
  const arr = [
    {
      question: ['Care este mancarea preferata a lui Andrei?'],
      raspunsuri: [
        { raspuns: 'Pizza', isTrue: false },
        { raspuns: 'Burghir', isTrue: false },
        { raspuns: 'Paste chinezesti', isTrue: true },
        { raspuns: 'Salata', isTrue: false },
      ],
    },
    {
      question: ['Ce ii place lui Andrei?'],
      raspunsuri: [
        { raspuns: 'Dormitul', isTrue: false },
        { raspuns: 'Miruna', isTrue: true },
        { raspuns: 'Jucatul', isTrue: false },
        { raspuns: 'Invatatul', isTrue: false },
      ],
    },
    {
      question: ['Care este sucul preferat a lui Andrei'],
      raspunsuri: [
        { raspuns: 'Jueps', isTrue: true },
        { raspuns: 'Fanta', isTrue: false },
        { raspuns: 'Cola', isTrue: false },
        { raspuns: 'Fuze tea de fructe de padure', isTrue: false },
      ],
    },
    {
      question: ['In ce loc de munca ar vrea sa lucreze Andrei'],
      raspunsuri: [
        { raspuns: 'In noul Palas de pe sf Andrei', isTrue: true },
        { raspuns: 'In Palas ul cechi', isTrue: false },
        {
          raspuns: 'Pe Splai Bahlui la cladirile de langa Salubris',
          isTrue: false,
        },
        { raspuns: 'De acasa din pat', isTrue: false },
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
