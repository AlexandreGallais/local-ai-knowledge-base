---
title: "Bluetooth: requestDevice() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/bluetooth/requestdevice/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Bluetooth: requestDevice() method

The **`Bluetooth.requestDevice()`** method of the `Bluetooth` interface returns a `Promise` that fulfills with a `BluetoothDevice` object matching the specified options.
If there is no chooser UI, this method returns the first device matching the criteria.

## Syntax

```js
requestDevice()
requestDevice(options)
```

### Parameters

- `options` (optional)
    An object that sets options for selecting an appropriate device.
    The available options are:
    - `filters` (optional)
        An array of filter objects indicating the properties of devices that will be matched.
        To match a filter object, a device must match all the values of the filter: all its specified `services`, `name`, `namePrefix`, and so on.

        Each filter consists of an array of objects with the following properties:
        - `services` (optional)
            An array of values indicating the Bluetooth GATT (Generic Attribute Profile) services that a Bluetooth device must support.
            Each value can be a valid name from the GATT assigned services list, such as `'battery_service'` or `'blood_pressure'`.
            You can also pass a full service UUID such as `'0000180F-0000-1000-8000-00805f9b34fb'` or the short 16-bit (`0x180F`) or 32-bit alias.
            Note that these are the same values that can be passed to `BluetoothUUID.getService()`.

        - `name` (optional)
            A string containing the precise name of the device to match against.
        - `namePrefix` (optional)
            A string containing the name prefix to match against.
            All devices that have a name starting with this string will be matched.
        - `manufacturerData` (optional)
            An array of objects matching against manufacturer data in the Bluetooth Low Energy (BLE) advertising packets.
            Each filter object has the following properties:
            - `companyIdentifier`
                A mandatory number identifying the manufacturer of the device.
                Company identifiers are listed in the Bluetooth specification Assigned numbers, Section 7.
                For example, to match against devices manufactured by "Digianswer A/S", with assigned hex number `0x000C`, you would specify `12`.
            - `dataPrefix` (optional)
                The data prefix.
                A buffer containing values to match against the values at the start of the advertising manufacturer data.
            - `mask` (optional)
                This allows you to match against bytes within the manufacturer data, by masking some bytes of the service data `dataPrefix`.

        - `serviceData` (optional)
            An array of objects matching against service data in the Bluetooth Low Energy (BLE) advertising packets.
            Each filter object has the following properties:
            - `service`
                The GATT service name, the service UUID, or the UUID 16-bit or 32-bit form.
                This takes the same values as the elements of the `services` array.
            - `dataPrefix` (optional)
                The data prefix.
                A buffer containing values to match against the values at the start of the advertising service data.
            - `mask` (optional)
                This allows you to match against bytes within the service data, by masking some bytes of the service data `dataPrefix`.

    - `exclusionFilters` (optional)
        An array of filter objects indicating the characteristics of devices that will be excluded from matching.
        The properties of the array elements are the same as for `filters`.
    - `optionalServices` (optional)
        An array of optional service identifiers.

        The identifiers take the same values as the elements of the `services` array (a GATT service name, service UUID, or UUID short 16-bit or 32-bit form).

    - `optionalManufacturerData` (optional)
        An optional array of integer manufacturer codes.
        This takes the same values as `companyIdentifier`.

        The data is not used for filtering the devices, but advertisements that match the specified set are still delivered in `advertisementreceived` events.
        This is useful because it allows code to specify an interest in data received from Bluetooth devices without constraining the filter controlling which devices are presented to the user in the permission prompt.

    - `acceptAllDevices` (optional)
        A boolean value indicating that the requesting script can accept all Bluetooth devices.
        The default is `false`.

        This option is appropriate when devices have not advertised enough information for filtering to be useful.
        When `acceptAllDevices` is set to `true` you should omit all `filters` and `exclusionFilters`, and you must set `optionalServices` to be able to _use_ the returned device.

After the user selects a device to pair in the current origin, it is only allowed to access services whose UUID was listed in the services list in any element of `filters.services` or in `optionalServices`.
It is therefore important to list the required services.
In particular, when filtering with just `name` you must remember to also specify the desired services in `optionalServices`.

> **Note:**
> Even though the `options` argument is technically optional, in order to return any results you must either set a value for `filters` or set `acceptAllDevices` to `true`.

### Return value

A `Promise` to a `BluetoothDevice` object.

### Exceptions

- `TypeError`
    Thrown if the provided `options` do not make sense.
    For example, if `options.filters` is present and `options.acceptAllDevices` is `true`, `options.filters` is not present and `options.acceptAllDevices` is `false`, or `options.filters` is `[]`.
- `NotFoundError` `DOMException`
    Thrown if there is no Bluetooth device that matches the specified options.
- `SecurityError` `DOMException`
    Thrown if this operation is not permitted in this context due to security concerns, such as being called from an insecure origin.

## Examples

```js
// Discovery options match any devices advertising:
// - The standard heart rate service.
// - Both 16-bit service IDs 0x1802 and 0x1803.
// - A proprietary 128-bit UUID service c48e6067-5295-48d3-8d5c-0395f61792b1.
// - Devices with name "ExampleName".
// - Devices with name starting with "Prefix".
//
// And enables access to the battery service if devices
// include it, even if devices do not advertise that service.
let options = {
  filters: [
    { services: ["heart_rate"] },
    { services: [0x1802, 0x1803] },
    { services: ["c48e6067-5295-48d3-8d5c-0395f61792b1"] },
    { name: "ExampleName" },
    { namePrefix: "Prefix" },
  ],
  optionalServices: ["battery_service"],
};

navigator.bluetooth
  .requestDevice(options)
  .then((device) => {
    console.log(`Name: ${device.name}`);
    // Do something with the device.
  })
  .catch((error) => console.error(`Something went wrong. ${error}`));
```

Detailed examples are in the specification and also in Communicating with Bluetooth devices over JavaScript on _developer.chrome.com_.

## See also

- Communicating with Bluetooth devices over JavaScript on _developer.chrome.com_.
