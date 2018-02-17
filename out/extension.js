'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const restify = require("restify");
const server = restify.createServer();
const PORT = 4567;
server.use(restify.plugins.queryParser());
server.listen(PORT, () => {
    console.log(`Extension server online on port ${PORT}`);
});
server.get('/', restify.plugins.serveStatic({
    'directory': `${__dirname}/html`,
    'default': 'index.html'
}));
function activate(context) {
    context.subscriptions.push(vscode.workspace.registerTextDocumentContentProvider('hw', hwContent));
    let disposable = vscode.commands.registerCommand('extension.sayHello', () => {
        vscode.commands.executeCommand('vscode.previewHtml', 'hw://helloWorld', vscode.ViewColumn.Two, 'Hello World');
    });
    context.subscriptions.push(disposable);
}
exports.activate = activate;
const hwContent = {
    htmlContent: () => {
        return `
        <!doctype html>
        <html>
            <meta charset="utf-8"/>
            <head>
                <style>
                    html,body {
                        background-color: white;
                        width: 100%;
                        height: 100%;
                        margin: 0 0 0 0;
                        padding: 0 0 0 0;
                        overflow: hidden;
                    }
                    iframe {
                        width: 100%;
                        height: 100%;
                    }
                </style>
            </head>
            <body>
                <iframe seamless="seamless" src="http://localhost:4567"></iframe>
            </body>
        </html>`;
    },
    provideTextDocumentContent(uri, cancellationToken) {
        return this.htmlContent();
    }
};
//# sourceMappingURL=extension.js.map