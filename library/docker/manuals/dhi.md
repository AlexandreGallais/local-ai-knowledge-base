---
title: "Docker Hardened Images"
tool: "docker"
version: "2026-11"
source: "https://github.com/docker/docs/blob/a0442378fca4987b1235614ec917b4138b5d5e5d/content/manuals/dhi/_index.md"
commit: "a0442378fca4987b1235614ec917b4138b5d5e5d"
license: "Apache-2.0"
---

# Docker Hardened Images

Docker Hardened Images (DHI) provide minimal, secure, and production-ready
container images, Helm charts, and system packages maintained by Docker.
Designed to reduce vulnerabilities and simplify compliance, DHI integrates
easily into your existing Docker-based workflows with little to no retooling
required.

DHI is available in the following three subscriptions.

| Feature | Community | Select | Enterprise |
|---|---|---|---|
| Hardened, minimal images | ✅ | ✅ | ✅ |
| Near-zero CVEs | ✅ | ✅ | ✅ |
| Verifiable SBOMs & SLSA Build L3 provenance | ✅ | ✅ | ✅ |
| Full, unsuppressed CVE visibility | ✅ | ✅ | ✅ |
| Drop-in adoption, no workflow changes | ✅ | ✅ | ✅ |
| Full catalog of open source images under Apache 2.0 | ✅ | ✅ | ✅ |
| Built with Docker Hardened System Packages | ✅ | ✅ | ✅ |
| Upstream cadence for Docker-released patches | ✅ | ✅ | ✅ |
| FIPS/STIG variants | ❌ | ✅ | ✅ |
| Critical CVE fixes < 7 days with SLA-backed continuous patching | ❌ | ✅ | ✅ |
| Customizations | ❌ | ✅ Up to 5 | ✅ Unlimited |
| Access to Hardened System Packages repository | ❌ | ❌ | ✅ |
| Full catalog access available | ❌ | ❌ | ✅ |
| Extended Lifecycle Support add-on available | ❌ | ❌ | ✅ +5 years of hardened updates |

For pricing and more details, see the Docker Hardened Images subscription
comparison.

## Community features

DHI's core features are free to use, share, and build on under Apache 2.0.

- Near-zero CVEs: continuously scanned and patched
  to maintain minimal known vulnerabilities
- Distroless variants: remove unnecessary
  components, reducing attack surface by up to 95%
- Non-root execution: containers run as non-root by default
- Hardened system packages: system packages
  built from source, cryptographically signed, and verified by Docker
- SLSA Build Level 3 provenance, signed
  SBOMs, VEX statements,
  and cryptographic signatures on every image
- Built on Alpine and Debian with glibc and musl
  variants; dev and runtime image variants
  available
- Works with existing Docker workflows, CI/CD pipelines, and tools with no
  retooling required
- Helm charts: Docker-provided charts built from upstream
  sources, tested for compatibility with DHI, and available as OCI artifacts in
  the DHI catalog; include SLSA Level 3 provenance, SBOMs, and cryptographic
  signing

## Select and Enterprise features

For organizations with strict security or compliance requirements:

- 7-day SLA for critical and high
  severity CVE remediation
- FIPS-enabled and
  STIG-ready compliance variants
- Customization: add packages, tools, certificates,
  and configurations (up to 5 with Select, unlimited with Enterprise)
- Enterprise package repository access and
  full catalog access (Enterprise)
- Extended Lifecycle Support: post-EOL security patches, updated SBOMs,
  provenance, and signing (Enterprise add-on)

## Get started

Explore the sections below to get started with Docker Hardened Images, integrate
them into your workflow, and learn what makes them secure and enterprise-ready.
