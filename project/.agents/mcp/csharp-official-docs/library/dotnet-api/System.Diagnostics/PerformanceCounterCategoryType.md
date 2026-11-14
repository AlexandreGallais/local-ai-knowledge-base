---
title: "PerformanceCounterCategoryType enum"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Diagnostics/PerformanceCounterCategoryType.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# PerformanceCounterCategoryType enum

Namespace: `System.Diagnostics`

```csharp
public enum PerformanceCounterCategoryType
```

Indicates whether the performance counter category can have multiple instances.

#### Remarks
There are two types of performance counter categories: single-instance and multi-instance. By default, a category is single-instance when it is created and becomes multi-instance when another instance is added. Categories are created when an application is set up, and instances are added at runtime. Use the `PerformanceCounterCategoryType` enumeration to indicate whether a performance counter can have multiple instances.

## PerformanceCounterCategoryType.MultiInstance field

```csharp
MultiInstance
```

The performance counter category can have multiple instances.

## PerformanceCounterCategoryType.SingleInstance field

```csharp
SingleInstance
```

The performance counter category can have only a single instance.

## PerformanceCounterCategoryType.Unknown field

```csharp
Unknown
```

The instance functionality for the performance counter category is unknown.
