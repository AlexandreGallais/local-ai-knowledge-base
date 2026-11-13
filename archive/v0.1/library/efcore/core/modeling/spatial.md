---
title: "Spatial Data - EF Core"
tool: "efcore"
version: "11"
source: "https://github.com/dotnet/EntityFramework.Docs/blob/5fa9f7b63ae7ff93d631f4ddc47fdc9f72dcbdc7/entity-framework/core/modeling/spatial.md"
commit: "5fa9f7b63ae7ff93d631f4ddc47fdc9f72dcbdc7"
license: "CC-BY-4.0"
---

# Spatial Data

Spatial data represents the physical location and the shape of objects. Many databases provide support for this type of data so it can be indexed and queried alongside other data. Common scenarios include querying for objects within a given distance from a location, or selecting the object whose border contains a given location. EF Core supports mapping to spatial data types using the NetTopologySuite spatial library.

## Installing

In order to use spatial data with EF Core, you need to install the appropriate supporting NuGet package. Which package you need to install depends on the provider you're using.

EF Core Provider                        | Spatial NuGet Package
--------------------------------------- | ---------------------
Microsoft.EntityFrameworkCore.SqlServer | Microsoft.EntityFrameworkCore.SqlServer.NetTopologySuite
Microsoft.EntityFrameworkCore.Sqlite    | Microsoft.EntityFrameworkCore.Sqlite.NetTopologySuite
Microsoft.EntityFrameworkCore.InMemory  | NetTopologySuite
Oracle.EntityFrameworkCore              | Oracle.EntityFrameworkCore.NetTopologySuite
Npgsql.EntityFrameworkCore.PostgreSQL   | Npgsql.EntityFrameworkCore.PostgreSQL.NetTopologySuite
Pomelo.EntityFrameworkCore.MySql        | Pomelo.EntityFrameworkCore.MySql.NetTopologySuite
Devart.Data.MySql.EFCore                | Devart.Data.MySql.EFCore.NetTopologySuite
Devart.Data.Oracle.EFCore               | Devart.Data.Oracle.EFCore.NetTopologySuite
Devart.Data.PostgreSql.EFCore           | Devart.Data.PostgreSql.EFCore.NetTopologySuite
Devart.Data.SQLite.EFCore               | Devart.Data.SQLite.EFCore.NetTopologySuite
Teradata.EntityFrameworkCore            | Teradata.EntityFrameworkCore.NetTopologySuite
FileBaseContext                         | NetTopologySuite

## NetTopologySuite

NetTopologySuite (NTS) is a spatial library for .NET. EF Core enables mapping to spatial data types in the database by using NTS types in your model.

To enable mapping to spatial types via NTS, call the UseNetTopologySuite method on the provider's DbContext options builder. For example, with SQL Server you'd call it like this.

```csharp
options.UseSqlServer(
    @"Data Source=(localdb)\MSSQLLocalDB;Initial Catalog=WideWorldImporters;ConnectRetryCount=0",
    x => x.UseNetTopologySuite());
```

There are several spatial data types. Which type you use depends on the types of shapes you want to allow. Here is the hierarchy of NTS types that you can use for properties in your model. They're located within the `NetTopologySuite.Geometries` namespace.

* Geometry
  * Point
  * LineString
  * Polygon
  * GeometryCollection
    * MultiPoint
    * MultiLineString
    * MultiPolygon

> **Warning:**
> CircularString, CompoundCurve, and CurePolygon aren't supported by NTS.

Using the base Geometry type allows any type of shape to be specified by the property.

## Longitude and latitude

Coordinates in NTS are in terms of X and Y values. To represent longitude and latitude, use X for longitude and Y for latitude. Note that this is **backwards** from the `latitude, longitude` format in which you typically see these values.

## Querying data

The following entity classes could be used to map to tables in the Wide World Importers sample database.

```csharp
[Table("Cities", Schema = "Application")]
public class City
{
    public int CityID { get; set; }

    public string CityName { get; set; }

    public Point Location { get; set; }
}
```

```csharp
[Table("Countries", Schema = "Application")]
public class Country
{
    public int CountryID { get; set; }

    public string CountryName { get; set; }

    // Database includes both Polygon and MultiPolygon values
    public Geometry Border { get; set; }
}
```

In LINQ, the NTS methods and properties available as database functions will be translated to SQL. For example, the Distance and Contains methods are translated in the following queries. See your provider's documentation for which methods are supported.

```csharp
// Find the nearest city
var nearestCity = await db.Cities
    .OrderBy(c => c.Location.Distance(currentLocation))
    .FirstOrDefaultAsync();
```

