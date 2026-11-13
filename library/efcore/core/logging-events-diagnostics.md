---
title: "Overview of logging and interception - EF Core"
tool: "efcore"
version: "11"
source: "https://github.com/dotnet/EntityFramework.Docs/blob/5fa9f7b63ae7ff93d631f4ddc47fdc9f72dcbdc7/entity-framework/core/logging-events-diagnostics/index.md"
commit: "5fa9f7b63ae7ff93d631f4ddc47fdc9f72dcbdc7"
license: "CC-BY-4.0"
---

# Overview of Logging and Interception

Entity Framework Core (EF Core) contains several mechanisms for generating logs, responding to events, and obtaining diagnostics. Each of these is tailored to different situations, and it is important to select the best mechanism for the task in hand, even when multiple mechanisms could work. For example, a database interceptor could be used to log SQL, but this is better handled by one of the mechanisms tailored to logging. This page presents an overview of each of these mechanisms and describes when each should be used.

## Quick reference

The table below provides a quick reference for the differences between the mechanisms described here.

| Mechanism |  Async | Scope | Registered | Intended use
|:----------|--------|-------|------------|-------------
| Simple Logging | No | Per context | Context configuration | Development-time logging
| Microsoft.Extensions.Logging | No | Per context* | D.I. or context configuration | Production logging
| Events | No | Per context | Any time | Reacting to EF events
| Interceptors | Yes | Per context | Context configuration | Manipulating EF operations
| Diagnostics listeners | No | Process | Globally | Application diagnostics

*Typically `Microsoft.Extensions.Logging` is configured per-application via dependency injection. However, at the EF level, each context _can_ be configured with a different logger if needed.

## Simple logging

EF Core logs can be accessed from any type of application through the use of `Microsoft.EntityFrameworkCore.DbContextOptionsBuilder.LogTo*` when configuring a DbContext instance. This configuration is commonly done in an override of `Microsoft.EntityFrameworkCore.DbContext.OnConfiguring*`. For example:

```csharp
protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    => optionsBuilder.LogTo(Console.WriteLine);
```

This concept is similar to `System.Data.Entity.Database.Log` in EF6.

See Simple Logging for more information.

## Microsoft.Extensions.Logging

Microsoft.Extensions.Logging is an extensible logging mechanism with plug-in providers for many common logging systems. EF Core fully integrates with `Microsoft.Extensions.Logging` and this form of logging is used by default for ASP.NET Core applications.

See Using Microsoft.Extensions.Logging in EF Core for more information.

## Events

EF Core exposes .NET events to act as callbacks when certain things happen in the EF Core code. Events are simpler than interceptors and allow more flexible registration. However, they are sync only and so cannot perform non-blocking async I/O.

Events are registered per DbContext instance and this registration can be done at any time. Use a diagnostic listener to get the same information but for all DbContext instances in the process.

See .NET Events in EF Core for more information.

## Interception

EF Core interceptors enable interception, modification, and/or suppression of EF Core operations. This includes low-level database operations such as executing a command, as well as higher-level operations, such as calls to SaveChanges.

Interceptors are different from logging and diagnostics in that they allow modification or suppression of the operation being intercepted. Simple logging or Microsoft.Extensions.Logging are better choices for logging.

Interceptors are registered per DbContext instance when the context is configured. Use a diagnostic listener to get the same information but for all DbContext instances in the process.

See Interception for more information.

## Diagnostic listeners

Diagnostic listeners allow listening for any EF Core event that occurs in the current .NET process.

Diagnostic listeners are not suitable for getting events from a single DbContext instance. EF Core interceptors provide access to the same events with per-context registration.

Diagnostic listeners are not designed for logging. Simple logging or Microsoft.Extensions.Logging are better choices for logging.

See Using diagnostic listeners in EF Core for more information.
