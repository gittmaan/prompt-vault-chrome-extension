import React from 'react';
import { PromptItem } from './PromptItem';
import { Prompt } from './types';

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