import React, { useState, useEffect } from 'react';
import { Button, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
import NoteCard from '../components/NoteCard';
import NoteForm from '../components/NoteForm';
import { getNotes, createNote, deleteNote, updateNote } from '../services/api';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

interface DashboardPageProps {
  user: string;
}

export interface Note {
  id: number;
  title: string;
  content: string;
  image: string;
}

const DashboardPage: React.FC<DashboardPageProps> = ({ user }) => {
  const navigate = useNavigate();
  const [notes, setNotes] = useState<Note[]>([]);
  const [editingNote, setEditingNote] = useState<Note | null>(null);

  const fetchNotes = async () => {
    try {
      const response = await getNotes();
      setNotes(response.data || []);
    } catch (error) {
      console.error('Failed to fetch notes:', error);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const handleAddNote = async (note: { title: string; content: string; image: string }) => {
    try {
      const response = await createNote(note);
      if (response.id) {
        setNotes((prevNotes) => [...prevNotes, response]);
      } else {
        console.error('Failed to create note: Invalid response data');
      }
    } catch (error) {
      console.error('Failed to create note:', error);
    }
  };

  const handleDeleteNote = async (id: number) => {
    try {
      await deleteNote(id);
      setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
    } catch (error) {
      console.error('Failed to delete note:', error);
    }
  };

  const handleEditNote = (note: Note) => {
    if (!note?.id) {
      console.error('Note ID is undefined.');
      return;
    }
    setEditingNote(note);
  };

  const handleSaveNote = async (note: { title: string; content: string; image: string }) => {
    if (editingNote) {
      if (editingNote.id === 0) {
        // Adding a new note
        try {
          const response = await createNote(note);
          if (response?.id) {
            setNotes((prevNotes) => [...prevNotes, response]); // Add the new note to the list
          } else {
            console.error('Failed to add note: Invalid response from the API');
          }
        } catch (error) {
          console.error('Failed to create note:', error);
        }
      } else {
        try {
          const response = await updateNote(editingNote.id, note);
          if (response) {
            setNotes((prevNotes) =>
              prevNotes.map((n) => (n.id === editingNote.id ? { ...n, ...note } : n))
            ); // Update the note in the list
          } else {
            console.error('Failed to update note: Invalid response from the API');
          }
        } catch (error) {
          console.error('Failed to update note:', error);
        }
      }
      setEditingNote(null); // Clear the editing state
    }
   else {
      await handleAddNote(note);
    }
  };

  const handleLogout = () => {
    navigate('/login');
  };
console.log(notes,"notes")
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="p-6 bg-gray-100 min-h-screen">
        <div className="flex justify-between items-center mb-6">
          <Typography.Title level={2} className="mb-0">
            Notes Dashboard
          </Typography.Title>
          <Button type="primary" onClick={handleLogout}>
            Logout
          </Button>
        </div>

        <Button
          type="primary"
          onClick={() => setEditingNote({ id: 0, title: '', content: '', image: '' })}
          className="mb-4"
        >
          + Add Note
        </Button>

        {editingNote && (
          <div className="mb-6">
            <NoteForm
              initialNote={editingNote}
              onSave={handleSaveNote}
              // onCancel={() => setEditingNote(null)} // Cancel editing
            />
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {notes.length > 0 ? (
            notes.map((note) => (
              <NoteCard
                key={note.id}
                note={note}
                onDelete={handleDeleteNote}
                onEdit={handleEditNote}
              />
            ))
          ) : (
            <Typography.Text type="secondary">No notes available.</Typography.Text>
          )}
        </div>
      </div>
    </DndProvider>
  );
};

export default DashboardPage;
