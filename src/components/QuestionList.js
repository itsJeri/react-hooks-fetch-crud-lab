import React from "react";
import QuestionItem from './QuestionItem';

function QuestionList({ questionData, onQuestionUpdate, onQuestionDelete }) {
  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>
        {questionData.map(question => {
          return (
            <QuestionItem 
              key={question.id}
              question={question}
              onQuestionUpdate={onQuestionUpdate}
              onQuestionDelete={onQuestionDelete}
            />
          )
        })}
      </ul>
    </section>
  );
}

export default QuestionList;
