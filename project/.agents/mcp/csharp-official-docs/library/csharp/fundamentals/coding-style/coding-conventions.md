---
title: ".NET Coding Conventions (part 1 of 35)"
tool: "csharp"
version: "15"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/csharp/fundamentals/coding-style/coding-conventions.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Common C# code conventions

Coding conventions are essential for maintaining code readability, consistency, and collaboration within a development team. Code that follows industry practices and established guidelines is easier to understand, maintain, and extend. Most projects enforce a consistent style through code conventions. The `dotnet/docs` and `dotnet/samples` projects are no exception. In this series of articles, you learn our coding conventions and the tools we use to enforce them. You can take our conventions as-is, or modify them to suit your team's needs.

We chose our conventions based on the following goals:

1. *Correctness*: Our samples are copied and pasted into your applications. We expect that, so we need to make code that's resilient and correct, even after multiple edits.
1. *Teaching*: The purpose of our samples is to teach all of .NET and C#. For that reason, we don't place restrictions on any language feature or API. Instead, those samples teach when a feature is a good choice.
1. *Consistency*: Readers expect a consistent experience across our content. All samples should conform to the same style.
1. *Adoption*: We aggressively update our samples to use new language features. That practice raises awareness of new features, and makes them more familiar to all C# developers.

> **Important:**
> These guidelines are used by Microsoft to develop samples and documentation. They were adopted from the .NET Runtime, C# Coding Style and C# compiler (roslyn) guidelines. We chose those guidelines because of their adoption over several years of Open Source development. These guidelines help community members participate in the runtime and compiler projects. They're meant to be an example of common C# conventions, and not an authoritative list (see Framework Design Guidelines for detailed guidelines).
>
> The *teaching* and *adoption* goals are why the docs coding convention differs from the runtime and compiler conventions. Both the runtime and compiler have strict performance metrics for hot paths. Many other applications don't. Our *teaching* goal mandates that we don't prohibit any construct. Instead, samples show when constructs should be used. We update samples more aggressively than most production applications do. Our *adoption* goal mandates that we show code you should write today, even when code written last year doesn't need changes.

This article explains our guidelines. The guidelines evolve over time, and you'll find samples that don't follow our guidelines. We welcome PRs that bring those samples into compliance, or issues that draw our attention to samples we should update. Our guidelines are Open Source and we welcome PRs and issues. However, if your submission would change these recommendations, open an issue for discussion first. You're welcome to use our guidelines, or adapt them to your needs.

## Tools and analyzers

Tools can help your team enforce your conventions. You can enable code analysis to enforce the rules you prefer. You can also create an editorconfig so that Visual Studio automatically enforces your style guidelines. As a starting point, you can copy the `dotnet/docs` *.editorconfig* to use our style.

These tools make it easier for your team to adopt your preferred guidelines. Visual Studio applies the rules in all *.editorconfig* files in scope to format your code. You can use multiple configurations to enforce corporate-wide conventions, team conventions, and even granular project conventions.

Code analysis produces warnings and diagnostics when it detects rule violations. You configure the rules you want applied to your project. Then, each CI build notifies developers when they violate any of the rules.

### Diagnostic IDs

- Choose appropriate diagnostic IDs when building your own analyzers
