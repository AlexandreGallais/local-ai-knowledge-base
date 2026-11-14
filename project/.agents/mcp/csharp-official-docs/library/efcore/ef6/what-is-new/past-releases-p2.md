---
title: "Past Releases of Entity Framework - EF6 (part 2 of 2)"
tool: "efcore"
version: "11"
source: "https://github.com/dotnet/EntityFramework.Docs/blob/1459c99ecffb85202e1bbcf32504d074c430bfde/entity-framework/ef6/what-is-new/past-releases.md"
commit: "1459c99ecffb85202e1bbcf32504d074c430bfde"
license: "CC-BY-4.0"
---

# Past Releases of Entity Framework - EF6 (part 2 of 2)

## EF 4.3.1
The EF 4.3.1 runtime was released to NuGet in February 2012 shortly after EF 4.3.0.
This patch release included some bug fixes to the EF 4.3 release and introduced better LocalDB support for customers using EF 4.3 with Visual Studio 2012.

Here is a list of content we put together specifically for the EF 4.3.1 release, most of the content provided for EF 4.1 still applies to EF 4.3 as well:

-   EF 4.3.1 Release Blog  Post

## EF 4.3
The EF 4.3.0 runtime was released to NuGet in February of 2012.
This release included the new Code First Migrations feature that allows a database created by Code First to be incrementally changed as your Code First model evolves.

Here is a list of content we put together specifically for the EF 4.3 release, most of the content provided for EF 4.1 still applies to EF 4.3 as well:
-   EF 4.3 Release Post
-   EF 4.3 Code-Based Migrations Walkthrough
-   EF 4.3 Automatic Migrations Walkthrough

## EF 4.2
The EF 4.2.0 runtime was released to NuGet in November of 2011.
This release includes bug fixes to the EF 4.1.1 release.
Because this release only included bug fixes it could have been the EF 4.1.2 patch release but we opted to move to 4.2 to allow us to move away from the date based patch version numbers we used in the 4.1.x releases and adopt the Semantic Versioning standard for semantic versioning.

Here is a list of content we put together specifically for the EF 4.2 release, the content provided for EF 4.1 still applies to EF 4.2 as well:

-   EF 4.2 Release Post
-   Code First Walkthrough
-   Model & Database First Walkthrough

## EF 4.1.1
The EF 4.1.10715 runtime was released to NuGet in July of 2011.
In addition to bug fixes this patch release introduced some components to make it easier for design time tooling to work with a Code First model.
These components are used by Code First Migrations (included in EF 4.3) and the EF Power Tools.

You’ll notice that the strange version number 4.1.10715 of the package.
We used to use date based patch versions before we decided to adopt Semantic Versioning.
Think of this version as EF 4.1 patch 1 (or EF 4.1.1).

Here is a list of content we put together for the 4.1.1 release:

-   EF 4.1.1 Release Post

## EF 4.1
The EF 4.1.10331 runtime was the first to be published on NuGet, in April of 2011.
This release included the simplified DbContext API and the Code First workflow.

You will notice the strange version number, 4.1.10331, which should really have been 4.1. In addition there is a 4.1.10311 version which should have been 4.1.0-rc (the ‘rc’ stands for ‘release candidate’).
We used to use date based patch versions before we decided to adopt Semantic Versioning.

Here is a list of content we put together for the 4.1 release. Much of it still applies to later releases of Entity Framework:

-   EF 4.1 Release Post
-   Code First Walkthrough
-   Model & Database First Walkthrough
-   SQL Azure Federations and the Entity Framework

## EF 4.0
This release was included in .NET Framework 4 and Visual Studio 2010, in April of 2010.
Important new features in this release included POCO support, foreign key <example-value>, lazy loading, testability improvements, customizable code generation and the Model First workflow.

Although it was the second release of Entity Framework, it was named EF 4 to align with the .NET Framework version that it shipped with.
After this release, we started making Entity Framework available on NuGet and adopted semantic versioning since we were no longer tied to the .NET Framework Version.

Note that some subsequent versions of .NET Framework have shipped with significant updates to the included EF bits.
In fact, many of the new features of EF 5.0 were implemented as improvements on these bits.
However, in order to rationalize the versioning story for EF, we continue to refer to the EF bits that are part of the .NET Framework as the EF 4.0 runtime, while all newer versions consist of the EntityFramework NuGet Package.

## EF 3.5
The initial version of Entity Framework was included in .NET 3.5 Service Pack 1 and Visual Studio 2008 SP1, released in August of 2008.
This release provided basic O/RM support using the Database First workflow.
