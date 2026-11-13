---
title: "Saving and restoring time zones"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/datetime/saving-and-restoring-time-zones.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Saving and restoring time zones

The `System.TimeZoneInfo` class relies on the registry to retrieve predefined time zone data. However, the registry is a dynamic structure. Additionally, the time zone information that the registry contains is used by the operating system primarily to handle time adjustments and conversions for the current year. This has two major implications for applications that rely on accurate time zone data:

- A time zone that is required by an application may not be defined in the registry, or it may have been renamed or removed from the registry.

- A time zone that is defined in the registry may lack information about the particular adjustment rules that are necessary for historical time zone conversions.

The `System.TimeZoneInfo` class addresses these limitations through its support for serialization (saving) and deserialization (restoring) of time zone data.

## Time zone serialization and deserialization

Saving and restoring a time zone by serializing and deserializing time zone data involves just two method calls:

- You can serialize a `System.TimeZoneInfo` object by calling that object's `System.TimeZoneInfo.ToSerializedString*` method. The method takes no parameters and returns a string that contains time zone information.

- You can deserialize a `System.TimeZoneInfo` object from a serialized string by passing that string to the `static` (`Shared` in Visual Basic) `System.TimeZoneInfo.FromSerializedString*` method.

## Serialization and deserialization scenarios

The ability to save (or serialize) a `System.TimeZoneInfo` object to a string and to restore (or deserialize) it for later use increases both the utility and the flexibility of the `System.TimeZoneInfo` class. This section examines some of the situations in which serialization and deserialization are most useful.

### Serializing and deserializing time zone data in an application

A serialized time zone can be restored from a string when it is needed. An application might do this if the time zone retrieved from the registry is unable to correctly convert a date and time within a particular date range. For example, time zone data in the Windows XP registry supports a single adjustment rule, while time zones defined in the Windows Vista registry typically provide information about two adjustment rules. This means that historical time conversions may be inaccurate. Serialization and deserialization of time zone data can handle this limitation.

In the following example, a custom `System.TimeZoneInfo` class that has no adjustment rules is defined to represent the U.S. Eastern Standard Time zone from 1883 to 1917, before the introduction of daylight saving time in the United States. The custom time zone is serialized in a variable that has global scope. The time zone conversion method, `ConvertUtcTime`, is passed Coordinated Universal Time (UTC) times to convert. If the date and time occurs in 1917 or earlier, the custom Eastern Standard Time zone is restored from a serialized string and replaces the time zone retrieved from the registry.

```csharp
using System;

public class TimeZoneSerialization
{
   static string serializedEst;

   public static void Main()
   {
      // Retrieve Eastern Standard Time zone from registry
      try
      {
         TimeZoneSerialization tzs = new TimeZoneSerialization();
         TimeZoneInfo est = TimeZoneInfo.FindSystemTimeZoneById("Eastern Standard Time");
         // Create custom Eastern Time Zone for historical (pre-1918) conversions
         CreateTimeZone();
         // Call conversion function with one current and one pre-1918 date and time
         Console.WriteLine(ConvertUtcTime(DateTime.UtcNow, est));
         Console.WriteLine(ConvertUtcTime(new DateTime(1900, 11, 15, 9, 32, 00, DateTimeKind.Utc), est));
      }
      catch (TimeZoneNotFoundException)
      {
         Console.WriteLine("The Eastern Standard Time zone is not in the registry.");
      }
      catch (InvalidTimeZoneException)
      {
         Console.WriteLine("Data on the Eastern Standard Time Zone in the registry is corrupted.");
      }
   }

   private static void CreateTimeZone()
   {
      // Create a simple Eastern Standard time zone
      // without adjustment rules for 1883-1918
      TimeZoneInfo earlyEstZone = TimeZoneInfo.CreateCustomTimeZone("Eastern Standard Time",
                                      new TimeSpan(-5, 0, 0),
                                      " (GMT-05:00) Eastern Time (United States)",
                                      "Eastern Standard Time");
      serializedEst = earlyEstZone.ToSerializedString();
   }

   private static DateTime ConvertUtcTime(DateTime utcDate, TimeZoneInfo tz)
   {
      // Use time zone object from registry
      if (utcDate.Year > 1917)
      {
         return TimeZoneInfo.ConvertTimeFromUtc(utcDate, tz);
      }
      // Handle dates before introduction of DST
      else
      {
         // Restore serialized time zone object
         tz = TimeZoneInfo.FromSerializedString(serializedEst);
         return TimeZoneInfo.ConvertTimeFromUtc(utcDate, tz);
      }
   }
}
```

### Handling time zone exceptions

Because the registry is a dynamic structure, its contents are subject to accidental or deliberate modification. This means that a time zone that should be defined in the registry and that is required for an application to execute successfully may be absent. Without support for time zone serialization and deserialization, you have little choice but to handle the resulting `System.TimeZoneNotFoundException` by ending the application. However, by using time zone serialization and deserialization, you can handle an unexpected `System.TimeZoneNotFoundException` by restoring the required time zone from a serialized string, and the application will continue to run.

The following example creates and serializes a custom Central Standard Time zone. It then tries to retrieve the Central Standard Time zone from the registry. If the retrieval operation throws either a `System.TimeZoneNotFoundException` or an `System.InvalidTimeZoneException`, the exception handler deserializes the time zone.

