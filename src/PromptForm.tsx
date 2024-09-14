import React, { useState } from 'react';
import { Prompt } from './types';

interface PromptFormProps {
  onSave: (prompt: Prompt) => void;
  onCancel: () => void;
}

export const PromptForm: React.FC<PromptFormProps> = ({ onSave, onCancel }) => {
  const [title, setTitle] = useState<string>('');
  const [text, setText] = useState<string>('');
  const [category, setCategory] = useState<string>('study');
  const [tags, setTags] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      title,
      text,
      category,
      tags: tags.split(',').map(tag => tag.trim()),
    });
  };

  return (
    <form id="prompt-form" onSubmit={handleSubmit}>
      <h2 className="text-center no-margin">Add Prompt</h2>
      <label htmlFor="prompt-title">Title:</label>
      <input
        type="text"
        id="prompt-title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="What is the prompt for?"
        required
      />
      <label htmlFor="prompt-text">Prompt:</label>
      <textarea
        className="prompt-form-textarea"
        id="prompt-text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter your prompt"
        required
      ></textarea>
      <label htmlFor="prompt-category">Category:</label>
      <select
        id="prompt-category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="study">Study</option>
        <option value="writing">Writing</option>
        <option value="coding">Coding</option>
        <option value="art">Art</option>
        <option value="others">Others</option>
      </select>
      <label htmlFor="prompt-tags">Tags (separate by commas):</label>
      <input
        type="text"
        id="prompt-tags"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
        placeholder="e.g., creative writing, fiction"
        required
      />
      <button type="submit" className="btn primary">Save</button>
      <button type="button" className="btn secondary" onClick={onCancel}>Cancel</button>
      <hr style={{ margin: '1em 0.5em', height: '2px' }} />
    </form>
  );
};