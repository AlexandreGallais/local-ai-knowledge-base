---
title: "Package and deploy resources in .NET apps (part 3 of 3)"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/extensions/package-and-deploy-resources.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Package and deploy resources in .NET apps (part 3 of 3)

### Ultimate fallback to satellite assembly

You can optionally remove resources from the main assembly and specify that the runtime should load the ultimate fallback resources from a satellite assembly that corresponds to a specific culture. To control the fallback process, you use the `System.Resources.NeutralResourcesLanguageAttribute.#ctor(System.String,System.Resources.UltimateResourceFallbackLocation)` constructor and supply a value for the `System.Resources.UltimateResourceFallbackLocation` parameter that specifies whether Resource Manager should extract the fallback resources from the main assembly or from a satellite assembly.

The following .NET Framework example uses the `System.Resources.NeutralResourcesLanguageAttribute` attribute to store an application's fallback resources in a satellite assembly for the French (`fr`) language. The example has two text-based resource files that define a single string resource named `Greeting`. The first, resources.fr.txt, contains a French language resource.

```text
Greeting=Bon jour!
```

The second, resources,ru.txt, contains a Russian language resource.

```text
Greeting=Добрый день
```

These two files are compiled to .resources files by running Resource File Generator (*resgen.exe*) from the command line. For the French language resource, the command is:

```console
resgen.exe resources.fr.txt
```

For the Russian language resource, the command is:

```console
resgen.exe resources.ru.txt
```

The .resources files are embedded into dynamic link libraries by running Assembly Linker (*al.exe*) from the command line for the French language resource as follows:

```console
al /t:lib /embed:resources.fr.resources /culture:fr /out:fr\Example1.resources.dll
```

and for the Russian language resource as follows:

```console
al /t:lib /embed:resources.ru.resources /culture:ru /out:ru\Example1.resources.dll
```

The application source code resides in a file named Example1.cs or Example1.vb. It includes the `System.Resources.NeutralResourcesLanguageAttribute` attribute to indicate that the default application resource is in the fr subdirectory. It instantiates the Resource Manager, retrieves the value of the `Greeting` resource, and displays it to the console.

_Code sample not included: ~/samples/snippets/csharp/VS_Snippets_CLR/conceptual.resources.packaging/cs/example1.cs._

You can then compile C# source code from the command line as follows:

```console
csc Example1.cs
```

The command for the Visual Basic <example-value> is very similar:

```console
vbc Example1.vb
```

Because there are no resources embedded in the main assembly, you do not have to compile by using the `/resource` switch.

When you run the example from a system whose language is anything other than Russian, it displays the following output:

```output
Bon jour!
```

## Suggested packaging alternative

Time or budget constraints might prevent you from creating a set of resources for every subculture that your application supports. Instead, you can create a single satellite assembly for a parent culture that all related subcultures can use. For example, you can provide a single English satellite assembly (en) that is retrieved by users who request region-specific English resources, and a single German satellite assembly (de) for users who request region-specific German resources. For example, requests for German as spoken in Germany (de-DE), Austria (de-AT), and Switzerland (de-CH) would fall back to the German satellite assembly (de). The default resources are the final fallback and therefore should be the resources that will be requested by the majority of your application's users, so choose these resources carefully. This approach deploys resources that are less culturally specific, but can significantly reduce your application's localization costs.

## See also

- Resources in .NET apps
- Global Assembly Cache
- Create resource files
- Create satellite assemblies
