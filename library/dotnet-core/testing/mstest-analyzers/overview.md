---
title: "MSTest code analysis (part 1 of 2)"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/testing/mstest-analyzers/overview.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# MSTest code analysis

*MSTest analysis* ("MSTESTxxxx") rules inspect your C# or Visual Basic test code for problems that affect test discovery, execution, reliability, and maintainability.

## Why these rules exist

MSTest calls your test and lifecycle methods, supplies their arguments, and waits for asynchronous work to finish. Rules such as MSTEST0003 check that your code meets those execution requirements. Other rules detect mistakes that can hide failures, produce misleading results, or interfere with other tests.

Not every rule describes a runtime requirement. Design rules can express a project convention or a tradeoff. For example, MSTEST0019 favors `TestInitialize` for asynchronous setup, while MSTEST0020 favors constructors for synchronous setup of `readonly` fields. Both approaches are supported. Use each rule's **Rule description** and **When to suppress warnings** sections to understand its purpose and decide whether it fits your project.

## Editor support

The `MSTest.Analyzers` NuGet package reports diagnostics in supported editors and during builds. Starting with `MSTest.TestFramework` 3.7, the framework depends on this package. For earlier versions, use the `MSTest` metapackage or add an explicit package reference to `MSTest.Analyzers`.

In Visual Studio, many rules have associated *code fixes* in the light bulb menu. Each rule page lists whether a code fix is available, but not every violation can be fixed automatically.

Code inserted by IntelliSense or another editor feature still needs to meet MSTest's requirements. Analyzers check the resulting code and can help you correct it; they don't configure the editor's completion or code-generation templates.

## MSTestAnalysisMode

Starting with MSTest 3.8, an MSBuild property named `MSTestAnalysisMode` is available to determine which analyzers are enabled at which severity.

> **Tip:**
> To see which rules are enabled at which severity for each mode, you can navigate to the package of the version of interest in NuGet cache, locate the `globalconfigs` directory, and open the `.globalconfig` file corresponding to the analysis mode.
> For more information on finding the NuGet cache directory, see Managing the global packages, cache, and temp folders. From that directory, locate `mstest.analyzers` directory, then the version (3.8 and higher), then `globalconfigs`.
> Alternatively, you can download the NuGet package of the version of interest from `nuget.org` and view it in NuGet Package Explorer (Windows app), or view directly in the web app version of NuGet Package Explorer.

The available values for this property:

- `None`
- `Default`
- `Recommended`
- `All`

### `None`

This value sets rules to `none` severity, except rules whose default severity is Error. MSTEST0088 remains enabled as an error even in `None` mode. To configure individual rules, use `.editorconfig` or `.globalconfig` files.

### `Default`

This setting follows the default documented behavior for each rule.

- Rules that are enabled by default will use their default severity.
- Rules that are disabled by default will use `none` severity.

> **Note:**
> Rules that are enabled by default as warnings are violations that are expected to cause issues at runtime.

### `Recommended`

This is the mode most developers are expected to use. Rules that are enabled by default with Info (`suggestion`) severity are escalated to warnings. The following rules are escalated to errors in both `Recommended` and `All` modes:

- MSTEST0003: Test methods should have valid layout.
- MSTEST0043: Use retry attribute on test method.

Rules whose default severity is Error, such as MSTEST0088, retain that severity.

### `All`

This mode is more aggressive than `Recommended`. Rules are enabled with at least Warning severity, except the opt-in rules listed below. Rules whose default severity is Error, such as MSTEST0088, retain that severity. In addition, the following rules are escalated to errors:

- MSTEST0003: Test methods should have valid layout.
- MSTEST0043: Use retry attribute on test method.

> **Note:**
> The following rules are completely opt-in and are not enabled in `Default`, `Recommended`, or `All` modes:
>
> - MSTEST0015: Test method should not be ignored
> - MSTEST0019: Prefer TestInitialize methods over constructors
> - MSTEST0020: Prefer constructors over TestInitialize methods
> - MSTEST0021: Prefer Dispose over TestCleanup methods
> - MSTEST0022: Prefer TestCleanup over Dispose methods

