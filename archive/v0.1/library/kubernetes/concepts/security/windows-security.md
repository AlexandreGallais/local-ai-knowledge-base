---
title: "Security For Windows Nodes"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/concepts/security/windows-security.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# Security For Windows Nodes

This page describes security considerations and best practices specific to the Windows operating system.

## Protection for Secret data on nodes

On Windows, data from Secrets are written out in clear text onto the node's local
storage (as compared to using tmpfs / in-memory filesystems on Linux). As a cluster
operator, you should take both of the following additional measures:

1. Use file ACLs to secure the Secrets' file location.
1. Apply volume-level encryption using
   BitLocker.

## Container users

RunAsUsername
can be specified for Windows Pods or containers to execute the container
processes as specific user. This is roughly equivalent to
RunAsUser.

Windows containers offer two default user accounts, ContainerUser and ContainerAdministrator.
The differences between these two user accounts are covered in
When to use ContainerAdmin and ContainerUser user accounts
within Microsoft's _Secure Windows containers_ documentation.

Local users can be added to container images during the container build process.

**Note:**

* Nano Server based images run as
  `ContainerUser` by default
* Server Core based images run as
  `ContainerAdministrator` by default

Windows containers can also run as Active Directory identities by utilizing
Group Managed Service Accounts

## Pod-level security isolation

Linux-specific pod security context mechanisms (such as SELinux, AppArmor, Seccomp, or custom
POSIX capabilities) are not supported on Windows nodes.

Privileged containers are not supported
on Windows.
Instead HostProcess containers
can be used on Windows to perform many of the tasks performed by privileged containers on Linux.
