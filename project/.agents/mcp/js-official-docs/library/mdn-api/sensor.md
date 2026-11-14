---
title: "Sensor"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/sensor/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Sensor

The **`Sensor`** interface of the Sensor APIs is the base class for all the other sensor interfaces. This interface cannot be used directly. Instead it provides properties, event handlers, and methods accessed by interfaces that inherit from it.

This feature may be blocked by a Permissions Policy set on your server.

When initially created, the `Sensor` object is _idle_, meaning it does not take measures. Once the `start()` method is called, it prepares itself to read data and, once ready, the `activate` event is sent and the sensor becomes _activated_. It then sends a `reading` event each time new data is available.

In case of an error, the `error` event is sent, reading stops, and the `Sensor` object becomes _idle_ again. The `start()` method needs to be called again before it can read further data.

## Interfaces based on `Sensor`

Below is a list of interfaces based on the `Sensor` interface.

- `Accelerometer`
- `AmbientLightSensor`
- `GravitySensor`
- `Gyroscope`
- `LinearAccelerationSensor`
- `Magnetometer`
- `OrientationSensor`

## Instance properties

- `Sensor.activated` (read-only)
    Returns a boolean value indicating whether the sensor is active.
- `Sensor.hasReading` (read-only)
    Returns a boolean value indicating whether the sensor has a reading.
- `Sensor.timestamp` (read-only)
    Returns the timestamp of the latest sensor reading.

## Instance methods

- `Sensor.start()`
    Activates one of the sensors based on `Sensor`.
- `Sensor.stop()`
    Deactivates one of the sensors based on `Sensor`.

## Events

- `activate`
    Fired when a sensor becomes activated.
- `error`
    Fired when an exception occurs on a sensor.
- `reading`
    Fired when a new reading is available on a sensor.
