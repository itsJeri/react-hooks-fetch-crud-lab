import React from "react";

function QuestionItem({ question, onQuestionUpdate, onQuestionDelete }) {
  const { id, prompt, answers, correctIndex } = question;

  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

  function handleChange(e) {
    const updatedCorrectIndex = e.target.value;

    fetch(`http://localhost:4000/questions/${question.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "correctIndex": updatedCorrectIndex
      }),
    })
    .then(res => res.json())
    .then(updatedQuestion => onQuestionUpdate(updatedQuestion))
  }

  function handleDelete() {
    fetch(`http://localhost:4000/questions/${question.id}`, {
      method: 'DELETE',
    })
    .then(res => res.json())
    .then(() => onQuestionDelete(question))
  }

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select defaultValue={correctIndex} onChange={handleChange}>{options}</select>
      </label>
      <button onClick={handleDelete}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
