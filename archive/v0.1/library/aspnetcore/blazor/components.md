---
title: "ASP.NET Core Razor components (part 1 of 6)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/blazor/components/index.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# ASP.NET Core Razor components

-->
-->

This article explains how to create and use Razor components in Blazor apps, including guidance on Razor syntax, component naming, namespaces, and component parameters.

## Razor components

Blazor apps are built using *Razor components*, informally known as *Blazor components* or only *components*. A component is a self-contained portion of user interface (UI) with processing logic to enable dynamic behavior. Components can be nested, reused, shared among projects, and used in MVC and Razor Pages apps.

Components render into an in-memory representation of the browser's Document Object Model (DOM) called a *render tree*, which is used to update the UI in a flexible and efficient way.

Although "Razor components" shares some naming with other ASP.NET Core content-rendering technologies, Razor components must be distinguished from the following different features in ASP.NET Core:

* Razor views, which are Razor-based markup pages for MVC apps.
* View components, which are for rendering chunks of content rather than whole responses in Razor Pages and MVC apps.

> **Important:**
> When using a Blazor Web App, most of the Blazor documentation example components ***require*** interactivity to function and demonstrate the concepts covered by the articles. *Interactivity* makes it possible for users to interact with rendered components. This includes app responses to Document Object Model (DOM) events and state changes tied to C# members via Blazor's event handlers and binding. When you test an example component provided by an article in a Blazor Web App, make sure that either the app adopts global interactivity or the component adopts an interactive render mode. More information on this subject is provided by ASP.NET Core Blazor render modes, which is the next article in the table of contents after this article.
