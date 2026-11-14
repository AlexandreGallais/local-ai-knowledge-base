---
title: "Source Link and .NET libraries"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/library-guidance/sourcelink.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Source Link

Source Link is a technology that enables source code debugging of .NET assemblies from NuGet by developers. Source Link executes when creating the NuGet package and embeds source control metadata inside assemblies and the package. Developers who download the package and have Source Link enabled in Visual Studio can step into its source code. Source Link provides source control metadata to create a great debugging experience.

## Source Link demo

> [!VIDEO https://www.youtube.com/embed/gyRGhCQPkB4?start=61]

## Using Source Link

Instructions for using Source Link can be found on the dotnet/sourcelink GitHub repository.

You can use the NuGet Package Explorer desktop app or the nuget.info website to confirm that the Source Link metadata has been successfully embedded in the package. Verify that the `Repository` metadata is present with a commit identifier and that .pdb files are located with each target's .dll.

✔️ CONSIDER using Source Link to add source control metadata to your assemblies and NuGet packages.

> **Tip:**
> You can further enhance a developer's debugging experience by adding debugger attributes to your types.
>
> * `System.Diagnostics.DebuggerDisplayAttribute` can customize how a class or field is displayed in the debugger variable windows.
> * `System.Diagnostics.DebuggerStepThroughAttribute` instructs the debugger to step through the code instead of stepping into the code.
> * `System.Diagnostics.DebuggerBrowsableAttribute` controls whether a member is displayed in the debugger variable windows.

✔️ CONSIDER publishing symbol files (`*.pdb`).

> For the best debugging experience your library should publish symbol files as well as use Source Link. For more information about symbol files and symbol packages, see Symbol packages.

✔️ CONSIDER enabling deterministic builds.

> Deterministic builds enable verification that the resulting binary was built from the specified source and provide traceability. For more information about deterministic builds and instructions for enabling them, see Deterministic Builds.

>Previous
>Next
