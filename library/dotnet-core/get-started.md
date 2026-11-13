---
title: "Get started with .NET"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/get-started.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Get started with .NET

This tutorial teaches you how to create and run your first .NET app using file-based apps. You write a simple app and see the results of running your code.

In this tutorial, you:

>
> * Launch a GitHub Codespace with a .NET development environment.
> * Create your first .NET app.
> * Run your app.

## Prerequisites

You must have one of the following options:

- A GitHub account to use GitHub Codespaces. If you don't already have one, you can create a free account at GitHub.com.
- A computer with the following tools installed:
  - The .NET 10 SDK.
  - Visual Studio Code.
  - The C# DevKit.

## Open Codespaces

To start a GitHub Codespace with the tutorial environment, open a browser window to the tutorial codespace repository. Select the green **Code** button, and the **Codespaces** tab. Then select the `+` sign to create a new Codespace using this environment.

## Create and run your first app

1. When your codespace loads, create a new file in the `tutorials` folder named `hello-world.cs`.
1. Open your new file.
1. Type or copy the following code into `hello-world.cs`:

```csharp
Console.WriteLine("Hello, World!");
```
1. In the integrated terminal window, make the `tutorials` folder the current folder, and run your app:

   ```dotnetcli
   cd tutorials
   dotnet hello-world.cs
   ```

You ran your first .NET app. It's a simple app that prints the message "Hello, World!" It uses the `System.Console.WriteLine*` method to print that message. `Console` is a type that represents the console window. `WriteLine` is a method of the `Console` type that prints a line of text to that text console.

Congratulations! You created a simple .NET application.

## Understand the code

The app consists of a single line of C# code:

```csharp
Console.WriteLine("Hello, World!");
```

Breaking down each part:

- `Console` is a built-in .NET type that provides functionality for working with the console.
- `WriteLine` is a method of `Console` that writes text followed by a new line.
- `"Hello, World!"` is a string literal, a sequence of characters enclosed in double quotation marks. The text inside the string is what gets displayed in the console.
- The semicolon (`;`) marks the end of a statement in C#.

## How file-based apps work

When you run the following command:

```dotnetcli
dotnet hello-world.cs
```

The .NET SDK automatically compiles the `.cs` file and runs the resulting app in one step. You don't need a project file (`.csproj`) or any extra setup.

File-based apps are useful for learning, experimenting, and writing small utilities. As your applications grow, you'll typically use project-based apps to organize code, dependencies, and configuration.

## Cleanup resources

GitHub automatically deletes your Codespace after 30 days of inactivity. If you plan to continue with .NET tutorials, you can leave your Codespace provisioned. If you're ready to download the .NET SDK to your computer, you can delete your Codespace. To delete your Codespace, open a browser window and navigate to your Codespaces. You should see a list of your codespaces in the window. Select the three dots (`...`) in the entry for the tutorial codespace and select **delete**.

## Next steps

Get started developing .NET applications by following a step-by-step tutorial or by watching .NET 101 videos on YouTube.
