import React from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { Note } from '../pages/DashboardPage';

interface NoteCardProps {
  note: Note;
  onDelete: (id: number) => void;
  onEdit: (note: Note) => void;
}

const NoteCard: React.FC<NoteCardProps> = ({ note, onDelete, onEdit }) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'NOTE',
    item: { id: note.id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: 'NOTE',
    drop: (item: { id: number }) => {
      // Handle drop
    },
  });

  return (
    <div
      ref={(node) => drag(drop(node))}
      className={`card ${isDragging ? 'opacity-50' : ''}`}
      style={{ border: '1px solid #ddd', padding: '10px', marginBottom: '10px' }}
    >
      <h3>{note.title}</h3>
      <p>{note.content}</p>
      {note.image && <img src={note.image} alt={note.title} className="w-full h-32 object-cover mb-2" />}
      <button onClick={() => onEdit(note)}>Edit</button>
      <button onClick={() => onDelete(note.id)}>Delete</button>
    </div>
  );
};

export default NoteCard;
