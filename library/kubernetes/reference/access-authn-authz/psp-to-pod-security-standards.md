---
title: "Mapping PodSecurityPolicies to Pod Security Standards"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/access-authn-authz/psp-to-pod-security-standards.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# Mapping PodSecurityPolicies to Pod Security Standards

The tables below enumerate the configuration parameters on
`PodSecurityPolicy` objects, whether the field mutates
and/or validates pods, and how the configuration values map to the
Pod Security Standards.

For each applicable parameter, the allowed values for the
Baseline and
Restricted profiles are listed.
Anything outside the allowed values for those profiles would fall under the
Privileged profile. "No opinion"
means all values are allowed under all Pod Security Standards.

For a step-by-step migration guide, see
Migrate from PodSecurityPolicy to the Built-In PodSecurity Admission Controller.

## PodSecurityPolicy Spec

The fields enumerated in this table are part of the `PodSecurityPolicySpec`, which is specified
under the `.spec` field path.

  Mapping PodSecurityPolicySpec fields to Pod Security Standards

       | `PodSecurityPolicySpec`
       | Type
       | Pod Security Standards Equivalent

       | `privileged`
       | Validating
       | Baseline & Restricted: `false` / undefined / nil

       | `defaultAddCapabilities`
       | Mutating & Validating
       | Requirements match `allowedCapabilities` below.

       | `allowedCapabilities`
       | Validating
       |
        Baseline: subset of

          `AUDIT_WRITE`
          `CHOWN`
          `DAC_OVERRIDE`
          `FOWNER`
          `FSETID`
          `KILL`
          `MKNOD`
          `NET_BIND_SERVICE`
          `SETFCAP`
          `SETGID`
          `SETPCAP`
          `SETUID`
          `SYS_CHROOT`

        Restricted: empty / undefined / nil OR a list containing only `NET_BIND_SERVICE`

       | `requiredDropCapabilities`
       | Mutating & Validating
       |
        Baseline: no opinion
        Restricted: must include `ALL`

       | `volumes`
       | Validating
       |
        Baseline: anything except

          `hostPath`
          `*`

        Restricted: subset of

          `configMap`
          `csi`
          `downwardAPI`
          `emptyDir`
          `ephemeral`
          `persistentVolumeClaim`
          `projected`
          `secret`

       | `hostNetwork`
       | Validating
       | Baseline & Restricted: `false` / undefined / nil

       | `hostPorts`
       | Validating
       | Baseline & Restricted: undefined / nil / empty

       | `hostPID`
       | Validating
       | Baseline & Restricted: `false` / undefined / nil

       | `hostIPC`
       | Validating
       | Baseline & Restricted: `false` / undefined / nil

       | `seLinux`
       | Mutating & Validating
       |
        Baseline & Restricted:
        `seLinux.rule` is `MustRunAs`, with the following `options`

          `user` is unset (`""` / undefined / nil)
          `role` is unset (`""` / undefined / nil)
          `type` is unset or one of: `container_t, container_init_t, container_kvm_t, container_engine_t`
          `level` is anything

       | `runAsUser`
       | Mutating & Validating
       |
        Baseline: Anything
        Restricted: `rule` is `MustRunAsNonRoot`

       | `runAsGroup`
       | Mutating (MustRunAs) & Validating
       |
        No opinion

       | `supplementalGroups`
       | Mutating & Validating
       |
        No opinion

       | `fsGroup`
       | Mutating & Validating
       |
        No opinion

       | `readOnlyRootFilesystem`
       | Mutating & Validating
       |
        No opinion

       | `defaultAllowPrivilegeEscalation`
       | Mutating
       |
        No opinion (non-validating)

       | `allowPrivilegeEscalation`
       | Mutating & Validating
       |
        Only mutating if set to `false`
        Baseline: No opinion
        Restricted: `false`

       | `allowedHostPaths`
       | Validating
       | No opinion (volumes takes precedence)

       | `allowedFlexVolumes`
       | Validating
       | No opinion (volumes takes precedence)

       | `allowedCSIDrivers`
       | Validating
       | No opinion (volumes takes precedence)

       | `allowedUnsafeSysctls`
       | Validating
       | Baseline & Restricted: undefined / nil / empty

       | `forbiddenSysctls`
       | Validating
       | No opinion

       | `allowedProcMountTypes`(alpha feature)
       | Validating
       | Baseline & Restricted: `["Default"]` OR undefined / nil / empty

       | `runtimeClass`` .defaultRuntimeClassName`
       | Mutating
       | No opinion

       | `runtimeClass`` .allowedRuntimeClassNames`
       | Validating
       | No opinion

## PodSecurityPolicy annotations

The annotations enumerated in this
table can be specified under `.metadata.annotations` on the PodSecurityPolicy object.

  Mapping PodSecurityPolicy annotations to Pod Security Standards

       | `PSP Annotation`
       | Type
       | Pod Security Standards Equivalent

       | `seccomp.security.alpha.kubernetes.io``/defaultProfileName`
       | Mutating
       | No opinion

       | `seccomp.security.alpha.kubernetes.io``/allowedProfileNames`
       | Validating
       |
        Baseline: `"runtime/default,"` (Trailing comma to allow unset)
        Restricted: `"runtime/default"` (No trailing comma)
        `localhost/*` values are also permitted for both Baseline & Restricted.

       | `apparmor.security.beta.kubernetes.io``/defaultProfileName`
       | Mutating
       | No opinion

       | `apparmor.security.beta.kubernetes.io``/allowedProfileNames`
       | Validating
       |
        Baseline: `"runtime/default,"` (Trailing comma to allow unset)
        Restricted: `"runtime/default"` (No trailing comma)
        `localhost/*` values are also permitted for both Baseline & Restricted.
