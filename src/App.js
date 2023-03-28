import { Route, Routes, useLocation } from 'react-router-dom';
import Dashboard from './components/Dashboard/Dashboard';
import PRList from './components/PRList/PRList';
import IssueList from './components/IssueList/IssueList';
import PRDetails from './components/PRDetails/PRDetails';
import IssueDetails from './components/IssueDetails/IssueDetails';

function App() {
  const location = useLocation();
  const prRecord = location.state?.prRecord;
  const issueRecord = location.state?.issueRecord;
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/pull-requests" element={<PRList />} />
      <Route path="/pull-requests/:id" element={<PRDetails prRecord={prRecord}/>} />
      <Route path="/issues" element={<IssueList />} />
      <Route path="/issues/:id" element={<IssueDetails issueRecord={issueRecord}/>} />
    </Routes>
  );
}

export default App;
