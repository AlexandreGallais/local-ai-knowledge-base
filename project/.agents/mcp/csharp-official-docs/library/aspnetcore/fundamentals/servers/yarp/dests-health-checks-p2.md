---
title: "YARP Destination health checks (part 2 of 2)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/fundamentals/servers/yarp/dests-health-checks.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# YARP Destination health checks (part 2 of 2)

## Passive health checks
YARP can passively watch for successes and failures in client request proxying to reactively evaluate destination health states. Responses to the proxied requests are intercepted by a dedicated passive health checks middleware which passes them to a policy configured on the cluster. The policy analyzes the responses to evaluate if the destinations that produced them are healthy or not. Then, it calculates and assigns new passive health states to the respective destinations and rebuilds the cluster's healthy destination collection.

Note the response is normally sent to the client before the passive health policy runs, so a policy cannot intercept the response body, nor modify anything in the response headers unless the proxy application introduces full response buffering.

There is one important difference from the active health check logic. Once a destination gets assigned an unhealthy passive state, it stops receiving all new traffic which blocks future health reevaluation. The policy also schedules a destination reactivation after the configured period. Reactivation means resetting the passive health state from `Unhealthy` back to the initial `Unknown` value which makes destination eligible for traffic again.

There are several cluster-wide configuration settings controlling passive health checks that can be set either in the config file or in code.

#### File example
```json
"Clusters": {
  "cluster1": {
    "HealthCheck": {
      "Passive": {
        "Enabled": "true",
        "Policy": "TransportFailureRate",
        "ReactivationPeriod": "00:02:00"
      }
    },
    "Metadata": {
      "TransportFailureRateHealthPolicy.RateLimit": "0.5"
    },
    "Destinations": {
      "cluster1/destination1": {
        "Address": "https://localhost:10000/"
      },
      "cluster1/destination2": {
        "Address": "http://localhost:10010/"
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
            Passive = new PassiveHealthCheckConfig
            {
                Enabled = true,
                Policy = HealthCheckConstants.PassivePolicy.TransportFailureRate,
                ReactivationPeriod = TimeSpan.FromMinutes(2)
            }
        },
        Metadata = new Dictionary<string, string> { { TransportFailureRateHealthPolicyOptions.FailureRateLimitMetadataName, "0.5" } },
        Destinations =
        {
            { "destination1", new DestinationConfig() { Address = "https://localhost:10000" } },
            { "destination2", new DestinationConfig() { Address = "https://localhost:10010" } }
        }
    }
};
```

### Configuration
Passive health check settings are specified on the cluster level in `Cluster/HealthCheck/Passive` section. Alternatively, they can be defined in code via the corresponding types in Yarp.ReverseProxy.Configuration namespace mirroring the configuration contract.

Passive health checks require the `PassiveHealthCheckMiddleware` added into the pipeline for them to work. The default `MapReverseProxy(this IEndpointRouteBuilder endpoints)` method does it automatically, but in case of a manual pipeline construction the UsePassiveHealthChecks method must be called to add that middleware as shown in the example below.

```csharp
endpoints.MapReverseProxy(proxyPipeline =>
{
    proxyPipeline.UseAffinitizedDestinationLookup();
    proxyPipeline.UseProxyLoadBalancing();
    proxyPipeline.UseRequestAffinitizer();
    proxyPipeline.UsePassiveHealthChecks();
});
```

`Cluster/HealthCheck/Passive` section and PassiveHealthCheckConfig:

* `Enabled` - flag indicating whether passive health check is enabled for a cluster. Default `false`
* `Policy` - name of a policy evaluating destinations' passive health states. Mandatory parameter
* `ReactivationPeriod` - period after which an unhealthy destination's passive health state is reset to `Unknown` and it starts receiving traffic again. Default value is `null` which means the period will be set by a `IPassiveHealthCheckPolicy`

### Built-in policies
There is currently one built-in passive health check policy - `TransportFailureRateHealthPolicy`. It calculates the proxied requests failure rate for each destination and marks it as unhealthy if the specified limit is exceeded. Rate is calculated as a percentage of failed requests to the total number of request proxied to a destination in the given period of time. Failed and total counters are tracked in a sliding time window which means that only the recent readings fitting in the window are taken into account.
There are two sets of policy parameters defined globally and on per cluster level.

Global parameters are set via the options mechanism using `TransportFailureRateHealthPolicyOptions` type with the following properties:

* `DetectionWindowSize` - period of time while detected failures are kept and taken into account in the rate calculation. Default is `00:01:00`.
* `MinimalTotalCountThreshold` - minimal total number of requests which must be proxied to a destination within the detection window before this policy starts evaluating the destination's health and enforcing the failure rate limit. Default is `10`.
* `DefaultFailureRateLimit` - default failure rate limit for a destination to be marked as unhealthy that is applied if it's not set on a cluster's metadata. The value is in range `(0,1)`. Default is `0.3` (30%).

Global policy options can be set in code as follows:

```csharp
services.Configure<TransportFailureRateHealthPolicyOptions>(o =>
{
    o.DetectionWindowSize = TimeSpan.FromSeconds(30);
    o.MinimalTotalCountThreshold = 5;
    o.DefaultFailureRateLimit = 0.5;
});
```

