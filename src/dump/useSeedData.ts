import { useMedplum } from '@rahulideas2it/fhir-sdc-lib-react';
import getSeedStructureDefitions from './structureDefinition';
import getSearchParameter from './searchParamater';
import getValueSet from './valueSet';
import { getMockPatients } from './mockPatients';

const useSeedData = () => {
  const medplum = useMedplum();

  const seedDataToFHIR = (entries: any) => {
    entries.forEach((item: any) => {
      medplum.createResource(item).then((res) => res);
    });
  };

  const seedStructureDefn = () => {
    seedDataToFHIR(getSeedStructureDefitions());
  };

  const seedSearchParameter = () => {
    seedDataToFHIR(getSearchParameter());
  };
  const seedValueSet = () => {
    seedDataToFHIR(getValueSet());
  };
  const seedPatient = () => {
    const entries = getMockPatients();
    entries.forEach((newResource: any) => medplum.createResource(newResource));
  };
  return {
    seedStructureDefn,
    seedSearchParameter,
    seedValueSet,
    seedPatient
  };
};

export default useSeedData;

