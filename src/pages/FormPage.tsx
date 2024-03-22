import { Blockquote, Container, Paper } from '@mantine/core';
import { Questionnaire } from '@medplum/fhirtypes';
import {
  QuestionnaireForm,
  useMedplum
} from '@rahulideas2it/fhir-sdc-lib-react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './SurveyBuilder.css';

export default function FormPage(): JSX.Element {
  const { questionnaireID } = useParams();
  const [questionnaireJSON, setQuestionnaireJSON] = useState<Questionnaire>();
  const [mappingValue, setMappingValue] = useState<any>(null);

  const medplum = useMedplum();

  useEffect(() => {
    medplum
      .search('Questionnaire', { _id: questionnaireID })
      .then((result: any) => {
        if (result?.entry?.length) {
          setQuestionnaireJSON(result?.entry?.[0]?.resource);
        }
      });
  }, []);

  if (!questionnaireJSON) {
    return <>'Loading...'</>;
  }

  const getQFHIRResource = (mappingRef: any) => {
    setMappingValue(mappingRef);
  };

  return (
    <>
      <Container size={'md'} p="lg">
        <Paper withBorder id="CustomQuestionnairePreview" p="lg">
          {mappingValue && (
            <>
              <Blockquote radius="md" cite="- FHIR RESOURCE">
                <pre> {JSON.stringify(mappingValue, null, 2)}</pre>
              </Blockquote>
            </>
          )}
          <QuestionnaireForm
            questionnaire={
              questionnaireJSON || {
                reference: 'Questionnaire',
                id: questionnaireID
              }
            }
            getQFHIRResource={getQFHIRResource}
            onSubmit={() => console.log('Form Submitted')}
          />
        </Paper>
      </Container>
    </>
  );
}

