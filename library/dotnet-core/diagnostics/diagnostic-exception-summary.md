---
title: "Exception summarization in C#"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/diagnostics/diagnostic-exception-summary.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Exception summarization

When you're trying to generate meaningful diagnostic messages for exceptions, maintaining the inclusion of pertinent information can pose a challenge. The standard exception message often lacks critical details that accompany the exception, while invoking the `System.Exception.ToString*` method yields an excess of state information.

This article relies on the Microsoft.Extensions.Diagnostics.ExceptionSummarization NuGet package.

## The goal of exception summarization

Metric tags typically support a limited number of distinct values, and as such they are not suitable to represent values which are highly variable, such as the result of `System.Exception.ToString`. An exception summary represents a low-cardinality version of an exception's information, suitable for such cases.

The goal of exception summarization is twofold:

- To reduce the cardinality associated with exception state such that exceptions can be reliably counted in metrics. This matters since metric dimensions have limited cardinality.
- To eliminate privacy-sensitive information from exception state such that some meaningful exception information can be added to logs.

## Exception summarization API

The `Microsoft.Extensions.Diagnostics.ExceptionSummarization.IExceptionSummarizer` interface offers methods for extracting crucial details from recognized exception types, thereby furnishing a singular `string` that serves as the foundation for crafting top-quality diagnostic messages.

The `Microsoft.Extensions.Diagnostics.ExceptionSummarization.IExceptionSummarizer.Summarize*` method systematically traverses the roster of registered summarizers until it identifies a summarizer capable of handling the specific exception type. In the event that no summarizer is capable of recognizing the exception type, a meaningful default exception summary is provided instead.

The result of the `Summarize` method returns an `Microsoft.Extensions.Diagnostics.ExceptionSummarization.ExceptionSummary` struct, and it contains the following properties:

- `Microsoft.Extensions.Diagnostics.ExceptionSummarization.ExceptionSummary.Description`: The summary description of the exception.
- `Microsoft.Extensions.Diagnostics.ExceptionSummarization.ExceptionSummary.AdditionalDetails`: Intended for low-level diagnostic use, this property contains additional details about the exception and has a relatively high cardinality. This property may contain privacy-sensitive information.
- `Microsoft.Extensions.Diagnostics.ExceptionSummarization.ExceptionSummary.ExceptionType`:  The type of the exception, unless inner exceptions are present, in which case both outer and inner types are reflected.

## Example exception summarization usage

The following example demonstrates how to use the `IExceptionSummarizer` interface to retrieve a summary of an exception.

```csharp
﻿using System.Net;
using System.Net.Sockets;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Diagnostics.ExceptionSummarization;

// Add exception summarization services.
var services = new ServiceCollection()
    .AddExceptionSummarizer(static builder => builder.AddHttpProvider());

var provider = services.BuildServiceProvider();

// Get the exception summarizer.
IExceptionSummarizer summarizer = provider.GetRequiredService<IExceptionSummarizer>();

// Define exceptions to summarize.
Exception[] exceptions =
[
    new OperationCanceledException("Operation cancelled..."),
    new TaskCanceledException("Task cancelled..."),
    new SocketException(10_024, "Too many sockets open..."),
    new WebException("Keep alive failure...",
        WebExceptionStatus.KeepAliveFailure)
];

foreach (var exception in exceptions)
{
    // Summarize the exception.
    ExceptionSummary summary = summarizer.Summarize(exception);

    Console.WriteLine(summary);
}

Console.ReadLine();
```
The preceding code:

- Instantiates a new `Microsoft.Extensions.DependencyInjection.ServiceCollection` instance, chaining a call to the `Microsoft.Extensions.DependencyInjection.ExceptionSummarizationServiceCollectionExtensions.AddExceptionSummarizer*` extension method.
  - The `AddExceptionSummarizer` extension method accepts a delegate that is used to configure the `ExceptionSummarizerBuilder` instance.
  - The `builder` is used to add the HTTP provider, which handles exceptions of type:
    - `System.OperationCanceledException`
    - `System.Threading.Tasks.TaskCanceledException`
    - `System.Net.Sockets.SocketException`
    - `System.Net.WebException`
- Builds a new `ServiceProvider` instance from the `ServiceCollection` instance.
- Gets an instance of the `IExceptionSummarizer` interface from the `ServiceProvider` instance.
- Iterates over a collection of exceptions, calling the `Summarize` method on each exception and displaying the result.

> **Note:**
> The primary focus in the design of all exception summarization implementations is to provide diagnostic convenience, rather than prioritizing the protection of personally identifiable information (PII). The `Microsoft.Extensions.Diagnostics.ExceptionSummarization.ExceptionSummary.Description` doesn't contain sensitive information, but the `Microsoft.Extensions.Diagnostics.ExceptionSummarization.ExceptionSummary.AdditionalDetails` might contain sensitive information depending on the implementation.
