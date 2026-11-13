---
title: "Docker security announcements (part 1 of 2)"
tool: "docker"
version: "2026-11"
source: "https://github.com/docker/docs/blob/a0442378fca4987b1235614ec917b4138b5d5e5d/content/manuals/security/security-announcements.md"
commit: "a0442378fca4987b1235614ec917b4138b5d5e5d"
license: "Apache-2.0"
---

# Docker security announcements

Subscribe to security RSS feed

## Docker Desktop 4.97.0 security update: CVE-2026-114409

A vulnerability in Docker Desktop was fixed on October 26 in the
4.97.0 release:

- Addressed CVE-2026-114409,
  where Docker Desktop could write third-party API keys and OAuth access tokens
  in cleartext to local application logs and diagnostics bundles. This affected
  Docker Desktop versions before 4.97.0 and was caused by insufficient IPC
  payload redaction. An attacker with read access to these files could obtain
  the credentials. These OAuth tokens are not Docker account tokens.

  Docker Desktop 4.94.0 and 4.95.0 addressed the known logging paths, but logs
  containing credentials can remain after upgrading. Docker Desktop 4.97.0 fixes
  the issue and includes cleanup of existing host logs and crash dumps.

  If you've generated or shared diagnostics bundles with Docker Desktop 4.96.x
  or earlier, or kept copies of Docker Desktop logs elsewhere, delete or
  sanitize them.

Update to Docker Desktop
4.97.0.

## Docker Desktop 4.97.0 security update: CVE-2026-99999

A vulnerability in Docker Desktop was fixed on October 26 in the
4.97.0 release:

- Addressed CVE-2026-99999,
  a kernel vulnerability where a container could exploit bad IPv4 checksum
  metadata via TUN or `AF_PACKET` to corrupt the VM's network stack.

## Docker Sandboxes response to eMudhra CA compromise

_Last updated October 21, 2026_

Following the eMudhra certificate authority compromise, Docker rebuilt the
sandbox template images for all built-in kits with updated CA certificates.
Refresh cached images and update existing sandboxes to receive this protection.

On October 20, 2026, researchers disclosed the compromise of private keys for
eight eMudhra intermediate certificate authorities. An attacker with these keys
could impersonate websites or services to clients that still trust the
compromised certificates. See the
incident report for details.

Updating the `sbx` CLI alone doesn't update existing sandboxes.

### Recreate sandboxes with updated images

Recreate each sandbox using `--pull always` to fetch the updated images instead
of reusing cached copies. For example, for a Codex sandbox, run these commands
on your host:

```console
$ sbx stop <sandbox-name>
$ sbx rm <sandbox-name>
$ sbx create --name <sandbox-name> --pull always codex <workspace-path>
```

Replace `codex` with your agent and restore any options you used to create the
sandbox, such as `--clone` or additional kits. Before removing a sandbox, save
any files you need from inside it, including unpushed commits in clone mode.
Removing a sandbox deletes its filesystem.

Use `--pull always` when creating additional sandboxes from built-in kits.
Pulling updated images doesn't change sandboxes that already exist.

### Update CA certificates in existing sandboxes

If you need to keep an existing sandbox, update its `ca-certificates` package.
For Ubuntu-based Docker templates, run these commands on your host while the
sandbox is running:

```console
$ sbx exec <sandbox-name> -- sudo apt-get update
$ sbx exec <sandbox-name> -- sudo apt-get install --only-upgrade -y ca-certificates
```

Restart applications in the sandbox after updating. Tools that bundle their
own CA certificates may also need updates. See the incident report's
patched software versions.
For custom templates, update the trust store using the base distribution's
security updates and rebuild the images before creating more sandboxes.

## Docker Sandboxes 0.42.0 security update: CVE-2026-77179 and CVE-2026-79994

Two vulnerabilities in Docker Sandboxes were fixed on September 7 in the
0.42.0 release:

- Addressed CVE-2026-77179,
  where the virtio-fs host server on macOS followed symlinks when reopening an
  unlinked file from a stored path. A malicious guest could replace a parent
  directory with a symlink, escape the shared workspace, and read or modify
  arbitrary host files as the VMM user, potentially leading to code execution on
  the host. Versions 0.28.0 up to but not including 0.42.0 on macOS are
  affected. [Critical]
- Addressed CVE-2026-79994,
  where the guest-to-host Unix domain socket relay checked that a socket path
  was inside an authorized workspace but reconnected using the path name. A
  malicious guest could replace an intermediate directory with a symlink between
  the check and the connection, causing the host to connect to an arbitrary
  `AF_UNIX` socket outside the shared workspace and exposing data or host-side
  capabilities provided by that socket. Versions 0.37.0 up to but not including
  0.42.0 are affected. [High]

If you can't update to 0.42.0 or
later, use clone mode and avoid
adding read-write host mounts.

## Docker Desktop 4.86.0 security update: CVE-2026-17106

A vulnerability in Docker Desktop was fixed on August 10 in the
4.86.0 release:

- Addressed CVE-2026-17106, a destination-escape flaw in `docker container cp`.

## Docker Desktop 4.71.0 security update: CVE-2026-5843

A vulnerability in Docker Desktop was fixed on April 27 in the
4.71.0 release:

- Addressed CVE-2026-5843,
  container-to-host code execution in the Docker Model Runner MLX inference
  backend.

## Docker Desktop 4.68.0 security update: CVE-2026-5817

A vulnerability in Docker Desktop was fixed on April 7 in the
4.68.0 release:

- Addressed CVE-2026-5817,
  container-to-host code execution in the Docker Model Runner vllm-metal
  inference backend.

## Docker Desktop 4.67.0 security update: CVE-2026-33990

A vulnerability in Docker Desktop was fixed on March 30 in the
4.67.0 release:

- Addressed CVE-2026-33990,
  SSRF in Docker Model Runner OCI Registry Client.

## Docker Desktop 4.62.0 security update: CVE-2026-28400

A vulnerability in Docker Desktop was fixed on February 23 in the
4.62.0 release:

- Addressed CVE-2026-28400,
  runtime flag injection in Docker Model Runner.

## Docker Desktop 4.62.0 security update: CVE-2026-2664

A vulnerability in Docker Desktop was fixed on February 23 in the
4.62.0 release:

- Fixed CVE-2026-2664, out of
  bounds read in gRPC-FUSE kernel module.

## Docker Desktop 4.54.0 security update: CVE-2025-13743

A vulnerability in Docker Desktop was fixed on December 4 in the
4.54.0 release:

- Fixed CVE-2025-13743 where
  Docker Desktop diagnostics bundles were found to include expired Hub PATs in
  log output due to error object serialization.

## Docker Desktop 4.49.0 security update: CVE-2025-9164

A vulnerability in Docker Desktop for Windows was fixed on October 23 in the
4.49.0 release:

- Fixed CVE-2025-9164 where
  the Docker Desktop for Windows installer was vulnerable to DLL hijacking due
  to insecure DLL search order. The installer searches for required DLLs in the
  user's Downloads folder before checking system directories, allowing local
  privilege escalation through malicious DLL placement.

## Docker Desktop 4.47.0 security update: CVE-2025-10657

A vulnerability in Docker Desktop was fixed on September 25 in the
4.47.0 release:

- Fixed CVE-2025-10657 where
  the Enhanced Container Isolation
  Docker Socket command restrictions
  feature was not working properly in Docker Desktop 4.46.0 only (the
  configuration for it was being ignored).

## Docker Desktop 4.44.3 security update: CVE-2025-9074

_Last updated August 20, 2025_

A vulnerability in Docker Desktop was fixed on August 20 in the
4.44.3 release:

- Fixed CVE-2025-9074 where a
  malicious container running on Docker Desktop could access the Docker Engine
  and launch additional containers without requiring the Docker socket to be
  mounted. This could allow unauthorized access to user files on the host
  system. Enhanced Container Isolation (ECI) does not mitigate this
  vulnerability.

## Docker Desktop 4.44.0 security update: CVE-2025-23266

_Last updated July 31, 2025_

Docker is aware of
CVE-2025-23266, a critical
vulnerability affecting the NVIDIA Container Toolkit in CDI mode up to version
1.17.7. Docker Desktop includes version 1.17.8, which is not impacted. However,
older versions of Docker Desktop that bundled earlier toolkit versions may be
affected if CDI mode was manually enabled. Upgrade to Docker Desktop 4.44 or
later to ensure you're using the patched version.

## Docker Desktop 4.43.0 security update: CVE-2025-6587

_Last updated July 3, 2025_

A vulnerability in Docker Desktop was fixed on July 3 in the
4.43.0 release:

- Fixed CVE-2025-6587 where
  sensitive system environment variables were included in Docker Desktop
  diagnostic logs, allowing for potential secret exposure.

## Docker Desktop 4.41.0 security update: CVE-2025-3224, CVE-2025-4095, and CVE-2025-3911

_Last updated May 15, 2025_

Three vulnerabilities in Docker Desktop were fixed on April 28 in the
4.41.0 release.

- Fixed CVE-2025-3224 allowing
  an attacker with access to a user machine to perform an elevation of privilege
  when Docker Desktop updates.
- Fixed CVE-2025-4095 where
  Registry Access Management (RAM) policies were not enforced when using a MacOS
  configuration profile, allowing users to pull images from unapproved
  registries.
- Fixed CVE-2025-3911 allowing
  an attacker with read access to a user's machine to obtain sensitive
  information from Docker Desktop log files, including environment variables
  configured for running containers.

Update to Docker Desktop
4.41.0.

## Docker Desktop 4.34.2 security update: CVE-2024-8695 and CVE-2024-8696

_Last updated September 13, 2024_

Two remote code execution (RCE) vulnerabilities in Docker Desktop related to
Docker Extensions were reported by Cure53 and were fixed
on September 12 in the 4.34.2 release.

- CVE-2024-8695: A remote code
  execution (RCE) vulnerability via crafted extension description/changelog
  could be abused by a malicious extension in Docker Desktop before 4.34.2.
  [Critical]
- CVE-2024-8696: A remote code
  execution (RCE) vulnerability via crafted extension
  publisher-url/additional-urls could be abused by a malicious extension in
  Docker Desktop before 4.34.2. [High]

No existing extensions exploiting the vulnerabilities were found in the
Extensions Marketplace. The Docker Team will be closely monitoring and
diligently reviewing any requests for publishing new extensions.

Update to Docker Desktop
4.34.2. If you are unable to update
promptly, you can
disable Docker Extensions
as a workaround.

## Deprecation of password logins on CLI when SSO enforced

_Last updated July 2024_

When
SSO enforcement
was first introduced, Docker provided a grace period to continue to let
passwords be used on the Docker CLI when authenticating to Docker Hub. This was
allowed so organizations could adopt SSO enforcement. It is recommended that
administrators configuring SSO encourage users using the CLI
to switch over to Personal Access Tokens
in anticipation of this grace period ending.

On September 16, 2024, the grace period ended and passwords can no longer
authenticate to Docker Hub via the Docker CLI when SSO is enforced. Affected
users are required to switch over to using PATs to continue signing in.

This deprecation is a step toward a secure experience for developers and
organizations.

## SOC 2 Type 2 attestation and ISO 27001 certification

_Last updated June 2024_

Docker received its SOC 2 Type 2 attestation and ISO 27001 certification with
no exceptions or major non-conformities.

Security is part of Docker's operations, mission, and company strategy.
Docker's products are core to the user community, and the SOC 2 Type 2
attestation and ISO 27001 certification demonstrate Docker's ongoing commitment
to security.

For more information, see the
Blog announcement.
