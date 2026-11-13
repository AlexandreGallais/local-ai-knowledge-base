---
title: "podman-secret-inspect.1"
tool: "podman"
version: "6.2"
source: "https://github.com/containers/podman/blob/055de046937d29450f310fce0fe3071485d8bed9/docs/source/markdown/podman-secret-inspect.1.md"
commit: "055de046937d29450f310fce0fe3071485d8bed9"
license: "Apache-2.0"
---

# podman-secret-inspect.1

% podman-secret-inspect 1

## NAME
podman\-secret\-inspect - Display detailed information on one or more secrets

## SYNOPSIS
**podman secret <example-value>** [*options*] *secret* [...]

## DESCRIPTION

Inspects the specified secret.

By default, this renders all results in a JSON array. If a format is specified, the given template is executed for each result.
Secrets can be queried individually by providing their full name or a unique partial name.

## OPTIONS

#### **--format**, **-f**=*format*

Format secret <example-value> using Go template.

| **Placeholder**          | **Description**                                                   |
|--------------------------|-------------------------------------------------------------------|
| .CreatedAt ...           | When secret was created (relative timestamp, human-readable)      |
| .ID                      | ID of secret                                                      |
| .SecretData              | Secret Data (Displayed only with --showsecret <example-value>)		       |
| .Spec ...                | Details of secret                                                 |
| .Spec.Driver ...         | Driver info                                                       |
| .Spec.Driver.Name        | Driver name (string)                                              |
| .Spec.Driver.Options ... | Driver options (map of driver-specific options)                   |
| .Spec.Labels ...         | Labels for this secret                                            |
| .Spec.Name               | Name of secret                                                    |
| .UpdatedAt ...           | When secret was last updated (relative timestamp, human-readable) |

#### **--help**

Print usage statement.

#### **--pretty**

Print inspect output in human-readable format. Ignores fields from **--format**.

#### **--showsecret**

Display secret data

## EXAMPLES

Inspect the secret mysecret.
```
$ podman secret <example-value> mysecret
```

Inspect the secret <example-value> and print it in a human readable format instead of JSON, with the default fields.

```
$ podman secret <example-value> --pretty mysecret
```

Inspect the secret <example-value> and display the Name and Labels field.
```
$ podman secret <example-value> --format "<example-value>" mysecret
```

Inspect the secret <example-value> and display the Name and SecretData fields. Note this will display the secret data to the screen.
```
$ podman secret <example-value> --showsecret <example-value> "<example-value>" mysecret
```

## SEE ALSO
**podman(1)**, **podman-secret(1)**

## HISTORY
January 2021, Originally compiled by Ashley Cui <user@example.com>
