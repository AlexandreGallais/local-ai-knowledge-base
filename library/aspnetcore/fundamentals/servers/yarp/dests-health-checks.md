---
title: "YARP Destination health checks (part 1 of 2)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/fundamentals/servers/yarp/dests-health-checks.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# YARP Destination health checks
In most of the real-world systems, it's expected for their nodes to occasionally experience transient issues and go down completely due to a variety of reasons such as an overload, resource leakage, hardware failures, etc. Ideally, it'd be desirable to completely prevent those unfortunate events from occurring in a proactive way, but the cost of designing and building such an ideal system is generally prohibitively high. However, there is another reactive approach which is cheaper and aimed to minimizing a negative impact failures cause on client requests. The proxy can analyze each nodes health and stop sending client traffic to unhealthy ones until they recover. YARP implements this approach in the form of active and passive destination health checks. They are independent from each other and stored on the relative properties for each destination. Health states are initialized with `Unknown` value which can be later changed to either `Healthy` or `Unhealthy` by the corresponding policies as explained below.

## Active health checks
YARP can proactively monitor destination health by sending periodic probing requests to designated health endpoints and analyzing responses. That analysis is performed by an active health check policy specified for a cluster and results in the calculation of the new destination health states. In the end, the policy marks each destination as healthy or unhealthy based on the HTTP response code (2xx is considered healthy) and rebuilds the cluster's healthy destination collection.

There are several cluster-wide configuration settings controlling active health checks that can be set either in the config file or in code. A dedicated health endpoint can also be specified per destination.

#### File example
```json
"Clusters": {
  "cluster1": {
    "HealthCheck": {
      "Active": {
        "Enabled": "true",
        "Interval": "00:00:10",
        "Timeout": "00:00:10",
        "Policy": "ConsecutiveFailures",
        "Path": "/api/health",
        "Query": "?foo=bar"
      }
    },
    "Metadata": {
      "ConsecutiveFailuresHealthPolicy.Threshold": "3"
    },
    "Destinations": {
      "cluster1/destination1": {
        "Address": "https://localhost:10000/"
      },
      "cluster1/destination2": {
        "Address": "http://localhost:10010/",
        "Health": "http://localhost:10020/"
      }
    }
  }
}
```

#### Code example
```csharp
var clusters = new[]
{
    new ClusterConfig()
    {
        ClusterId = "cluster1",
        HealthCheck = new HealthCheckConfig
        {
            Active = new ActiveHealthCheckConfig
            {
                Enabled = true,
                Interval = TimeSpan.FromSeconds(10),
                Timeout = TimeSpan.FromSeconds(10),
                Policy = HealthCheckConstants.ActivePolicy.ConsecutiveFailures,
                Path = "/api/health",
                Query = "?foo=bar",
            }
        },
        Metadata = new Dictionary<string, string> { { ConsecutiveFailuresHealthPolicyOptions.ThresholdMetadataName, "5" } },
        Destinations =
        {
            { "destination1", new DestinationConfig() { Address = "https://localhost:10000" } },
            { "destination2", new DestinationConfig() { Address = "https://localhost:10010", Health = "https://localhost:10010" } }
        }
    }
};
```

