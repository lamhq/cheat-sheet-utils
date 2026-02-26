# Cheat Sheet Utils

## Overview

Cheat Sheet Utils is a tool for local development with [Cheat Sheet](https://github.com/lamhq/cheat-sheet) project.

It helps to preview Markdown files in the browser without running any commands manually to spin up a dev server.

## Prerequisites

Before using the extension make sure:

- Node.js and `pnpm` are installed and available in PATH.
- Cheat Sheet project is installed with `pnpm install`.

## Usage

2. Package this extension into a `.vsix` file.
1. Open Cheat Sheet project in VS Code and install the `.vsix` file.
2. Open the file you want to preview, then right-click the editor area and choose **Open file in browser**.
3. The extension will start the dev server, and open the file in the browser when the server is ready.

## Code structure

What's in the folder?

- `package.json` - this is the manifest file in which you declare your extension and command, adding menu item, etc.
- `extension.js` - this is the main file where you will provide the implementation of your command.


## Develop the extension

1. Press `F5` to open a new window with your extension loaded.
2. Run your command from the command palette by pressing (`Ctrl+Shift+P` or `Cmd+Shift+P` on Mac) and typing `Open file in browser`.
3. Set breakpoints in your code inside `extension.js` to debug your extension.
4. Find output from your extension in the debug console.
5. You can relaunch the extension from the debug toolbar after changing code in `extension.js`.


## Package and publish

Install [vsce](https://github.com/microsoft/vscode-vsce):
```bash
pnpm install -g @vscode/vsce
```

Use vsce to package the extension:
```bash
vsce package
```

Or even publish it to the marketplace:
```bash
vsce publish
```


## Known Issues

- The port of dev server is dynamic, so the URL of the preview is not fixed.
- Starting previews quickly kills earlier servers; only the latest remains.
- Temp configs accumulate in `tmp/` (add to `.gitignore` or delete manually).


## For more information

- [Create VS Code Extensions](https://code.visualstudio.com/api/get-started/your-first-extension)
- [Publishing Extensions](https://code.visualstudio.com/api/working-with-extensions/publishing-extension)
