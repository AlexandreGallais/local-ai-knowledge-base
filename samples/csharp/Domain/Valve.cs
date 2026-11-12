namespace Sample.Domain;

/// <summary>A valve of a fluid circuit.</summary>
public sealed class Valve
{
  /// <summary>The tag of the valve, for example V-101.</summary>
  public required string Tag { get; init; }
  /// <summary>Whether the valve is open.</summary>
  public bool IsOpen { get; set; }
}

/// <summary>A sensor that measures a value in a unit.</summary>
public sealed class Sensor
{
  /// <summary>The name of the sensor.</summary>
  public required string Name { get; init; }
  /// <summary>The unit of the measure, for example bar.</summary>
  public required string Unit { get; init; }
}

/// <summary>Stores valves.</summary>
public interface IValveRepository
{
  /// <summary>Saves a valve.</summary>
  Task SaveAsync(Valve valve, CancellationToken cancellationToken);
}
