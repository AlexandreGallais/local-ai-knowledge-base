---
id: dotnet-testing-unit-test-rules
title: Write a C# unit test that checks something
topic: dotnet-testing
summary: The mistakes models make in tests, the rule against each, wrong and right C# examples, and the analyzers.
tool: dotnet
version: "11"
checked: 2026-11-13
sources: [S36, S37, S74, S76, S77, S82]
license: MIT, written for this base from the sources below
variant: files
---

# Write a C# unit test that checks something

Contents: 1. Rules · 2. Wrong and right · 3. Analyzers · 4. Mutation testing · Sources

## 1. Rules (C# unit tests)

Models write tests that pass but check little: too many mocks, prints instead of assertions, tests that copy the code, and tests changed to pass. [S74] [S76] [S77]

1. Take the expected value from the request or the specification, never from the code under test.
2. One behavior per test: one act, then the assertions on its result. Name the test after that behavior.
3. Assert on the result. Never print a value instead of asserting it.
4. Mock only the boundaries: network, clock, file system, database. Never mock the class under test, a value object or a `DbSet`.
5. Never assert the order or the count of calls on a mock when the result shows the behavior: such a test breaks on every refactoring. [S82]
6. Inject `TimeProvider`; never read `DateTime.Now` in the code under test. Use `FakeTimeProvider` in the test.
7. Never rely on the order of a `Dictionary`, a `HashSet` or a query without `OrderBy`.
8. A test fails: fix the code under test. Never change, skip or delete the test to make it pass. Stop after 3 failed attempts and show the failure.
9. For what to test in a simulation model, read `docs/simulation/model-testing.md`.

## 2. Wrong and right (C# tests)

Wrong: the expected value copies the code, the mock checks calls, nothing is asserted on the result.

```csharp
[Fact]
public void Test1()
{
    var repository = new Mock<IValveRepository>();
    var service = new ValveService(repository.Object);
    service.Close("V-101");
    repository.Verify(r => r.Get("V-101"), Times.Once());
    Console.WriteLine(service.Status("V-101"));
}
```

Right: one behavior, a fake at the boundary, the expected value from the request.

```csharp
[Fact]
public void Close_sets_an_open_valve_to_closed()
{
    var repository = new InMemoryValveRepository([new Valve("V-101", isOpen: true)]);
    var service = new ValveService(repository);

    service.Close("V-101");

    Assert.False(repository.Get("V-101").IsOpen);
}
```

Wrong: `async void` and an assertion not awaited.

```csharp
[Fact]
public async void Opens_the_valve() => Assert.ThrowsAsync<InvalidOperationException>(() => service.OpenAsync("X"));
```

Right:

```csharp
[Fact]
public async Task Open_refuses_an_unknown_valve() =>
    await Assert.ThrowsAsync<InvalidOperationException>(() => service.OpenAsync("X", TestContext.Current.CancellationToken));
```

## 3. Analyzers (C# test mistakes)

| Mistake | xUnit | MSTest |
| --- | --- | --- |
| Async assertion not awaited | xUnit2021, xUnit2014 | MSTEST0040 |
| `async void` test | xUnit1048, xUnit1049 | MSTEST0003 |
| Blocking call on a task | xUnit1031 | — |
| Cancellation token not passed | xUnit1051 | MSTEST0049 |
| Expected and actual swapped | xUnit2000 | MSTEST0017 |
| Weak or always-true assertion | xUnit2002, xUnit2003, xUnit2004, xUnit2013 | MSTEST0032, MSTEST0025, MSTEST0037 |

- The xUnit analyzers come with `xunit.v3`; the MSTest analyzers with `MSTest.TestFramework`, set by `MSTestAnalysisMode` (`Recommended` turns information into warnings). [S36] [S37]
- No analyzer flags a test without any assertion: review it.

## 4. Mutation testing (a check run by a person)

- Stryker.NET changes the code and checks that a test fails: `dotnet tool install -g dotnet-stryker`, then `dotnet stryker` from the test project folder; `--since` limits it to changed code.
- It is slow, and its MTP runner is in preview: never run it in the write, run, fix loop. Propose it to the user for one module.

## Sources

- [S36] xUnit.net, "xUnit.net Analyzer Rules", <https://xunit.net/xunit.analyzers/rules/>, read 2026-11-13, summarized.
- [S37] Microsoft, "MSTest analyzers", Microsoft Learn, updated 2026-11-05, <https://learn.microsoft.com/dotnet/core/testing/mstest-analyzers/overview>, read 2026-11-13, CC BY 4.0, summarized.
- [S74] A. Hora, R. Robbes, "Are Coding Agents Generating Over-Mocked Tests? An Empirical Study", MSR 2026, arXiv:2602.00409, <https://arxiv.org/html/2602.00409v1>, read 2026-11-13, summarized.
- [S76] Z. Chen and others, "Rethinking the Value of Agent-Generated Tests for LLM-Based Software Engineering Agents", arXiv:2602.07900 (preprint), <https://arxiv.org/html/2602.07900v2>, read 2026-11-13, CC BY 4.0, summarized.
- [S77] Z. Zhong, A. Raghunathan, N. Carlini, "ImpossibleBench: Measuring LLMs' Propensity of Exploiting Test Cases", arXiv:2510.20270 (preprint), <https://arxiv.org/abs/2510.20270>, read 2026-11-13, summarized.
- [S82] A. Eagle, "Testing on the Toilet: Change-Detector Tests Considered Harmful", Google Testing Blog, 2015-01-27, <https://testing.googleblog.com/2015/01/testing-on-toilet-change-detector-tests.html>, read 2026-11-13, summarized.
