using System.Globalization;
using Microsoft.Extensions.Logging;

namespace Sample.Domain;

/// <summary>Opens and closes valves, and reads their state from a file.</summary>
public sealed class ValveService(IValveRepository repository, ILogger<ValveService> logger)
{
  /// <summary>Opens a valve and saves it.</summary>
  public async Task OpenAsync(Valve valve, CancellationToken cancellationToken)
  {
    ArgumentNullException.ThrowIfNull(valve);
    valve.IsOpen = true;
    await repository.SaveAsync(valve, cancellationToken);
    logger.LogInformation("Valve {Tag} opened", valve.Tag);
  }

  /// <summary>Reads a pressure in bar from a text, whatever the culture of the machine.</summary>
  public static double ParsePressure(string text)
  {
    return double.Parse(text, CultureInfo.InvariantCulture);
  }

  /// <summary>Whether a tag names a valve.</summary>
  public static bool IsValveTag(string tag)
  {
    return tag.StartsWith("V-", StringComparison.Ordinal);
  }
}