Cluster-specific parameters are set in the cluster's metadata as follows:
`TransportFailureRateHealthPolicy.RateLimit` - failure rate limit for a destination to be marked as unhealthy. The value is in range `(0,1)`. Default value is provided by the global `DefaultFailureRateLimit` parameter.

### Design
The main component is PassiveHealthCheckMiddleware sitting in the request pipeline and analyzing responses returned by destinations. For each response from a destination belonging to a cluster with enabled passive health checks, `PassiveHealthCheckMiddleware` invokes an IPassiveHealthCheckPolicy specified for the cluster. The policy analyzes the given response, evaluates a new destination's passive health state and calls IDestinationHealthUpdater to actually update DestinationHealthState.Passive value. The update happens asynchronously in the background and doesn't block the request pipeline. When a destination gets marked as unhealthy, it stops receiving new requests until it gets reactivated after a configured period. Reactivation means the destination's `DestinationHealthState.Passive` state is reset from `Unhealthy` to `Unknown` and the cluster's list of healthy destinations is rebuilt to include it. A reactivation is scheduled by `IDestinationHealthUpdater` right after setting the destination's `DestinationHealthState.Passive` to `Unhealthy`.

```
      (Response to a proxied request)
                  |
      PassiveHealthCheckMiddleware
                  |
                  V
      IPassiveHealthCheckPolicy
                  |
    (Evaluate new passive health state)
                  |
      IDestinationHealthUpdater --(Asynchronously update passive state)--> DestinationState.Health.Passive
                  |
                  V
      (Schedule a reactivation) --(Set to Unknown)--> DestinationState.Health.Passive
```

### Extensibility
There is one main extensibility point in the passive health check subsystem, the `IPassiveHealthCheckPolicy`.

#### IPassiveHealthCheckPolicy
IPassiveHealthCheckPolicy analyzes how a destination responded to a proxied client request, evaluates its new passive health state and finally calls `IDestinationHealthUpdater.SetPassiveAsync` to create an async task actually updating the passive health state and rebuilding the healthy destination collection.

The below is a simple example of a custom `IPassiveHealthCheckPolicy` marking destination as `Unhealthy` on the first unsuccessful response to a proxied request.

```csharp
public class FirstUnsuccessfulResponseHealthPolicy : IPassiveHealthCheckPolicy
{
    private static readonly TimeSpan _defaultReactivationPeriod = TimeSpan.FromSeconds(60);
    private readonly IDestinationHealthUpdater _healthUpdater;

    public FirstUnsuccessfulResponseHealthPolicy(IDestinationHealthUpdater healthUpdater)
    {
        _healthUpdater = healthUpdater;
    }

    public string Name => "FirstUnsuccessfulResponse";

    public void RequestProxied(HttpContext context, ClusterState cluster, DestinationState destination)
    {
        var error = context.Features.Get<IForwarderErrorFeature>();
        if (error is not null)
        {
            var reactivationPeriod = cluster.Model.Config.HealthCheck?.Passive?.ReactivationPeriod ?? _defaultReactivationPeriod;
            _healthUpdater.SetPassive(cluster, destination, DestinationHealth.Unhealthy, reactivationPeriod);
        }
    }
}
```

## Available destination collection
Destinations health state is used to determine which of them are eligible for receiving proxied requests. Each cluster maintains its own list of available destinations on `AvailableDestinations` property of the ClusterDestinationState type. That list gets rebuilt when any destination's health state changes. The IClusterDestinationsUpdater controls that process and calls an IAvailableDestinationsPolicy configured on the cluster to actually choose the available destinations from the all cluster's destinations. There are the following built-in policies provided and custom ones can be implemented if necessary.

* `HealthyAndUnknown` - Inspects each `DestinationState` and adds it on the available destination list if all of the following statements are TRUE. If no destinations are available then requests will get a 503 error.
    * Active health checks are disabled on the cluster OR `DestinationHealthState.Active != DestinationHealth.Unhealthy`
    * Passive health checks are disabled on the cluster OR `DestinationHealthState.Passive != DestinationHealth.Unhealthy`
* `HealthyOrPanic` - Calls `HealthyAndUnknown` policy at first to get the available destinations. If none of them are returned from this call, it marks all cluster's destinations as available. This is the default policy.

**NOTE**: An available destination policy configured on a cluster will be always called regardless of if any health check is enabled on the given cluster. The health state of a disabled health check is set to `Unknown`.

### Configuration
#### File example
```json
"Clusters": {
  "cluster1": {    
    "HealthCheck": {
      "AvailableDestinationsPolicy": "HealthyOrPanic",
      "Passive": {
        "Enabled": "true"
      }
    },
    "Destinations": {
      "cluster1/destination1": {
        "Address": "https://localhost:10000/"
      },
      "cluster1/destination2": {
        "Address": "http://localhost:10010/"
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
            AvailableDestinationsPolicy = HealthCheckConstants.AvailableDestinations.HealthyOrPanic,
            Passive = new PassiveHealthCheckConfig
            {
                Enabled = true
            }
        },
        Destinations =
        {
            { "destination1", new DestinationConfig() { Address = "https://localhost:10000" } },
            { "destination2", new DestinationConfig() { Address = "https://localhost:10010" } }
        }
    }
};
```
