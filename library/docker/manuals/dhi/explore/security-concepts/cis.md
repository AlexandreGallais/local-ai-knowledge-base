---
title: "CIS Benchmark"
tool: "docker"
version: "2026-11"
source: "https://github.com/docker/docs/blob/a0442378fca4987b1235614ec917b4138b5d5e5d/content/manuals/dhi/explore/security-concepts/cis.md"
commit: "a0442378fca4987b1235614ec917b4138b5d5e5d"
license: "Apache-2.0"
---

# CIS Benchmark

## What is the CIS Docker Benchmark?

The CIS Docker Benchmark is part
of the globally recognized CIS Benchmarks, developed by the Center for
Internet Security (CIS). It defines recommended secure
configurations for all aspects of the Docker container ecosystem, including the
container host, Docker daemon, container images, and the container runtime.

## Why CIS Benchmark compliance matters

Following the CIS Docker Benchmark helps organizations:

- Reduce security risk with widely recognized hardening guidance.
- Meet regulatory or contractual requirements that reference CIS controls.
- Standardize image and Dockerfile practices across teams.
- Demonstrate audit readiness with configuration decisions grounded in a public standard.

## How Docker Hardened Images comply with the CIS Benchmark

Docker Hardened Images (DHIs) are designed with security in mind and are
verified to be compliant with the relevant controls from the CIS Docker
Benchmark for the scope that applies to container images and Dockerfile
configuration.

CIS-compliant DHIs are compliant with all controls in Section 4, with the sole
exception of the control requiring Docker Content Trust (DCT), which Docker
officially retired.
Instead, DHIs are signed using
Cosign, providing an even higher level of authenticity and integrity. By
starting from a CIS-compliant DHI, teams can adopt image-level best practices
from the benchmark more quickly and confidently.

> **Note:**
>
> The CIS Docker Benchmark also includes controls for the host, daemon, and
> runtime. CIS-compliant DHIs address only the image and Dockerfile scope (Section
> 4). Overall compliance still depends on how you configure and operate the
> broader environment.

## Identify CIS-compliant images

CIS-compliant images are labeled as **CIS** in the Docker Hardened Images catalog.
To find them, search the catalog and look for the **CIS**
designation on individual listings.

## Get the benchmark

Download the latest CIS Docker Benchmark directly from CIS:
https://www.cisecurity.org/benchmark/docker
