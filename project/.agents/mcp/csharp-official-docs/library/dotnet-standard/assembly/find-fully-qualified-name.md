---
title: "How to: Find an assembly's fully qualified name"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/assembly/find-fully-qualified-name.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# How to: Find an assembly's fully qualified name

To discover the fully qualified name of a .NET Framework assembly in the global assembly cache, use the Global Assembly Cache tool (Gacutil.exe). See How to: View the contents of the global assembly cache.

For .NET Core assemblies, and for .NET Framework assemblies that aren't in the global assembly cache, you can get the fully qualified assembly name in a number of ways:

- You can use code to output the information to the console or to a variable, or you can use the Ildasm.exe (IL Disassembler) to examine the assembly's metadata, which contains the fully qualified name.

- If the assembly is already loaded by the application, you can retrieve the value of the `System.Reflection.Assembly.FullName` property to get the fully qualified name. You can use the `System.Type.Assembly` property of a `System.Type` defined in that assembly to retrieve a reference to the `System.Reflection.Assembly` object. The example provides an illustration.

- If you know the assembly's file system path, you can call the `static` (C#) or `Shared` (Visual Basic) `System.Reflection.AssemblyName.GetAssemblyName*` method to get the fully qualified assembly name. The following is a simple example.

  ```csharp
  using System;
  using System.Reflection;

  public class Example
  {
     public static void Main()
     {
        Console.WriteLine(AssemblyName.GetAssemblyName(@".\UtilityLibrary.dll"));
     }
  }
  // The example displays output like the following:
  //   UtilityLibrary, Version=1.1.0.0, Culture=neutral, PublicKeyToken=null
  ```

  ```vb
  Imports System.Reflection

  Public Module Example
     Public Sub Main
        Console.WriteLine(AssemblyName.GetAssemblyName(".\UtilityLibrary.dll"))
     End Sub
  End Module
  ' The example displays output like the following:
  '   UtilityLibrary, Version=1.1.0.0, Culture=neutral, PublicKeyToken=null
  ```

- You can use the Ildasm.exe (IL Disassembler) to examine the assembly's metadata, which contains the fully qualified name.

For more information about setting assembly attributes such as version, culture, and assembly name, see Set assembly attributes. For more information about giving an assembly a strong name, see Create and use strong-named assemblies.

## Example

The following example shows how to display the fully qualified name of an assembly containing a specified class to the console. It uses the `System.Type.Assembly` property to retrieve a reference to an assembly from a type that's defined in that assembly.

```csharp
using System;
using System.Reflection;

class asmname
{
    public static void Main()
    {
        Type t = typeof(System.Data.DataSet);
        string s = t.Assembly.FullName.ToString();
        Console.WriteLine("The fully qualified assembly name " +
            "containing the specified class is {0}.", s);
    }
}
```

```vb
Imports System.Reflection

Class asmname
    Public Shared Sub Main()
        Dim t As Type = GetType(System.Data.DataSet)
        Dim s As String = t.Assembly.FullName.ToString()
        Console.WriteLine("The fully qualified assembly name " +
            "containing the specified class is {0}.", s)
    End Sub
End Class
```

## See also

- Assembly names
- Create assemblies
- Create and use strong-named assemblies
- Global assembly cache
- How the runtime locates assemblies
