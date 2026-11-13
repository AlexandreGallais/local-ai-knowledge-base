---
title: "podman-secret-ls.1"
tool: "podman"
version: "6.2"
source: "https://github.com/containers/podman/blob/055de046937d29450f310fce0fe3071485d8bed9/docs/source/markdown/podman-secret-ls.1.md.in"
commit: "055de046937d29450f310fce0fe3071485d8bed9"
license: "Apache-2.0"
---

# podman-secret-ls.1

% podman-secret-ls 1

## NAME
podman\-secret\-ls - List all available secrets (alias list)

## SYNOPSIS
**podman secret ls** [*options*]

## DESCRIPTION

Lists all the secrets that exist. The output can be formatted to a Go template using the **--format** option.

## OPTIONS

#### **--format**=*format*

Format secret output using Go template.

Valid placeholders for the Go template are listed below:

| **Placeholder**          | **Description**                                                   |
| ------------------------ | ----------------------------------------------------------------- |
| .CreatedAt               | When secret was created (relative timestamp, human-readable)      |
| .Driver                  | Driver name (string)                                              |
| .ID                      | ID of secret                                                      |
| .Name                    | Name of secret                                                    |
| .UpdatedAt               | When secret was last updated (relative timestamp, human-readable) |

#### **--noheading**, **-n**

Omit the table headings from the listing.

#### **--quiet**, **-q**

Print secret IDs only.

## EXAMPLES

List all secrets.
```
$ podman secret ls
```

List the name field of all secrets.
```
$ podman secret ls --format "{{.Name}}"
```

List all secrets whose name includes the specified string.
```
$ podman secret ls --filter name=confidential
```

## SEE ALSO
**podman(1)**, **podman-secret(1)**

## HISTORY
January 2021, Originally compiled by Ashley Cui <acui@redhat.com>
