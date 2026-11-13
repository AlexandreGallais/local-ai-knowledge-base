---
title: "Customize a Docker Hardened Image or chart (part 1 of 4)"
tool: "docker"
version: "2026-11"
source: "https://github.com/docker/docs/blob/a0442378fca4987b1235614ec917b4138b5d5e5d/content/manuals/dhi/how-to/customize.md"
commit: "a0442378fca4987b1235614ec917b4138b5d5e5d"
license: "Apache-2.0"
---

When you have a DHI Select or DHI Enterprise subscription, you can customize Docker
Hardened Images (DHI) and charts to suit your specific needs using the Docker
Hub web interface. For images, this lets you select a base image, add packages,
add OCI artifacts (such as custom certificates or additional tools), and
configure settings. For charts, this lets you customize the image and chart references.

Your customizations stay secure automatically. When the base Docker Hardened
Image or chart receives a security patch, your OCI artifacts are updated, or a
hardened system package you added is updated, Docker
automatically rebuilds your customizations in the background. This
ensures continuous compliance and protection by default, with no manual work
required. The rebuilt artifacts are signed and attested to the same SLSA Build
Level 3 standard as the base images and charts, ensuring a secure and verifiable
supply chain.
