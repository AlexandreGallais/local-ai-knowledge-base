---
title: "Evaluate policies (part 2 of 2)"
tool: "docker"
version: "2026-11"
source: "https://github.com/docker/docs/blob/a0442378fca4987b1235614ec917b4138b5d5e5d/content/manuals/scout/policy/local.md"
commit: "a0442378fca4987b1235614ec917b4138b5d5e5d"
license: "Apache-2.0"
---

# Evaluate policies (part 2 of 2)

## Debug policies

Add `print()` statements to your Rego and enable debug output by setting
`"debug": true` in the policy-config file:

```rego
violation contains v if {
    att := oci.referrer("https://scout.docker.com/sbom/v0.1")
    some pkg in att.statement.predicate.artifacts
    print("checking", pkg.purl)
    contains(pkg.purl, blocked)
    # ...
}
```

```json
{
  "debug": true,
  "policies": [
    { "name": "no-internal-registry" }
  ]
}
```

Output is prefixed with the policy name and source line:

```text
no-internal-registry#28: checking pkg:deb/debian/user@example.com
```

> **Note:**
>
> The `debug` field in the policy-config controls `print()` output from your
> Rego. The global `--debug` flag is separate: it enables CLI-level debug
> logging for bundle loading, registry resolution, and similar internals.

### Inspect raw evaluation results

Use `--result-file` to write the full evaluation result for every policy to a
JSON file. This is useful when iterating on a custom policy to inspect
intermediate values.

```console
$ docker scout policy myorg/app:latest \
  --policy-file ./no-internal-registry.rego \
  --result-file result.json
```

Each entry in the output contains:

- `pass`: the policy's boolean outcome.
- `violations`: the `detail` object of each reported violation.
- `bindings`: the raw `data.docker.scout` document, including the `violation`
  set and any other complete rules, for inspecting intermediate values.
- `metrics`: OPA evaluation metrics (timers and counters).

```json
{
  "no-internal-registry": {
    "pass": false,
    "violations": [
      { "purl": "pkg:deb/debian/user@example.com", "reason": "matches \"registry.internal.example.com\"" }
    ],
    "bindings": {
      "blocked": "registry.internal.example.com",
      "violation": [
        {
          "message": "Package pkg:deb/debian/user@example.com sourced from internal registry",
          "detail": {
            "purl": "pkg:deb/debian/user@example.com",
            "reason": "matches \"registry.internal.example.com\""
          }
        }
      ]
    },
    "metrics": {
      "timer_rego_query_eval_ns": 1234567
    }
  }
}
```

## Share policies as OCI bundles

Package `.rego` files as an OCI artifact and distribute them through any
registry.

### Publish a bundle

```console
# Publish a directory of policies
$ docker scout policy publish \
  --policy-dir ./rego \
  registry.example.com/my-policies:latest

# Publish specific files
$ docker scout policy publish \
  --policy-file fixable.rego \
  --policy-file licenses.rego \
  registry.example.com/my-policies:latest

# Publish the built-in default set
$ docker scout policy publish registry.example.com/my-policies:latest
```

Each module's metadata is validated before publishing. The command prints the
resulting digest and the list of bundled policies.

### Use a bundle

```console
$ docker scout policy myorg/app:latest \
  --policy-bundle registry.example.com/my-policies:latest

# Combine a bundle with local files and a config
$ docker scout policy myorg/app:latest \
  --policy-bundle registry.example.com/my-policies:latest \
  --policy-file ./extra.rego \
  --policy-config ./policies.json
```

`--policy-bundle` is repeatable. Authentication uses your existing Docker
registry credentials. Bundles are cached by digest, so re-running against the
same bundle does not re-download it. A new digest (for example, after
re-publishing `:latest`) is fetched automatically.
