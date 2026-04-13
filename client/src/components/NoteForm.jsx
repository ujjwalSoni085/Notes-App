import { useState, useEffect, useRef } from 'react';

const NoteForm = ({ onSubmit, editingNote, onCancel }) => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const titleRef = useRef(null);

  useEffect(() => {
    if (editingNote) {
      setTitle(editingNote.title);
      setBody(editingNote.body);
    } else {
      setTitle('');
      setBody('');
    }
    setError('');
    titleRef.current?.focus();
  }, [editingNote]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!title.trim()) {
      setError('Title is required');
      return;
    }
    if (!body.trim()) {
      setError('Body is required');
      return;
    }

    setLoading(true);
    try {
      await onSubmit({ title: title.trim(), body: body.trim() });
      setTitle('');
      setBody('');
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="note-form" onSubmit={handleSubmit} id="note-form">
      <div className="note-form-header">
        <h2 className="note-form-title">
          {editingNote ? (
            <>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="form-icon">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
              </svg>
              Edit Note
            </>
          ) : (
            <>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="form-icon">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="16" />
                <line x1="8" y1="12" x2="16" y2="12" />
              </svg>
              Create Note
            </>
          )}
        </h2>
      </div>

      {error && (
        <div className="form-error">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="error-icon">
            <circle cx="12" cy="12" r="10" />
            <line x1="15" y1="9" x2="9" y2="15" />
            <line x1="9" y1="9" x2="15" y2="15" />
          </svg>
          {error}
        </div>
      )}

      <div className="form-group">
        <label htmlFor="note-title" className="form-label">Title</label>
        <input
          ref={titleRef}
          id="note-title"
          type="text"
          className="form-input"
          placeholder="Enter note title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          maxLength={200}
          disabled={loading}
        />
      </div>

      <div className="form-group">
        <label htmlFor="note-body" className="form-label">Body</label>
        <textarea
          id="note-body"
          className="form-textarea"
          placeholder="Write your note content..."
          value={body}
          onChange={(e) => setBody(e.target.value)}
          rows={5}
          disabled={loading}
        />
      </div>

      <div className="form-actions">
        {editingNote && (
          <button
            type="button"
            onClick={onCancel}
            className="btn btn-ghost"
            disabled={loading}
            id="cancel-edit-btn"
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          className="btn btn-primary"
          disabled={loading}
          id="submit-note-btn"
        >
          {loading ? (
            <span className="btn-loading">
              <span className="spinner-small"></span>
              Saving...
            </span>
          ) : editingNote ? (
            'Update Note'
          ) : (
            'Create Note'
          )}
        </button>
      </div>
    </form>
  );
};

export default NoteForm;
