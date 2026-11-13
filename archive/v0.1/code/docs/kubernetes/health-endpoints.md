---
id: kubernetes-health-endpoints
title: ASP.NET Core health endpoints and probes
topic: kubernetes
summary: Health check endpoints in ASP.NET Core and the startup, liveness and readiness probes that call them. .NET 10.
tool: dotnet
version: "10"
checked: 2026-11-13
sources: [S1, S2]
license: MIT, written for this base from CC BY 4.0 sources
variant: files
---

# ASP.NET Core health endpoints and probes

Contents: 1. Probes · 2. Endpoints · 3. Probe settings · Sources

## 1. Three probes (Kubernetes startup, liveness and readiness)

- Until the startup probe succeeds, the two others do not run. [S2]
- A failed readiness probe removes the Pod from the endpoints of the Service, at any time of its life. [S2]
- A liveness probe that is too strict restarts Pods under load, then overloads the Pods left. [S2]
- An `exec` probe creates processes at each pass: prefer `httpGet`. [S2]

## 2. Health endpoints (ASP.NET Core health checks)

- Register checks with `AddHealthChecks` and map endpoints with `MapHealthChecks`. [S1]
- Answer 200 when healthy or degraded, 503 otherwise. The checks run at each call. [S1]
- Keep `/healthz/live` without checks: it tells that the process answers. Filter the checks of `/healthz/ready` by tag. [S1]

```csharp
builder.Services.AddHealthChecks()
    .AddCheck("database", () => HealthCheckResult.Healthy(), tags: ["ready"]);

WebApplication app = builder.Build();
app.MapHealthChecks("/healthz/live", new HealthCheckOptions { Predicate = _ => false });
app.MapHealthChecks("/healthz/ready", new HealthCheckOptions { Predicate = check => check.Tags.Contains("ready") });
```

## 3. Probe settings (Deployment)

```yaml
startupProbe:
  httpGet:
    path: /healthz/live
    port: 8080
  periodSeconds: 5
  failureThreshold: 30
livenessProbe:
  httpGet:
    path: /healthz/live
    port: 8080
  periodSeconds: 10
  failureThreshold: 3
readinessProbe:
  httpGet:
    path: /healthz/ready
    port: 8080
  periodSeconds: 5
  failureThreshold: 3
```

- The startup probe above gives 150 seconds to start (30 tries of 5 seconds). Set it from the real start time.
- Never put a database check in the liveness probe: a slow database would restart every Pod.

## Sources

- [S1] Microsoft, "Health checks in ASP.NET Core", <https://learn.microsoft.com/aspnet/core/host-and-deploy/health-checks>, read 2026-11-12, CC BY 4.0, adapted.
- [S2] Kubernetes, "Liveness, Readiness, and Startup Probes", <https://kubernetes.io/docs/concepts/workloads/pods/probes/>, read 2026-11-12, CC BY 4.0, summarized.
