---
title: "MSTest Usage rules (code analysis)"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/testing/mstest-analyzers/usage-rules.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# MSTest usage rules

Usage rules support proper usage of MSTest attributes, methods, and patterns. These rules catch common mistakes and ensure your tests follow the framework's requirements and conventions.

## Rules in this category

| Rule ID | Title | Severity | Fix Available |
|---------|-------|----------|---------------|
| MSTEST0002 | Test class should be valid. | Warning | Yes |
| MSTEST0003 | Test method should be valid. | Warning → Error* | Yes |
| MSTEST0005 | TestContext should be valid. | Warning | Yes |
| MSTEST0007 | Use attribute on test method. | Warning | No |
| MSTEST0008 | TestInitialize should be valid. | Warning | Yes |
| MSTEST0009 | TestCleanup should be valid. | Warning | Yes |
| MSTEST0010 | ClassInitialize should be valid. | Warning | Yes |
| MSTEST0011 | ClassCleanup should be valid. | Warning | Yes |
| MSTEST0012 | AssemblyInitialize should be valid. | Warning | Yes |
| MSTEST0013 | AssemblyCleanup should be valid. | Warning | Yes |
| MSTEST0014 | DataRow should be valid. | Warning | Yes |
| MSTEST0017 | Assertion args should be passed in correct order. | Info | Yes |
| MSTEST0018 | DynamicData should be valid. | Warning | Yes |
| MSTEST0023 | Do not negate boolean assertion. | Info | Yes |
| MSTEST0024 | Do not store static TestContext. | Warning | No |
| MSTEST0026 | Assertion args should avoid conditional access. | Info | No |
| MSTEST0030 | Type containing test method should be a test class. | Warning | Yes |
| MSTEST0031 | Do not use System.ComponentModel.DescriptionAttribute. | Info | Yes |
| MSTEST0032 | Review always-true assert condition. | Info | No |
| MSTEST0034 | Use ClassCleanupBehavior.EndOfClass. | Info | Yes |
| MSTEST0035 | Use DeploymentItem with test method or test class. | Info | No |
| MSTEST0037 | Use proper assert methods. | Info | Yes |
| MSTEST0038 | Avoid Assert.AreSame with value types. | Info | Yes |
| MSTEST0039 | Use newer Assert.Throws methods. | Info | Yes |
| MSTEST0040 | Avoid using asserts in async void context. | Warning | No |
| MSTEST0041 | Use condition-based attributes with test class. | Warning | Yes |
| MSTEST0042 | Duplicate DataRow. | Warning | No |
| MSTEST0043 | Use retry attribute on test method. | Warning → Error* | Yes |
| MSTEST0046 | Use Assert instead of StringAssert. | Info | Yes |
| MSTEST0048 | TestContext property usage. | Warning | No |
| MSTEST0049 | Flow TestContext CancellationToken. | Info | Yes |
| MSTEST0050 | Global test fixture should be valid. | Warning | Yes |
| MSTEST0051 | Assert.Throws should contain single statement. | Info | Yes |
| MSTEST0052 | Avoid explicit DynamicDataSourceType. | Info | Yes |
| MSTEST0053 | Avoid Assert format parameters. | Info | Yes |
| MSTEST0054 | Use CancellationToken property. | Info | Yes |
| MSTEST0055 | Do not ignore string method return value. | Warning | No |
| MSTEST0056 | TestMethodAttribute should set DisplayName correctly. | Info | Yes |
| MSTEST0057 | TestMethodAttribute should propagate source information. | Warning | No |
| MSTEST0058 | Avoid asserts in catch blocks. | Info | No |
| MSTEST0059 | Use Parallelize attribute correctly. | Warning | No |
| MSTEST0060 | Duplicate TestMethodAttribute. | Warning | Yes |
| MSTEST0061 | Use OSCondition attribute instead of runtime check. | Info | Yes |
| MSTEST0062 | Avoid out/ref test method parameters. | Warning | Yes |
| MSTEST0063 | Test class should have valid constructor. | Warning | No |
| MSTEST0064 | Prefer async assertion methods. | Info | No |
| MSTEST0065 | Avoid `Assert.AreEqual` on collection types. | Warning | No |
| MSTEST0067 | Avoid synchronously blocking calls in test code. | Info (disabled by default) | No |
| MSTEST0068 | Use `Assert` instead of `CollectionAssert`. | Info | Yes |
| MSTEST0069 | Inherited `[TestClass]` is ignored by the MSTest source generator. | Warning | No |
| MSTEST0070 | `[MemberCondition]` arguments should be valid. | Warning | No |
| MSTEST0071 | Test method should not specify a display name equal to its name. | Info | Yes |
| MSTEST0072 | `[AssemblyFixtureProvider]` isn't supported with ahead-of-time compilation. | Warning | No |
| MSTEST0073 | Prefer a constant for the `[ResourceLock]` resource key. | Info | No |
| MSTEST0074 | Test mutating process-global state should declare a resource lock. | Info | Yes |
| MSTEST0075 | Avoid changing the current directory in a parallelized test. | Info | Yes |
| MSTEST0076 | Avoid mutating process-wide culture in a parallelized test. | Info | No |
| MSTEST0077 | Avoid hardcoded or shared filesystem paths in a parallelized test. | Info | No |
| MSTEST0078 | `[DependsOn]` arguments should be valid. | Warning | No |
| MSTEST0079 | Use ArchitectureCondition attribute instead of runtime checks. | Info | Yes |
| MSTEST0080 | Use CICondition attribute instead of environment checks. | Info | Yes |
| MSTEST0081 | `[TestFilterProvider]` should reference a valid test filter type. | Warning | No |
| MSTEST0082 | A test class inherits a lifecycle or test method from a different MSTest version. | Warning | No |
| MSTEST0083 | Use `[ExecutableCondition]` instead of `File.Exists` checks before `Process.Start`. | Info | Yes |
| MSTEST0084 | Platform compatibility attributes should be consistent with `[OSCondition]`. | Info | Yes |
| MSTEST0085 | `[TestClass]` should not be applied to abstract classes. | Info | No |
| MSTEST0086 | Remove redundant test method attribute. | Info | Yes |
| MSTEST0087 | Avoid duplicated `DataRow` display names. | Warning | No |
| MSTEST0088 | MSTest host test-class injection is not supported by the selected build mode. | Error | No |

