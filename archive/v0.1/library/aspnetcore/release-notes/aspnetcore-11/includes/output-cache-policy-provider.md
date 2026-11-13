---
title: "output-cache-policy-provider"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/release-notes/aspnetcore-11/includes/output-cache-policy-provider.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# output-cache-policy-provider

### `IOutputCachePolicyProvider` interface

ASP.NET Core in .NET 11 provides the `Microsoft.AspNetCore.OutputCaching.IOutputCachePolicyProvider` interface for implementing custom output caching policy selection logic. By using this interface, apps can determine the default base caching policy, check for the existence of named policies, and support advanced scenarios where policies must be resolved dynamically. Examples include loading policies from external configuration sources, databases, or applying tenant-specific caching rules.

The following code shows the `IOutputCachePolicyProvider` interface:

```csharp
public interface IOutputCachePolicyProvider
{
    IReadOnlyList<IOutputCachePolicy> GetBasePolicies();
    ValueTask<IOutputCachePolicy?> GetPolicyAsync(string policyName);
}
```

Thank you @lqlive for this contribution!
