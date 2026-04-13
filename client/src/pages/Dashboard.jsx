import { useState, useEffect, useCallback } from 'react';
import API from '../api/axios';
import NoteCard from '../components/NoteCard';
import NoteForm from '../components/NoteForm';

const Dashboard = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editingNote, setEditingNote] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showForm, setShowForm] = useState(false);

  const fetchNotes = useCallback(async () => {
    try {
      setError('');
      const res = await API.get('/notes');
      setNotes(res.data);
    } catch (err) {
      setError('Failed to load notes');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

  const handleCreateOrUpdate = async (noteData) => {
    if (editingNote) {
      const res = await API.put(`/notes/${editingNote._id}`, noteData);
      setNotes((prev) =>
        prev.map((n) => (n._id === editingNote._id ? res.data : n))
      );
      setEditingNote(null);
    } else {
      const res = await API.post('/notes', noteData);
      setNotes((prev) => [res.data, ...prev]);
    }
    setShowForm(false);
  };

  const handleDelete = async (id) => {
    await API.delete(`/notes/${id}`);
    setNotes((prev) => prev.filter((n) => n._id !== id));
  };

  const handleEdit = (note) => {
    setEditingNote(note);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
    setEditingNote(null);
    setShowForm(false);
  };

  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.body.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="spinner"></div>
        <p>Loading your notes...</p>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div className="dashboard-title-section">
          <h1 className="dashboard-title">My Notes</h1>
          <span className="notes-count">{notes.length} note{notes.length !== 1 ? 's' : ''}</span>
        </div>

        <div className="dashboard-actions">
          <div className="search-wrapper">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="search-icon">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="text"
              className="search-input"
              placeholder="Search notes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              id="search-notes"
            />
          </div>

          {!showForm && (
            <button
              onClick={() => { setEditingNote(null); setShowForm(true); }}
              className="btn btn-primary"
              id="new-note-btn"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="btn-icon">
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
              New Note
            </button>
          )}
        </div>
      </div>

      {error && (
        <div className="form-error">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="error-icon">
            <circle cx="12" cy="12" r="10" />
            <line x1="15" y1="9" x2="9" y2="15" />
            <line x1="9" y1="9" x2="15" y2="15" />
          </svg>
          {error}
          <button onClick={fetchNotes} className="btn btn-ghost btn-sm">Retry</button>
        </div>
      )}

      {showForm && (
        <div className="form-container">
          <NoteForm
            onSubmit={handleCreateOrUpdate}
            editingNote={editingNote}
            onCancel={handleCancelEdit}
          />
        </div>
      )}

      {filteredNotes.length === 0 ? (
        <div className="empty-state">
          {searchQuery ? (
            <>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="empty-icon">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <h2>No matching notes</h2>
              <p>Try a different search term</p>
            </>
          ) : notes.length === 0 ? (
            <>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="empty-icon">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="12" y1="18" x2="12" y2="12" />
                <line x1="9" y1="15" x2="15" y2="15" />
              </svg>
              <h2>No notes yet</h2>
              <p>Create your first note to get started!</p>
              {!showForm && (
                <button
                  onClick={() => setShowForm(true)}
                  className="btn btn-primary"
                  id="create-first-note-btn"
                >
                  Create Your First Note
                </button>
              )}
            </>
          ) : null}
        </div>
      ) : (
        <div className="notes-grid">
          {filteredNotes.map((note) => (
            <NoteCard
              key={note._id}
              note={note}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
