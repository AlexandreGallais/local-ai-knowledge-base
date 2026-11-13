---
title: "Configure Liveness, Readiness and Startup Probes (part 2 of 2)"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/tasks/configure-pod-container/configure-liveness-readiness-startup-probes.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# Configure Liveness, Readiness and Startup Probes (part 2 of 2)

## Define readiness probes

Sometimes, applications are temporarily unable to serve traffic.
For example, an application might need to load large data or configuration
files during startup, or depend on external services after startup.
In such cases, you don't want to kill the application,
but you don't want to send it requests either. Kubernetes provides
readiness probes to detect and mitigate these situations. A pod with containers
reporting that they are not ready does not receive traffic through Kubernetes
Services.

**Note:**
Readiness probes run on the container during its whole lifecycle.

**Caution:**
The readiness and liveness probes do not depend on each other to succeed.
If you want to wait before executing a readiness probe, you should use
`initialDelaySeconds` or a `startupProbe`.

Readiness probes are configured similarly to liveness probes. The only difference
is that you use the `readinessProbe` field instead of the `livenessProbe` field.

```yaml
readinessProbe:
  exec:
    command:
    - /bin/cat
    - /tmp/healthy
  initialDelaySeconds: 5
  periodSeconds: 5
```

Configuration for HTTP and TCP readiness probes also remains identical to
liveness probes.

Readiness and liveness probes can be used in parallel for the same container.
Using both can ensure that traffic does not reach a container that is not ready
for it, and that containers are restarted when they fail.

## What's next

* Learn more about
  Liveness, Readiness and Startup Probes.
* For the full specification of probe-related fields, see the API reference:
  Pod,
  Container,
  Probe
