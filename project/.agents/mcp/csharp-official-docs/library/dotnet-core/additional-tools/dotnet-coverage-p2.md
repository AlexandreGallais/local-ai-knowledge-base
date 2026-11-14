---
title: "dotnet-coverage code coverage tool - .NET CLI (part 2 of 2)"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/additional-tools/dotnet-coverage.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# dotnet-coverage code coverage tool - .NET CLI (part 2 of 2)

## Collecting code coverage

Collect code coverage data for any .NET application (such as console or Blazor) by using the following command:

```console
dotnet-coverage collect dotnet run
```

In case of an application that requires a signal to terminate, you can use `Ctrl`+`C`, which will still let you collect code coverage data. For the argument, you can provide any command that will eventually start a .NET app. For example, it can be a PowerShell script.

### Sessions

When you're running code coverage analysis on a .NET server that just waits for messages and sends responses, you need a way to stop the server to get final code coverage results. You can use `Ctrl`+`C` locally, but not in Azure Pipelines. For these scenarios, you can use sessions. You can specify a session ID when starting collection, and then use the `shutdown` command to stop collection and the server.

For example, assume you have a server in the *D:\serverexample\server* directory and a test project in the *D:\serverexample\tests* directory. Tests are communicating with the server through the network. You can start code coverage collection for the server as follows:

```console
D:\serverexample\server> dotnet-coverage collect --session-id serverdemo "dotnet run"
```

Session ID was specified as `serverdemo`. Then you can run tests as follows:

```console
D:\serverexample\tests> dotnet test
```

A code coverage file for session `serverdemo` can be generated with current coverage as follows:

```console
dotnet-coverage snapshot --output after_first_test.coverage serverdemo
```

Also, a snapshot tag can be added to the coverage file using tag options as follows:

```console
dotnet-coverage snapshot --tag-name after_first_test --tag-identifier after_first_test serverdemo
```

Finally, session `serverdemo` and the server can be closed as follows:

```console
dotnet-coverage shutdown serverdemo
```

Following is an example of full output on the server side:

```console
D:\serverexample\server> dotnet-coverage collect --session-id serverdemo "dotnet run"
SessionId: serverdemo
Waiting for a connection... Connected!
Received: Hello!
Sent: HELLO!
Waiting for a connection... Code coverage results: output.coverage.
D:\serverexample\server>
```

### Server and client mode

Code coverage collection can be done in server-client mode as well. In this scenario, a code coverage collection server starts, and multiple clients can connect with the server. Code coverage is collected for all the clients collectively.

Start the code coverage server using the following command:

```condole
dotnet-coverage collect --session-id serverdemo --server-mode
```

In this example, the session ID was specified as `serverdemo` for the server. A client can connect to the server using this session ID using the following command:

```condole
dotnet-coverage connect serverdemo dotnet run
```

Finally, you can close the session `serverdemo` and the server using the following command:

```console
dotnet-coverage shutdown serverdemo
```

The server process creates a collective code coverage report for all clients and exits.

Following is an example of full output on the server side:

```console
D:\serverexample\server> dotnet-coverage collect --session-id serverdemo --server-mode
SessionId: serverdemo
// Server will be in idle state and wait for connect and shutdown commands
Code coverage results: output.coverage.
D:\serverexample\server>
```

Following is an example of full output on the client side:

```console
D:\serverexample\server> dotnet-coverage connect serverdemo ConsoleApplication.exe World
Hello World!!
D:\serverexample\server> dotnet-coverage connect serverdemo WpfApplication.exe
D:\serverexample\server> dotnet-coverage shutdown serverdemo
D:\serverexample\server>
```

You can also start both server and client in background mode. Another process starts in the background and returns control back to the user.

Following is an example of full output in background server client mode:

```console
D:\serverexample\server> dotnet-coverage collect --session-id serverdemo --server-mode --background
D:\serverexample\server> dotnet-coverage connect --background serverdemo ConsoleApplication.exe World
D:\serverexample\server> dotnet-coverage connect --background serverdemo WpfApplication.exe
D:\serverexample\server> dotnet-coverage shutdown serverdemo
D:\serverexample\server>
```

## Static code coverage for managed assemblies

The dotnet-coverage tool can be used to collect code coverage for managed assemblies using static instrumentation. There are three different methods available that you can use. To demonstrate, let's assume we have a simple C# console application:

```console
D:\examples\ConsoleApp> dotnet run
Hello, World!
```

### Use collect command with include files option or configuration

