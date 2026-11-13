---
title: "Allowlist for Docker Desktop"
tool: "docker"
version: "2026-11"
source: "https://github.com/docker/docs/blob/a0442378fca4987b1235614ec917b4138b5d5e5d/content/manuals/desktop/enterprise/allow-list.md"
commit: "a0442378fca4987b1235614ec917b4138b5d5e5d"
license: "Apache-2.0"
---

# Allowlist for Docker Desktop

This page contains the domain URLs that you need to add to a firewall allowlist to ensure Docker Desktop works properly within your organization.

## Domain URLs to allow

| Domains                                                                              | Description                                  |
| ------------------------------------------------------------------------------------ | -------------------------------------------- |
| https://notify.bugsnag.com                                                           | Error reports                                |
| https://sessions.bugsnag.com                                                         | Error reports                                |
| https://auth.docker.io                                                               | Authentication                               |
| https://cdn.auth0.com                                                                | Authentication                               |
| https://login.docker.com                                                             | Authentication                               |
| https://auth.docker.com                                                              | Authentication                               |
| https://desktop.docker.com                                                           | Update                                       |
| https://hub.docker.com                                                               | Docker Hub                                   |
| https://registry-1.docker.io                                                         | Docker Pull/Push                             |
| https://production.cloudfront.docker.com                                             | Docker Pull/Push                             |
| https://docker-pinata-support.s3.amazonaws.com                                       | Troubleshooting                              |
| https://api.dso.docker.com                                                           | Docker Scout service                         |
| https://api.docker.com                                                               | New API                                      |
| https://api.offload.docker.com                                                       | Docker Offload                               |
| https://api.sandboxes-cloud.docker.com                                               | Docker Offload                               |
| https://dhi.io                                                                       | Docker Hardened Images                       |
| https://registry.scout.docker.com                                                    | Docker Scout registry for DHI attestations   |
| https://ai-backend-service.docker.com                                                | Gordon       |
