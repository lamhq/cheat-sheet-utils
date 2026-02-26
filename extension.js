const vscode = require('vscode');
const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	// run when clicking `Open file in browser` menu item in explorer context menu
	const disposable = vscode.commands.registerCommand('cs-utils.openInBrowser', async () => {
		// get active file
		const editor = vscode.window.activeTextEditor;
		if (!editor) {
			vscode.window.showErrorMessage('No active file open');
			return;
		}

		// determine workspace folder for the current document
		const workspaceFolder = vscode.workspace.getWorkspaceFolder(editor.document.uri);
		if (!workspaceFolder) {
			vscode.window.showErrorMessage('File is not inside a workspace folder');
			return;
		}

		// check markdown file
		const filePath = vscode.workspace.asRelativePath(editor.document.uri);
		if (!filePath.match(/\.mdx?$/)) {
			vscode.window.showErrorMessage('Only .md or .mdx files can be previewed');
			return;
		}

		// create Rspress config in the project workspace
		const projectRoot = workspaceFolder.uri.fsPath;
		const configFilePath = createConfigFile(projectRoot, filePath);

		// launch rspress with the generated config
		const command = `pnpm exec rspress dev -c ${configFilePath}`;
		vscode.window.showInformationMessage('Starting dev server...');
		const baseUrl = await startDevServer(command, projectRoot);

		// open the current file in the browser
		const url = getFileUrl(baseUrl, filePath);
		vscode.window.showInformationMessage('Open file in browser');
		vscode.env.openExternal(vscode.Uri.parse(url));
	});

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
function deactivate() {
	if (childProcess) {
		childProcess.kill();
	}
}

let childProcess; // keep reference to the child process to kill it on deactivate

// Start the dev server and return the base URL when it's ready
function startDevServer(command, cwd) {
	if (childProcess) {
		childProcess.kill();
	}

	return new Promise((resolve, reject) => {
		childProcess = spawn(command, { shell: true, cwd: cwd });

		let buffer = '';
		childProcess.stdout.on('data', (data) => {
			buffer += data.toString();
			console.log(buffer);

			// extract URL
			let url;
			let match = buffer.match(/https?:\/\/[^\s]+/);
			if (match) {
				url = match[0];
			}

			// return if server is ready
			match = buffer.match(/ready/);
			if (match) {
				resolve(url);
			}
		});

		childProcess.stderr.on('data', (data) => {
			childProcess.kill();
			console.error(`Error while starting dev server: ${data}`);
		});

		childProcess.on('close', (code) => {
			console.log(`Process exited with code ${code}`);
		});
	});
}

// Get file URL to open in browser from base URL and document relative path
function getFileUrl(baseUrl, relativePath) {
	const pathForUrl = relativePath.split('/').slice(1).join('/'); // remove docRoot from path
	return `${baseUrl}${pathForUrl.replace(/\.mdx?$/, '.html')}`;
}

// Create Rspress config file optimized for the current file
// by excluding all other sections in the same docRoot
function createConfigFile(projectRoot, documentPath) {
	const parts = documentPath.split('/');
	const docRoot = parts[0] || '';
	const section = parts[1] || '';
	const configPath = path.join('tmp', `${section}.config.ts`);
	const excludeDirs = fs.readdirSync(
		path.join(projectRoot, docRoot),
		{ withFileTypes: true }
	).filter(e => e.isDirectory() && e.name !== section)
		.map(e => path.join(e.name, '**'))
		.map(d => `'${d}'`)
		.join(',');
	const fileContent = `import { createConfig } from '../rspress.config';

export default createConfig({
route: {
	exclude: [${excludeDirs}],
},
});
`;

	const tmpDir = path.join(projectRoot, 'tmp');
	if (!fs.existsSync(tmpDir)) {
		fs.mkdirSync(tmpDir, { recursive: true });
	}

	fs.writeFileSync(path.join(projectRoot, configPath), fileContent, 'utf8');
	return configPath;
}

module.exports = {
	activate,
	deactivate
}
