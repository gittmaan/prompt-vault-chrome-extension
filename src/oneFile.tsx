import React, { useState, useCallback } from 'react';
import { Settings } from 'lucide-react';
import { useChromeStorageLocal } from 'use-chrome-storage';

interface CategoryListProps {
  categories: string[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

export const CategoryList: React.FC<CategoryListProps> = ({ categories, selectedCategory, onSelectCategory }) => (
  <div id="category-list">
    {categories.map((category) => (
      <span
        key={category}
        className="category-pill"
        style={{
          backgroundColor: selectedCategory === category ? '#8f369b' : '',
          color: selectedCategory === category ? 'white' : '',
        }}
        onClick={() => onSelectCategory(category)}
      >
        {category}
      </span>
    ))}
  </div>
);

interface NavbarProps {
  onAddPrompt: () => void;
  onOpenSettings: () => void;
  status: string;
  showPromptForm: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ onAddPrompt, onOpenSettings, status, showPromptForm }) => (
  <div className="navbar d-flex">
    <div className="title d-flex">
      <div style={{ fontWeight: 'bold' }}>PromptVault</div>
    </div>
    <div id="status">{status}</div>
    <div className="d-flex">
      <div className="add-prompt">
        <button className="btn primary" onClick={onAddPrompt}>
          {showPromptForm ? 'Close Form' : 'Add Prompt'}
        </button>
      </div>
      <div className="settings-icon">
        <button id="settings-button" onClick={onOpenSettings}>
          <Settings />
        </button>
      </div>
    </div>
  </div>
);

export interface Prompt {
  title: string;
  text: string;
  category: string;
  tags: string[];
}

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

interface PromptListProps {
  prompts: Prompt[];
  category: string;
  onDelete: (prompt: Prompt) => void;
  onUpdate: (prompt: Prompt) => void;
}

export const PromptList: React.FC<PromptListProps> = ({ prompts, category, onDelete, onUpdate }) => {
  const filteredPrompts = category === 'all'
    ? prompts
    : prompts.filter(prompt => prompt.category.trim() === category);

  return (
    <div id="prompt-list">
      {filteredPrompts.length === 0 ? (
        <div className="text-center my-4 prompt">No prompt to show</div>
      ) : (
        filteredPrompts.map(prompt => (
          <PromptItem
            key={prompt.title}
            prompt={prompt}
            onDelete={onDelete}
            onUpdate={onUpdate}
          />
        ))
      )}
    </div>
  );
};

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

export interface Prompt {
  title: string;
  text: string;
  category: string;
  tags: string[];
}

export const PromptVault: React.FC = () => {
  const [prompts, setPrompts, isPersistent, error, isInitialStateResolved] = useChromeStorageLocal<Prompt[]>('prompts', []);
  const [showPromptForm, setShowPromptForm] = useState<boolean>(false);
  const [showSettingsDialog, setShowSettingsDialog] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [status, setStatus] = useState<string>('');

  const categories: string[] = ["all", "art", "coding", "others", "study", "writing"];

  React.useEffect(() => {
    if (isInitialStateResolved) {
      if (prompts.length > 0) {
        setStatus("Prompts loaded successfully");
      } else {
        setStatus("No prompts found");
      }
    } else {
      setStatus("Loading prompts...");
    }
  }, [isInitialStateResolved, prompts]);

  React.useEffect(() => {
    if (!isPersistent) {
      setStatus(`Error: ${error}`);
    }
  }, [isPersistent, error]);

  const saveContent = useCallback((newContent: Prompt) => {
    setPrompts(prevPrompts => [...prevPrompts, newContent]);
    setStatus("Prompt saved successfully");
  }, [setPrompts]);

  const handleDeletePrompt = useCallback((promptToDelete: Prompt) => {
    setPrompts(prevPrompts => prevPrompts.filter(p => p.title !== promptToDelete.title));
    setStatus("Prompt deleted successfully");
  }, [setPrompts]);

  const handleUpdatePrompt = useCallback((updatedPrompt: Prompt) => {
    setPrompts(prevPrompts => prevPrompts.map(p =>
      p.title === updatedPrompt.title ? updatedPrompt : p
    ));
    setStatus("Prompt updated successfully");
  }, [setPrompts]);

  const handleAddPromptClick = useCallback(() => {
    setShowPromptForm(true);
  }, []);

  const handleFormClose = useCallback(() => {
    setShowPromptForm(false);
  }, []);

  if (!isInitialStateResolved) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Navbar
        onAddPrompt={handleAddPromptClick}
        onOpenSettings={() => setShowSettingsDialog(true)}
        status={status}
        showPromptForm={showPromptForm}
      />
      <hr style={{ margin: '0.2em 0.5em 1.5em 0.5em', height: '2px' }} />

      {showPromptForm && (
        <PromptForm
          onSave={(prompt: Prompt) => {
            saveContent(prompt);
            handleFormClose();
          }}
          onCancel={handleFormClose}
        />
      )}

      <CategoryList
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      <PromptList
        prompts={prompts}
        category={selectedCategory}
        onDelete={handleDeletePrompt}
        onUpdate={handleUpdatePrompt}
      />

      {showSettingsDialog && (
        <SettingsDialog onClose={() => setShowSettingsDialog(false)} />
      )}

      {!isPersistent && <div>Error writing to chrome.storage: {error}</div>}
    </div>
  );
};

interface SettingsDialogProps {
  onClose: () => void;
}

export const SettingsDialog: React.FC<SettingsDialogProps> = ({ onClose }) => (
  <dialog className="dialog-menu" open style={{ position: 'relative' }}>
    <button
      className="outline-button outline-warning shadow"
      style={{ position: 'absolute', right: '10px', top: '10px' }}
      onClick={onClose}
    >
      X
    </button>
    <h2 className="text-center">Settings</h2>
    <div className="button-layout">
      <button className="btn primary shadow custom-button" id="exportButton">
        Export Prompts to CSV
      </button>
      <button className="btn secondary shadow custom-button" id="importButton">
        Import Prompts from CSV
      </button>
    </div>
  </dialog>
);
