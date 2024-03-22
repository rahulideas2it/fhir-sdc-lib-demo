import { Box, Button, Container, Group, Title } from '@mantine/core';
import { nprogress } from '@mantine/nprogress';
import { useMedplum } from '@rahulideas2it/fhir-sdc-lib-react';
import { IconPlus } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PatientTable from '../components/Table/PatientTable';
import QuestionnaireTable from '../components/Table/QuestionnaireTable';
import useSeedData from '../dump/useSeedData';
import { showNotification } from '@mantine/notifications';

export default function TableLayout({
  title,
  resourceName,
  newRoute
}: any): JSX.Element {
  const navigate = useNavigate();
  const { seedPatient } = useSeedData();
  const medplum = useMedplum();
  const [resources, setResources] = useState<any>();

  const fetchResource = () => {
    nprogress.start();
    medplum
      .search(resourceName, '', { cache: 'reload' })
      .then((result: any) => {
        setResources(result?.entry || []);
        nprogress.complete();
      });
  };

  useEffect(() => {
    fetchResource();
  }, []);

  const deleteResourceById = (id: any) => {
    medplum.deleteResource(resourceName, id).then(() => {
      showNotification({ color: 'green', message: 'Success' });
      fetchResource();
    });
  };

  return (
    <>
      <Container size={'xl'}>
        <Group justify="space-between" align="center" mt={6} mb={28}>
          <Box>
            <Title c="gray" order={2}>
              {title}
            </Title>
          </Box>
          <Group>
            {resourceName === 'Patient' && resources?.length < 5 && (
              <Box>
                <Button
                  size="compact-lg"
                  onClick={seedPatient}
                  variant="outline"
                >
                  Seed Patient
                </Button>
              </Box>
            )}
            <Box>
              <Button
                size="compact-lg"
                onClick={() => navigate(newRoute)}
                variant="filled"
                leftSection={<IconPlus size={16} />}
              >
                Create
              </Button>
            </Box>
          </Group>
        </Group>

        {resourceName === 'Patient' && (
          <PatientTable
            resources={resources}
            deleteResourceById={deleteResourceById}
          />
        )}
        {resourceName === 'Questionnaire' && (
          <QuestionnaireTable
            resources={resources}
            deleteResourceById={deleteResourceById}
          />
        )}
      </Container>
    </>
  );
}