## Rules by category

The analyzer rules are organized into the following categories:

### Design rules

Design rules help you create and maintain test suites that adhere to proper design and good practices.

### Performance rules

Performance rules support high-performance testing.

### Suppression rules

Suppression rules support suppressing diagnostics from other rules.

### Usage rules

Usage rules support proper usage of MSTest.

## Rules by concept

Find rules organized by common testing scenarios and concepts:

### Test structure & attributes

Rules that help ensure your test classes and methods are properly structured and decorated:

- MSTEST0002 - Test class should be valid
- MSTEST0003 - Test method should be valid
- MSTEST0004 - Public types should be test classes
- MSTEST0007 - Use attribute on test method
- MSTEST0016 - Test class should have test method
- MSTEST0029 - Public method should be test method
- MSTEST0030 - Type containing test method should be a test class
- MSTEST0036 - Do not use shadowing
- MSTEST0041 - Use condition-based attributes with test class
- MSTEST0044 - Prefer TestMethod over DataTestMethod
- MSTEST0056 - TestMethodAttribute should set DisplayName correctly
- MSTEST0057 - TestMethodAttribute should propagate source information
- MSTEST0060 - Duplicate TestMethodAttribute
- MSTEST0063 - Test class should have valid constructor
- MSTEST0069 - Inherited `[TestClass]` is ignored by the MSTest source generator
- MSTEST0071 - Test method should not specify a display name equal to its name
- MSTEST0072 - `[AssemblyFixtureProvider]` isn't supported with ahead-of-time compilation
- MSTEST0078 - `[DependsOn]` arguments should be valid
- MSTEST0081 - `[TestFilterProvider]` should reference a valid test filter type
- MSTEST0082 - A test class inherits a lifecycle or test method from a different MSTest version
- MSTEST0085 - `[TestClass]` should not be applied to abstract classes
- MSTEST0086 - Remove redundant test method attribute
- MSTEST0088 - MSTest host test-class injection is not supported by the selected build mode

Related documentation: Write tests with MSTest

### Async/await patterns

Rules for writing asynchronous test code correctly:

- MSTEST0013 - AssemblyCleanup should be valid (includes async rules)
- MSTEST0027 - Suppress async suffix for test methods
- MSTEST0028 - Suppress async suffix for test fixture methods
- MSTEST0039 - Use newer Assert.Throws methods (async variants)
- MSTEST0040 - Avoid using asserts in async void context
- MSTEST0045 - Use cooperative cancellation for timeout
- MSTEST0049 - Flow TestContext CancellationToken
- MSTEST0054 - Use CancellationToken property
- MSTEST0064 - Prefer async assertion methods
- MSTEST0067 - Avoid synchronously blocking calls in test code

Related documentation: TestContext

### Data-driven testing

Rules for working with data-driven test scenarios:

- MSTEST0007 - Use attribute on test method
- MSTEST0014 - DataRow should be valid
- MSTEST0018 - DynamicData should be valid
- MSTEST0042 - Duplicate DataRow
- MSTEST0052 - Avoid explicit DynamicDataSourceType
- MSTEST0062 - Avoid out/ref test method parameters
- MSTEST0087 - Avoid duplicated `DataRow` display names

Related documentation: Data-driven testing

### Lifecycle & initialization

Rules for test initialization, cleanup, and lifecycle management:

- MSTEST0008 - TestInitialize should be valid
- MSTEST0009 - TestCleanup should be valid
- MSTEST0010 - ClassInitialize should be valid
- MSTEST0011 - ClassCleanup should be valid
- MSTEST0012 - AssemblyInitialize should be valid
- MSTEST0013 - AssemblyCleanup should be valid
- MSTEST0019 - Prefer TestInitialize over constructors
- MSTEST0020 - Prefer constructors over TestInitialize
- MSTEST0021 - Prefer Dispose over TestCleanup
- MSTEST0022 - Prefer TestCleanup over Dispose
- MSTEST0034 - Use ClassCleanupBehavior.EndOfClass
- MSTEST0047 - Suppress IDE0060 for unused TestContext parameter on initialize and cleanup methods
- MSTEST0050 - Global test fixture should be valid
- MSTEST0066 - `[Ignore]` should specify a justification

