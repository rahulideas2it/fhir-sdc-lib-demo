import CreateResourceLayout from '../layout/CreateResourceLayout';

export default function CreatePatient(): JSX.Element {
  return (
    <CreateResourceLayout
      title="Create Patient"
      resourceName="Patient"
      newRoute="/patients"
      customIgnoredProperties={[
        'id',
        'resourceType',
        'identifier',
        'active',
        'link',
        'managingOrganization',
        'communication',
        'generalPractitioner',
        'multipleBirth[x]',
        'contact'
      ]}
    />
  );
}

