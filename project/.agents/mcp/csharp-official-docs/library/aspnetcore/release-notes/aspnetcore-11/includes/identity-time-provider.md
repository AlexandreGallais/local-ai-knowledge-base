---
title: "identity-time-provider"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/release-notes/aspnetcore-11/includes/identity-time-provider.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# identity-time-provider

### `TimeProvider` support in ASP.NET Core Identity

ASP.NET Core Identity now uses `TimeProvider` instead of `DateTime` and `DateTimeOffset` for all time-related operations. This change makes Identity components more testable and provides better control over time in tests and specialized scenarios.

The following example shows how to use a fake `TimeProvider` for testing Identity features:

```csharp
// In tests
var fakeTimeProvider = new FakeTimeProvider(
    new DateTimeOffset(2024, 1, 1, 0, 0, 0, TimeSpan.Zero));

services.AddSingleton<TimeProvider>(fakeTimeProvider);
services.AddIdentity<IdentityUser, IdentityRole>();

// Identity will now use the fake time provider
```

By using `TimeProvider`, you can more easily write deterministic tests for time-sensitive Identity features such as token <example-value>, lockout durations, and security stamp validation.
