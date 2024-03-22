import {
  Box,
  Button,
  Container,
  Group,
  Paper,
  ScrollArea,
  Title
} from '@mantine/core';
import { normalizeOperationOutcome } from '@medplum/core';
import { OperationOutcome } from '@medplum/fhirtypes';
import { ResourceForm, useMedplum } from '@rahulideas2it/fhir-sdc-lib-react';
import { IconCheck } from '@tabler/icons-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useSeedData from '../dump/useSeedData';
import './CreateResourceLayout.css';
import { showNotification } from '@mantine/notifications';
import { nprogress } from '@mantine/nprogress';

export default function CreateResourceLayout({
  title,
  newRoute,
  resourceName,
  customIgnoredProperties
}: any): JSX.Element {
  const medplum = useMedplum();
  const navigate = useNavigate();
  const [outcome, setOutcome] = useState<OperationOutcome | undefined>();
  const { seedStructureDefn, seedSearchParameter, seedValueSet } =
    useSeedData();

  const [seedItems] = useState<any>({
    structureDefn: true
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSubmit = (newResource: any): void => {
    if (resourceName === 'Questionnaire') {
      newResource.status = 'active';
    }
    if (setOutcome) {
      setOutcome(undefined);
    }
    nprogress.start();
    medplum
      .createResource(newResource)
      .then(() => {
        showNotification({ color: 'green', message: 'Resource Created' });
        nprogress.complete();
        navigate(newRoute);
      })
      .catch((err) => {
        if (setOutcome) {
          setOutcome(normalizeOperationOutcome(err));
        }
      });
  };

  const submitForm = () => {
    const resourceForm = document.getElementsByTagName('form')?.[0];
    resourceForm.requestSubmit();
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

          <Group gap={'xs'}>
            {!seedItems.structureDefn && (
              <Box>
                <Button
                  size="compact-lg"
                  onClick={seedStructureDefn}
                  variant="outline"
                >
                  Seed StructureDfn
                </Button>
              </Box>
            )}
            {!seedItems.structureDefn && (
              <Box>
                <Button
                  size="compact-lg"
                  onClick={seedSearchParameter}
                  variant="outline"
                >
                  Seed SearchParameter
                </Button>
              </Box>
            )}
            {!seedItems.structureDefn && (
              <Box>
                <Button
                  size="compact-lg"
                  onClick={seedValueSet}
                  variant="outline"
                >
                  Seed ValueSet
                </Button>
              </Box>
            )}
            <Box>
              <Button
                size="compact-lg"
                onClick={submitForm}
                variant="filled"
                leftSection={<IconCheck size={18} />}
              >
                Submit
              </Button>
            </Box>
          </Group>
        </Group>
        <ScrollArea h={'calc(100vh - 165px'} type="always">
          <Paper withBorder p="lg">
            <ResourceForm
              customIgnoredProperties={customIgnoredProperties}
              defaultValue={{ resourceType: resourceName }}
              onSubmit={handleSubmit}
              outcome={outcome}
            />
          </Paper>
        </ScrollArea>
      </Container>
    </>
  );
}

