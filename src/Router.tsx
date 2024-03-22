import { Navigate, Route, Routes } from 'react-router-dom';
import Patients from './pages/Patients';
import CreatePatient from './pages/CreatePatient';
import Surveys from './pages/Surveys';
import CreateSurveys from './pages/CreateSurveys';
import SurveyBuilder from './pages/SurveryBuilder';
import FormPage from './pages/FormPage';

export default function Router(): JSX.Element {
  return (
    <Routes>
      <Route index element={<Navigate replace to="/patients" />} />
      <Route path="/patients" element={<Patients />} />
      <Route path="/patient/new" element={<CreatePatient />} />
      <Route path="/surveys" element={<Surveys />} />
      <Route path="/surveys/new" element={<CreateSurveys />} />
      <Route path="/surveys/:questionnaireID" element={<SurveyBuilder />} />
      <Route path="/forms/:questionnaireID" element={<FormPage />} />
    </Routes>
  );
}

