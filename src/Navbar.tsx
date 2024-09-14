import React from 'react';
import { Settings } from 'lucide-react';

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