---
title: "CommandLineConfigurationExtensions class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.Configuration/CommandLineConfigurationExtensions.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# CommandLineConfigurationExtensions class

Namespace: `Microsoft.Extensions.Configuration`

```csharp
public static class CommandLineConfigurationExtensions
```

Extension methods for registering `CommandLineConfigurationProvider` with `IConfigurationBuilder`.

#### Remarks

For more information and examples, see Command-line configuration provider.

## CommandLineConfigurationExtensions.AddCommandLine(IConfigurationBuilder, CommandLineConfigurationSource>) method

```csharp
public static Microsoft.Extensions.Configuration.IConfigurationBuilder AddCommandLine (this Microsoft.Extensions.Configuration.IConfigurationBuilder builder, Action<Microsoft.Extensions.Configuration.CommandLine.CommandLineConfigurationSource>? configureSource);
```

Adds an `IConfigurationProvider` that reads configuration values from the command line.

Parameters:

- `builder`: The `IConfigurationBuilder` to add to.
- `configureSource`: Configures the source.

Returns: The `IConfigurationBuilder`.

To be added.

## CommandLineConfigurationExtensions.AddCommandLine(IConfigurationBuilder, String[]) method

```csharp
public static Microsoft.Extensions.Configuration.IConfigurationBuilder AddCommandLine (this Microsoft.Extensions.Configuration.IConfigurationBuilder configurationBuilder, string[] args);
```

Adds a `CommandLineConfigurationProvider``IConfigurationProvider`
that reads configuration values from the command line.

Parameters:

- `configurationBuilder`: The `IConfigurationBuilder` to add to.
- `args`: The command line args.

Returns: The `IConfigurationBuilder`.

The values passed on the command line, in the `args` string array, should be a set
of keys prefixed with two dashes ("--") and then values, separate by either the
equals sign ("=") or a space (" ").

A forward slash ("/") can be used as an alternative prefix, with either equals or space, and when using
an equals sign the prefix can be left out altogether.

There are five basic <example-value> formats for arguments:
`key1=value1 --key2=value2 /key3=value3 --key4 value4 /key5 value5`.

A simple console application that has five values.

```csharp

                 // dotnet run key1=value1 --key2=value2 /key3=value3 --key4 value4 /key5 value5
            
                 using Microsoft.Extensions.Configuration;
                 using System;
            
                 namespace CommandLineSample
                 {
                    public class Program
                    {
                        public static void Main(string[] args)
                        {
                            var builder = new ConfigurationBuilder();
                            builder.AddCommandLine(args);
            
                            var config = builder.Build();
            
                            Console.WriteLine($"Key1: '{config["Key1"]}'");
                            Console.WriteLine($"Key2: '{config["Key2"]}'");
                            Console.WriteLine($"Key3: '{config["Key3"]}'");
                            Console.WriteLine($"Key4: '{config["Key4"]}'");
                            Console.WriteLine($"Key5: '{config["Key5"]}'");
                        }
                    }
                 }
               
```

## CommandLineConfigurationExtensions.AddCommandLine(IConfigurationBuilder, String[], String>) method

```csharp
public static Microsoft.Extensions.Configuration.IConfigurationBuilder AddCommandLine (this Microsoft.Extensions.Configuration.IConfigurationBuilder configurationBuilder, string[] args, System.Collections.Generic.IDictionary<string,string>? switchMappings);
```

Adds a `CommandLineConfigurationProvider``IConfigurationProvider` that reads
configuration values from the command line using the specified switch mappings.

Parameters:

- `configurationBuilder`: The `IConfigurationBuilder` to add to.
- `args`: The command line args.
- `switchMappings`: The switch mappings. A dictionary of short (with prefix "-") and
alias keys (with prefix "--"), mapped to the configuration key (no prefix).

Returns: The `IConfigurationBuilder`.

The `switchMappings` allows additional formats for alternative short and alias keys
to be used from the command line. Also see the basic <example-value> of `AddCommandLine` for
the standard formats supported.

Short keys start with a single dash ("-") and are mapped to the main key name (without
prefix), and can be used with either equals or space. The single dash mappings are intended
to be used for shorter alternative switches.

Note that a single dash switch cannot be accessed directly, but must have a switch mapping
defined and accessed using the full key. Passing an undefined single dash argument will
cause as `FormatException`.

There are two formats for short arguments:
`-k1=value1 -k2 value2`.

Alias key <example-value> start with two dashes ("--") and are mapped to the main key name (without
prefix), and can be used in place of the normal key. They also work when a forward slash prefix
is used in the command line (but not with the no prefix equals format).

There are only four formats for aliased arguments:
`--alt3=value3 /alt4=value4 --alt5 value5 /alt6 value6`.

A simple console application that has two short and four alias switch mappings defined.

```csharp

                 // dotnet run -k1=value1 -k2 value2 --alt3=value2 /alt4=value3 --alt5 value5 /alt6 value6
            
                 using Microsoft.Extensions.Configuration;
                 using System;
                 using System.Collections.Generic;
            
                 namespace CommandLineSample
                 {
                    public class Program
                    {
                        public static void Main(string[] args)
                        {
                            var switchMappings = new Dictionary<string, string>()
                            {
                                { "-k1", "key1" },
                                { "-k2", "key2" },
                                { "--alt3", "key3" },
                                { "--alt4", "key4" },
                                { "--alt5", "key5" },
                                { "--alt6", "key6" },
                            };
                            var builder = new ConfigurationBuilder();
                            builder.AddCommandLine(args, switchMappings);
            
                            var config = builder.Build();
            
                            Console.WriteLine($"Key1: '{config["Key1"]}'");
                            Console.WriteLine($"Key2: '{config["Key2"]}'");
                            Console.WriteLine($"Key3: '{config["Key3"]}'");
                            Console.WriteLine($"Key4: '{config["Key4"]}'");
                            Console.WriteLine($"Key5: '{config["Key5"]}'");
                            Console.WriteLine($"Key6: '{config["Key6"]}'");
                        }
                    }
                 }
               
```