If you don't want to use the `instrument` command, then the files to be instrumented can be specified using `--include-files` option as follows:

```console
D:\examples\ConsoleApp> dotnet-coverage collect --include-files .\bin\Debug\net9.0\*.dll dotnet run
dotnet-coverage v17.14.1.0 [win-x64 - .NET 9.0.2]

SessionId: 57862ec0-e512-49a5-8b66-2804174680fc
Hello, World!
Code coverage results: output.coverage.
```

You can also specify files to be instrumented using configuration as follows:

```xml
<ModulePaths>
  <IncludeDirectories>
    <Directory>D:\examples\ConsoleApp\bin\Debug\net7.0</Directory>
  </IncludeDirectories>
</ModulePaths>
```

### Using instrument and collect commands

In this case, first binary needs to be instrumented as follows:

```console
D:\examples\ConsoleApp> dotnet-coverage instrument .\bin\Debug\net7.0\ConsoleApp.dll
dotnet-coverage v17.14.1.0 [win-x64 - .NET 9.0.2]

Input file successfully instrumented.
```

Then you can collect code coverage as follows:

```console
D:\examples\ConsoleApp> dotnet-coverage collect .\bin\Debug\net7.0\ConsoleApp.exe
dotnet-coverage v17.14.1.0 [win-x64 - .NET 9.0.2]

SessionId: a09e6bef-ff64-4b5f-8bb8-fc495ebb50ba
Hello, World!
Code coverage results: output.coverage.
```

### Use the instrument and collect commands in server mode

In this case, you can completely separate coverage collection from running your application. First, instrument your binary as follows:

```console
D:\examples\ConsoleApp> dotnet-coverage instrument --session-id 73c34ce5-501c-4369-a4cb-04d31427d1a4 .\bin\Debug\net7.0\ConsoleApp.dll
dotnet-coverage v17.14.1.0 [win-x64 - .NET 9.0.2]

Input file successfully instrumented.
```

> **Note:**
> Session ID needs to be used in this scenario to make sure that the application can connect and provide data to external collector.

In the second step, you need to start coverage collector as follows:

```console
D:\examples\ConsoleApp> dotnet-coverage collect --session-id 73c34ce5-501c-4369-a4cb-04d31427d1a4 --server-mode
dotnet-coverage v17.14.1.0 [win-x64 - .NET 9.0.2]

SessionId: 73c34ce5-501c-4369-a4cb-04d31427d1a4
```

Then the application can be started as follows:

```console
D:\examples\ConsoleApp> .\bin\Debug\net7.0\ConsoleApp.exe
Hello, World!
```

Finally, the collector can be closed as follows:

```console
D:\examples\ConsoleApp> dotnet-coverage shutdown 73c34ce5-501c-4369-a4cb-04d31427d1a4
dotnet-coverage v17.14.1.0 [win-x64 - .NET 9.0.2]
```

### Settings

You can specify a file with settings when you use the `collect` command. The settings file can be used to exclude some modules or methods from code coverage analysis. The format is the same as the data collector configuration inside a *runsettings* file. For more information, see Customize code coverage analysis. Here's an example:

