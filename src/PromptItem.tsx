import React, { useState } from 'react';
import { Prompt } from './types';

interface PromptItemProps {
  prompt: Prompt;
  onDelete: (prompt: Prompt) => void;
  onUpdate: (prompt: Prompt) => void;
}

export const PromptItem: React.FC<PromptItemProps> = ({ prompt, onDelete, onUpdate }) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editedText, setEditedText] = useState<string>(prompt.text);

  const handleCopy = () => {
    navigator.clipboard.writeText(prompt.text).then(() => {
      alert("Prompt copied successfully!");
    });
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this prompt?")) {
      onDelete(prompt);
    }
  };

  const handleSave = () => {
    onUpdate({ ...prompt, text: editedText });
    setIsEditing(false);
  };

  return (
    <div className="prompt">
      <h3 className="prompt-title">{prompt.title}</h3>
      <div className="d-flex">
        <button className="btn secondary shadow" onClick={() => setIsExpanded(!isExpanded)}>
          {isExpanded ? 'Hide' : 'Show'}
        </button>
        <button className="btn success shadow" onClick={handleCopy}>Copy</button>
        <button className="btn danger shadow" onClick={handleDelete}>Delete</button>
      </div>
      {isExpanded && (
        <div className="prompt-content">
          {isEditing ? (
            <>
              <textarea
                className="prompt-form-textarea-edit"
                value={editedText}
                onChange={(e) => setEditedText(e.target.value)}
              />
              <button className="outline-button outline-primary shadow" onClick={handleSave}>Save</button>
              <button className="outline-button outline-accent shadow" onClick={() => setIsEditing(false)}>Cancel</button>
            </>
          ) : (
            <>
              <div>{prompt.text}</div>
              <button className="outline-button outline-primary shadow" onClick={() => setIsEditing(true)}>Edit</button>
            </>
          )}
          <span className="tags">{prompt.tags.join(', ')}</span>
        </div>
      )}
    </div>
  );
};