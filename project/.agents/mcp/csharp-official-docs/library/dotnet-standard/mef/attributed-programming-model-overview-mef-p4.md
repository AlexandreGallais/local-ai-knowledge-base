---
title: "Attributed programming model overview (MEF) (part 4 of 4)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/mef/attributed-programming-model-overview-mef.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Attributed programming model overview (MEF) (part 4 of 4)

## Life Cycle and Disposing

Because parts are hosted in the composition container, their life cycle can be more complex than ordinary objects. Parts can implement two important life cycle-related interfaces: `IDisposable` and `IPartImportsSatisfiedNotification`.

Parts that require work to be performed at shut down or that need to release resources should implement `IDisposable`, as usual for .NET objects. However, since the container creates and maintains references to parts, only the container that owns a part should call the `Dispose` method on it. The container itself implements `IDisposable`, and as portion of its cleanup in `Dispose` it will call `Dispose` on all the parts that it owns. For this reason, you should always dispose the composition container when it and any parts it owns are no longer needed.

For long-lived composition containers, memory consumption by parts with a creation policy of non-shared can become a problem. These non-shared parts can be created multiple times and will not be disposed until the container itself is disposed. To deal with this, the container provides the `ReleaseExport` method. Calling this method on a non-shared export removes that export from the composition container and disposes it. Parts that are used only by the removed export, and so on down the tree, are also removed and disposed. In this way, resources can be reclaimed without disposing the composition container itself.

`IPartImportsSatisfiedNotification` contains one method named `OnImportsSatisfied`. This method is called by the composition container on any parts that implement the interface when composition has been completed and the part's imports are ready for use. Parts are created by the composition engine to fill the imports of other parts. Before the imports of a part have been set, you cannot perform any initialization that relies on or manipulates imported values in the part constructor unless those values have been specified as prerequisites by using the `ImportingConstructor` attribute. This is normally the preferred method, but in some cases, constructor injection may not be available. In those cases, initialization can be performed in `OnImportsSatisfied`, and the part should implement `IPartImportsSatisfiedNotification`.
