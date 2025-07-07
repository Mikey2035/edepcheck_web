import React, { Suspense } from "react";
import QuestionnaireClient from "./QuestionnaireClient";

export default function QuestionnairePage() {
  return (
    <Suspense fallback={<div>Loading questionnaire...</div>}>
      <QuestionnaireClient />
    </Suspense>
  );
}
