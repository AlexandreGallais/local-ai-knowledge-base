---
title: "Control Plane"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/glossary/control-plane.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# Control Plane

The container orchestration layer that exposes the API and interfaces to define, deploy, and manage the lifecycle of containers.

 This layer is composed by many different components, such as (but not restricted to):

 * etcd
 * API Server
 * Scheduler
 * Controller Manager
 * Cloud Controller Manager

 These components can be run as traditional operating system services (daemons) or as containers. The hosts running these components were historically called masters.
