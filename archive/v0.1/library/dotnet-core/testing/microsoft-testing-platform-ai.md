---
title: "Microsoft.Testing.Platform (MTP) AI integrations"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/testing/microsoft-testing-platform-ai.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# AI integrations

The experimental Microsoft.Testing.Platform.AI package defines provider-neutral AI abstractions for test frameworks and MTP extensions. The package integrates with `Microsoft.Extensions.AI`, so an extension can request an `Microsoft.Extensions.AI.IChatClient` without depending on a specific model provider.

> **Important:**
> The AI APIs use the `TPEXP` diagnostic ID and can change in a future release. The packages supply infrastructure to extensions; they don't add AI behavior to a test suite by themselves.

## Use AI coding tools for test workflows

The packages in this article let MTP extensions call AI models during a test run. To use an AI coding assistant to create, analyze, or migrate tests in your repository, use the curated .NET Agent Skills instead.

Choose a workflow based on your goal:

| Goal | Skill or agent |
|---|---|
| Create or extend tests | Use the `code-testing-agent` skill from the `dotnet-test` plugin. The skill researches the codebase, plans the work, implements tests, and verifies the changes. |
| Run or troubleshoot tests | Use the `run-tests` skill to execute tests or diagnose test execution without changing test code. |
| Audit test quality | Use the `test-quality-auditor` agent for a broad assessment, or invoke a focused skill from the `dotnet-test` skills directory for assertions, coverage, test gaps, or test smells. |
| Improve testability | Use the `testability-migration` agent to find static dependencies and introduce testable abstractions. |
| Migrate a test framework or platform | Use the `test-migration` agent from the `dotnet-test-migration` plugin. The agent detects the current setup and selects the appropriate migration skill. |

For installation steps and supported coding agents, see the .NET Agent Skills repository. Install `dotnet-test` alongside `dotnet-test-migration` because migration workflows reuse its platform detection and test verification skills.

## Choose the packages

Add the abstractions package when you author an extension that consumes a chat client. Add a provider package to the test application that hosts the extension:

```dotnetcli
dotnet add package Microsoft.Testing.Platform.AI
dotnet add package Microsoft.Testing.Extensions.AzureFoundry
```

`Microsoft.Testing.Extensions.AzureFoundry` is the Microsoft-provided reference provider. It creates an Azure OpenAI chat client through Azure AI Foundry.

## Configure Azure AI Foundry

Set the following environment variables:

| Variable | Required | Description |
|---|---|---|
| `AZURE_OPENAI_ENDPOINT` | Yes | The Azure OpenAI resource endpoint, such as `https://my-resource.openai.azure.com`. |
| `AZURE_OPENAI_DEPLOYMENT_NAME` | Yes | The model deployment name. |
| `AZURE_OPENAI_API_KEY` | Conditional | The resource API key. Set this value unless you register a `TokenCredential` in code. |

To keep credentials out of source control, supply these values through your local environment or a protected CI secret store.

## Register the provider

Disable the generated MTP entry point and register the provider in your custom `Main` method. For API-key <example-value>, call:

```csharp
#pragma warning disable TPEXP
builder.AddAzureOpenAIChatClientProvider();
#pragma warning restore TPEXP
```

For Microsoft Entra ID or managed identity, reference the `Azure.Identity` package and pass a credential:

```csharp
using Azure.Identity;

#pragma warning disable TPEXP
builder.AddAzureOpenAIChatClientProvider(new DefaultAzureCredential());
#pragma warning restore TPEXP
```

When `AZURE_OPENAI_API_KEY` is set, the provider uses the API key <example-value> the supplied credential. Credential <example-value> and authentication occur when the first chat request runs, so configuration errors might not appear during provider registration.

## Consume a chat client

Implement `IChatClientProvider` to integrate another AI provider. An MTP extension can retrieve the registered chat client from its `IServiceProvider`:

```csharp
IChatClient? client =
    await serviceProvider.GetChatClientAsync(cancellationToken);
```

The call returns `null` when no available provider is registered. Before an extension sends test data to a model, document what data it sends and apply the privacy, security, and retention requirements for that data.

## See also

- MTP features
- Build extensions for MTP
- Microsoft.Extensions.AI libraries
