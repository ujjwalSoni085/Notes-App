import { useState } from 'react';

const NoteCard = ({ note, onEdit, onDelete }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this note?')) return;
    setIsDeleting(true);
    try {
      await onDelete(note._id);
    } catch {
      setIsDeleting(false);
    }
  };

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const bodyPreview = note.body.length > 150 && !expanded
    ? note.body.substring(0, 150) + '...'
    : note.body;

  return (
    <div className={`note-card ${isDeleting ? 'note-card-deleting' : ''}`} id={`note-${note._id}`}>
      <div className="note-card-header">
        <h3 className="note-title">{note.title}</h3>
        <div className="note-actions">
          <button
            onClick={() => onEdit(note)}
            className="note-btn note-btn-edit"
            title="Edit note"
            id={`edit-${note._id}`}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
            </svg>
          </button>
          <button
            onClick={handleDelete}
            className="note-btn note-btn-delete"
            title="Delete note"
            disabled={isDeleting}
            id={`delete-${note._id}`}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="3 6 5 6 21 6" />
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
            </svg>
          </button>
        </div>
      </div>

      <p className="note-body" onClick={() => setExpanded(!expanded)}>
        {bodyPreview}
      </p>

      <div className="note-meta">
        <span className="note-date">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="meta-icon">
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
          {formatDate(note.updatedAt)}
        </span>
      </div>
    </div>
  );
};

export default NoteCard;
