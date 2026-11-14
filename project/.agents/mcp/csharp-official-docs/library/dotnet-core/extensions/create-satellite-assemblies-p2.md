---
title: "Create satellite assemblies (part 2 of 2)"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/extensions/create-satellite-assemblies.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Create satellite assemblies (part 2 of 2)

## Install satellite assemblies in the Global Assembly Cache

Instead of installing assemblies in a local application subdirectory, you can install them in the global assembly cache. This is particularly useful if you have class libraries and class library resource assemblies that are used by multiple applications.

Installing assemblies in the global assembly cache requires that they have strong names. Strong-named assemblies are signed with a valid public/private key pair. They contain version information that the runtime uses to determine which assembly to use to satisfy a binding request. For more information about strong names and versioning, see Assembly versioning. For more information about strong names, see Strong-named assemblies.

When you're developing an application, it's unlikely that you'll have access to the final public/private key pair. To install a satellite assembly in the global assembly cache and ensure that it works as expected, you can use a technique called delayed signing. When you delay sign an assembly, at build time you reserve space in the file for the strong name signature. The actual signing is delayed until later, when the final public/private key pair is available. For more information about delayed signing, see Delay signing an assembly.

### Obtain the public key

To delay sign an assembly, you must have access to the public key. You can either obtain the real public key from the organization in your company that will do the eventual signing, or create a public key by using the Strong Name tool (*sn.exe*).

The following *Sn.exe* command creates a test public/private key pair. The **–k** option specifies that *Sn.exe* should create a new key pair and save it in a file named *TestKeyPair.snk*.

```console
sn –k TestKeyPair.snk
```

You can extract the public key from the file that contains the test key pair. The following command extracts the public key from *TestKeyPair.snk* and saves it in *PublicKey.snk*:

```console
sn –p TestKeyPair.snk PublicKey.snk
```

### Delay signing an Assembly

After you obtain or create the public key, you use the Assembly Linker (*al.exe*) to compile the assembly and specify delayed signing.

The following *al.exe* command creates a strong-named satellite assembly for the application StringLibrary from the *strings.ja.resources* file:

```console
al -target:lib -embed:strings.ja.resources -culture:ja -out:StringLibrary.resources.dll -delay+ -keyfile:PublicKey.snk
```

The **-delay+** option specifies that the Assembly Linker should delay sign the assembly. The **-keyfile** option specifies the name of the key file that contains the public key to use to delay sign the assembly.

### Re-signing an Assembly

Before you deploy your application, you must re-sign the delay signed satellite assembly with the real key pair. You can do this by using *Sn.exe*.

The following *Sn.exe* command signs *StringLibrary.resources.dll* with the key pair stored in the file *RealKeyPair.snk*. The **–R** option specifies that a previously signed or delay signed assembly is to be re-signed.

```console
sn –R StringLibrary.resources.dll RealKeyPair.snk
```

### Install a satellite assembly in the Global Assembly Cache

When the runtime searches for resources in the resource fallback process, it looks in the global assembly cache first. (For more information, see the "Resource Fallback Process" section of Package and deploy resources.) As soon as a satellite assembly is signed with a strong name, it can be installed in the global assembly cache by using the Global Assembly Cache tool (*gacutil.exe*).

The following *Gacutil.exe* command installs *StringLibrary.resources.dll** in the global assembly cache:

```console
gacutil -i:StringLibrary.resources.dll
```

The **/i** option specifies that *Gacutil.exe* should install the specified assembly into the global assembly cache. After the satellite assembly is installed in the cache, the resources it contains become available to all applications that are designed to use the satellite assembly.

### Resources in the Global Assembly Cache: An Example

The following example uses a method in a .NET class library to extract and return a localized greeting from a resource file. The library and its resources are registered in the global assembly cache. The example includes resources for the English (United States), French (France), Russian (Russia), and English cultures. English is the default culture; its resources are stored in the main assembly. The example initially delay-signs the library and its satellite assemblies with a public key, then re-signs them with a public/private key pair. To create the example, do the following:

1. If you aren't using Visual Studio, use the following Strong Name Tool (Sn.exe) command to create a public/private key pair named *ResKey.snk*:

    ```console
    sn –k ResKey.snk
    ```

    If you're using Visual Studio, use the **Signing** tab of the project **Properties** dialog box to generate the key file.

2. Use the following Strong Name Tool (Sn.exe) command to create a public key file named *PublicKey.snk*:

    ```console
    sn –p ResKey.snk PublicKey.snk
    ```

3. Create a resource file named *Strings.resx* to contain the resource for the default culture. Store a single string named `Greeting` whose value is "How do you do?" in that file.

