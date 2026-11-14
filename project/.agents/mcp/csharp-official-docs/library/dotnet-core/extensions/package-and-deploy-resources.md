---
title: "Package and deploy resources in .NET apps (part 1 of 3)"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/extensions/package-and-deploy-resources.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Package and deploy resources in .NET apps

Applications rely on the .NET Framework Resource Manager, represented by the `System.Resources.ResourceManager` class, to retrieve localized resources. The Resource Manager assumes that a hub and spoke model is used to package and deploy resources. The hub is the main assembly that contains the nonlocalizable executable code and the resources for a single culture, called the neutral or default culture. The default culture is the fallback culture for the application; it is the culture whose resources are used if localized resources cannot be found. Each spoke connects to a satellite assembly that contains the resources for a single culture, but does not contain any code.

There are several advantages to this model:

- You can incrementally add resources for new cultures after you have deployed an application. Because subsequent development of culture-specific resources can require a significant amount of time, this allows you to release your main application first, and deliver culture-specific resources at a later date.
- You can update and change an application's satellite assemblies without recompiling the application.
- An application needs to load only those satellite assemblies that contain the resources needed for a particular culture. This can significantly reduce the use of system resources.

However, there are also disadvantages to this model:

- You must manage multiple sets of resources.
- The initial cost of testing an application increases, because you must test several configurations. Note that in the long term it will be easier and less expensive to test one core application with several satellites, than to test and maintain several parallel international versions.

## Resource naming conventions

When you package your application's resources, you must name them using the resource naming conventions that the common language runtime expects. The runtime identifies a resource by its culture name. Each culture is given a unique name, which is usually a combination of a two-letter, lowercase culture name associated with a language and, if required, a two-letter, uppercase subculture name associated with a country or region. The subculture name follows the culture name, separated by a dash (-). Examples include ja-JP for Japanese as spoken in Japan, en-US for English as spoken in the United States, de-DE for German as spoken in Germany, or de-AT for German as spoken in Austria. See the **Language tag** column in the list of language/region names supported by Windows. Culture names follow the standard defined by BCP 47.

> **Note:**
> There are some exceptions for the two-letter culture names, such as `zh-Hans` for Chinese (Simplified).

For more information, see Create resource files and Create satellite assemblies.
