import { Container, Group, Paper, Tabs, Text, rem } from '@mantine/core';
import { Questionnaire } from '@medplum/fhirtypes';
import {
  QuestionnaireBuilder,
  QuestionnaireForm,
  useMedplum
} from '@rahulideas2it/fhir-sdc-lib-react';
import { IconBraces, IconEdit, IconEye } from '@tabler/icons-react';
import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './SurveyBuilder.css';
import { showNotification } from '@mantine/notifications';

export default function SurveyBuilder(): JSX.Element {
  // const navigate = useNavigate();
  const { questionnaireID } = useParams();
  const [questionnaireJSON, setQuestionnaireJSON] = useState<Questionnaire>();
  const reference = { reference: 'Questionnaire' + '/' + questionnaireID };

  const iconStyle = { width: rem(16), height: rem(16) };

  const medplum = useMedplum();
  const [resources, setResources] = useState<any>();

  useEffect(() => {
    medplum
      .search('Questionnaire', { _id: questionnaireID })
      .then((result: any) => {
        if (result?.entry?.length) {
          setResources(result?.entry?.[0]);
        }
      });
  }, []);

  const handleOnChange = (value: any) => {
    setQuestionnaireJSON(value);
  };

  const cleanResource = (resource: any) => {
    let meta = resource.meta;
    if (meta) {
      meta = {
        ...meta,
        lastUpdated: undefined,
        versionId: undefined,
        author: undefined
      };
    }
    return {
      ...resource,
      meta
    };
  };
  const handleSubmit = useCallback(
    (newResource: any): void => {
      medplum
        .updateResource(cleanResource(newResource))
        .then(() => {
          showNotification({
            color: 'green',
            message: 'Questionnaire Updated'
          });
        })
        .catch((err) => {
          showNotification({
            color: 'red',
            message: err,
            autoClose: false
          });
        });
    },
    [medplum]
  );

  if (!resources) {
    return <>'Loading...'</>;
  }

  return (
    <>
      <Group
        gap={8}
        align="left"
        mt={4}
        mb={20}
        style={{ flexDirection: 'column' }}
      >
        <Group gap="xs">
          <Text fz={16} c="gray" fw={600}>
            Questionnaire:
          </Text>
          <Text fz={16} c="gray">
            {resources?.resource?.name}
          </Text>
        </Group>
      </Group>
      <Tabs variant="default" radius="md" defaultValue="questionnaireBuilder">
        <Tabs.List>
          <Tabs.Tab
            value="questionnaireBuilder"
            leftSection={<IconEdit style={iconStyle} />}
          >
            Builder
          </Tabs.Tab>
          <Tabs.Tab value="preview" leftSection={<IconEye style={iconStyle} />}>
            Preview
          </Tabs.Tab>
          <Tabs.Tab value="json" leftSection={<IconBraces style={iconStyle} />}>
            Json
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel
          data-id="QuestionnaireBuilderPanel"
          value="questionnaireBuilder"
        >
          <Container size={'md'} p="lg">
            <Paper
              style={{ borderTop: 'none' }}
              withBorder
              id="CustomQuestionnaireBuilder"
              p="lg"
            >
              <QuestionnaireBuilder
                onChangeCallback={handleOnChange}
                questionnaire={reference}
                onSubmit={handleSubmit}
              />
            </Paper>
          </Container>
        </Tabs.Panel>

        <Tabs.Panel value="preview">
          <Container size={'md'} p="lg">
            <Paper withBorder id="CustomQuestionnairePreview" p="lg">
              <QuestionnaireForm
                previewMode={true}
                questionnaire={
                  questionnaireJSON || {
                    reference: 'Questionnaire',
                    id: questionnaireID
                  }
                }
                onSubmit={() => alert('Preview Submitted')}
              />
            </Paper>
          </Container>
        </Tabs.Panel>

        <Tabs.Panel value="json">
          <Container size={'md'} p="lg">
            <Paper withBorder id="CustomQuestionnaireJSON" p="lg">
              <pre>{JSON.stringify(questionnaireJSON, null, 2)}</pre>
            </Paper>
          </Container>
        </Tabs.Panel>
      </Tabs>
    </>
  );
}

