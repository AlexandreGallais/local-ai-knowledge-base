---
title: "YARP A/B Testing and Rolling Upgrades"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/fundamentals/servers/yarp/ab-testing.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# YARP A/B Testing and Rolling Upgrades

## Introduction

A/B testing and rolling upgrades require procedures for dynamically assigning incoming traffic to evaluate changes in the destination application. YARP does not have a built-in model for this, but it does expose some infrastructure useful for building such a system. See issue #126 for additional details about this scenario.

## Example

```csharp
app.MapReverseProxy(proxyPipeline =>
{
    // Custom cluster selection
    proxyPipeline.Use((context, next) =>
    {
        var lookup = context.RequestServices.GetRequiredService<IProxyStateLookup>();
        if (lookup.TryGetCluster(ChooseCluster(context), out var cluster))
        {
            context.ReassignProxyRequest(cluster);
        }

        return next();
    });
    proxyPipeline.UseSessionAffinity();
    proxyPipeline.UseLoadBalancing();
});

string ChooseCluster(HttpContext context)
{
    // Decide which cluster to use. This could be random, weighted, based on headers, etc.
    return Random.Shared.Next(2) == 1 ? "cluster1" : "cluster2";
}
```

## Usage

This scenario makes use of two APIs, IProxyStateLookup and ReassignProxyRequest), called from a custom proxy middleware as shown in the sample above.

`IProxyStateLookup` is a service available in the Dependency Injection container that can be used to look up or enumerate the current routes and clusters. Note this data may change if the configuration changes. An A/B orchestration algorithm can examine the request, decide which cluster to send it to, and then retrieve that cluster from `IProxyStateLookup.TryGetCluster`.

Once the cluster is selected, `ReassignProxyRequest` can be called to assign the request to that cluster. This updates the IReverseProxyFeature with the new cluster and destination information needed for the rest of the proxy middleware pipeline to handle the request.

## Session affinity

Note that session affinity functionality is split between middleware, which reads it settings from the current cluster, and transforms, which are part of the original route. Clusters used for A/B testing should use the same session affinity configuration to avoid conflicts.
