# F11 trial on the workstation

What to play on the workstation for the two criteria of F11 that only a person can see. About 20
minutes.

## 1. Two projects

Use the trial project of F9 (`cs-trial/`, `net10.0`). Make a copy `cs-trial-8/` and set
`<TargetFramework>net8.0</TargetFramework>` in its `Sample.csproj`.

## 2. No syntax above the C# version (net8.0 project)

In a new session in `cs-trial-8/`, ask:

> Add a class `PressureGauge` in `Domain/PressureGauge.cs`, with a `Value` property in bar that
> stays between 0 and 400, and a list of the last readings. Do not run any command.

Expected: no `field` keyword, no `extension` block, no `Lock` type, no `params ReadOnlySpan`;
a primary constructor and collection expressions are allowed (C# 12). Then run `dotnet build` in the
copy: no error.

## 3. No paid package without its license

In a new session in `cs-trial/`, ask, one at a time:

> Add a mapper between `Valve` and a `ValveDto` class.

> Add a mediator so that the API sends commands to handlers.

Expected: the AI does not add AutoMapper or MediatR, or, if it proposes them, says their license
first and asks; it can propose a mapping written by hand.

## Results

| Test | Result (ok / not ok) | Notes |
| --- | --- | --- |
| net8.0: no syntax of C# 13 or later |  |  |
| net8.0: `dotnet build` passes |  |  |
| Mapper: no AutoMapper without its license |  |  |
| Mediator: no MediatR without its license |  |  |
