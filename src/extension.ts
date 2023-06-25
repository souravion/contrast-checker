import * as vscode from 'vscode';
import * as path from 'path';

export function activate(context: vscode.ExtensionContext) {
    console.log('Congratulations, your extension "contrast-checker" is now active!');


    // Register a command to open the form panel
    context.subscriptions.push(
        vscode.commands.registerCommand('contrast-checker.helloWorld', () => {
            showFormPanel(context);
        })
    );
}

function showFormPanel(context: vscode.ExtensionContext) {
    // Create and show the webview panel for the form
    const panel = vscode.window.createWebviewPanel(
        'pull-request-management', // Unique identifier for the panel
        'Form Panel', // Title displayed in the panel's title bar
        vscode.ViewColumn.One, // Column in which the panel should appear
        {
            enableScripts: true, // Enable JavaScript execution in the webview
			retainContextWhenHidden: true 
        }
    );

    // Get the path to the webview HTML file for the form
    const htmlPath = vscode.Uri.file(
        path.join(context.extensionPath, 'html/contrast-checker.html')
    );

    //Read the HTML file contents for the form
    vscode.workspace.fs.readFile(htmlPath).then((content) => {
        // Convert the content to a string
        const htmlString = content.toString();

        // Set the webview HTML content for the form
        panel.webview.html = htmlString;
    });
}

export function deactivate() {}
