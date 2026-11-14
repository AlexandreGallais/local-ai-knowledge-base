---
title: "Gamepad API"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/gamepad_api/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Gamepad API

The **Gamepad API** is a way for developers to access and respond to signals from gamepads and other game controllers in a simple, consistent way. It contains three interfaces, two events and one specialist function, to respond to gamepads being connected and disconnected, and to access other information about the gamepads themselves, and what buttons and other controls are currently being pressed.

## Interfaces

- `Gamepad`
    Represents a gamepad/controller connected to the computer.
- `GamepadButton`
    Represents a button on one of the connected controllers.
- `GamepadEvent`
    The event object representing events fired that are related to gamepads.

### Experimental Gamepad extensions

- `GamepadHapticActuator`
    Represents hardware in the controller designed to provide haptic feedback to the user (if available), most commonly vibration hardware.
- `GamepadPose`
    Represents the pose of a controller (e.g., position and orientation in 3D space) in the case of a WebVR controller. This is _not_ used by the newer WebXR standard.

### Extensions to other interfaces

#### Navigator

- `Navigator.getGamepads()`
    An extension to the `Navigator` object that returns an array of `Gamepad` objects, one for each connected gamepad.

#### Window events

- `gamepadconnected`
    An event that will fire when a gamepad is connected.
- `gamepaddisconnected`
    An event that will fire when a gamepad is disconnected.

## Tutorials and guides

- Using the Gamepad API
- Implementing controls using the Gamepad API

## See also

- The Gamepad API by Ted Mielczarek and Robert Nyman
- Simple API demo page (source)
