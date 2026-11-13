---
title: "Scheduler Configuration (part 3 of 3)"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/scheduling/config.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# Scheduler Configuration (part 3 of 3)

### Plugins that apply to multiple extension points {#multipoint}

Starting from `kubescheduler.config.k8s.io/v1beta3`, there is an additional field in the
profile config, `multiPoint`, which allows for easily enabling or disabling a plugin
across several extension points. The intent of `multiPoint` config is to simplify the
configuration needed for users and administrators when using custom profiles.

Consider a plugin, `MyPlugin`, which implements the `preScore`, `score`, `preFilter`,
and `filter` extension points. To enable `MyPlugin` for all its available extension
points, the profile config looks like:

```yaml
apiVersion: kubescheduler.config.k8s.io/v1
kind: KubeSchedulerConfiguration
profiles:
  - schedulerName: multipoint-scheduler
    plugins:
      multiPoint:
        enabled:
        - name: MyPlugin
```

This would equate to manually enabling `MyPlugin` for all of its extension
points, like so:

```yaml
apiVersion: kubescheduler.config.k8s.io/v1
kind: KubeSchedulerConfiguration
profiles:
  - schedulerName: non-multipoint-scheduler
    plugins:
      preScore:
        enabled:
        - name: MyPlugin
      score:
        enabled:
        - name: MyPlugin
      preFilter:
        enabled:
        - name: MyPlugin
      filter:
        enabled:
        - name: MyPlugin
```

One benefit of using `multiPoint` here is that if `MyPlugin` implements another
extension point in the future, the `multiPoint` config will automatically enable it
for the new extension.

Specific extension points can be excluded from `MultiPoint` expansion using
the `disabled` field for that extension point. This works with disabling default
plugins, non-default plugins, or with the wildcard (`'*'`) to disable all plugins.
An example of this, disabling `Score` and `PreScore`, would be:

```yaml
apiVersion: kubescheduler.config.k8s.io/v1
kind: KubeSchedulerConfiguration
profiles:
  - schedulerName: non-multipoint-scheduler
    plugins:
      multiPoint:
        enabled:
        - name: 'MyPlugin'
      preScore:
        disabled:
        - name: '*'
      score:
        disabled:
        - name: '*'
```

Starting from `kubescheduler.config.k8s.io/v1beta3`, all default plugins
are enabled internally through `MultiPoint`.
However, individual extension points are still available to allow flexible
reconfiguration of the default values (such as ordering and Score weights). For
example, consider two Score plugins `DefaultScore1` and `DefaultScore2`, each with
a weight of `1`. They can be reordered with different weights like so:

```yaml
apiVersion: kubescheduler.config.k8s.io/v1
kind: KubeSchedulerConfiguration
profiles:
  - schedulerName: multipoint-scheduler
    plugins:
      score:
        enabled:
        - name: 'DefaultScore2'
          weight: 5
```

In this example, it's unnecessary to specify the plugins in `MultiPoint` explicitly
because they are default plugins. And the only plugin specified in `Score` is `DefaultScore2`.
This is because plugins set through specific extension points will always take precedence
over `MultiPoint` plugins. So, this snippet essentially re-orders the two plugins
without needing to specify both of them.

The general hierarchy for precedence when configuring `MultiPoint` plugins is as follows:
1. Specific extension points run first, and their settings override whatever is set elsewhere
2. Plugins manually configured through `MultiPoint` and their settings
3. Default plugins and their default settings

To demonstrate the above hierarchy, the following example is based on these plugins:
| Plugin             | Extension Points  |
| ------------------ | ----------------- |
| `DefaultQueueSort` | `QueueSort`       |
| `CustomQueueSort`  | `QueueSort`       |
| `DefaultPlugin1`   | `Score`, `Filter` |
| `DefaultPlugin2`   | `Score`           |
| `CustomPlugin1`    | `Score`, `Filter` |
| `CustomPlugin2`    | `Score`, `Filter` |

A valid sample configuration for these plugins would be:

```yaml
apiVersion: kubescheduler.config.k8s.io/v1
kind: KubeSchedulerConfiguration
profiles:
  - schedulerName: multipoint-scheduler
    plugins:
      multiPoint:
        enabled:
        - name: 'CustomQueueSort'
        - name: 'CustomPlugin1'
          weight: 3
        - name: 'CustomPlugin2'
        disabled:
        - name: 'DefaultQueueSort'
      filter:
        disabled:
        - name: 'DefaultPlugin1'
      score:
        enabled:
        - name: 'DefaultPlugin2'
```

Note that there is no error for re-declaring a `MultiPoint` plugin in a specific
extension point. The re-declaration is ignored (and logged), as specific extension points
take precedence.

Besides keeping most of the config in one spot, this sample does a few things:
* Enables the custom `queueSort` plugin and disables the default one
* Enables `CustomPlugin1` and `CustomPlugin2`, which will run first for all of their extension points
* Disables `DefaultPlugin1`, but only for `filter`
* Reorders `DefaultPlugin2` to run first in `score` (even before the custom plugins)

In versions of the config before `v1beta3`, without `multiPoint`, the above snippet would equate to this:

```yaml
apiVersion: kubescheduler.config.k8s.io/v1beta2
kind: KubeSchedulerConfiguration
profiles:
  - schedulerName: multipoint-scheduler
    plugins:

      # Disable the default QueueSort plugin
      queueSort:
        enabled:
        - name: 'CustomQueueSort'
        disabled:
        - name: 'DefaultQueueSort'

      # Enable custom Filter plugins
      filter:
        enabled:
        - name: 'CustomPlugin1'
        - name: 'CustomPlugin2'
        disabled:
        - name: 'DefaultPlugin1'

      # Enable and reorder custom score plugins
      score:
        enabled:
        - name: 'DefaultPlugin2'
          weight: 1
        - name: 'DefaultPlugin1'
          weight: 1
        - name: 'CustomPlugin1'
          weight: 3
        - name: 'CustomPlugin2'
          weight: 1
```

While this is a complicated example, it demonstrates the flexibility of `MultiPoint` config
as well as its seamless integration with the existing methods for configuring extension points.

## What's next

* Read the kube-scheduler reference
* Learn about scheduling
* Read the kube-scheduler configuration (v1) reference
