import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import { DragDropContext } from 'react-beautiful-dnd';
const App: React.FC = () => {
  const [user, setUser] = React.useState<string | null>(null);
  const notes = [
    { id: '1', title: 'Note 1', content: 'This is the first note' },
    { id: '2', title: 'Note 2', content: 'This is the second note' },
  ];

  const onDragEnd = (result: any) => {
    const { destination, source } = result;
    if (!destination) {
      return; // Dropped outside
    }

    // Handle reordering logic (optional)
    const reorderedNotes = [...notes];
    const [removed] = reorderedNotes.splice(source.index, 1);
    reorderedNotes.splice(destination.index, 0, removed);

    // Update the state with the reordered notes (if applicable)
    // setNotes(reorderedNotes);
  };
  return (
    <Router>
            <DragDropContext onDragEnd={onDragEnd}>
      <Routes>
        <Route path="/" element={<Navigate to={user ? '/dashboard' : '/login'} />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage setUser={setUser} />} />
        <Route
          path="/dashboard"
          element={user ? <DashboardPage user={user} /> : <Navigate to="/login" />}
        />
      </Routes>
      </DragDropContext>
    </Router>
  );
};

export default App;