\* Escalated to Error in `Recommended` and `All` modes.

## Common scenarios

### Test structure validation

Ensure your test classes, methods, and fixtures follow MSTest requirements:

- **MSTEST0002**: Test class layout requirements (for example, public, non-static).
- **MSTEST0003**: Test method layout requirements (⚠️ escalated to Error).
- **MSTEST0030**: Methods with [TestMethod] must be in a [TestClass].
- **MSTEST0063**: Test class constructor validation.
- **MSTEST0069**: Apply [TestClass] directly so source-generated discovery finds the class.
- **MSTEST0082**: Keep base and derived test classes on the same MSTest major version.
- **MSTEST0085**: Remove `[TestClass]` from abstract base classes.
- **MSTEST0086**: Remove method attributes whose behavior the test class already supplies.
- **MSTEST0088**: Use host-owned test-class injection only with a supported build mode.

### Lifecycle methods

Validate initialization and cleanup methods:

- **MSTEST0008**: TestInitialize validation.
- **MSTEST0009**: TestCleanup validation.
- **MSTEST0010**: ClassInitialize validation.
- **MSTEST0011**: ClassCleanup validation.
- **MSTEST0012**: AssemblyInitialize validation.
- **MSTEST0013**: AssemblyCleanup validation.
- **MSTEST0034**: Set ClassCleanupBehavior.EndOfClass.
- **MSTEST0050**: Global test fixture validation.
- **MSTEST0072**: Don't use shared assembly fixture providers with ahead-of-time compilation.
- **MSTEST0082**: Recompile inherited lifecycle methods against the test project's MSTest version.

### Data-driven testing

Ensure data attributes are used correctly:

- **MSTEST0007**: Data attributes must be on test methods.
- **MSTEST0014**: DataRow validation.
- **MSTEST0018**: DynamicData validation.
- **MSTEST0042**: Detect duplicate DataRows.
- **MSTEST0052**: Use AutoDetect for DynamicDataSourceType.
- **MSTEST0062**: Avoid out/ref parameters.
- **MSTEST0087**: Give every explicit `DataRow` display name a unique value.

### Writing better assertions

Rules for correct and effective assertion usage:

- **MSTEST0017**: Pass <example-value> in correct order.
- **MSTEST0023**: Don't negate conditions (use Assert.IsFalse directly).
- **MSTEST0026**: Avoid null-conditional operators in assertions.
- **MSTEST0032**: Review always-true conditions.
- **MSTEST0037**: Use the most appropriate assert method.
- **MSTEST0038**: Don't use AreSame with value types.
- **MSTEST0039**: Use Assert.ThrowsExactly (newer API).
- **MSTEST0046**: Prefer Assert over StringAssert.
- **MSTEST0051**: Assert.Throws should test single statement.
- **MSTEST0053**: Use string interpolation instead of format parameters.
- **MSTEST0058**: Don't put assertions in catch blocks.
- **MSTEST0064**: Prefer async assertion methods over blocking on async code.
- **MSTEST0065**: Avoid `Assert.AreEqual` on collection types.
- **MSTEST0068**: Prefer `Assert` over `CollectionAssert`.

### TestContext usage

Proper usage of the TestContext object:

- **MSTEST0005**: TestContext property validation.
- **MSTEST0024**: Don't store TestContext in static fields.
- **MSTEST0048**: Restricted property access in fixtures.
- **MSTEST0049**: Flow cancellation tokens from TestContext.
- **MSTEST0054**: Use TestContext.CancellationToken property.

### Async patterns

Rules for asynchronous test code:

- **MSTEST0040**: Avoid asserts in async void methods.
- **MSTEST0067**: Avoid `Thread.Sleep`, `Task.Wait`, and other synchronously blocking calls in test code (opt-in).

### Parallel test safety

Rules for tests that run in parallel:

- **MSTEST0073**: Use shared constants for resource lock keys.
- **MSTEST0074**: Lock mutations to process-global state.
- **MSTEST0075**: Lock current-directory changes.
- **MSTEST0076**: Avoid process-wide culture mutations.
- **MSTEST0077**: Avoid shared filesystem paths.

### Test configuration

- **MSTEST0031**: Use proper attributes (not System.ComponentModel.Description).
- **MSTEST0035**: DeploymentItem usage.
- **MSTEST0041**: Condition attributes must be on test classes.
- **MSTEST0043**: Retry attributes must be on test methods (⚠️ escalated to Error).
- **MSTEST0055**: Don't ignore string method return values.
- **MSTEST0056**: Set DisplayName properly on TestMethodAttribute.
- **MSTEST0057**: Propagate source info in custom TestMethodAttribute.
- **MSTEST0059**: Don't use both Parallelize and DoNotParallelize.
- **MSTEST0060**: Avoid duplicate TestMethodAttribute.
- **MSTEST0061**: Use OSCondition attribute for platform checks.
- **MSTEST0070**: `[MemberCondition]` arguments must reference valid members.
- **MSTEST0071**: Don't set a display name equal to the test method name.
- **MSTEST0078**: Validate `[DependsOn]` targets and dependency graphs.
- **MSTEST0079**: Use `ArchitectureCondition` instead of runtime architecture checks.
- **MSTEST0080**: Use `CICondition` instead of environment checks.
- **MSTEST0081**: Validate test filter provider registrations.
- **MSTEST0082**: Detect inherited tests and lifecycle methods compiled against another MSTest major version.
- **MSTEST0083**: Use `ExecutableCondition` instead of an imperative executable check.
- **MSTEST0084**: Align platform compatibility attributes with `OSCondition`.
- **MSTEST0088**: Don't combine host-owned test-class injection with AOT, browser WebAssembly, or MSTest source generation.

## Related documentation

- Write tests with MSTest
- Assertions
- Lifecycle
- TestContext
