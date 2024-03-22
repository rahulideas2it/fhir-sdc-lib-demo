import TableLayout from '../layout/TableLayout';

export default function Patients(): JSX.Element {
  return (
    <TableLayout
      title="Patients"
      resourceName="Patient"
      newRoute="/patient/new"
    />
  );
}

