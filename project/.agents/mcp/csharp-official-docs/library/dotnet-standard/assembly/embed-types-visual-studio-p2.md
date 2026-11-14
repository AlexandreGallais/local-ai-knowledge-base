---
title: "Walkthrough: Embed types from managed assemblies in Visual Studio (part 2 of 2)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/assembly/embed-types-visual-studio.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Walkthrough: Embed types from managed assemblies in Visual Studio (part 2 of 2)

## Modify the runtime class

Also modify the runtime class and update its version.

1. In Visual Studio, select **File** > **Open** > **Project/Solution**, and open the **TypeEquivalenceRuntime** project.

1. In **Solution Explorer**, right-click the **TypeEquivalenceRuntime** project and select **Properties**.

1. Select **Application** on the left pane of the **Properties** screen, and then select **Assembly Information**.

1. In the **Assembly Information** dialog box, change the **Assembly version** and **File version** values to *2.0.0.0*, and then select **OK**.

1. Open the *SampleClass.cs* or *SampleClass.vb* file, and add the following code to the `SampleClass` class:

   ```csharp
    public DateTime GetDate()
    {
        return DateTime.Now;
    }
   ```

   ```vb
   Public Function GetDate() As DateTime Implements ISampleInterface.GetDate
       Return Now
   End Function
   ```

1. Select **File** > **Save All** or press `Ctrl`+`Shift`+`S` to save the files and project.

1. In **Solution Explorer**, right-click the **TypeEquivalenceRuntime** project and select **Build**. A new version of the class library DLL file is compiled and saved to the build output path.

## Run the updated client program

Go to the build output folder location and run *TypeEquivalenceClient.exe*. Note that the console output now reflects the new version of the `TypeEquivalenceRuntime` assembly, *2.0.0.0*, without the program being recompiled.

## See also

- **EmbedInteropTypes** (C# Compiler Options)
- -link (Visual Basic)
- C# programming guide
- Programming concepts (Visual Basic)
- Assemblies in .NET
