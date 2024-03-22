import TableLayout from '../layout/TableLayout';

export default function Surveys(): JSX.Element {
  return (
    <TableLayout
      title="Surveys"
      resourceName="Questionnaire"
      newRoute="/surveys/new"
    />
  );
}

