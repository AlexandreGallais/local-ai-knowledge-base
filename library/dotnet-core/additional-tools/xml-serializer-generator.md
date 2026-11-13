---
title: "Microsoft XML Serializer Generator"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/additional-tools/xml-serializer-generator.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Use Microsoft XML Serializer Generator on .NET

In this tutorial, you learn how to use the Microsoft XML Serializer Generator in a C# application. During the course of this tutorial, you learn:

>
> - How to create a .NET console app
> - How to add a reference to the Microsoft.XmlSerializer.Generator package
> - How to edit your MyApp.csproj to add dependencies
> - How to add a class and an XmlSerializer
> - How to build and run the application

Like the XML Serializer Generator (sgen.exe) for .NET Framework, the Microsoft.XmlSerializer.Generator NuGet package is the equivalent for modern .NET. It creates an XML serialization assembly for types contained in an assembly to improve the startup performance of XML serialization when serializing or deserializing objects of those types using `System.Xml.Serialization.XmlSerializer`.

## Prerequisites

To complete this tutorial:

- .NET 8 SDK or later.
- Your favorite code editor.

> **Tip:**
> Need to install a code editor? Try Visual Studio.

The following instructions show you how to use XML Serializer Generator in a .NET console application.

## Create the app

1. Open a command prompt and create a folder named *MyApp*. Navigate to the folder you created and type the following command:

   ```dotnetcli
   dotnet new console
   ```

1. Add a reference to the Microsoft.XmlSerializer.Generator package.

   ```dotnetcli
   dotnet add package Microsoft.XmlSerializer.Generator -v 10.0.0
   ```

   After running this command, the following lines are added to your *MyApp.csproj* project file:

   ```xml
   <ItemGroup>
      <PackageReference Include="Microsoft.XmlSerializer.Generator" Version="10.0.0" />
   </ItemGroup>
   ```

1. Open *Program.cs* in your text editor. Add a class named *MyClass* in *Program.cs*.

   ```csharp
   public class MyClass
   {
      public int Value;
   }
   ```

1. Create an `XmlSerializer` for `MyClass`. Add the following line to the *Program.cs* file:

   ```csharp
   var serializer = new System.Xml.Serialization.XmlSerializer(typeof(MyClass));
   ```

1. Build and run the application. Run the application via `dotnet run`:

   ```dotnetcli
   dotnet run
   ```

   The app automatically loads and uses the pregenerated serializers at runtime.

   > **Tip:**
   > `dotnet run` calls `dotnet build` to ensure that the build targets have been built, and then calls `dotnet <assembly.dll>` to run the target application.

> **Important:**
> The commands and steps shown in this tutorial to run your application are used during development time only. Once you're ready to deploy your app, take a look at the different deployment strategies for .NET apps and the `dotnet publish` command.

If everything succeeds, an assembly named *MyApp.XmlSerializers.dll* is generated in the output folder.

Congratulations! You have just:

>
> - Created a .NET console app.
> - Added a reference to the Microsoft.XmlSerializer.Generator package.
> - Edited your MyApp.csproj to add dependencies.
> - Added a class and an XmlSerializer.
> - Built and run the application.

## Further customize XML serialization assembly (optional)

Add the following XML to your *MyApp.csproj* to further customize assembly generation:

```xml
<PropertyGroup>
    <SGenReferences>C:\myfolder\abc.dll;C:\myfolder\def.dll</SGenReferences>
    <SGenTypes>MyApp.MyClass;MyApp.MyClass1</SGenTypes>
    <SGenProxyTypes>false</SGenProxyTypes>
    <SGenVerbose>true</SGenVerbose>
    <SGenKeyFile>mykey.snk</SGenKeyFile>
    <SGenDelaySign>true</SGenDelaySign>
</PropertyGroup>
```

## Related resources

- Introducing XML serialization
- How to serialize using XmlSerializer