Related documentation: Lifecycle

### Assertions

Rules for using assertion methods correctly and effectively:

- MSTEST0006 - Avoid ExpectedException attribute
- MSTEST0014 - DataRow should be valid
- MSTEST0017 - Assertion args should be passed in correct order
- MSTEST0023 - Do not negate boolean assertion
- MSTEST0025 - Prefer Assert.Fail over always-false conditions
- MSTEST0026 - Assertion args should avoid conditional access
- MSTEST0032 - Review always-true assert condition
- MSTEST0037 - Use proper assert methods
- MSTEST0038 - Avoid Assert.AreSame with value types
- MSTEST0039 - Use newer Assert.Throws methods
- MSTEST0046 - Use Assert instead of StringAssert
- MSTEST0051 - Assert.Throws should contain single statement
- MSTEST0053 - Avoid Assert format parameters
- MSTEST0058 - Avoid asserts in catch blocks
- MSTEST0064 - Prefer async assertion methods
- MSTEST0065 - Avoid Assert.AreEqual on collection types
- MSTEST0068 - Use Assert instead of CollectionAssert

Related documentation: Assertions

### TestContext

Rules for properly using the TestContext object:

- MSTEST0005 - TestContext should be valid
- MSTEST0024 - Do not store static TestContext
- MSTEST0033 - Suppress non-nullable reference not initialized warning
- MSTEST0047 - Suppress IDE0060 for the TestContext parameter
- MSTEST0048 - TestContext property usage
- MSTEST0049 - Flow TestContext CancellationToken
- MSTEST0054 - Use CancellationToken property

Related documentation: TestContext

### Parallel test safety

Rules that help parallel tests coordinate shared resources and avoid process-wide state:

- MSTEST0073 - Prefer a constant for the `[ResourceLock]` resource key
- MSTEST0074 - Test mutating process-global state should declare a resource lock
- MSTEST0075 - Avoid changing the current directory in a parallelized test
- MSTEST0076 - Avoid mutating process-wide culture in a parallelized test
- MSTEST0077 - Avoid hardcoded or shared filesystem paths in a parallelized test

Related documentation: Test execution and control, TestContext

### Test configuration

Rules for configuring test execution, parallelization, and other test settings:

- MSTEST0001 - Use Parallelize attribute
- MSTEST0015 - Test method should not be ignored
- MSTEST0031 - Do not use System.ComponentModel.DescriptionAttribute
- MSTEST0035 - Use DeploymentItem with test method or test class
- MSTEST0043 - Use retry attribute on test method
- MSTEST0045 - Use cooperative cancellation for timeout
- MSTEST0055 - Do not ignore string method return value
- MSTEST0059 - Use Parallelize attribute correctly
- MSTEST0061 - Use OSCondition attribute instead of runtime check
- MSTEST0070 - `[MemberCondition]` arguments should be valid
- MSTEST0072 - `[AssemblyFixtureProvider]` isn't supported with ahead-of-time compilation
- MSTEST0078 - `[DependsOn]` arguments should be valid
- MSTEST0079 - Use ArchitectureCondition attribute instead of runtime checks
- MSTEST0080 - Use CICondition attribute instead of environment checks
- MSTEST0081 - `[TestFilterProvider]` should reference a valid test filter type
- MSTEST0082 - A test class inherits a lifecycle or test method from a different MSTest version
- MSTEST0083 - Use `[ExecutableCondition]` instead of `File.Exists` checks before `Process.Start`
- MSTEST0084 - Platform compatibility attributes should be consistent with `[OSCondition]`
- MSTEST0088 - MSTest host test-class injection is not supported by the selected build mode

Related documentation: Configure MSTest, Running tests
