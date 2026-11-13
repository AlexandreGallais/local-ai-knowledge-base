---
title: "Kubernetes Deprecation Policy (part 2 of 2)"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/deprecation-policy.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# Kubernetes Deprecation Policy (part 2 of 2)

## Deprecating a feature or behavior

Occasionally a Kubernetes release needs to deprecate some feature or behavior
of the system that is not controlled by the API or CLI. In this case, the
rules for deprecation are as follows:

**Rule #7: Deprecated behaviors must function for no less than 1 year after their
announced deprecation.**

If the feature or behavior is being replaced with an alternative implementation
that requires work to adopt the change, there should be an effort to simplify
the transition whenever possible. If an alternative implementation is under
Kubernetes organization control, the following rules apply:

**Rule #8: The feature of behavior must not be deprecated in favor of an alternative
implementation that is less stable**

For example, a generally available feature cannot be deprecated in favor of a Beta replacement.
The Kubernetes project does, however, encourage users to adopt and transitions to alternative
implementations even before they reach the same maturity level. This is particularly important
for exploring new use cases of a feature or getting an early feedback on the replacement.

Alternative implementations may sometimes be external tools or products,
for example a feature may move from the kubelet to container runtime
that is not under Kubernetes project control. In such cases, the rule cannot be
applied, but there must be an effort to ensure that there is a transition path
that does not compromise on components' maturity levels. In the example with
container runtimes, the effort may involve trying to ensure that popular container runtimes
have versions that offer the same level of stability while implementing that replacement behavior.

Deprecation rules for features and behaviors do not imply that all changes
to the system are governed by this policy.
These rules apply only to significant, user-visible behaviors which impact the
correctness of applications running on Kubernetes or that impact the
administration of Kubernetes clusters, and which are being removed entirely.

An exception to the above rule is _feature gates_. Feature gates are key=value
pairs that allow for users to enable/disable experimental features.

Feature gates are intended to cover the development life cycle of a feature - they
are not intended to be long-term APIs. As such, they are expected to be deprecated
and removed after a feature becomes GA or is dropped.

As a feature moves through the stages, the associated feature gate evolves.
The feature life cycle matched to its corresponding feature gate is:

* Alpha: the feature gate is disabled by default and can be enabled by the user.
* Beta: the feature gate is enabled by default and can be disabled by the user.
* GA: the feature gate is deprecated (see "Deprecation") and becomes
  non-operational.
* GA, deprecation window complete: the feature gate is removed and calls to it are
  no longer accepted.

### Deprecation

Features can be removed at any point in the life cycle prior to GA. When features are
removed prior to GA, their associated feature gates are also deprecated.

When an invocation tries to disable a non-operational feature gate, the call fails in order
to avoid unsupported scenarios that might otherwise run silently.

In some cases, removing pre-GA features requires considerable time. Feature gates can remain
operational until their associated feature is fully removed, at which point the feature gate
itself can be deprecated.

When removing a feature gate for a GA feature also requires considerable time, calls to
feature gates may remain operational if the feature gate has no effect on the feature,
and if the feature gate causes no errors.

Features intended to be disabled by users should include a mechanism for disabling the
feature in the associated feature gate.

Versioning for feature gates is different from the previously discussed components,
therefore the rules for deprecation are as follows:

**Rule #9: Feature gates must be deprecated when the corresponding feature they control
transitions a lifecycle stage as follows. Feature gates must function for no less than:**

* **Beta feature to GA: 6 months or 2 releases (whichever is longer)**
* **Beta feature to EOL: 3 months or 1 release (whichever is longer)**
* **Alpha feature to EOL: 0 releases**

**Rule #10: Deprecated feature gates must respond with a warning when used. When a feature gate
is deprecated it must be documented in both in the release notes and the corresponding CLI help.
Both warnings and documentation must indicate whether a feature gate is non-operational.**

## Deprecating a metric

Each component of the Kubernetes control-plane exposes metrics (usually the
`/metrics` endpoint), which are typically ingested by cluster administrators.
Not all metrics are the same: some metrics are commonly used as SLIs or used
to determine SLOs, these tend to have greater import. Other metrics are more
experimental in nature or are used primarily in the Kubernetes development
process.

Accordingly, metrics fall under three stability classes (`ALPHA`, `BETA` `STABLE`);
this impacts removal of a metric during a Kubernetes release. These classes
are determined by the perceived importance of the metric. The rules for
deprecating and removing a metric are as follows:

**Rule #11a: Metrics, for the corresponding stability class, must function for no less than:**

* **STABLE: 4 releases or 12 months (whichever is longer)**
* **BETA: 2 releases or 8 months (whichever is longer)**
* **ALPHA: 0 releases**

**Rule #11b: Metrics, after their _announced deprecation_, must function for no less than:**

* **STABLE: 3 releases or 9 months (whichever is longer)**
* **BETA: 1 releases or 4 months (whichever is longer)**
* **ALPHA: 0 releases**

Deprecated metrics will have their description text prefixed with a deprecation notice
string '(Deprecated from x.y)' and a warning log will be emitted during metric
registration. Like their stable undeprecated counterparts, deprecated metrics will
be automatically registered to the metrics endpoint and therefore visible.

On a subsequent release (when the metric's `deprecatedVersion` is equal to
_current_kubernetes_version - 3_), a deprecated metric will become a _hidden_ metric.
**_Unlike_** their deprecated counterparts, hidden metrics will _no longer_ be
automatically registered to the metrics endpoint (hence hidden). However, they
can be explicitly enabled through a command line flag on the binary
(`--show-hidden-metrics-for-version=`). This provides cluster admins an
escape hatch to properly migrate off of a deprecated metric, if they were not
able to react to the earlier deprecation warnings. Hidden metrics should be
deleted after one release.

## Exceptions

No policy can cover every possible situation. This policy is a living
document, and will evolve over time. In practice, there will be situations
that do not fit neatly into this policy, or for which this policy becomes a
serious impediment. Such situations should be discussed with SIGs and project
leaders to find the best solutions for those specific cases, always bearing in
mind that Kubernetes is committed to being a stable system that, as much as
possible, never breaks users. Exceptions will always be announced in all
relevant release notes.
