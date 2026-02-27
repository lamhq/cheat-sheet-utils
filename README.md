# Cheat Sheet Utils

## Overview

Cheat Sheet Utils is a VS Code extension that assists with local development of the [Cheat Sheet](https://github.com/lamhq/cheat-sheet) project.

It allows you to preview Markdown files in your browser without manually running commands or starting a development server.

## Prerequisites

Before using the extension, make sure:

- Node.js and `pnpm` are installed and available in your PATH.
- The Cheat Sheet project has been installed with `pnpm install`.

## Usage

1. [Package](#package-and-publish) this extension into a `.vsix` file.
2. Open the Cheat Sheet project in VS Code and install the `.vsix` file.
3. Open the Markdown file you want to preview, then right-click in the editor area and choose **Open file in browser**.
4. The extension will start the development server and open the file in your browser when the server is ready.

## Code Structure

What's in this folder?

- `package.json` – The manifest file where you declare your extension, commands, menu items, etc.
- `extension.js` – The main file where you implement your extension's command.


## Develop the Extension

1. Press `F5` to open a new window with your extension loaded.
2. Run your command from the command palette by pressing (`Ctrl+Shift+P` or `Cmd+Shift+P` on Mac) and typing `Open file in browser`.
3. Set breakpoints in your code inside `extension.js` to debug your extension.
4. View output from your extension in the debug console.
5. You can relaunch the extension from the debug toolbar after making changes to `extension.js`.


## Package and Publish

Install [vsce](https://github.com/microsoft/vscode-vsce):

```bash
pnpm install -g @vscode/vsce
```

Use vsce to package the extension:

```bash
vsce package
```

Or publish it to the marketplace:

```bash
vsce publish
```


## Known Issues

- The dev server port is dynamic, so the preview URL is not fixed.
- Starting previews in quick succession will terminate earlier servers; only the latest server remains active.
- Temporary configs accumulate in `tmp/` (add to `.gitignore` or delete manually).


## For more information

- [Create VS Code Extensions](https://code.visualstudio.com/api/get-started/your-first-extension)
- [Publishing Extensions](https://code.visualstudio.com/api/working-with-extensions/publishing-extension)
