---
title: "Pod Security Standards (part 1 of 2)"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/concepts/security/pod-security-standards.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# Pod Security Standards

The Pod Security Standards define three different _policies_ to broadly cover the security
spectrum. These policies are _cumulative_ and range from highly-permissive to highly-restrictive.
This guide outlines the requirements of each policy.

| Profile | Description |
| ------ | ----------- |
| Privileged | Unrestricted policy, providing the widest possible level of permissions. This policy allows for known privilege escalations. |
| Baseline | Minimally restrictive policy which prevents known privilege escalations. Allows the default (minimally specified) Pod configuration. |
| Restricted | Heavily restricted policy, following current Pod hardening best practices. |

## Profile Details

### Privileged

**The _Privileged_ policy is purposely-open, and entirely unrestricted.** This type of policy is
typically aimed at system- and infrastructure-level workloads managed by privileged, trusted users.

The Privileged policy is defined by an absence of restrictions. If you define a Pod where the Privileged
security policy applies, the Pod you define is able to bypass <example-value> container isolation mechanisms.
For example, you can define a Pod that has access to the node's host network.

### Baseline

**The _Baseline_ policy is aimed at ease of adoption for common containerized workloads while
preventing known privilege escalations.** This policy is targeted at application operators and
developers of non-critical applications. The following listed controls should be
enforced/disallowed:

