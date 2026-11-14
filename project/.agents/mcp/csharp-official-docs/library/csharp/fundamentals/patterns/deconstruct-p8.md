---
title: "Deconstructing tuples and other types (part 8 of 8)"
tool: "csharp"
version: "15"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/csharp/fundamentals/patterns/deconstruct.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Deconstructing tuples and other types (part 8 of 8)

## Built-in deconstruction on system types

Some system types already define a `Deconstruct` method, using the same mechanism you'd use for your own types. For example, `System.Collections.Generic.KeyValuePair`2` supports deconstruction, which makes dictionary iteration concise:

```csharp
static class DeconstructSamples
{
    public static void Run()
    {
        ShowTupleMemberAccess();
        ShowTypedTupleDeconstruction();
        ShowVarTupleDeconstruction();
        ShowMixedDeconstruction();
        ShowTupleDiscards();
        ShowPersonDeconstruction();
        ShowPersonDeconstructionWithDiscards();
        ShowRecordDeconstruction();
        ShowUriDeconstruction();
        ShowKeyValuePairDeconstruction();
    }

    static void ShowTupleMemberAccess()
    {
        var cityData = QueryCityData("New York City");
        var city = cityData.City;
        var population = cityData.Population;
        var area = cityData.Area;

        Console.WriteLine($"{city}: population {population:N0}, area {area:F2}");
    }

    static void ShowTypedTupleDeconstruction()
    {
        (string city, int population, double area) = QueryCityData("New York City");

        Console.WriteLine($"{city}: population {population:N0}, area {area:F2}");
    }

    static void ShowVarTupleDeconstruction()
    {
        var (city, population, area) = QueryCityData("New York City");

        Console.WriteLine($"{city}: population {population:N0}, area {area:F2}");
    }

    static void ShowMixedDeconstruction()
    {
        string city = "Raleigh";

        (city, var population, _) = QueryCityData("New York City");

        Console.WriteLine($"{city}: population {population:N0}");
    }

    static void ShowTupleDiscards()
    {
        var (_, _, population1960, _, population2010) = QueryPopulationDataForYears(
            "New York City", 1960, 2010);

        Console.WriteLine($"Population change: {population2010 - population1960:N0}");
    }

    static (string City, int Population, double Area) QueryCityData(string name) =>
        name switch
        {
            "New York City" => (name, 8_175_133, 468.48),
            "Raleigh" => (name, 458_880, 149.60),
            _ => (name, 0, 0)
        };

    static (string City, int Year1, int PopulationYear1, int Year2, int PopulationYear2) QueryPopulationDataForYears(
        string name, int year1, int year2) =>
        (name, year1, year2) switch
        {
            ("New York City", 1960, 2010) => (name, year1, 7_781_984, year2, 8_175_133),
            _ => (name, year1, 0, year2, 0)
        };

    static void ShowPersonDeconstruction()
    {
        var passenger = new Person("John", "Quincy", "Adams", "Boston", "MA");

        var (firstName, middleName, lastName) = passenger;

        Console.WriteLine($"{firstName} {middleName} {lastName}");
    }

    static void ShowPersonDeconstructionWithDiscards()
    {
        var passenger = new Person("John", "Quincy", "Adams", "Boston", "MA");

        var (firstName, _, city, _) = passenger;

        Console.WriteLine($"{firstName} from {city}");
    }

    static void ShowRecordDeconstruction()
    {
        var forecast = new Forecast("Redmond", 18, 9);

        var (city, highTempC, lowTempC) = forecast;

        Console.WriteLine($"{city}: {highTempC}C / {lowTempC}C");
    }

    static void ShowUriDeconstruction()
    {
        var docsSite = new Uri("https://learn.microsoft.com:443/dotnet/csharp/");
        var (scheme, host, port) = docsSite;
        Console.WriteLine($"{scheme}://{host}:{port}");
    }

    static void ShowKeyValuePairDeconstruction()
    {
        Dictionary<string, int> repoCommitCounts = new(StringComparer.OrdinalIgnoreCase)
        {
            ["https://github.com/dotnet/docs"] = 16_465,
            ["https://github.com/dotnet/runtime"] = 114_223,
            ["https://github.com/dotnet/roslyn"] = 79_484,
        };

        foreach (var (repo, commitCount) in repoCommitCounts)
        {
            Console.WriteLine($"{repo} had {commitCount:N0} commits in this snapshot.");
        }
    }
}

sealed class Person
{
    public Person(string firstName, string middleName, string lastName, string city, string state)
    {
        FirstName = firstName;
        MiddleName = middleName;
        LastName = lastName;
        City = city;
        State = state;
    }

    public string FirstName { get; }

    public string MiddleName { get; }

    public string LastName { get; }

    public string City { get; }

    public string State { get; }

    public void Deconstruct(out string firstName, out string middleName, out string lastName)
    {
        firstName = FirstName;
        middleName = MiddleName;
        lastName = LastName;
    }

    public void Deconstruct(out string firstName, out string lastName, out string city, out string state)
    {
        firstName = FirstName;
        lastName = LastName;
        city = City;
        state = State;
    }
}

readonly record struct Forecast(string City, int HighTempC, int LowTempC);

sealed class Traveler
{
    public Traveler(string firstName, string middleName, string lastName, string city, string state)
    {
        FirstName = firstName;
        MiddleName = middleName;
        LastName = lastName;
        City = city;
        State = state;
    }

    public string FirstName { get; }

    public string MiddleName { get; }

    public string LastName { get; }

    public string City { get; }

    public string State { get; }

    public void Deconstruct(out string firstName, out string lastName)
    {
        firstName = FirstName;
        lastName = LastName;
    }

    public void Deconstruct(out string firstName, out string middleName, out string lastName)
    {
        firstName = FirstName;
        middleName = MiddleName;
        lastName = LastName;
    }

    public void Deconstruct(out string firstName, out string lastName, out string city, out string state)
    {
        firstName = FirstName;
        lastName = LastName;
        city = City;
        state = State;
    }
}

static class UriExtensions
{
    public static void Deconstruct(this Uri uri, out string scheme, out string host, out int port)
    {
        scheme = uri.Scheme;
        host = uri.Host;
        port = uri.Port;
    }
}
```
## Deconstruction and pattern matching

A `Deconstruct` method also enables positional patterns for that type. A positional pattern tests and deconstructs a value in one step, using the same parenthesized syntax as a deconstruction: `person is ("Alice", 30)` matches a `Person` whose deconstructed components equal those values. This is different from a property pattern, which tests named properties directly, such as `person is { Name: "Alice", Age: 30 }`. Property patterns are usually clearer for object shapes because member names explain the test. Positional patterns are strongest when order already carries the meaning, such as with tuples or other small ordered values.

## See also

- Pattern matching overview
- Property and positional patterns
- Discards and the discard pattern
- Tuple types
- Record types
- `out` parameter modifier
