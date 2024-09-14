import React from 'react';

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