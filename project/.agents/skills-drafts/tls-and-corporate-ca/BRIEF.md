# BRIEF: tls-and-corporate-ca  (LNX-07, 4 stars, V1)

## Final frontmatter (do not change)

```yaml
name: tls-and-corporate-ca
description: "Makes tools trust the internal certificate authority - update-ca-trust, NODE_EXTRA_CA_CERTS, REQUESTS_CA_BUNDLE, SSL_CERT_FILE, the Java keystore, NuGet and Cargo. Use when you see 'self signed certificate in certificate chain', 'unable to get local issuer certificate', 'certificate verify failed', 'PKIX path building failed' or 'UNABLE_TO_VERIFY_LEAF_SIGNATURE'."
metadata:
  id: LNX-07
  stars: "4"
  nature: reference
  mode: C
  wave: V1
  load: auto
```

## Goal

A reference that tells, tool by tool, how to make it trust the internal CA already installed on the machine, and how to check it, so that no one ever disables TLS verification.

## Questions the skill must answer

1. Where is the internal CA certificate on the host and in the dev container image?
2. Is it in the system trust store (`trust list`, `/etc/pki/ca-trust/source/anchors/`)?
3. For each tool (curl, git, npm and Node, pip and requests, Java, .NET and NuGet, Cargo, Podman): which variable or setting points to the CA, and the command that proves it works?
4. How to add the CA to a container image (Containerfile lines).
5. Error messages per tool and their fix.

## Where to look (files, commands, people)

- `trust list | grep -i <organisation>`, `/etc/pki/ca-trust/source/anchors/`, `update-ca-trust`
- `printenv NODE_EXTRA_CA_CERTS REQUESTS_CA_BUNDLE SSL_CERT_FILE`
- `.devcontainer/` Containerfile
- The human: the name and path of the internal CA if not found.

## Required sections

- Core rule in the first 10 lines (never disable verification: no `-k`, no `NODE_TLS_REJECT_UNAUTHORIZED=0`, no `verify=False`); a table tool, setting, check command; stop conditions; common mistakes; definition of done.

## Acceptance tests

- Trigger: loads on "npm install: self signed certificate in certificate chain", "pip: certificate verify failed", "PKIX path building failed"; does not load on "add a unit test", "the build is slow", "rename a file".
- Paired task: a tool fails with a certificate error; with the skill the agent sets the right variable and does not disable verification.

## Human input required (yes/no, what)

Yes, only if the CA cannot be found on the machine: its file name and location.
