import CreateResourceLayout from '../layout/CreateResourceLayout';

export default function CreateSurveys(): JSX.Element {
  return (
    <CreateResourceLayout
      title="Create Survey"
      resourceName="Questionnaire"
      newRoute="/surveys"
      customIgnoredProperties={[
        'url',
        'identifier',
        'version',
        'code',
        'item',
        'subjectType',
        'approvalDate',
        'effectivePeriod',
        'useContext',
        'jurisdiction',
        'derivedFrom',
        'lastReviewDate'
      ]}
    />
  );
}