**Note:**
In this table, wildcards (`*`) indicate all elements in a list. For example,
`spec.containers[*].securityContext` refers to the Security Context object for _all defined
containers_. If any of the listed containers fails to meet the requirements, the entire pod will
fail validation.

	Baseline policy specification

			 | Control
			 | Policy

			 | HostProcess
			 |
				Windows Pods offer the ability to run HostProcess containers which enables privileged access to the Windows host machine. Privileged access to the host is disallowed in the Baseline policy. **Feature state:** v1.26 [stable]
				Restricted Fields

					`spec.securityContext.windowsOptions.hostProcess`
					`spec.containers[*].securityContext.windowsOptions.hostProcess`
					`spec.initContainers[*].securityContext.windowsOptions.hostProcess`
					`spec.ephemeralContainers[*].securityContext.windowsOptions.hostProcess`

				Allowed Values

					Undefined/nil
					`false`

			 | Host Namespaces
			 |
				Sharing the host namespaces must be disallowed.
				Restricted Fields

					`spec.hostNetwork`
					`spec.hostPID`
					`spec.hostIPC`

				Allowed Values

					Undefined/nil
					`false`

			 | Privileged Containers
			 |
				Privileged Pods disable most security mechanisms and must be disallowed.
				Restricted Fields

					`spec.containers[*].securityContext.privileged`
					`spec.initContainers[*].securityContext.privileged`
					`spec.ephemeralContainers[*].securityContext.privileged`

				Allowed Values

					Undefined/nil
					`false`

			 | Capabilities
			 |
				Adding additional capabilities beyond those listed below must be disallowed.
				Restricted Fields

					`spec.containers[*].securityContext.capabilities.add`
					`spec.initContainers[*].securityContext.capabilities.add`
					`spec.ephemeralContainers[*].securityContext.capabilities.add`

				Allowed Values

					Undefined/nil
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

			 | HostPath Volumes
			 |
				HostPath volumes must be forbidden.
				Restricted Fields

					`spec.volumes[*].hostPath`

				Allowed Values

					Undefined/nil

			 | Host Ports
			 |
				HostPorts should be disallowed entirely (recommended) or restricted to a known list
				Restricted Fields

					`spec.containers[*].ports[*].hostPort`
					`spec.initContainers[*].ports[*].hostPort`
					`spec.ephemeralContainers[*].ports[*].hostPort`

				Allowed Values

					Undefined/nil
					Known list (not supported by the built-in Pod Security Admission controller)
					`0`

			 | Host Probes / Lifecycle Hooks (v1.34+)
			 |
				The Host field in probes and lifecycle hooks must be disallowed.
				Restricted Fields

					`spec.containers[*].livenessProbe.httpGet.host`
					`spec.containers[*].readinessProbe.httpGet.host`
					`spec.containers[*].startupProbe.httpGet.host`
					`spec.containers[*].livenessProbe.tcpSocket.host`
					`spec.containers[*].readinessProbe.tcpSocket.host`
					`spec.containers[*].startupProbe.tcpSocket.host`
					`spec.containers[*].lifecycle.postStart.tcpSocket.host`
					`spec.containers[*].lifecycle.preStop.tcpSocket.host`
					`spec.containers[*].lifecycle.postStart.httpGet.host`
					`spec.containers[*].lifecycle.preStop.httpGet.host`
					`spec.initContainers[*].livenessProbe.httpGet.host`
					`spec.initContainers[*].readinessProbe.httpGet.host`
					`spec.initContainers[*].startupProbe.httpGet.host`
					`spec.initContainers[*].livenessProbe.tcpSocket.host`
					`spec.initContainers[*].readinessProbe.tcpSocket.host`
					`spec.initContainers[*].startupProbe.tcpSocket.host`
					`spec.initContainers[*].lifecycle.postStart.tcpSocket.host`
					`spec.initContainers[*].lifecycle.preStop.tcpSocket.host`
					`spec.initContainers[*].lifecycle.postStart.httpGet.host`
					`spec.initContainers[*].lifecycle.preStop.httpGet.host`

				Allowed Values

					Undefined/nil
					""

			 | AppArmor
			 |
				On supported hosts, the `RuntimeDefault` AppArmor profile is applied by default. The baseline policy should prevent overriding or disabling the default AppArmor profile, or restrict overrides to an allowed set of profiles.
				Restricted Fields

					`spec.securityContext.appArmorProfile.type`
					`spec.containers[*].securityContext.appArmorProfile.type`
					`spec.initContainers[*].securityContext.appArmorProfile.type`
					`spec.ephemeralContainers[*].securityContext.appArmorProfile.type`

				Allowed Values

					Undefined/nil
					`RuntimeDefault`
					`Localhost`

					`metadata.annotations["container.apparmor.security.beta.kubernetes.io/*"]`

				Allowed Values

					Undefined/nil
					`runtime/default`
					`localhost/*`

			 | SELinux
			 |
				Setting the SELinux type is restricted, and setting a custom SELinux user or role option is forbidden.
				Restricted Fields

					`spec.securityContext.seLinuxOptions.type`
					`spec.containers[*].securityContext.seLinuxOptions.type`
					`spec.initContainers[*].securityContext.seLinuxOptions.type`
					`spec.ephemeralContainers[*].securityContext.seLinuxOptions.type`

				Allowed Values

					Undefined/""
					`container_t`
					`container_init_t`
					`container_kvm_t`
					`container_engine_t` (since Kubernetes 1.31)

				Restricted Fields

					`spec.securityContext.seLinuxOptions.user`
					`spec.containers[*].securityContext.seLinuxOptions.user`
					`spec.initContainers[*].securityContext.seLinuxOptions.user`
					`spec.ephemeralContainers[*].securityContext.seLinuxOptions.user`
					`spec.securityContext.seLinuxOptions.role`
					`spec.containers[*].securityContext.seLinuxOptions.role`
					`spec.initContainers[*].securityContext.seLinuxOptions.role`
					`spec.ephemeralContainers[*].securityContext.seLinuxOptions.role`

				Allowed Values

					Undefined/""

			 | `/proc` Mount Type
			 |
				The default `/proc` masks are set up to reduce attack surface, and should be required.
				Restricted Fields

					`spec.containers[*].securityContext.procMount`
					`spec.initContainers[*].securityContext.procMount`
					`spec.ephemeralContainers[*].securityContext.procMount`

				Allowed Values

					Undefined/nil
					`Default`

  			 | Seccomp
  			 |
  				Seccomp profile must not be explicitly set to `Unconfined`.
  				Restricted Fields

					`spec.securityContext.seccompProfile.type`
					`spec.containers[*].securityContext.seccompProfile.type`
					`spec.initContainers[*].securityContext.seccompProfile.type`
					`spec.ephemeralContainers[*].securityContext.seccompProfile.type`

				Allowed Values

					Undefined/nil
					`RuntimeDefault`
					`Localhost`

			 | Sysctls
			 |
				Sysctls can disable security mechanisms or affect all containers on a host, and should be disallowed except for an allowed "safe" subset. A sysctl is considered safe if it is namespaced in the container or the Pod, and it is isolated from other Pods or processes on the same Node.
				Restricted Fields

					`spec.securityContext.sysctls[*].name`

				Allowed Values

					Undefined/nil
					`kernel.shm_rmid_forced`
					`net.ipv4.ip_local_port_range`
					`net.ipv4.ip_unprivileged_port_start`
					`net.ipv4.tcp_syncookies`
					`net.ipv4.ping_group_range`
					`net.ipv4.ip_local_reserved_ports` (since Kubernetes 1.27)
					`net.ipv4.tcp_keepalive_time` (since Kubernetes 1.29)
					`net.ipv4.tcp_fin_timeout` (since Kubernetes 1.29)
					`net.ipv4.tcp_keepalive_intvl` (since Kubernetes 1.29)
					`net.ipv4.tcp_keepalive_probes` (since Kubernetes 1.29)
					`net.ipv4.tcp_rmem` (since Kubernetes 1.32)
					`net.ipv4.tcp_wmem` (since Kubernetes 1.32)
					`net.ipv4.tcp_slow_start_after_idle` (since Kubernetes 1.37)
					`net.ipv4.tcp_notsent_lowat` (since Kubernetes 1.37)

### Restricted

