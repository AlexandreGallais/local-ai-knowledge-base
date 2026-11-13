---
title: "How to analyze a project with .NET Upgrade Assistant"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/porting/upgrade-assistant-how-to-analyze.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Analyze projects with .NET Upgrade Assistant

This article teaches you how to perform code analysis on your projects with .NET Upgrade Assistant, using Visual Studio or the terminal. The analysis generates a report that you can browse to get more information about the upgrade.

> **Important:**
> .NET Upgrade Assistant is officially deprecated. Use the GitHub Copilot modernization chat agent instead, which is included with Visual Studio 2026 and Visual Studio 2022 17.14.16 or later. This agent analyzes your projects and dependencies, produces a step-by-step migration plan with targeted recommendations and automated code fixes, and commits each change so you can validate or roll back. It automates common porting tasks—updating project files, replacing deprecated APIs, and resolving build issues—so you can modernize faster with less manual effort.

## Prerequisites

- For Visual Studio, see Enable .NET Upgrade Assistant - Visual Studio.
- For the .NET Global Tool, see Install .NET Upgrade Assistant - .NET Global Tool.

## Create a report in Visual Studio

Follow these steps to analyze a project in Visual Studio.

1. Open Visual Studio.
1. Open a project or solution.
1. In the **Solution Explorer** window, right-click on the **solution** > **Upgrade**.

1. In the **Upgrade Assistant: Home** tab, select **New Report**.

1. Select one or more projects to analyze, then select **Next**.

1. Select the target framework, for example .NET 8.0. Then, select **Next**.

1. Select the components to analyze and then select **Next**.

1. A progress indicator is displayed for each project that's being analyzed.

1. Once the analysis is complete, the report dashboard is shown. For more information about the dashboard, see Reports.

## Create a report from the CLI

Follow these steps to analyze a project using the terminal. The .NET Global Tool is an interactive tool that guides you through the analysis options. Use the `Up arrow` and `Down arrow` keys to change the highlighted option, and `Enter` to run the select the option. Each screen presents you options on how you want to configure the report.

1. Open a terminal and navigate to the folder containing the solution or project you want to analyze.
1. To start the tool, run the `upgrade-assistant analyze` command.
1. You're asked about what you want to analyze. For this example, choose **Application sources** and press `Enter`.

1. Choose a target framework, such as **.NET 8.0**, and press `Enter`.
1. Select the types of items you want to scan. Use `Spacebar` to toggle the options, and then press `Enter`.
1. On the **Config file** screen, press `n`, unless you have a ruleset config file to apply.
1. Choose the format of the generated report. For the purposes of this example, select **Save as HTML**.
1. Enter the name **MyReport** and press `Enter`.
1. Select the appropriate privacy mode, such as **Restricted** and press `Enter`.
1. The final prompt is a confirmation, displaying all of the options you selected. Press `Enter` to run the analysis and generate the report.

1. Once the report finishes, a summary of the report is displayed. The results of the report are saved to the folder of the project or solution that was analyzed.

## Related content

- What is code analysis with .NET Upgrade Assistant?
- What is .NET Upgrade Assistant?
- Install .NET Upgrade Assistant
