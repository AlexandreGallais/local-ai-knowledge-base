---
title: "Manifest-Based Admission Control (part 2 of 2)"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/access-authn-authz/manifest-admission-control.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# Manifest-Based Admission Control (part 2 of 2)

## File watching and dynamic reloading {#dynamic-reloading}

The kube-apiserver watches the configured directories for changes:

1. **Initial load**: At startup, all configured paths are read and validated.
   The API server does not become ready until all manifests are loaded
   successfully. Invalid manifests cause startup failure.

1. **Runtime reloading**: Changes to manifest files trigger a reload cycle:
   - File modifications are detected using
     fsnotify with a polling fallback
     (default 1 minute interval), similar to other config file reloading in
     kube-apiserver.
   - A content hash of all manifest files is computed on each check. If the hash
     is unchanged, no reload occurs.
   - New configurations are validated before being applied.
   - If validation fails, the error is logged, metrics are updated, and the
     previous valid configuration is retained.
   - Successful reloads atomically replace the previous configuration.

1. **Atomic file updates**: To avoid partial reads during file writes, make
   changes atomically (for example, write to a temporary file and rename it).
   This is especially important when updating mounted ConfigMaps or Secrets in
   containerized environments.

**Caution:**
If an invalid manifest file is present at startup, the API server does not
start. At runtime, if a reload fails due to validation errors, the previous
valid configuration is retained and the error is logged.

## Observability {#observability}

### Metrics

Manifest-based admission control provides the following metrics for monitoring
reload health:

| Type | Description | Metric |
|:-----|:------------|:-------|
| Counter | Total number of reload attempts, with `status` (`success` or `failure`), `plugin`, and `apiserver_id_hash` labels. | `apiserver_manifest_admission_config_controller_automatic_reloads_total` |
| Gauge | Timestamp of the last reload attempt, with `status`, `plugin`, and `apiserver_id_hash` labels. | `apiserver_manifest_admission_config_controller_automatic_reload_last_timestamp_seconds` |
| Gauge | Current configuration information (value is always 1), with `plugin`, `apiserver_id_hash`, and `hash` labels. Use the `hash` label to detect configuration drift across API servers. | `apiserver_manifest_admission_config_controller_last_config_info` |

The `plugin` label identifies which admission plugin the metric applies to:
`ValidatingAdmissionWebhook`, `MutatingAdmissionWebhook`,
`ValidatingAdmissionPolicy`, or `MutatingAdmissionPolicy`.

Since manifest-based objects have names ending in `.static.k8s.io`, existing
admission metrics (such as `apiserver_admission_webhook_rejection_count`) can
identify manifest-based decisions by filtering on the `name` label.

### Audit annotations

Existing audit annotations (such as
`validation.policy.admission.k8s.io/validation_failure` and
`mutation.webhook.admission.k8s.io/round_0_index_0`) include the object name.
You can identify manifest-based admission decisions by filtering for names
ending in `.static.k8s.io`.

## High availability considerations {#ha-considerations}

Each kube-apiserver instance loads its own manifest files independently. In
high availability setups with multiple API server instances:

- Each API server must be configured individually. There is no cross-apiserver
  synchronization of manifest-based configurations.
- Use external configuration management tools (such as Ansible, Puppet, or
  shared storage mounts) to keep manifest files consistent across instances.
- The `apiserver_manifest_admission_config_controller_last_config_info` metric
  exposes a `hash` label that you can use to detect configuration drift across
  API server instances.

This behavior is similar to other file-based kube-apiserver configurations such as
encryption at rest and
authentication.

## Upgrade and downgrade {#upgrade-downgrade}

**Upgrade**: Enabling the feature and providing manifest configuration is
opt-in. Existing clusters without manifest configuration see no behavioral
change.

**Downgrade**: Before downgrading to a version without this feature:

1. Remove `staticManifestsDir` entries from the `AdmissionConfiguration` file.
1. If relying on manifest-based policies, recreate them as API objects where
   possible.
1. Restart the kube-apiserver.

**Warning:**
Downgrading without removing the `staticManifestsDir` configuration causes the
API server to fail to start due to unknown configuration fields.

## Troubleshooting {#troubleshooting}

| Symptom | Possible cause | Resolution |
|:--------|:--------------|:-----------|
| API server fails to start | Invalid manifest file at startup | Check API server logs for validation errors. Fix the manifest file and restart. |
| API server fails to start | Duplicate object names across manifest files | Ensure all object names within a plugin's `staticManifestsDir` are unique. |
| Policies not enforced after file update | Reload validation failure | Check `automatic_reloads_total{status="failure"}` metric and API server logs. Fix the manifest and wait for the next reload cycle. |
| Webhook requests failing | Webhook URL not reachable | Verify that the URL specified in `clientConfig.url` is accessible from the kube-apiserver. |
| Cannot create API objects with `.static.k8s.io` suffix | Name suffix reserved by feature gate | The `.static.k8s.io` suffix is reserved for manifest-based configurations when the feature gate is enabled. Use a different name for API-based objects. |

## What's next

- Learn about ValidatingAdmissionPolicy
  for CEL-based validation policies.
- Learn about MutatingAdmissionPolicy
  for CEL-based mutation policies.
- Learn about Dynamic Admission Control
  for webhook-based admission control.
- Read the KEP-5793
  design document.
