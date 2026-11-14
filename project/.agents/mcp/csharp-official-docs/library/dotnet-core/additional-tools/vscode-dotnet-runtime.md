---
title: ".NET install tool for VS Code extension authors"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/additional-tools/vscode-dotnet-runtime.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# .NET install tool for extension authors

The .NET install tool for extension authors is a Visual Studio Code extension that allows acquisition of the .NET runtime specifically for VS Code extension authors. This tool is intended to be leveraged in extensions that are written in .NET and require .NET to boot pieces of the extension (for example, a language server). The extension is not intended to be used directly by users to install .NET for development.

## Getting started: extension authors

To ensure that the .NET install tool for extension authors is the right fit for your scenario, start by reviewing the goals of this extension on our GitHub page.

> **Note:**
> This tool can be used to install the .NET runtime only, it currently does not have the capability to install the .NET SDK.

Once you have verified that the .NET install tool for extension authors fits your needs, you can take a dependency on it in your extension manifest and begin using the commands we expose with the VS Code API. You can find the list of commands this extension exposes on our GitHub.

Check out this sample extension to see these steps in action.

For more examples, check out these open source extensions that currently leverage this tool:

- Azure Resource Manager (ARM) Tools for Visual Studio Code

- .NET Interactive Notebooks

## Getting started: end users

In general, the end user should not need to interact with the .NET install tool for extension authors at all. If you are having problems with the extension, check out our troubleshooting page or file an issue on our GitHub.
