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
1. Load the Cheat Sheet project in VS Code and install the `.vsix` file.
2. Open the file you want to preview, then right-click the editor area and choose **Open file in browser**.
3. The extension will start the dev server, and open the file in the browser when the server is ready.


## Known Issues

- The port of dev server is dynamic, so the URL of the preview is not fixed.
- Starting previews quickly kills earlier servers; only the latest remains.
- Temp configs accumulate in `tmp/` (add to `.gitignore` or delete manually).


## For more information

- [Create VS Code Extensions](https://code.visualstudio.com/api/get-started/your-first-extension)
- [Publishing Extensions](https://code.visualstudio.com/api/working-with-extensions/publishing-extension)