4. To indicate that "en" is the application's default culture, add the following `System.Resources.NeutralResourcesLanguageAttribute` attribute to the application's AssemblyInfo file or to the main source code file that will be compiled into the application's main assembly:

    _Code sample not included: ~/samples/snippets/csharp/VS_Snippets_CLR/conceptual.resources.satellites/cs/stringlibrary.cs._

5. Add support for additional cultures (the en-US, fr-FR, and ru-RU cultures) to the application as follows:

    - To support the "en-US" or English (United States) culture, create a resource file named *Strings.en-US.resx* or *Strings.en-US.txt*, and store in it a single string named `Greeting` whose value is "Hello!".

    - To support the "fr-FR" or French (France) culture, create a resource file named *Strings.fr-FR.resx* or *Strings.fr-FR.txt* and store in it a single string named `Greeting` whose value is "Bon jour!".

    - To support the "ru-RU" or Russian (Russia) culture, create a resource file named *Strings.ru-RU.resx* or *Strings.ru-RU.txt* and store in it a single string named `Greeting` whose value is "Привет!".

6. Use *resgen.exe* to compile each text or XML resource file to a binary .resources file. The output is a set of files that have the same root file name as the *.resx* or *.txt* files, but a *.resources* extension. If you create the example with Visual Studio, the compilation process is handled automatically. If you aren't using Visual Studio, run the following command to compile the *.resx* files into *.resources* files:

    ```console
    resgen filename
    ```

    Where *filename* is the optional path, file name, and extension of the *.resx* or text file.

7. Compile the following source code for *StringLibrary.vb* or *StringLibrary.cs* along with the resources for the default culture into a delay signed library assembly named *StringLibrary.dll*:

    > **Important:**
    > If you are using the command line rather than Visual Studio to create the example, you should modify the call to the `System.Resources.ResourceManager` class constructor to `ResourceManager rm = new ResourceManager("Strings",` `typeof(Example).Assembly);`.

    _Code sample not included: ~/samples/snippets/csharp/VS_Snippets_CLR/conceptual.resources.satellites/cs/stringlibrary.cs._

    The command for the C# compiler is:

    ```console
    csc -t:library -resource:Strings.resources -delaysign+ -keyfile:publickey.snk StringLibrary.cs
    ```

    The corresponding Visual Basic <example-value> command is:

    ```console
    vbc -t:library -resource:Strings.resources -delaysign+ -keyfile:publickey.snk StringLibrary.vb
    ```

8. Create a subdirectory in the main application directory for each localized culture supported by the application. You should create an *en-US*, an *fr-FR*, and an *ru-RU* subdirectory. Visual Studio creates these subdirectories automatically as part of the compilation process. Because all satellite assemblies have the same file name, the subdirectories are used to store individual culture-specific satellite assemblies until they're signed with a public/private key pair.

9. Embed the individual culture-specific *.resources* files into delay signed satellite assemblies and save them to the appropriate directory. The command to do this for each *.resources* file is:

    ```console
    al -target:lib -embed:Strings.culture.resources -culture:culture -out:culture\StringLibrary.resources.dll -delay+ -keyfile:publickey.snk
    ```

    where *culture* is the name of a culture. In this example, the culture names are en-US, fr-FR, and ru-RU.

10. Re-sign *StringLibrary.dll* by using the Strong Name tool (*sn.exe*) as follows:

    ```console
    sn –R StringLibrary.dll RealKeyPair.snk
    ```

11. Re-sign the individual satellite assemblies. To do this, use the Strong Name tool (*sn.exe*) as follows for each satellite assembly:

    ```console
    sn –R StringLibrary.resources.dll RealKeyPair.snk
    ```

12. Register *StringLibrary.dll* and each of its satellite assemblies in the global assembly cache by using the following command:

    ```console
    gacutil -i filename
    ```

    where *filename* is the name of the file to register.

13. If you're using Visual Studio, create a new **Console Application** project named `Example`, add a reference to *StringLibrary.dll* and the following source code to it, and compile.

    _Code sample not included: ~/samples/snippets/csharp/VS_Snippets_CLR/conceptual.resources.satellites/cs/example.cs._

    To compile from the command line, use the following command for the C# compiler:

    ```console
    csc Example.cs -r:StringLibrary.dll
    ```

    The command line for the Visual Basic <example-value> is:

    ```console
    vbc Example.vb -r:StringLibrary.dll
    ```

14. Run *Example.exe*.

## See also

- Package and deploy resources
- Delay signing an assembly
- *al.exe* (Assembly Linker)
- *sn.exe* (Strong Name tool)
- *gacutil.exe* (Global Assembly Cache tool)
- Resources in .NET
