---
title: "Selecting Entity Framework Runtime Version for EF Designer Models - EF6"
tool: "efcore"
version: "11"
source: "https://github.com/dotnet/EntityFramework.Docs/blob/1459c99ecffb85202e1bbcf32504d074c430bfde/entity-framework/ef6/modeling/designer/select-runtime-version.md"
commit: "1459c99ecffb85202e1bbcf32504d074c430bfde"
license: "CC-BY-4.0"
---

# Selecting Entity Framework Runtime Version for EF Designer Models
> **Note:**
> **EF6 Onwards Only** - The features, APIs, etc. discussed in this page were introduced in Entity Framework 6. If you are using an earlier version, some or all of the information does not apply.

Starting with EF6 the following screen was added to the EF Designer to allow you to select the version of the runtime you wish to target when creating a model. The screen will appear when the latest version of Entity Framework is not already installed in the project. If the latest version is already installed it will just be used by default.

## Targeting EF6.x

You can choose EF6 from the 'Choose Your Version' screen to add the EF6 runtime to your project. Once you've added EF6, you’ll stop seeing this screen in the current project.

EF6 will be disabled if you already have an older version of EF installed (since you can't target multiple versions of the runtime from the same project). If EF6 option is not enabled here, follow these steps to upgrade your project to EF6:

1.  Right-click on your project in Solution Explorer and select **Manage NuGet Packages...**
2.  Select **Updates**
3.  Select **EntityFramework** (make sure it is going to update it to the version you want)
4.  Click **Update**

 

## Targeting EF5.x

You can choose EF5 from the 'Choose Your Version' screen to add the EF5 runtime to your project. Once you've added EF5, you’ll still see the screen with the EF6 option disabled.

If you have an EF4.x version of the runtime already installed then you will see that version of EF listed in the screen rather than EF5. In this situation you can upgrade to EF5 using the following steps:

1.  Select **Tools -> Library Package Manager -> Package Manager Console**
2.  Run **Install-Package EntityFramework -version 5.0.0**

 

## Targeting EF4.x

You can install the EF4.x runtime to your project using the following steps:

1.  Select **Tools -> Library Package Manager -> Package Manager Console**
2.  Run **Install-Package EntityFramework -version 4.3.0**
