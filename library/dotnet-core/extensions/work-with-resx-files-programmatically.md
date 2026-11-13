---
title: "Working with .resx Files Programmatically"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/extensions/work-with-resx-files-programmatically.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Work with .resx files programmatically

> **Note:**
> This article applies to .NET Framework. For information that applies to .NET 5+ (including .NET Core), see Resources in .resx files.

Because XML resource (.resx) files must consist of well-defined XML, including a header that must follow a specific schema followed by data in name/value pairs, you may find that creating these files manually is error-prone. As an alternative, you can create .resx files programmatically by using types and members in the .NET Class Library. You can also use the .NET Class Library to retrieve resources that are stored in .resx files. This article explains how you can use the types and members in the `System.Resources` namespace to work with .resx files.

This article discusses working with XML (.resx) files that contain resources. For information on working with binary resource files that have been embedded in assemblies, see `System.Resources.ResourceManager`.

> **Warning:**
> There are also ways to work with .resx files other than programmatically. When you add a resource file to a Visual Studio project, Visual Studio provides an interface for creating and maintaining a .resx file, and automatically converts the .resx file to a .resources file at compile time. You can also use a text editor to manipulate a .resx file directly. However, to avoid corrupting the file, be careful not to modify any binary information that is stored in the file.

## Create a .resx file

You can use the `System.Resources.ResXResourceWriter` class to create a .resx file programmatically, by following these steps:

1. Instantiate a `System.Resources.ResXResourceWriter` object by calling the `System.Resources.ResXResourceWriter.#ctor(System.String)` method and supplying the name of the .resx file. The file name must include the .resx extension. If you instantiate the `System.Resources.ResXResourceWriter` object in a `using` block, you do not explicitly have to call the `System.Resources.ResXResourceWriter.Close*` method in step 3.

2. Call the `System.Resources.ResXResourceWriter.AddResource*` method for each resource you want to add to the file. Use the overloads of this method to add string, object, and binary (byte array) data. If the resource is an object, it must be serializable.

3. Call the `System.Resources.ResXResourceWriter.Close*` method to generate the resource file and to release all resources. If the `System.Resources.ResXResourceWriter` object was created within a `using` block, resources are written to the .resx file and the resources used by the `System.Resources.ResXResourceWriter` object are released at the end of the `using` block.

The resulting .resx file has the appropriate header and a `data` tag for each resource added by the `System.Resources.ResXResourceWriter.AddResource*` method.

> **Warning:**
> Do not use resource files to store passwords, security-sensitive information, or private data.

The following example creates a .resx file named CarResources.resx that stores six strings, an icon, and two application-defined objects (two `Automobile` objects). The `Automobile` class, which is defined and instantiated in the example, is tagged with the `System.SerializableAttribute` attribute.

_Code sample not included: ../../../samples/snippets/csharp/VS_Snippets_CLR/conceptual.resources.resx/cs/create1.cs._

> **Tip:**
> You can also use Visual Studio to create .resx files. At compile time, Visual Studio uses the Resource File Generator (Resgen.exe) to convert the .resx file to a binary resource (.resources) file, and also embeds it in either an application assembly or a satellite assembly.

You cannot embed a .resx file in a runtime executable or compile it into a satellite assembly. You must convert your .resx file into a binary resource (.resources) file by using the Resource File Generator (Resgen.exe). The resulting .resources file can then be embedded in an application assembly or a satellite assembly. For more information, see Create resource files.

## Enumerate resources

 In some cases, you may want to retrieve all resources, instead of a specific resource, from a .resx file. To do this, you can use the `System.Resources.ResXResourceReader` class, which provides an enumerator for all resources in the .resx file. The `System.Resources.ResXResourceReader` class implements `System.Collections.IDictionaryEnumerator`, which returns a `System.Collections.DictionaryEntry` object that represents a particular resource for each iteration of the loop. Its `System.Collections.DictionaryEntry.Key` property returns the resource's key, and its `System.Collections.DictionaryEntry.Value` property returns the resource's value.

 The following example creates a `System.Resources.ResXResourceReader` object for the CarResources.resx file created in the previous example and iterates through the resource file. It adds the two `Automobile` objects that are defined in the resource file to a `System.Collections.Generic.List`1` object, and it adds five of the six strings to a `System.Collections.SortedList` object. The values in the `System.Collections.SortedList` object are converted to a parameter array, which is used to display column headings to the console. The `Automobile` property values are also displayed to the console.

 _Code sample not included: ../../../samples/snippets/csharp/VS_Snippets_CLR/conceptual.resources.resx/cs/enumerate1.cs._

## Retrieve a specific resource

 In addition to enumerating the items in a .resx file, you can retrieve a specific resource by name by using the `System.Resources.ResXResourceSet` class. The `System.Resources.ResourceSet.GetString(System.String)` method retrieves the value of a named string resource. The `System.Resources.ResourceSet.GetObject(System.String)` method retrieves the value of a named object or binary data. The method returns an object that must then be cast (in C#) or converted (in Visual Basic) to an object of the appropriate type.

 The following example retrieves a form's caption string and icon by their resource names. It also retrieves the application-defined `Automobile` objects used in the previous example and displays them in a `System.Windows.Forms.DataGridView` control.

 _Code sample not included: ../../../samples/snippets/csharp/VS_Snippets_CLR/conceptual.resources.resx/cs/retrieve1.cs._

## Convert .resx files to binary .resources files

 Converting .resx files to embedded binary resource (*.resources*) files has significant advantages. Although .resx files are easy to read and maintain during application development, they are rarely included with finished applications. If they are distributed with an application, they exist as separate files apart from the application executable and its accompanying libraries. In contrast, *.resources* files are embedded in the application executable or its accompanying assemblies. In addition, for localized applications, relying on .resx files at runtime places the responsibility for handling resource fallback on the developer. In contrast, if a set of satellite assemblies that contain embedded .resources files has been created, the common language runtime handles the resource fallback process.

 To convert a *.resx* file to a *.resources* file, you use Resource File Generator (*resgen.exe*), which has the following basic syntax:

```console
 resgen.exe .resxFilename
```

 The result is a binary resource file that has the same root file name as the .resx file and a .resources file extension. This file can then be compiled into an executable or a library at compile time. If you are using the Visual Basic compiler, use the following syntax to embed a .resources file in an application's executable:

```console
vbc filename .vb -resource: .resourcesFilename
```

 If you are using C#, the syntax is as follows:

```console
 csc filename .cs -resource: .resourcesFilename
```

 The *.resources* file can also be embedded in a satellite assembly by using Assembly Linker (*al.exe*), which has the following basic syntax:

```console
al resourcesFilename -out: assemblyFilename
```

## See also

- Create resource files
- Resource File Generator (*resgen.exe*))
- Assembly Linker (*al.exe*)
