---
title: "mcp-server-template"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/release-notes/aspnetcore-11/includes/mcp-server-template.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# mcp-server-template

### MCP Server template ships with the .NET SDK

The Model Context Protocol (MCP) is an open standard that AI applications and agents, such as those in Visual Studio, Visual Studio Code, and GitHub Copilot, use to discover and call external tools, data, and services through a consistent interface. An *MCP server* exposes your own functionality, such as custom tools or access to a data source, so an AI host can invoke it on the user's behalf.

Use the `mcpserver` template when you want to build a C# MCP server that integrates your code or services with AI-powered tools. The generated project uses the official C# SDK for MCP and includes a working sample tool, so you have a runnable starting point to extend with your own tools.

The `mcpserver` project template, previously available only by installing `Microsoft.McpServer.ProjectTemplates`, now ships as a bundled template in the .NET SDK:

```dotnetcli
dotnet new mcpserver -o MyMcpServer
```

Moving the template into ASP.NET Core makes it discoverable from `dotnet new list` without a separate install step, and aligns its servicing with the rest of the web stack.

For more information, see Build a Model Context Protocol (MCP) server in C#.
