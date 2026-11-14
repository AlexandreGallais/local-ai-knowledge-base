---
title: "How to: Determine if a file is an assembly"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/assembly/identify.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# How to: Determine if a file is an assembly

A file is an assembly if and only if it is managed, and contains an assembly entry in its metadata. For more information on assemblies and metadata, see Assembly manifest.

## How to manually determine if a file is an assembly

1. Start the Ildasm.exe (IL Disassembler) tool.

2. Load the file you want to test.

3. If **ILDASM** reports that the file is not a portable executable (PE) file, then it is not an assembly. For more information, see the topic How to: View assembly contents.

## How to programmatically determine if a file is an assembly

### Using the AssemblyName class

1. Call the `System.Reflection.AssemblyName.GetAssemblyName*` method, passing the full file path and name of the file you are testing.

2. If a `System.BadImageFormatException` exception is thrown, the file is not an assembly.

This example tests a DLL to see if it is an assembly.

```csharp
using System;
using System.IO;
using System.Reflection;
using System.Runtime.InteropServices;

static class ExampleAssemblyName
{
    public static void CheckAssembly()
    {
        try
        {
            string path = Path.Combine(
                RuntimeEnvironment.GetRuntimeDirectory(),
                "System.Net.dll");

            AssemblyName testAssembly = AssemblyName.GetAssemblyName(path);
            Console.WriteLine("Yes, the file is an assembly.");
        }
        catch (FileNotFoundException)
        {
            Console.WriteLine("The file cannot be found.");
        }
        catch (BadImageFormatException)
        {
            Console.WriteLine("The file is not an assembly.");
        }
        catch (FileLoadException)
        {
            Console.WriteLine("The assembly has already been loaded.");
        }
    }

    /* Output: 
    Yes, the file is an assembly.  
    */
}
```
```vb
Imports System
Imports System.IO
Imports System.Reflection
Imports System.Runtime.InteropServices

Module ExampleAssemblyName
    Sub CheckAssembly()
        Try
            Dim filePath As String = Path.Combine(
                RuntimeEnvironment.GetRuntimeDirectory(),
                "System.Net.dll")

            Dim testAssembly As AssemblyName =
                                AssemblyName.GetAssemblyName(filePath)
            Console.WriteLine("Yes, the file is an Assembly.")
        Catch ex As FileNotFoundException
            Console.WriteLine("The file cannot be found.")
        Catch ex As BadImageFormatException
            Console.WriteLine("The file is not an Assembly.")
        Catch ex As FileLoadException
            Console.WriteLine("The Assembly has already been loaded.")
        End Try
    End Sub
End Module
' Output:  
' Yes, the file is an Assembly.  
```

The `System.Reflection.AssemblyName.GetAssemblyName*` method loads the test file, and then releases it once the information is read.

### Using the PEReader class

> **Caution:**
> `System.Reflection.PortableExecutable.PEReader` and the `System.Reflection.Metadata` library are not designed to handle untrusted input. Malformed or malicious PE files can cause unexpected behavior, including out-of-bounds memory access, crashes, or hangs. Only use these APIs with trusted assemblies.

1. If you're targeting .NET Standard or .NET Framework, install the System.Reflection.Metadata NuGet package. (When targeting .NET Core or .NET 5+, this step isn't required because this library is included in the shared framework.)

2. Create a `System.IO.FileStream` instance to read data from the file you're testing.

3. Create a `System.Reflection.PortableExecutable.PEReader` instance, passing your file stream into the constructor.

4. Check the value of the `System.Reflection.PortableExecutable.PEReader.HasMetadata` property. If the value is `false`, the file is not an assembly.

5. Call the `System.Reflection.Metadata.PEReaderExtensions.GetMetadataReader*` method on the PE reader instance to create a metadata reader.

6. Check the value of the `System.Reflection.Metadata.MetadataReader.IsAssembly` property. If the value is `true`, the file is an assembly.

Unlike the `System.Reflection.AssemblyName.GetAssemblyName*` method, the `System.Reflection.PortableExecutable.PEReader` class does not throw an exception on native Portable Executable (PE) files. This enables you to avoid the extra performance cost caused by exceptions when you need to check such files. You still need to handle exceptions in case the file does not exist or is not a PE file.

This example shows how to determine if a file is an assembly using the `System.Reflection.PortableExecutable.PEReader` class.

```csharp
using System;
using System.Collections.Generic;
using System.IO;
using System.Reflection.Metadata;
using System.Reflection.PortableExecutable;
using System.Runtime.InteropServices;

static class ExamplePeReader
{
    static bool IsAssembly(string path)
    {
        using var fs = new FileStream(path, FileMode.Open, FileAccess.Read, FileShare.ReadWrite);

        // Try to read CLI metadata from the PE file.
        using var peReader = new PEReader(fs);

        if (!peReader.HasMetadata)
        {
            return false; // File does not have CLI metadata.
        }

        // Check that file has an assembly manifest.
        MetadataReader reader = peReader.GetMetadataReader();
        return reader.IsAssembly;
    }

    public static void CheckAssembly()
    {
        string path = Path.Combine(
                RuntimeEnvironment.GetRuntimeDirectory(),
                "System.Net.dll");

        try
        {
            if (IsAssembly(path))
            {
                Console.WriteLine("Yes, the file is an assembly.");
            }
            else
            {
                Console.WriteLine("The file is not an assembly.");
            }
        }
        catch (BadImageFormatException)
        {
            Console.WriteLine("The file is not an executable.");
        }
        catch (FileNotFoundException)
        {
            Console.WriteLine("The file cannot be found.");
        }
    }

    /* Output: 
    Yes, the file is an assembly.  
    */
}
```
```vb
Imports System
Imports System.Collections.Generic
Imports System.IO
Imports System.Reflection.Metadata
Imports System.Reflection.PortableExecutable
Imports System.Runtime.InteropServices

Module ExamplePeReader
    Function IsAssembly(path As String) As Boolean

        Dim fs As FileStream = New FileStream(path, FileMode.Open, FileAccess.Read, FileShare.ReadWrite)

        ' Try to read CLI metadata from the PE file.
        Dim peReader As PEReader = New PEReader(fs)
        Using (peReader)
            If Not peReader.HasMetadata Then
                Return False ' File does Not have CLI metadata.
            End If

            ' Check that file has an assembly manifest.
            Dim reader As MetadataReader = peReader.GetMetadataReader()
            Return reader.IsAssembly
        End Using
    End Function

    Sub CheckAssembly()
        Dim filePath As String = Path.Combine(
                RuntimeEnvironment.GetRuntimeDirectory(),
                "System.Net.dll")

        Try
            If IsAssembly(filePath) Then
                Console.WriteLine("Yes, the file is an assembly.")
            Else
                Console.WriteLine("The file is not an assembly.")
            End If
        Catch ex As BadImageFormatException
            Console.WriteLine("The file is not an executable.")
        Catch ex As FileNotFoundException
            Console.WriteLine("The file cannot be found.")
        End Try
    End Sub
End Module
' Output:  
' Yes, the file is an Assembly.
```

## See also

- `System.Reflection.AssemblyName`
- C# programming guide
- Programming concepts (Visual Basic)
- Assemblies in .NET
