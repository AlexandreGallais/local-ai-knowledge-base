---
title: "MSTest Design rules (code analysis)"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/testing/mstest-analyzers/design-rules.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# MSTest design rules

Design rules help you create and maintain test suites that adhere to proper design and good practices. These rules focus on test structure, best practices, and common patterns that lead to maintainable test code.

## Rules in this category

| Rule ID | Title | Severity | Fix Available |
|---------|-------|----------|---------------|
| MSTEST0004 | Public types should be test classes. | Info | Yes |
| MSTEST0006 | Avoid ExpectedException attribute. | Info | Yes |
| MSTEST0015 | Test method should not be ignored. | None (opt-in) | No |
| MSTEST0016 | Test class should have test method. | Info | No |
| MSTEST0019 | Prefer TestInitialize over constructors. | None (opt-in) | Yes |
| MSTEST0020 | Prefer constructors over TestInitialize. | None (opt-in) | Yes |
| MSTEST0021 | Prefer Dispose over TestCleanup. | None (opt-in) | Yes |
| MSTEST0022 | Prefer TestCleanup over Dispose. | None (opt-in) | Yes |
| MSTEST0025 | Prefer Assert.Fail over always-false conditions. | Info | Yes |
| MSTEST0029 | Public method should be test method. | Info | Yes |
| MSTEST0036 | Do not use shadowing. | Warning | No |
| MSTEST0044 | Prefer TestMethod over DataTestMethod. | Info | Yes |
| MSTEST0045 | Use cooperative cancellation for timeout. | Info | Yes |
| MSTEST0066 | `[Ignore]` should specify a justification. | Info | No |

## Common scenarios

### Test class structure

When creating test classes, these rules help ensure proper design:

- **MSTEST0004**: Keep helper classes internal, only test classes should be public.
- **MSTEST0016**: Ensure test classes contain at least one test method.
- **MSTEST0029**: Public methods in test classes should be test methods.

### Initialization patterns

MSTest supports both constructors and TestInitialize methods. These mutually exclusive rules let you enforce a consistent pattern:

- **MSTEST0019**: Enforce TestInitialize for initialization (useful for async scenarios).
- **MSTEST0020**: Enforce constructors for initialization (better for readonly fields).

### Cleanup patterns

Similarly, choose between Dispose and TestCleanup:

- **MSTEST0021**: Enforce Dispose pattern for cleanup.
- **MSTEST0022**: Enforce TestCleanup for cleanup.

### Better assertions

- **MSTEST0006**: Use Assert.ThrowsExactly instead of [ExpectedException] for better precision.
- **MSTEST0025**: Use Assert.Fail instead of Assert.IsTrue(false).

### Test quality

- **MSTEST0015**: Flag ignored tests (opt-in rule).
- **MSTEST0036**: Avoid shadowing base class members.
- **MSTEST0044**: Use TestMethod unless data-driven testing is needed.
- **MSTEST0045**: Enable cancellation tokens for timeout handling.
- **MSTEST0066**: Provide a justification message on `[Ignore]`.

## Related documentation

- Write tests with MSTest
- Lifecycle
- Write tests
- Assertions
