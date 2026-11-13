---
title: "kubeadm Configuration (v1beta4) (part 4 of 4)"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/config-api/kubeadm-config.v1beta4.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# kubeadm Configuration (v1beta4) (part 4 of 4)

## `UpgradeApplyConfiguration`     {#kubeadm-k8s-io-v1beta4-UpgradeApplyConfiguration}

**Appears in:**

- UpgradeConfiguration

UpgradeApplyConfiguration contains a list of configurable options which are specific to the  "kubeadm upgrade apply" command.

 | Field | Description

 | `kubernetesVersion`
`string`

 |
   `kubernetesVersion` is the target version of the control plane.

 | `allowExperimentalUpgrades`
`bool`

 |
   `allowExperimentalUpgrades` instructs kubeadm to show unstable versions of Kubernetes as an upgrade
alternative and allows upgrading to an alpha/beta/release candidate version of Kubernetes.
Default: false

 | `allowRCUpgrades`
`bool`

 |
   Enable `allowRCUpgrades` will show release candidate versions of Kubernetes as an upgrade alternative and
allows upgrading to a release candidate version of Kubernetes.

 | `certificateRenewal`
`bool`

 |
   `certificateRenewal` instructs kubeadm to execute certificate renewal during upgrades.
Defaults to true.

 | `dryRun`
`bool`

 |
   `dryRun` tells if the dry run mode is enabled, don't apply any change if it is and just output
what would be done.

 | `etcdUpgrade`
`bool`

 |
   `etcdUpgrade` instructs kubeadm to execute etcd upgrade during upgrades.
Defaults to true.

 | `forceUpgrade`
`bool`

 |
   `forceUpgrade` flag instructs kubeadm to upgrade the cluster without prompting for confirmation.

 | `ignorePreflightErrors`
`[]string`

 |
   `ignorePreflightErrors` provides a slice of pre-flight errors to be ignored during the upgrade process,
e.g. `IsPrivilegedUser,Swap`. Value `all` ignores errors from all checks.

 | `patches`
`Patches`

 |
   `patches` contains options related to applying patches to components deployed by kubeadm during `kubeadm upgrade`.

 | `printConfig`
`bool`

 |
   `printConfig` specifies whether the configuration file that will be used in the upgrade should be printed or not.

 | `skipPhases` [Required]
`[]string`

 |
   `skipPhases` is a list of phases to skip during command execution.
NOTE: This field is currently ignored for `kubeadm upgrade apply`, but in the future it will be supported.

 | `imagePullPolicy`
`core/v1.PullPolicy`

 |
   `imagePullPolicy` specifies the policy for image pulling during `kubeadm upgrade apply` operations.
The value of this field must be one of "Always", "IfNotPresent" or "Never".
If this field is unset kubeadm will default it to "IfNotPresent", or pull the required images if not present on the host.

 | `imagePullSerial`
`bool`

 |
   `imagePullSerial` specifies if image pulling performed by kubeadm must be done serially or in parallel.
Default: true

## `UpgradeDiffConfiguration`     {#kubeadm-k8s-io-v1beta4-UpgradeDiffConfiguration}

**Appears in:**

- UpgradeConfiguration

UpgradeDiffConfiguration contains a list of configurable options which are specific to the `kubeadm upgrade diff` command.

 | Field | Description

 | `kubernetesVersion`
`string`

 |
   `kubernetesVersion` is the target version of the control plane.

 | `contextLines`
`int`

 |
   `diffContextLines` is the number of lines of context in the diff.

## `UpgradeNodeConfiguration`     {#kubeadm-k8s-io-v1beta4-UpgradeNodeConfiguration}

**Appears in:**

- UpgradeConfiguration

UpgradeNodeConfiguration contains a list of configurable options which are specific to the "kubeadm upgrade node" command.

 | Field | Description

 | `certificateRenewal`
`bool`

 |
   `certificateRenewal` instructs kubeadm to execute certificate renewal during upgrades.
Defaults to true.

 | `dryRun`
`bool`

 |
   `dryRun` tells if the dry run mode is enabled, don't apply any change if it is and just output what would be done.

 | `etcdUpgrade`
`bool`

 |
   `etcdUpgrade` instructs kubeadm to execute etcd upgrade during upgrades.
Defaults to true.

 | `ignorePreflightErrors`
`[]string`

 |
   `ignorePreflightErrors` provides a slice of pre-flight errors to be ignored during the upgrade process,
e.g. 'IsPrivilegedUser,Swap'. Value 'all' ignores errors from all checks.

 | `skipPhases`
`[]string`

 |
   `skipPhases` is a list of phases to skip during command execution.
The list of phases can be obtained with the `kubeadm upgrade node phase --help` command.

 | `patches`
`Patches`

 |
   `patches` contains options related to applying patches to components deployed by kubeadm during `kubeadm upgrade`.

 | `imagePullPolicy`
`core/v1.PullPolicy`

 |
   `imagePullPolicy` specifies the policy for image pulling during `kubeadm upgrade node` operations.
The value of this field must be one of "Always", "IfNotPresent" or "Never".
If this field is unset kubeadm will default it to "IfNotPresent", or pull the required images if not present on the host.

 | `imagePullSerial`
`bool`

 |
   `imagePullSerial` specifies if image pulling performed by kubeadm must be done serially or in parallel.
Default: true

## `UpgradePlanConfiguration`     {#kubeadm-k8s-io-v1beta4-UpgradePlanConfiguration}

**Appears in:**

- UpgradeConfiguration

UpgradePlanConfiguration contains a list of configurable options which are specific to the "kubeadm upgrade plan" command.

 | Field | Description

 | `kubernetesVersion` [Required]
`string`

 |
   `kubernetesVersion` is the target version of the control plane.

 | `allowExperimentalUpgrades`
`bool`

 |
   `allowExperimentalUpgrades` instructs kubeadm to show unstable versions of Kubernetes as an upgrade
alternative and allows upgrading to an alpha/beta/release candidate version of Kubernetes.
Default: false

 | `allowRCUpgrades`
`bool`

 |
   Enable `allowRCUpgrades` will show release candidate versions of Kubernetes as an upgrade alternative and
allows upgrading to a release candidate version of Kubernetes.

 | `dryRun`
`bool`

 |
   `dryRun` tells if the dry run mode is enabled, don't apply any change if it is and just output what would be done.

 | `etcdUpgrade`
`bool`

 |
   `etcdUpgrade` instructs kubeadm to execute etcd upgrade during upgrades.
Defaults to true.

 | `ignorePreflightErrors`
`[]string`

 |
   `ignorePreflightErrors` provides a slice of pre-flight errors to be ignored during the upgrade process,
e.g. 'IsPrivilegedUser,Swap'. Value 'all' ignores errors from all checks.

 | `printConfig`
`bool`

 |
   `printConfig` specifies whether the configuration file that will be used in the upgrade should be printed or not.
