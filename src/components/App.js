import React, { useEffect, useState } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [triviaData, setTriviaData] = useState([]);

  useEffect(() => {
    fetch('http://localhost:4000/questions')
    .then(res => res.json())
    .then(data => {
      setTriviaData(data)
    })
  }, [])

  function handleFormSubmit(newQuestion) {
    setTriviaData([...triviaData, newQuestion])
  }

  function handleQuestionUpdate(updatedQuestion) {
    const updatedQuestions = triviaData.map(question => {
      if (question.id === updatedQuestion.id) {
        return updatedQuestion
      } else {
        return question
      }
    })
    setTriviaData(updatedQuestions)
  }

  function handleQuestionDelete(deletedQuestion) {
    const updatedQuestions = triviaData.filter(question => question.id !== deletedQuestion.id)
    setTriviaData(updatedQuestions);
  }

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? <QuestionForm onFormSubmit={handleFormSubmit}/> : <QuestionList questionData={triviaData} onQuestionUpdate={handleQuestionUpdate} onQuestionDelete={handleQuestionDelete} />}
    </main>
  );
}

export default App;
