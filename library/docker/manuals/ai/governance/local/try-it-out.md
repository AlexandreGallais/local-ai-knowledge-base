---
title: "Try out local policy"
tool: "docker"
version: "2026-11"
source: "https://github.com/docker/docs/blob/a0442378fca4987b1235614ec917b4138b5d5e5d/content/manuals/ai/governance/local/try-it-out.md"
commit: "a0442378fca4987b1235614ec917b4138b5d5e5d"
license: "Apache-2.0"
---

# Try out local policy

In this example, you create a sandbox, allow and block destinations for it,
block an HTTP method, and review what happened. It uses the `shell` agent, so
you don't need to sign in to an agent.

## Before you begin

Install Docker Sandboxes.

If your organization enforces a policy for you, some steps behave differently.
For more details, see
How organization policy relates to local and kit rules.

## Step 1: Create a sandbox

Create a sandbox named `policy-demo` that uses the current directory as its
workspace:

```console
$ sbx create --name policy-demo shell .
```

If you haven't chosen a network preset yet,
`sbx` asks you to choose one. This example works with any preset.

## Step 2: Allow a destination for this sandbox

Add an allow rule for `example.com` that applies only to `policy-demo`:

```console
$ sbx policy allow network --sandbox policy-demo example.com
```

The rule doesn't affect your other sandboxes. List the rules you've added that
apply to the sandbox:

```console
$ sbx policy ls policy-demo --wide --created-via added
```

The listing includes the `example.com` rule, with `sandbox:policy-demo` in the
`APPLIES TO` column. Rules from your preset aren't listed, because
`--created-via added` shows only rules you added. For more details, see
Inspect policy status and rules.

Reach the destination from inside the sandbox:

```console
$ sbx exec policy-demo -- curl -sI https://example.com
```

For more details, see Manage local network rules.

## Step 3: Block a destination for this sandbox

Add a deny rule for `registry.npmjs.org` that applies only to `policy-demo`:

```console
$ sbx policy deny network --sandbox policy-demo registry.npmjs.org
```

Check the destination:

```console
$ sbx policy check network --sandbox policy-demo registry.npmjs.org
```

The check reports `Denied`. A deny rule takes precedence over allow rules,
including the ones your preset and kits add.

## Step 4: Block an HTTP method for this sandbox

An HTTP rule matches a method and path on a host, rather than the whole host.
Use HTTP rules to allow or block specific API requests, such as letting an
agent read from an API without letting it write to it. Block `POST` requests to
`example.com` for `policy-demo`:

```console
$ sbx policy deny network --sandbox policy-demo example.com --method POST
```

Send a `POST` request from inside the sandbox:

```console
$ sbx exec policy-demo -- curl -s -X POST https://example.com
```

The response starts with `Blocked by local rule`. Other methods are still
allowed. Send a `GET` request to the same destination:

```console
$ sbx exec policy-demo -- curl -s https://example.com
```

The response is the HTML of the `example.com` page.

`sbx policy check network` reports the decision for the host, not for a method
or path, so use a request like this one to test an HTTP rule. For more details,
see
Allow or block HTTP methods and paths.

## Step 5: Review network activity

See the sandbox's network activity:

```console
$ sbx policy log policy-demo
```

For more details, see Test and monitor network policy.

## Step 6: Clean up

Remove the sandbox:

```console
$ sbx rm policy-demo
```

Removing a sandbox also removes the rules scoped to it, so you don't need to
remove the rules you added in this example.

## Next steps

- Learn how presets, rules for one sandbox, and kit rules combine in
  Local policy.
- Approve destinations that no rule allows, under the Balanced and Locked Down
  presets, in Respond to approval requests.
- Reference the Network and HTTP rule
  syntax.
