import React, { useState, useCallback, useEffect } from 'react';
import { useChromeStorageLocal } from 'use-chrome-storage';
import { CategoryList } from './CategoryList';
import { Navbar } from './Navbar';
import { PromptForm } from './PromptForm';
import { PromptList } from './PromptList';
import { SettingsDialog } from './SettingsDialog';
import { Prompt } from './types';

export const PromptVault: React.FC = () => {
  const [prompts, setPrompts, isPersistent, error, isInitialStateResolved] = useChromeStorageLocal<Prompt[]>('prompts', []);
  const [showPromptForm, setShowPromptForm] = useState<boolean>(false);
  const [showSettingsDialog, setShowSettingsDialog] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [status, setStatus] = useState<string>('');

  const categories: string[] = ["all", "art", "coding", "others", "study", "writing"];

  useEffect(() => {
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

  useEffect(() => {
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