```xml
<?xml version="1.0" encoding="utf-8"?>
<Configuration>
    <CodeCoverage>
        <!--
        Additional paths to search for .pdb (symbol) files. Symbols must be found for modules to be instrumented.
        If .pdb files are in the same folder as the .dll or .exe files, they are automatically found. Otherwise, specify them here.
        Note that searching for symbols increases code coverage run time. So keep this small and local.
        -->
        <SymbolSearchPaths>
            <Path>C:\Users\User\Documents\Visual Studio 2012\Projects\ProjectX\bin\Debug</Path>
            <Path>\\mybuildshare\builds\ProjectX</Path>
        </SymbolSearchPaths>

        <!--
        About include/exclude lists:
        Empty "Include" clauses imply all; empty "Exclude" clauses imply none.
        Each element in the list is a regular expression (ECMAScript syntax). See /visualstudio/ide/using-regular-expressions-in-visual-studio.
        An item must first match at least one entry in the include list to be included.
        Included items must then not match any entries in the exclude list to remain included.
        -->

        <!-- Match assembly file paths: -->
        <ModulePaths>
            <Include>
                <ModulePath>.*\.dll$</ModulePath>
                <ModulePath>.*\.exe$</ModulePath>
            </Include>
            <Exclude>
                <ModulePath>.*CPPUnitTestFramework.*</ModulePath>
            </Exclude>
            <!-- Additional directories from .NET assemblies should be statically instrumented: -->
            <IncludeDirectories>
                <Directory Recursive="true">C:\temp</Directory>
            </IncludeDirectories>
        </ModulePaths>

        <!-- Match fully qualified names of functions: -->
        <!-- (Use "\." to delimit namespaces in C# or Visual Basic, "::" in C++.)  -->
        <Functions>
            <Exclude>
                <Function>^Fabrikam\.UnitTest\..*</Function>
                <Function>^std::.*</Function>
                <Function>^ATL::.*</Function>
                <Function>.*::__GetTestMethodInfo.*</Function>
                <Function>^Microsoft::VisualStudio::CppCodeCoverageFramework::.*</Function>
                <Function>^Microsoft::VisualStudio::CppUnitTestFramework::.*</Function>
            </Exclude>
        </Functions>

        <!-- Match attributes on any code element: -->
        <Attributes>
            <Exclude>
            <!-- Don't forget "Attribute" at the end of the name -->
                <Attribute>^System\.Diagnostics\.DebuggerHiddenAttribute$</Attribute>
                <Attribute>^System\.Diagnostics\.DebuggerNonUserCodeAttribute$</Attribute>
                <Attribute>^System\.CodeDom\.Compiler\.GeneratedCodeAttribute$</Attribute>
                <Attribute>^System\.Diagnostics\.CodeAnalysis\.ExcludeFromCodeCoverageAttribute$</Attribute>
            </Exclude>
        </Attributes>

        <!-- Match the path of the source files in which each method is defined: -->
        <Sources>
            <Exclude>
                <Source>.*\\atlmfc\\.*</Source>
                <Source>.*\\vctools\\.*</Source>
                <Source>.*\\public\\sdk\\.*</Source>
                <Source>.*\\microsoft sdks\\.*</Source>
                <Source>.*\\vc\\include\\.*</Source>
            </Exclude>
        </Sources>

        <!-- Match the company name property in the assembly: -->
        <CompanyNames>
            <Exclude>
                <CompanyName>.*microsoft.*</CompanyName>
            </Exclude>
        </CompanyNames>

        <!-- Match the public key token of a signed assembly: -->
        <PublicKeyTokens>
            <!-- Exclude Visual Studio extensions: -->
            <Exclude>
                <PublicKeyToken>^B77A5C561934E089$</PublicKeyToken>
                <PublicKeyToken>^B03F5F7F11D50A3A$</PublicKeyToken>
                <PublicKeyToken>^31BF3856AD364E35$</PublicKeyToken>
                <PublicKeyToken>^89845DCD8080CC91$</PublicKeyToken>
                <PublicKeyToken>^71E9BCE111E9429C$</PublicKeyToken>
                <PublicKeyToken>^8F50407C4E9E73B6$</PublicKeyToken>
                <PublicKeyToken>^E361AF139669C375$</PublicKeyToken>
            </Exclude>
        </PublicKeyTokens>

        <EnableStaticManagedInstrumentation>True</EnableStaticManagedInstrumentation>
        <EnableDynamicManagedInstrumentation>True</EnableDynamicManagedInstrumentation>

    </CodeCoverage>
</Configuration>
```

## Merge code coverage reports

You can merge `a.coverage` and `b.coverage` and store the data in `merged.coverage` as follows:

```console
dotnet-coverage merge -o merged.coverage a.coverage b.coverage
```

For example, if you run a command like `dotnet test --collect "Code Coverage"`, the coverage report is stored into a folder that is named a random GUID. Such folders are hard to find and merge. Using this tool, you can merge all code coverage reports for all your projects using globbing patterns as follows:

```console
dotnet-coverage merge -o merged.cobertura.xml -f cobertura **\*.coverage
```

The preceding command merges all coverage reports from the current directory and all subdirectories and stores the result into a cobertura file. In Azure Pipelines, you can use Publish Code Coverage Results task to publish a merged cobertura report.

You can use the `merge` command to convert a code coverage report to another format. For example, the following command converts a binary code coverage report into XML format.

```console
dotnet-coverage merge -o output.xml -f xml input.coverage
```

## Telemetry

Starting with version 18.10.0, the `dotnet-coverage` tool collects telemetry data to help Microsoft improve the code coverage tools. The data records which commands you run and which options you set when you run the tool. You can disable telemetry at any time. For more information about the data that's collected and how to opt out, see Microsoft.CodeCoverage.Console telemetry.

## See also

* Customize code coverage analysis
* Publish Code Coverage Results task
