import { Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard/Dashboard';
import PRList from './components/PRList/PRList';
import IssueList from './components/IssueList/IssueList';
import PRDetails from './components/PRDetails/PRDetails';
import IssueDetails from './components/IssueDetails/IssueDetails';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/pull-requests" element={<PRList />} />
      <Route path="/pull-requests/:id" element={<PRDetails />} />
      <Route path="/issues" element={<IssueList />} />
      <Route path="/issues/:id" element={<IssueDetails />} />
    </Routes>
  );
}

export default AppRoutes;
