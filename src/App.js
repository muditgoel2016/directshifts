import { Route, Routes } from 'react-router-dom';
import DashboardPage from './pages/DashboardPage';
import PullRequestListPage from './pages/PullRequestListPage';
import IssueListPage from './pages/IssueListPage';
import PullRequestDetailsPage from './pages/PullRequestDetailsPage';
import IssueDetailsPage from './pages/IssueDetailsPage';

function App() {

    return (
        <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/pull-request" element={<PullRequestListPage />} />
            <Route path="/pull-request/:id" element={<PullRequestDetailsPage />} />
            <Route path="/issue" element={<IssueListPage />} />
            <Route path="/issue/:id" element={<IssueDetailsPage />} />
        </Routes>
    );
}

export default App;
