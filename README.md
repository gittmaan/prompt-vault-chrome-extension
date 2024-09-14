# PromptVault

PromptVault is a React-based Chrome extension for managing and organizing prompts. It allows users to store, categorize, and easily access various prompts for different purposes such as studying, writing, coding, and more.

## Features

- Add, edit, and delete prompts
- Categorize prompts (Study, Writing, Coding, Art, Others)
- Tag prompts for easy searching
- Copy prompts to clipboard
- Filter prompts by category
- Export and import prompts as CSV

## Components

1. **Navbar**: Displays the title, status, and buttons for adding prompts and accessing settings.
2. **CategoryList**: Shows available categories and allows filtering prompts.
3. **PromptForm**: Form for adding new prompts or editing existing ones.
4. **PromptList**: Displays a list of prompts based on the selected category.
5. **PromptItem**: Individual prompt component with options to show/hide, copy, edit, and delete.
6. **SettingsDialog**: Dialog for accessing export and import functionalities.

## Usage

1. Click "Add Prompt" to create a new prompt.
2. Fill in the prompt details: title, text, category, and tags.
3. Save the prompt to add it to your collection.
4. Use the category pills to filter prompts by category.
5. Expand a prompt to view its full text, copy it, or edit/delete it.
6. Access the Settings dialog to export or import prompts as CSV.

## Installation

As this is a Chrome extension, you'll need to load it as an unpacked extension in Chrome:

1. Clone this repository.
2. Run `npm install` to install dependencies.
3. Build `npm run build` the project (command depends on your build setup).
4. Open Chrome and go to `chrome://extensions/`.
5. Enable "Developer mode" in the top right.
6. Click "Load unpacked" and select the build directory of your project.

## Development

This project uses React with TypeScript. Key dependencies include:

- `react` and `react-dom` for building the UI
- `lucide-react` for icons
- `use-chrome-storage` for interacting with Chrome's storage API

To start development:

1. Clone the repository
2. Run `npm install`
3. Use your preferred React development commands to start coding

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