**The _Restricted_ policy is aimed at enforcing current Pod hardening best practices, at the
expense of some compatibility.** It is targeted at operators and developers of security-critical
applications, as well as lower-trust users. The following listed controls should be
enforced/disallowed:

**Note:**
In this table, wildcards (`*`) indicate all elements in a list. For example,
`spec.containers[*].securityContext` refers to the Security Context object for _all defined
containers_. If any of the listed containers fails to meet the requirements, the entire pod will
fail validation.

	Restricted policy specification

			 | Control
			 | Policy

			 | Everything from the Baseline policy

			 | Volume Types
			 |
				The Restricted policy only permits the following volume types.
				Restricted Fields

					`spec.volumes[*]`

				Allowed Values
				Every item in the `spec.volumes[*]` list must set one of the following fields to a non-null value:

					`spec.volumes[*].configMap`
					`spec.volumes[*].csi`
					`spec.volumes[*].downwardAPI`
					`spec.volumes[*].emptyDir`
					`spec.volumes[*].ephemeral`
					`spec.volumes[*].persistentVolumeClaim`
					`spec.volumes[*].projected`
					`spec.volumes[*].secret`

			 | Privilege Escalation (v1.8+)
			 |
				Privilege escalation (such as via set-user-ID or set-group-ID file mode) should not be allowed. This is Linux only policy in v1.25+ `(spec.os.name != windows)`
				Restricted Fields

					`spec.containers[*].securityContext.allowPrivilegeEscalation`
					`spec.initContainers[*].securityContext.allowPrivilegeEscalation`
					`spec.ephemeralContainers[*].securityContext.allowPrivilegeEscalation`

				Allowed Values

					`false`

			 | Running as Non-root
			 |
				Containers must be required to run as non-root users.
				Restricted Fields

					`spec.securityContext.runAsNonRoot`
					`spec.containers[*].securityContext.runAsNonRoot`
					`spec.initContainers[*].securityContext.runAsNonRoot`
					`spec.ephemeralContainers[*].securityContext.runAsNonRoot`

				Allowed Values

					`true`

					The container fields may be undefined/`nil` if the pod-level
					`spec.securityContext.runAsNonRoot` is set to `true`.

			 | Running as Non-root user (v1.23+)
			 |
				Containers must not set <tt>runAsUser</tt> to 0
				Restricted Fields

					`spec.securityContext.runAsUser`
				    `spec.containers[*].securityContext.runAsUser`
					`spec.initContainers[*].securityContext.runAsUser`
					`spec.ephemeralContainers[*].securityContext.runAsUser`

				Allowed Values

					any non-zero value
					`undefined/null`

  			 | Seccomp (v1.19+)
  			 |
  				Seccomp profile must be explicitly set to one of the allowed values. Both the `Unconfined` profile and the absence of a profile are prohibited. This is Linux only policy in v1.25+ `(spec.os.name != windows)`
  				Restricted Fields

					`spec.securityContext.seccompProfile.type`
					`spec.containers[*].securityContext.seccompProfile.type`
					`spec.initContainers[*].securityContext.seccompProfile.type`
					`spec.ephemeralContainers[*].securityContext.seccompProfile.type`

				Allowed Values

					`RuntimeDefault`
					`Localhost`

					The container fields may be undefined/`nil` if the pod-level
					`spec.securityContext.seccompProfile.type` field is set appropriately.
					Conversely, the pod-level field may be undefined/`nil` if _all_ container-
					level fields are set.

			 | Capabilities (v1.22+)
			 |

					Containers must drop `ALL` capabilities, and are only permitted to add back
 					the `NET_BIND_SERVICE` capability. This is Linux only policy in v1.25+ `(.spec.os.name != "windows")`

				Restricted Fields

					`spec.containers[*].securityContext.capabilities.drop`
					`spec.initContainers[*].securityContext.capabilities.drop`
					`spec.ephemeralContainers[*].securityContext.capabilities.drop`

				Allowed Values

					Any list of capabilities that includes `ALL`

				Restricted Fields

					`spec.containers[*].securityContext.capabilities.add`
					`spec.initContainers[*].securityContext.capabilities.add`
					`spec.ephemeralContainers[*].securityContext.capabilities.add`

				Allowed Values

					Undefined/nil
					`NET_BIND_SERVICE`

## Policy Instantiation

Decoupling policy definition from policy instantiation allows for a common understanding and
consistent language of policies across clusters, independent of the underlying enforcement
mechanism.

As mechanisms mature, they will be defined below on a per-policy basis. The methods of enforcement
of individual policies are not defined here.

**Pod Security Admission Controller**

- Privileged namespace
- Baseline namespace
- Restricted namespace

### Alternatives

Other alternatives for enforcing policies are being developed in the Kubernetes ecosystem, such as:

- Kubewarden
- Kyverno
- OPA Gatekeeper