### Configuration
All but one of active health check settings are specified on the cluster level in `Cluster/HealthCheck/Active` section. The only exception is an optional `Destination/Health` element specifying a separate active health check endpoint. The actual health probing URI is constructed as `Destination/Address` (or `Destination/Health` when it's set) + `Cluster/HealthCheck/Active/Path`.

Active health check settings can also be defined in code via the corresponding types in Yarp.ReverseProxy.Configuration namespace mirroring the configuration contract.

`Cluster/HealthCheck/Active` section and ActiveHealthCheckConfig:

* `Enabled`: Flag indicating whether active health check is enabled for a cluster. Default `false`
* `Interval`: Period of sending health probing requests. Default `00:00:15`
* `Timeout`: Probing request timeout. Default `00:00:10`
* `Policy`: Name of a policy evaluating destinations' active health states. Mandatory parameter
* `Path`: Health check path on all cluster's destinations. Default `null`.
* `Query`: Health check query on all cluster's destinations. Default `null`.

`Destination` section and DestinationConfig.

`Health`: A dedicated health probing endpoint such as `http://destination:12345/`. Defaults `null` and falls back to `Destination/Address`.

### Built-in policies

There is currently one built-in active health check policy - `ConsecutiveFailuresHealthPolicy`. It counts consecutive health probe failures and marks a destination as unhealthy once the given threshold is reached. On the first successful response, a destination is marked as healthy and the counter is reset.
The policy parameters are set in the cluster's metadata as follows:

`ConsecutiveFailuresHealthPolicy.Threshold` - number of consecutively failed active health probing requests required to mark a destination as unhealthy. Default `2`.

### Design
The main service in this process is IActiveHealthCheckMonitor that periodically creates probing requests via IProbingRequestFactory, sends them to all DestinationConfig of each ClusterConfig with enabled active health checks and then passes all the responses down to a IActiveHealthCheckPolicy specified for a cluster. `IActiveHealthCheckMonitor` doesn't make the actual decision on whether a destination is healthy or not, but delegates this duty to an `IActiveHealthCheckPolicy` specified for a cluster. A policy is called to evaluate the new health states once all probing of all cluster's destination completed. It takes in a ClusterState representing the cluster's dynamic state and a set of DestinationProbingResult storing cluster's destinations' probing results. Having evaluated a new health state for each destination, the policy calls IDestinationHealthUpdater to actually update DestinationHealthState.Active values.

```
-{For each cluster's destination}-
IActiveHealthCheckMonitor <--(Create probing request)--> IProbingRequestFactory
        |
        V
 HttpMessageInvoker <--(Send probe and receive response)--> Destination
        |
(Save probing result)
        |
        V
DestinationProbingResult
--------------{END}---------------
        |
(Evaluate new destination active health states using probing results)
        |
        V
IActiveHealthCheckPolicy --(New active health states)--> IDestinationHealthUpdater --(Update each destination's)--> DestinationState.Health.Active
```
There are default built-in implementations for all of the aforementioned components which can also be replaced with custom ones when necessary.

### Extensibility
There are 2 main extensibility points in the active health check subsystem.

#### IActiveHealthCheckPolicy
IActiveHealthCheckPolicy analyzes how destinations respond to active health probes sent by `IActiveHealthCheckMonitor`, evaluates new active health states for all the probed destinations, and then call `IDestinationHealthUpdater.SetActive` to set new active health states and rebuild the healthy destination collection based on the updated values.

The below is a simple example of a custom `IActiveHealthCheckPolicy` marking destination as `Healthy`, if a successful response code was returned for a probe, and as `Unhealthy` otherwise.

```csharp
public class FirstUnsuccessfulResponseHealthPolicy : IActiveHealthCheckPolicy
{
    private readonly IDestinationHealthUpdater _healthUpdater;

    public FirstUnsuccessfulResponseHealthPolicy(IDestinationHealthUpdater healthUpdater)
    {
        _healthUpdater = healthUpdater;
    }

    public string Name => "FirstUnsuccessfulResponse";

    public void ProbingCompleted(ClusterState cluster, IReadOnlyList<DestinationProbingResult> probingResults)
    {
        if (probingResults.Count == 0)
        {
            return;
        }

        var newHealthStates = new NewActiveDestinationHealth[probingResults.Count];
        for (var i = 0; i < probingResults.Count; i++)
        {
            var response = probingResults[i].Response;
            var newHealth = response is not null && response.IsSuccessStatusCode ? DestinationHealth.Healthy : DestinationHealth.Unhealthy;
            newHealthStates[i] = new NewActiveDestinationHealth(probingResults[i].Destination, newHealth);
        }

        _healthUpdater.SetActive(cluster, newHealthStates);
    }
}
```

#### IProbingRequestFactory
IProbingRequestFactory creates active health probing requests to be sent to destination health endpoints. It can take into account `ActiveHealthCheckOptions.Path`, `DestinationConfig.Health`, and other configuration settings to construct probing requests.

The default `IProbingRequestFactory` uses the same `HttpRequest` configuration as proxy requests, to customize that implement your own `IProbingRequestFactory` and register it in DI like the below.

```csharp
services.AddSingleton<IProbingRequestFactory, CustomProbingRequestFactory>();
```

The below is a simple example of a customer `IProbingRequestFactory` concatenating `DestinationConfig.Address` and a fixed health probe path to create the probing request URI.

```csharp
public class CustomProbingRequestFactory : IProbingRequestFactory
{
    public HttpRequestMessage CreateRequest(ClusterConfig clusterConfig, DestinationConfig destinationConfig)
    {
        var probeUri = new Uri(destinationConfig.Address + "/api/probe-health");
        return new HttpRequestMessage(HttpMethod.Get, probeUri) { Version = ProtocolHelper.Http11Version };
    }
}
```