```csharp
// Find the containing country
var currentCountry = await db.Countries
    .FirstOrDefaultAsync(c => c.Border.Contains(currentLocation));
```

## Reverse engineering

The spatial NuGet packages also enable reverse engineering models with spatial properties, but you need to install the package ***before*** running `Scaffold-DbContext` or `dotnet ef dbcontext scaffold`. If you don't, you'll receive warnings about not finding type mappings for the columns and the columns will be skipped.

## SRID ignored during client operations

NTS ignores SRID values during operations. It assumes a planar coordinate system. This means that if you specify coordinates in terms of longitude and latitude, some client-evaluated values like distance, length, and area will be in degrees, not meters. For more meaningful values, you first need to project the coordinates to another coordinate system using a library like ProjNet (for GeoAPI).

> **Note:**
> Use the newer ProjNet NuGet package, **not** the older package called ProjNet4GeoAPI.

If an operation is server-evaluated by EF Core via SQL, the result's unit will be determined by the database.

Here is an example of using ProjNet to calculate the distance between two cities.

```csharp
public static class GeometryExtensions
{
    private static readonly CoordinateSystemServices _coordinateSystemServices
        = new CoordinateSystemServices(
            new Dictionary<int, string>
            {
                // Coordinate systems:

                [4326] = GeographicCoordinateSystem.WGS84.WKT,

                // This coordinate system covers the area of our data.
                // Different data requires a different coordinate system.
                [2855] =
                    @"
                        PROJCS[""NAD83(HARN) / Washington North"",
                            GEOGCS[""NAD83(HARN)"",
                                DATUM[""NAD83_High_Accuracy_Regional_Network"",
                                    SPHEROID[""GRS 1980"",6378137,298.257222101,
                                        AUTHORITY[""EPSG"",""7019""]],
                                    AUTHORITY[""EPSG"",""6152""]],
                                PRIMEM[""Greenwich"",0,
                                    AUTHORITY[""EPSG"",""8901""]],
                                UNIT[""degree"",0.01745329251994328,
                                    AUTHORITY[""EPSG"",""9122""]],
                                AUTHORITY[""EPSG"",""4152""]],
                            PROJECTION[""Lambert_Conformal_Conic_2SP""],
                            PARAMETER[""standard_parallel_1"",48.73333333333333],
                            PARAMETER[""standard_parallel_2"",47.5],
                            PARAMETER[""latitude_of_origin"",47],
                            PARAMETER[""central_meridian"",-120.8333333333333],
                            PARAMETER[""false_easting"",500000],
                            PARAMETER[""false_northing"",0],
                            UNIT[""metre"",1,
                                AUTHORITY[""EPSG"",""9001""]],
                            AUTHORITY[""EPSG"",""2855""]]
                    "
            });

    public static Geometry ProjectTo(this Geometry geometry, int srid)
    {
        var transformation = _coordinateSystemServices.CreateTransformation(geometry.SRID, srid);

        var result = geometry.Copy();
        result.Apply(new MathTransformFilter(transformation.MathTransform));

        return result;
    }

    private class MathTransformFilter : ICoordinateSequenceFilter
    {
        private readonly MathTransform _transform;

        public MathTransformFilter(MathTransform transform)
            => _transform = transform;

        public bool Done => false;
        public bool GeometryChanged => true;

        public void Filter(CoordinateSequence seq, int i)
        {
            var x = seq.GetX(i);
            var y = seq.GetY(i);
            var z = seq.GetZ(i);
            _transform.Transform(ref x, ref y, ref z);
            seq.SetX(i, x);
            seq.SetY(i, y);
            seq.SetZ(i, z);
        }
    }
}
```

```csharp
var seattle = new Point(-122.333056, 47.609722) { SRID = 4326 };
var redmond = new Point(-122.123889, 47.669444) { SRID = 4326 };

// In order to get the distance in meters, we need to project to an appropriate
// coordinate system. In this case, we're using SRID 2855 since it covers the
// geographic area of our data
var distanceInDegrees = seattle.Distance(redmond);
var distanceInMeters = seattle.ProjectTo(2855).Distance(redmond.ProjectTo(2855));
```

> **Note:**
> 4326 refers to WGS 84, a standard used in GPS and other geographic systems.

## Additional resources

### Database-specific information

Be sure to read your provider's documentation for additional information on working with spatial data.

* Spatial Data in the SQL Server Provider
* Spatial Data in the SQLite Provider
* Spatial Data in Oracle Data Provider for .NET
* Spatial Data in the Npgsql Provider

### Other resources

* NetTopologySuite Docs
* .NET Data Community Standup session, focusing on spatial data and NetTopologySuite.
