---
title: "Dumps - .NET"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/diagnostics/dumps.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Dumps

A dump is a file that contains a snapshot of the process at the time the dump was created and can be useful for examining the state of your application. Dumps can be used to debug your .NET application when it is difficult to attach a debugger to it, such as production or CI environments. Using dumps allows you to capture the state of the problematic process and examine it without having to stop the application.

## Collect dumps

Dumps can be collected in a variety of ways depending on which platform your app is running on.

> **Note:**
> Dump collection isn't supported on mobile platforms (Android and iOS). The Mono runtime used on these platforms doesn't support memory dump generation.

> **Note:**
> Dumps might contain sensitive information because they can contain the full memory of the running process. Handle them with any security restrictions and guidance in mind.

* You can use environment variables to configure your application to collect a dump on a crash.

* You may want to collect a dump when the app hasn't crashed yet. For example, if you want to examine the state of an application that seems to be in a deadlock, configuring the environment variables to collect dumps on crash will not be helpful because the app is still running.

* dotnet-dump is a simple cross-platform command line tool to collect a dump. Several other debugger tools such as Visual Studio or windbg also have dump collection features.

* If you are running your app in production or you are running it in a distributed manner (several services, replicas), dotnet-monitor provides support for many common scenarios and ad-hoc diagnostic investigations, including dump collection and egress. It enables dumps to be collected remotely or with triggering conditions.

> **Tip:**
> For troubleshooting and frequently asked questions about dump collection, see Dumps: FAQ.

## Analyze dumps

* Navigate to Debug Linux dumps for information regarding analyzing dumps collected on Linux.

* Navigate to Debug Windows Dumps for information regarding analyzing dumps collected on Windows.

### Memory Analysis

You can perform memory analysis on your application if your app's memory continues to grow, but you are unsure why that is the case. debug memory leak tutorial shows how to debug a memory leak using the dotnet CLI tools with the dotnet-sos commands dumpheap and gcroot.

Visual Studio Memory Analysis can be used to diagnose a memory leak on Windows.

## See also

Learn more about how you can leverage dumps to help diagnose problems in your .NET application.

* Debug Linux dumps tutorial walks you through how to debug a dump that was collected in Linux.

* Debug deadlock tutorial walks you through how to debug a deadlock in your .NET application using dumps.
