import React, { useState } from 'react'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js'
import './assets/css/styles.css'

const questions = [
  {
    question: "The Indian Contract Act 1872 came into force on...",
    options: ["1st September 1872", "1st July 1872", "1st January 1872", "1st March 1872"],
    answer: 0
  },
  {
    question: "Which section of the Indian Contract Act defines contract?",
    options: ["Section 2(h)", "Section 10", "Section 1", "Section 2(a)"],
    answer: 0
  },
  {
    question: "A proposal when accepted becomes...",
    options: ["Promise", "Contract", "Agreement", "Consideration"],
    answer: 2
  },
  {
    question: "Which is not an essential element of a contract?",
    options: ["Free consent", "Lawful consideration", "Written document", "Competent parties"],
    answer: 2
  },
  {
    question: "A void agreement is...",
    options: ["Enforceable by law", "Not enforceable by law", "Illegal", "Valid"],
    answer: 1
  },
  {
    question: "Which section deals with communication, acceptance and revocation?",
    options: ["Section 2", "Section 3", "Section 4", "Section 5"],
    answer: 2
  },
  {
    question: "Consideration must move at the desire of...",
    options: ["Promisor", "Promisee", "Third party", "Court"],
    answer: 0
  },
  {
    question: "A contract with a minor is...",
    options: ["Valid", "Void", "Voidable", "Illegal"],
    answer: 1
  },
  {
    question: "Which section defines consent?",
    options: ["Section 13", "Section 14", "Section 15", "Section 16"],
    answer: 0
  },
  {
    question: "A contract is discharged by...",
    options: ["Performance", "Agreement", "Impossibility", "All of the above"],
    answer: 3
  }
];

const App = () => {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(Array(questions.length).fill(undefined));
  const [showModal, setShowModal] = useState(false);
  const [showAnswers, setShowAnswers] = useState(false);
  const correctCount = selected.filter((sel, idx) => sel === questions[idx].answer).length;
  const falseCount = selected.filter((sel, idx) => sel !== undefined && sel !== questions[idx].answer).length;

  const handleOption = idx => {
    const updated = [...selected];
    updated[current] = idx;
    setSelected(updated);
  };
  const handlePrev = () => setCurrent(current > 0 ? current - 1 : 0);
  const handleNext = () => setCurrent(current < questions.length - 1 ? current + 1 : current);
  const handleFinish = () => setShowModal(true);
  const handleCloseModal = () => {
    setShowModal(false);
    setShowAnswers(true);
  };
  return (
    <div className='main-box'>
      <div className="header row align-items-center">
        <div className="col-4 d-flex justify-content-center align-items-center">
          <div className='fs-5 fw-bolder'>Mock Tests</div>
        </div>
        <div className="col-8 progress rounded-5 p-0">
          <div className="progress-bar" role="progressbar" style={{ width: `${((current+1)/questions.length)*100}%`, background:"#9929EA" }} aria-valuenow={current+1} aria-valuemin={0} aria-valuemax={questions.length} />
        </div>
      </div>
      <div className="quiz-sec">
        <div className="quiz-box">
          <div className="question-number text-secondary fw-bold">Question {current+1}</div>
          <div className="question fs-5 mb-3">{questions[current].question}</div>
          <div className="options">
            {questions[current].options.map((opt, idx) => {
              let borderLeft = 'none';
              let background = '#fff';
              let boxShadow = 'none';
              if (showAnswers) {
                if (questions[current].answer === idx) {
                  borderLeft = '4px solid green';
                  background = '#e6ffe6';
                } else if (selected[current] === idx) {
                  borderLeft = '4px solid red';
                  background = '#ffe6e6';
                }
              } else if (selected[current] === idx) {
                borderLeft = '4px solid #7c3aed';
                background = '#f6f3ff';
                boxShadow = '0 2px 8px rgba(124,58,237,0.05)';
              }
              return (
                <label
                  key={idx}
                  className={`option d-flex align-items-center mb-2 opt${idx+1} ${selected[current] === idx ? 'selected' : ''}`}
                  style={{borderRadius: '8px', background, borderLeft, boxShadow}}
                >
                  <input
                    type="radio"
                    name={`quiz-option-${current}`}
                    checked={selected[current] === idx}
                    onChange={() => handleOption(idx)}
                    style={{marginRight: '12px'}}
                    disabled={showAnswers}
                  />
                  {opt}
                </label>
              );
            })}
          </div>
        </div>
      </div>
      <div className="button-sec">
        <div className="d-flex justify-content-between align-items-center button-sec-inner" style={{marginTop: '2rem'}}>
          <div className="d-flex gap-3">
            <button className="quiz-nav-btn prev-btn d-flex align-items-center" onClick={handlePrev} disabled={current === 0}>
              <span style={{fontSize: '1.2em', marginRight: '6px'}}>&larr;</span> Previous
            </button>
            <button className="quiz-nav-btn next-btn d-flex align-items-center" onClick={handleNext} disabled={current === questions.length-1}>
              Next <span style={{fontSize: '1.2em', marginLeft: '6px'}}>&rarr;</span>
            </button>
          </div>
          <button className="finish-btn" onClick={handleFinish}>Finish</button>
        </div>
      </div>
      {showModal && (
        <div className="modal-backdrop" style={{position:'fixed',top:0,left:0,width:'100vw',height:'100vh',background:'rgba(60,0,100,0.18)',zIndex:1000,display:'flex',alignItems:'center',justifyContent:'center'}}>
          <div className="result-modal" style={{background:'#fff',borderRadius:'18px',padding:'2.5rem 2rem',boxShadow:'0 8px 32px rgba(124,58,237,0.15)',minWidth:'320px',textAlign:'center'}}>
            <h3 style={{color:'#9929EA',fontWeight:700}}>Quiz Result</h3>
            <div style={{fontSize:'1.2rem',margin:'1.5rem 0'}}>
              <span style={{color:'#7c3aed',fontWeight:600}}>Correct: {correctCount}</span><br/>
              <span style={{color:'#e53e3e',fontWeight:600}}>Incorrect: {falseCount}</span>
            </div>
            <button className="finish-btn" style={{marginTop:'1rem'}} onClick={handleCloseModal}>Close</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App