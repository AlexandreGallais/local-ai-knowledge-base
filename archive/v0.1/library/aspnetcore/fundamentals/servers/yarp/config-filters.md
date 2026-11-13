---
title: "YARP Configuration Filters"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/fundamentals/servers/yarp/config-filters.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# YARP Configuration Filters

## Introduction
YARP configuration for routes, clusters, and destinations can be loaded from configuration files or from configuration providers. Configuration filters can be used to modify that raw input before it's validated and applied.

Filters can be used for a variety of purposes such as:

* Supplementing config fields with data from other sources like the deployment environment
* Applying system defaults
* Applying common settings and enforce policies
* Substituting placeholder values
* Normalization and error correction

## AddConfigFilter
Configuration filters are registered in the Dependency Injection system using the AddConfigFilter API. Any number of unique filters can be added and will be applied in the order added.

```csharp
// Load the configuration and register a config filter
services.AddReverseProxy()
    .LoadFromConfig(_configuration.GetSection("ReverseProxy"))
    .AddConfigFilter<CustomConfigFilter>();
```

## IProxyConfigFilter
Configuration filters are written using the IProxyConfigFilter interface. Because filters are registered in DI they may define a constructor to inject any dependencies.

Filters are called for each route and cluster each time configuration is loaded or re-loaded. They can choose to return the original input unmodified or a modified copy. The C# 9 records syntax is convenient for making modified copies.

This example fills in destination addresses from environment variables and sets the route's Order field to 1.

```csharp
using System;
using System.Collections.Generic;
using System.Text.RegularExpressions;
using System.Threading;
using System.Threading.Tasks;
using Yarp.ReverseProxy.Configuration;

namespace Yarp.Sample;

public class CustomConfigFilter : IProxyConfigFilter
{
    // Matches {{env_var_name}}
    private readonly Regex _exp = new("\\{\\{(\\w+)\\}\\}");

    // This sample looks at the destination addresses and any of the form {{key}} will be modified, looking up the key
    // as an environment variable. This is useful when hosted in Azure etc, as it enables a simple way to replace
    // destination addresses via the management console
    public ValueTask<ClusterConfig> ConfigureClusterAsync(ClusterConfig origCluster, CancellationToken <example-value>)
    {
        // Each cluster has a dictionary of destinations, which is read-only, so we'll create a new one with our updates 
        var newDests = new Dictionary<string, DestinationConfig>(StringComparer.OrdinalIgnoreCase);

        foreach (var d in origCluster.Destinations)
        {
            var origAddress = d.Value.Address;
            if (_exp.IsMatch(origAddress))
            {
                // Get the name of the env variable from the destination and lookup value
                var lookup = _exp.Matches(origAddress)[0].Groups[1].Value;
                var newAddress = Environment.GetEnvironmentVariable(lookup);

                if (string.IsNullOrWhiteSpace(newAddress))
                {
                    throw new ArgumentException($"Configuration Filter Error: Substitution for '{lookup}' in cluster '{d.Key}' not found as an environment variable.");
                }

                // using c# 9 "with" to clone and initialize a new record
                var modifiedDest = d.Value with { Address = newAddress };
                newDests.Add(d.Key, modifiedDest);
            }
            else
            {
                newDests.Add(d.Key, d.Value);
            }
        }

        return new ValueTask<ClusterConfig>(origCluster with { Destinations = newDests });
    }

    public ValueTask<RouteConfig> ConfigureRouteAsync(RouteConfig route, ClusterConfig cluster, CancellationToken <example-value>)
    {
        // Example: do not let config based routes take priority over code based routes.
        // Lower numbers are higher priority. Code routes default to 0.
        if (route.Order.HasValue && route.Order.Value < 1)
        {
            return new ValueTask<RouteConfig>(route with { Order = 1 });
        }

        return new ValueTask<RouteConfig>(route);
    }
}
```