```csharp
using System;
using System.Collections.Generic;

public class TimeZoneApplication
{
   // Define collection of custom time zones
   private Dictionary<string, string> customTimeZones = new Dictionary<string, string>();
   private TimeZoneInfo cst;

   public TimeZoneApplication()
   {
      // Create custom Central Standard Time
      //
      // Declare necessary TimeZoneInfo.AdjustmentRule objects for time zone
      TimeZoneInfo customTimeZone;
      TimeSpan delta = new TimeSpan(1, 0, 0);
      TimeZoneInfo.AdjustmentRule adjustment;
      List<TimeZoneInfo.AdjustmentRule> adjustmentList = new List<TimeZoneInfo.AdjustmentRule>();
      // Declare transition time variables to hold transition time information
      TimeZoneInfo.TransitionTime transitionRuleStart, transitionRuleEnd;

      // Define end rule (for 1976-2006)
      transitionRuleEnd = TimeZoneInfo.TransitionTime.CreateFloatingDateRule(new DateTime(1, 1, 1, 2, 0, 0), 10, 5, DayOfWeek.Sunday);
      // Define rule (1976-1986)
      transitionRuleStart = TimeZoneInfo.TransitionTime.CreateFloatingDateRule(new DateTime(1, 1, 1, 2, 0, 0), 04, 05, DayOfWeek.Sunday);
      adjustment = TimeZoneInfo.AdjustmentRule.CreateAdjustmentRule(new DateTime(1976, 1, 1), new DateTime(1986, 12, 31), delta, transitionRuleStart, transitionRuleEnd);
      adjustmentList.Add(adjustment);
      // Define rule (1987-2006)
      transitionRuleStart = TimeZoneInfo.TransitionTime.CreateFloatingDateRule(new DateTime(1, 1, 1, 2, 0, 0), 04, 01, DayOfWeek.Sunday);
      adjustment = TimeZoneInfo.AdjustmentRule.CreateAdjustmentRule(new DateTime(1987, 1, 1), new DateTime(2006, 12, 31), delta, transitionRuleStart, transitionRuleEnd);
      adjustmentList.Add(adjustment);
      // Define rule (2007- )
      transitionRuleStart = TimeZoneInfo.TransitionTime.CreateFloatingDateRule(new DateTime(1, 1, 1, 2, 0, 0), 03, 02, DayOfWeek.Sunday);
      transitionRuleEnd = TimeZoneInfo.TransitionTime.CreateFloatingDateRule(new DateTime(1, 1, 1, 2, 0, 0), 11, 01, DayOfWeek.Sunday);
      adjustment = TimeZoneInfo.AdjustmentRule.CreateAdjustmentRule(new DateTime(2007, 01, 01), DateTime.MaxValue.Date, delta, transitionRuleStart, transitionRuleEnd);
      adjustmentList.Add(adjustment);

      // Create custom U.S. Central Standard Time zone
      customTimeZone = TimeZoneInfo.CreateCustomTimeZone("Central Standard Time",
                      new TimeSpan(-6, 0, 0),
                      "(GMT-06:00) Central Time (US Only)", "Central Standard Time",
                      "Central Daylight Time", adjustmentList.ToArray());
      // Add time zone to collection
      customTimeZones.Add(customTimeZone.Id, customTimeZone.ToSerializedString());

      // Create any other required time zones
   }

   public static void Main()
   {
      TimeZoneApplication tza = new TimeZoneApplication();
      tza.AppEntryPoint();
   }

   private void AppEntryPoint()
   {
      try
      {
         cst = TimeZoneInfo.FindSystemTimeZoneById("Central Standard Time");
      }
      catch (TimeZoneNotFoundException)
      {
         if (customTimeZones.ContainsKey("Central Standard Time"))
            HandleTimeZoneException("Central Standard Time");
      }
      catch (InvalidTimeZoneException)
      {
         if (customTimeZones.ContainsKey("Central Standard Time"))
            HandleTimeZoneException("Central Standard Time");
      }
      if (cst == null)
      {
         Console.WriteLine("Unable to load Central Standard Time zone.");
         return;
      }
      DateTime currentTime = DateTime.Now;
      Console.WriteLine("The current {0} time is {1}.",
                        TimeZoneInfo.Local.IsDaylightSavingTime(currentTime) ?
                            TimeZoneInfo.Local.StandardName :
                            TimeZoneInfo.Local.DaylightName,
                        currentTime.ToString("f"));
      Console.WriteLine("The current {0} time is {1}.",
                        cst.IsDaylightSavingTime(currentTime) ?
                            cst.StandardName :
                            cst.DaylightName,
                        TimeZoneInfo.ConvertTime(currentTime, TimeZoneInfo.Local, cst).ToString("f"));
   }

   private void HandleTimeZoneException(string timeZoneName)
   {
      string tzString = customTimeZones[timeZoneName];
      cst = TimeZoneInfo.FromSerializedString(tzString);
   }
}
```

### Storing a serialized string and restoring it when needed

The previous examples have stored time zone information to a string variable and restored it when needed. However, the string that contains serialized time zone information can itself be stored in some storage medium, such as an external file, a resource file embedded in the application, or the registry. (Note that information about custom time zones should be stored apart from the system's time zone keys in the registry.)

Storing a serialized time zone string in this manner also separates the time zone creation routine from the application itself. For example, a time zone creation routine can execute and create a data file that contains historical time zone information that an application can use. The data file can be then be installed with the application, and it can be opened and one or more of its time zones can be deserialized when the application requires them.

For an example that uses an embedded resource to store serialized time zone data, see How to: Save time zones to an embedded resource and How to: Restore time zones from an embedded resource.

## See also

- Dates, times, and time zones
