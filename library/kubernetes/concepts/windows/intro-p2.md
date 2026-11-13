---
title: "Windows containers in Kubernetes (part 2 of 2)"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/concepts/windows/intro.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# Windows containers in Kubernetes (part 2 of 2)

## Hardware recommendations and considerations {#windows-hardware-recommendations}

**Note:**
The following hardware specifications outlined here should be regarded as sensible default values.
They are not intended to represent minimum requirements or specific recommendations for production environments.
Depending on the requirements for your workload these values may need to be adjusted.

- 64-bit processor 4 CPU cores or more, capable of supporting virtualization
- 8GB or more of RAM
- 50GB or more of free disk space

Refer to
Hardware requirements for Windows Server Microsoft documentation
for the most up-to-date information on minimum hardware requirements. For guidance on deciding on resources for
production worker nodes refer to Production worker nodes Kubernetes documentation.

To optimize system resources, if a graphical user interface is not required,
it may be preferable to use a Windows Server OS installation that excludes
the Windows Desktop Experience
installation option, as this configuration typically frees up more system
resources.

In assessing disk space for Windows worker nodes, take note that Windows container images are typically larger than
Linux container images, with container image sizes ranging
from 300MB to over 10GB
for a single image. Additionally, take note that the `C:` drive in Windows containers represents a virtual free size of
20GB by default, which is not the actual consumed space, but rather the disk size for which a single container can grow
to occupy when using local storage on the host.
See Containers on Windows - Container Storage Documentation
for more detail.

## Getting help and troubleshooting {#troubleshooting}

Your main source of help for troubleshooting your Kubernetes cluster should start
with the Troubleshooting
page.

Some additional, Windows-specific troubleshooting help is included
in this section. Logs are an important element of troubleshooting
issues in Kubernetes. Make sure to include them any time you seek
troubleshooting assistance from other contributors. Follow the
instructions in the
SIG Windows contributing guide on gathering logs.

### Reporting issues and feature requests

If you have what looks like a bug, or you would like to
make a feature request, please follow the SIG Windows contributing guide to create a new issue.
You should first search the list of issues in case it was
reported previously and comment with your experience on the issue and add additional
logs. SIG Windows channel on the Kubernetes Slack is also a great avenue to get some initial support and
troubleshooting ideas prior to creating a ticket.

### Validating the Windows cluster operability

The Kubernetes project provides a _Windows Operational Readiness_ specification,
accompanied by a structured test suite. This suite is split into two sets of tests,
core and extended, each containing categories aimed at testing specific areas.
It can be used to validate all the functionalities of a Windows and hybrid system
(mixed with Linux nodes) with full coverage.

To set up the project on a newly created cluster, refer to the instructions in the
project guide.

## Deployment tools

The kubeadm tool helps you to deploy a Kubernetes cluster, providing the control
plane to manage the cluster it, and nodes to run your workloads.

The Kubernetes cluster API project also provides means to automate deployment of Windows nodes.

## Windows distribution channels

For a detailed explanation of Windows distribution channels see the
Microsoft documentation.

Information on the different Windows Server servicing channels
including their support models can be found at
Windows Server servicing channels.
