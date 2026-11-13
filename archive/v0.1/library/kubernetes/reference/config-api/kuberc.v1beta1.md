---
title: "kuberc (v1beta1)"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/config-api/kuberc.v1beta1.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# kuberc (v1beta1)

## Resource Types

- Preference

## `Preference`     {#kubectl-config-k8s-io-v1beta1-Preference}

Preference stores elements of KubeRC configuration file

 | Field | Description

 | `apiVersion`string | `kubectl.config.k8s.io/v1beta1`

 | `kind`string | `Preference`

 | `defaults` [Required]
`[]CommandDefaults`

 |
   defaults allow changing default option values of commands.
This is especially useful, when user doesn't want to explicitly
set options each time.

 | `aliases` [Required]
`[]AliasOverride`

 |
   aliases allow defining command aliases for existing kubectl commands, with optional default option values.
If the alias name collides with a built-in command, built-in command always takes precedence.
Option overrides defined in the defaults section do NOT apply to aliases for the same command.
kubectl [ALIAS NAME] [USER_OPTIONS] [USER_EXPLICIT_ARGS] expands to
kubectl [COMMAND] # built-in command alias points to
[KUBERC_PREPEND_ARGS]
[USER_OPTIONS]
[KUBERC_OPTIONS] # rest of the options that are not passed by user in [USER_OPTIONS]
[USER_EXPLICIT_ARGS]
[KUBERC_APPEND_ARGS]
e.g.

name: runx
command: run
options:

name: image
default: nginx
appendArgs:

custom-arg1
For example, if user invokes "kubectl runx test-pod" command,
this will be expanded to "kubectl run --image=nginx test-pod -- custom-arg1"

name: getn
command: get
options:

name: output
default: wide
prependArgs:
node
"kubectl getn control-plane-1" expands to "kubectl get node control-plane-1 --output=wide"
"kubectl getn control-plane-1 --output=json" expands to "kubectl get node --output=json control-plane-1"

 | `credentialPluginPolicy`
`CredentialPluginPolicy`

 |
   credentialPluginPolicy specifies the policy governing which, if any, client-go
credential <example-value> may be executed. It MUST be one of { "", "AllowAll", "DenyAll", "Allowlist" }.
If the policy is "", then it falls back to "AllowAll" (this is required
to maintain backward compatibility). If the policy is DenyAll, no
credential <example-value> may run. If the policy is Allowlist, only those
plugins meeting the criteria specified in the `credentialPluginAllowlist`
field may run.

 | `credentialPluginAllowlist`
`[]AllowlistEntry`

 |
   Allowlist is a slice of allowlist entries. If any of them is a match,
then the executable in question may execute. That is, the result is the
logical OR of all entries in the allowlist. This list MUST NOT be
supplied if the policy is not "Allowlist".
e.g.
credentialPluginAllowlist:

name: cloud-provider-plugin
name: /usr/local/bin/my-plugin
In the above example, the user allows the credential <example-value>
`cloud-provider-plugin` (found somewhere in PATH), and the plugin found
at the explicit path `/usr/local/bin/my-plugin`.

## `AliasOverride`     {#kubectl-config-k8s-io-v1beta1-AliasOverride}

**Appears in:**

- Preference

AliasOverride stores the alias definitions.

 | Field | Description

 | `name` [Required]
`string`

 |
   name is the name of alias that can only include alphabetical characters
If the alias name conflicts with the built-in command,
built-in command will be used.

 | `command` [Required]
`string`

 |
   command is the single or set of commands to execute, such as "set env" or "create"

 | `prependArgs` [Required]
`[]string`

 |
   prependArgs stores the arguments such as resource names, etc.
These arguments are inserted after the alias name.

 | `appendArgs` [Required]
`[]string`

 |
   appendArgs stores the arguments such as resource names, etc.
These arguments are appended to the USER_ARGS.

 | `options` [Required]
`[]CommandOptionDefault`

 |
   options is allocated to store the option definitions of alias.
options only modify the default value of the option and if
user explicitly passes a value, explicit one is used.

## `AllowlistEntry`     {#kubectl-config-k8s-io-v1beta1-AllowlistEntry}

**Appears in:**

- Preference

AllowlistEntry is an entry in the allowlist. For each allowlist item, at
least one field must be nonempty. A struct with all empty fields is
considered a misconfiguration error. Each field is a criterion for
execution. If multiple fields are specified, then the criteria of all
specified fields must be met. That is, the result of an individual entry is
the logical AND of all checks corresponding to the specified fields within
the entry.

 | Field | Description

 | `name` [Required]
`string`

 |
   Name matching is performed by first resolving the absolute path of both
the plugin and the name in the allowlist entry using `exec.LookPath`. It
will be called on both, and the resulting strings must be equal. If
either call to `exec.LookPath` results in an error, the `Name` check
will be considered a failure.
Deprecated: use Command instead.

 | `command` [Required]
`string`

 |
   Command matching is performed by first resolving the absolute path of both
the plugin and the name in the allowlist entry using `exec.LookPath`. It
will be called on both, and the resulting strings must be equal. If
either call to `exec.LookPath` results in an error, the `Command` check
will be considered a failure.

## `CommandDefaults`     {#kubectl-config-k8s-io-v1beta1-CommandDefaults}

**Appears in:**

- Preference

CommandDefaults stores the commands and their associated option's
default values.

 | Field | Description

 | `command` [Required]
`string`

 |
   command refers to a command whose option's default value is changed.

 | `options` [Required]
`[]CommandOptionDefault`

 |
   options is a list of options storing different default values.

## `CommandOptionDefault`     {#kubectl-config-k8s-io-v1beta1-CommandOptionDefault}

**Appears in:**

- AliasOverride

- CommandDefaults

CommandOptionDefault stores the name and the specified default
value of an option.

 | Field | Description

 | `name` [Required]
`string`

 |
   Option name (long form, without dashes).

 | `default` [Required]
`string`

 |
   In a string format of a default value. It will be parsed
by kubectl to the compatible value of the option.

## `CredentialPluginPolicy`     {#kubectl-config-k8s-io-v1beta1-CredentialPluginPolicy}

(Alias of `string`)

**Appears in:**

- Preference

CredentialPluginPolicy specifies the policy governing which, if any, client-go
credential <example-value> may be executed. It MUST be one of { "", "AllowAll", "DenyAll", "Allowlist" }.
If the policy is "", then it falls back to "AllowAll" (this is required
to maintain backward compatibility). If the policy is DenyAll, no
credential <example-value> may run. If the policy is Allowlist, only those
plugins meeting the criteria specified in the `credentialPluginAllowlist`
field may run. If the policy is not `Allowlist` but one is provided, it
is considered a configuration error.
