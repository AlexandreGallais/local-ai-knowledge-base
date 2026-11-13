---
title: "Lab: Migrating a Node App to Docker Hardened Images"
tool: "docker"
version: "2026-11"
source: "https://github.com/docker/docs/blob/a0442378fca4987b1235614ec917b4138b5d5e5d/content/guides/lab-dhi-node.md"
commit: "a0442378fca4987b1235614ec917b4138b5d5e5d"
license: "Apache-2.0"
---

# Lab: Migrating a Node App to Docker Hardened Images

Migrate a Node.js application from a standard `node:24-trixie-slim` base image
to a Docker Hardened Image. You'll measure the before-and-after impact on CVE
count, image size, and policy compliance using Docker Scout, then explore the
supply chain attestations DHI ships with every image.

## What you'll learn

By the end of this Labspace, you will have completed the following:

- Analyze a Node.js container image with Docker Scout to identify CVE and policy failures
- Rewrite a Dockerfile to use a multi-stage build with DHI dev and runtime variants
- Compare image size and vulnerability counts before and after the migration
- Inspect supply chain attestations included with Docker Hardened Images (SBOMs, SLSA, VEX)
- Export VEX documents for integration with external scanners such as Grype or Trivy

## Modules

| #   | Module                                   | Description                                                                     |
| --- | ---------------------------------------- | ------------------------------------------------------------------------------- |
| 1   | Introduction                             | Overview of Docker Hardened Images and their security benefits                  |
| 2   | Setup                                    | Perform setup tasks required for the lab.                                       |
| 3   | Analyzing the Starting Image             | Build the app, scan it with Docker Scout, and review failing policies           |
| 4   | Migrating to DHI                         | Rewrite the Dockerfile with multi-stage DHI build and compare results           |
| 5   | DHI Attestations and Scanner Integration | Inspect SBOMs, FIPS attestations, STIG scans, and export VEX for external tools |
