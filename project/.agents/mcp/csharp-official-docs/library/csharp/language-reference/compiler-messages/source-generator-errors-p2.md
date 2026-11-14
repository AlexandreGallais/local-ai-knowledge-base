---
title: "Errors and warnings associated with source generators and interceptors (part 2 of 2)"
tool: "csharp"
version: "15"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/csharp/language-reference/compiler-messages/source-generator-errors.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Errors and warnings associated with source generators and interceptors (part 2 of 2)

## Incorrect mapping

Interceptors require a source mapping that maps the interceptable method and the interceptor method. The following errors indicate an issue with the mapping:

- **CS9139**: *Cannot intercept: compilation does not contain a file with path.*
- **CS9140**: *Cannot intercept: compilation does not contain a file with path 'path'. Did you mean to use path 'candidatePath'?*
- **CS9141**: *The provided line and character number does not refer to an interceptable method name, but rather to token '<example-value>'.*
- **CS9142**: *The given file has `n` lines, which is fewer than the provided line number `m`.*
- **CS9143**: *The given line is `c` characters long, which is fewer than the provided character number `n`.*
- **CS9145**: *Cannot intercept: Path is unmapped. Expected mapped path.*
- **CS9147**: *The provided line and character number does not refer to the start of token '<example-value>'. Did you mean to use line '<example-value>' and character '<example-value>'?*
- **CS9150**: *Interceptor cannot have a `null` file path.*
- **CS9157**: *Line and character numbers provided to `InterceptsLocationAttribute` must be positive.*

To correct mapping errors, ensure your `InterceptsLocationAttribute` contains valid file paths and accurate position information:

- Verify the file path matches a file in your compilation exactly (**CS9139**, **CS9140**). Use the exact path as it appears in your project, including correct casing and directory separators. If the compiler suggests an alternative path, update your attribute to use that path.
- Use mapped file paths when working with source generators that transform file paths (**CS9145**). Source generators often remap paths for generated files, and you must use the mapped path that the compiler recognizes, not the original source path.
- Ensure the file path isn't `null` in your `InterceptsLocationAttribute` (**CS9150**). Every interception must specify a valid, non-null file path that identifies the source file containing the call to intercept.
- Provide positive, 1-based line and character numbers (**CS9157**). Line numbers and character positions must start at 1, not 0. Verify your source generator uses 1-based indexing when calculating positions.
- Point to the exact start of the method name token (**CS9141**, **CS9147**). The line and character numbers must identify the first character of the method name in the invocation, not whitespace, operators, or other tokens. If the compiler suggests alternative coordinates, use those to target the correct token start.
- Stay within the file's bounds (**CS9142**, **CS9143**). Verify the line number doesn't exceed the total line count and the character number doesn't exceed the line length. Recalculate positions if the source file has changed since the attribute was generated.

## Incorrect interceptor declaration

The following errors indicate problems with interceptor declarations, including issues with the `InterceptsLocationAttribute` format or violations of interceptor rules:

- **CS9138**: *Method 'method' cannot be used as an interceptor because its containing type has type parameters.*
- **CS9146**: *An interceptor method must be an ordinary member method.*
- **CS9151**: *Possible method name `M` cannot be intercepted because it is not being invoked.*
- **CS9152**: *Cannot intercept a call in file with path 'path' because multiple files in the compilation have this path.*
- **CS9153**: *The indicated call is intercepted multiple times.*
- **CS9160**: *A nameof operator cannot be intercepted.*
- **CS9161**: *An interceptor cannot be marked with `UnmanagedCallersOnlyAttribute`.*
- **CS9206**: *An interceptor cannot be declared in the global namespace.*
- **CS9207**: *Cannot intercept 'method' because it is not an invocation of an ordinary member method.*
- **CS9231**: *The data argument to InterceptsLocationAttribute is not in the correct format.*
- **CS9232**: *Version 'version' of the interceptors format is not supported. The latest supported version is '1'.*
- **CS9233**: *Cannot intercept a call in file 'file' because it is duplicated elsewhere in the compilation.*
- **CS9234**: *Cannot intercept a call in file 'file' because a matching file was not found in the compilation.*
- **CS9235**: *The data argument to InterceptsLocationAttribute refers to an invalid position in file 'file'.*

To correct interceptor declaration errors, follow these rules for valid interceptor declarations and `InterceptsLocationAttribute` usage:

- Format the `InterceptsLocationAttribute` data argument correctly (**CS9231**). The attribute requires specifically structured data that encodes file path and position information. Ensure your source generator produces data in the expected format matching the current interceptors specification.
- Use version '1' in your `InterceptsLocationAttribute` (**CS9232**), because it's the latest supported version. Update your source generator to output version 1 format attributes rather than unsupported version numbers.
- Ensure unique file paths in your compilation (**CS9233**, **CS9234**). When the compilation contains duplicate file paths, rename or reorganize files to make each path unique. Verify that the file path in the attribute matches a file actually included in the compilation.
- Validate position data points to valid code locations (**CS9235**). The line and character numbers must reference a valid interception point within the specified file. Regenerate the attribute if the source file changed or if the position falls outside the file's bounds.
- Declare non-generic interceptor methods in non-generic types (**CS9138**). Interceptors can't be declared in types that have type parameters. If you need to intercept a generic method, create a non-generic interceptor in a non-generic containing type that works with the specific constructed type.
- Make interceptors ordinary member methods (**CS9146**). Interceptors can't be operators, constructors, finalizers, properties, or indexers. Declare your interceptor as a regular static or instance method.
- Intercept actual method invocations, not expressions (**CS9151**, **CS9207**). You can only intercept calls to ordinary member methods that are being invoked. You can't intercept method groups, delegates, or methods referenced without being called. Ensure the interceptable location identifies an actual method call.
- Remove duplicate interception attempts (**CS9153**). Each method call can only be intercepted once. If multiple `InterceptsLocationAttribute` instances target the same call, remove all but one to resolve the ambiguity.
- Don't intercept `nameof` operators (**CS9160**). The `nameof` operator doesn't invoke methods at runtime, so it can't be intercepted. Only intercept actual method calls that execute at runtime.
- Remove `UnmanagedCallersOnlyAttribute` from interceptors (**CS9161**). Interceptors must be callable from managed code and can't be marked with `UnmanagedCallersOnlyAttribute`. Remove the attribute from your interceptor method declaration.
- Declare interceptors within a namespace (**CS9206**). Interceptors can't be declared in the global namespace and must be contained within at least one namespace declaration. Wrap your interceptor class in a namespace.
- Resolve duplicate file paths at the compilation level (**CS9152**). When multiple files share the same path in the compilation, the compiler can't determine which file to intercept. Ensure build configuration produces unique file paths or use a different organization strategy for your source files.
