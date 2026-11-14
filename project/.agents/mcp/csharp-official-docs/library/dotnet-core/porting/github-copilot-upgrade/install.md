---
title: "Install GitHub Copilot upgrade"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/porting/github-copilot-upgrade/install.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Install GitHub Copilot upgrade

GitHub Copilot upgrade works across multiple development environments. Choose your preferred environment to install and set up the agent. Technology support and prerequisites can vary by environment.

**visualstudio:**

## Prerequisites

Before you install, make sure you have:

- Windows operating system.
- Visual Studio 2026 (or Visual Studio 2022 version 17.14.17+).
- .NET desktop development workload with these optional components enabled: **GitHub Copilot**, **GitHub Copilot app modernization**.
- GitHub Copilot subscription (paid or free).
- Sign in to Visual Studio with a GitHub account that has Copilot access.
- Code written in C# or Visual Basic.

## Install

Visual Studio includes GitHub Copilot upgrade through the **GitHub Copilot app modernization** optional component, so you don't need to install it separately. Enable the **GitHub Copilot** and **GitHub Copilot app modernization** optional components in the **.NET desktop development** workload through the Visual Studio Installer.

## Verify the installation

1. Open a solution in Visual Studio.
1. Right-click a project in **Solution Explorer** and select **Modernize**, or open **GitHub Copilot Chat** and type `@Modernize`.

**vscode:**

## Prerequisites

Before you install, make sure you have:

- Visual Studio Code.
- GitHub Copilot extension installed.
- GitHub Copilot subscription (paid or free).

## Install

Install as a Visual Studio Code extension:

1. In Visual Studio Code, open the **Extensions** view (`Ctrl+Shift+X`).
1. Search for **GitHub Copilot upgrade**.
1. Select **Install**.

The extension registers the available upgrade tools and adds the agent to Copilot Chat as `Upgrade`. For .NET projects, the extension also acquires the .NET SDK if it's missing.

## Verify the installation

1. Open a project in Visual Studio Code.
1. Open the **GitHub Copilot Chat** view.
1. Send `@upgrade` in chat and confirm the agent responds.

   -or-

   Select the **Agent** picker and find the `Upgrade` entry.

**copilot-cli:**

## Prerequisites

Before you install, make sure you have:

- GitHub Copilot CLI installed.
- GitHub Copilot subscription (paid or free).

## Install

Install through the GitHub Copilot CLI:

1. Open the GitHub Copilot chat window.

1. Add the marketplace plugin:

   ```console
   /plugin marketplace add microsoft/upgrade-agent-plugins
   ```

1. Install the plugin:

   ```console
   /plugin install upgrade-agent@upgrade-agent-plugins
   ```

## Verify the installation

Run `/agent` to confirm that `upgrade-agent` appears in the agent list.

**github-copilot-app:**

## Prerequisites

Before you install, make sure you have:

- GitHub Copilot app installed.
- GitHub Copilot subscription (paid or free).

## Install

Install the `microsoft/upgrade-agent-plugins` marketplace through the GitHub Copilot app:

1. Click this link to automatically open the **Settings** > **Plugins** window in the GitHub Copilot app.
1. In the **Add plugin marketplace** dialog, select **Allow**.
1. Go to the **Customize** view and search for `upgrade-agent`. Under the **All marketplaces** dropdown, select the `upgrade-agent-plugins`, and select **Install** on the `upgrade-agent` plugin.

> **Important:**
> If the plugin's button displays **Install** again after you select it, the installation failed. Close all instances of Visual Studio, Visual Studio Code, and Copilot CLI, and then try again.

## Verify the installation

Run `/agent` to confirm that `upgrade-agent:upgrade` appears in the agent list.

-or-

Select the **Default agent** picker and find the **Upgrade** entry.

**github-com:**

## Prerequisites

Before you install, make sure you have:

- GitHub Copilot Enterprise or Business subscription with coding agents enabled.
- Repository admin access.

## Install

Add the custom coding agent to your repository:

1. Review adding custom coding agents to your repository.
1. Add the `upgrade` agent. See the coding agent README for details.

## Related content

- What is GitHub Copilot upgrade?
- Upgrade .NET projects
- Upgrade JavaScript and TypeScript projects
- Core concepts
- GitHub Copilot upgrade FAQ
