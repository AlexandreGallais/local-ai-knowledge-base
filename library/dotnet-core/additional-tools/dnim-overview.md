---
title: ".NET Install Manager overview"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/additional-tools/dnim-overview.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# .NET Install Manager overview

The .NET Install Manager (*DNIM*) is a command-line tool used to identify, remove, and update .NET installations on Windows. It's primarily intended to assist organizations in removing vulnerable copies of .NET from devices to meet compliance targets.

DNIM ships as a trimmed, single file .NET executable, making it easy to deploy across devices using tools like Microsoft Configuration Manager.

> **Important:**
> DNIM doesn't enforce any policies by default. Administrators should use the CLI to create deployments that best express their organization's compliance policies.

The tool is data driven and depends on the release information published for .NET. While internet access is required to download the latest release information and updates, administrators can prepare offline deployments for network restricted environments.

## Download

The latest release can be found on the Microsoft Download Center.

## System Requirements

DNIM is currently built using .NET 8 and compatible with all versions of Windows supported by .NET 8.

## Support

> **Important:**
> Because DNIM is a single file application, new builds are regularly published to ensure the .NET runtime remains up to date. Any changes, including security fixes, are documented in the release notes. Enterprise customers should contact their customer support representative to address concerns or report issues.

## See also

* Managed .NET installations on Windows
* Logging
