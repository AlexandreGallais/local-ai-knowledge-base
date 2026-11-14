---
title: "Inputs and input sources (part 2 of 4)"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/webxr_device_api/inputs/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Inputs and input sources (part 2 of 4)

## Managing input sources

When multiple input sources are available, you need to be able to obtain information about each one, including its position and orientation, its targeting ray (if applicable to your needs), and details that can help you decide how to present the input source visually, if at all. You also need to be able to determine which input source to use for what activities; for example, if the user has two controllers, which one will be tracked for manipulating UI elements, or will both?

To manage input sources, then, you need to be able to enumerate input sources, examine profile information about each input source, and decide how to use each input controller.

### Enumerating input sources

The WebXR session represented by the `XRSession` object has an `inputSources` property which is a _live_ list of the WebXR input devices currently connected to the XR system.

```js
let inputSourceList = xrSession.inputSources;
```

Due to the fact that the contents of the `XRInputSource` objects representing each input source in the list are read-only, changes to these inputs are made by the WebXR system by deleting the source's record and adding a new one to replace it. An `inputsourceschange` event is sent to your `XRSession` whenever one or more of the input sources change, or when an input source is added to or removed from the list.

For example, if you need to keep up with which controller is held in each of the player's hands, you might do something like this:

```js
let inputSourceList = NULL;
let leftHandSource = NULL;
let rightHandSource = NULL;

xrSession.addEventListener("inputsourceschange", (event) => {
  inputSourceList = event.session.inputSources;

  inputSourceList.forEach((source) => {
    switch (source.handedness) {
      case "left":
        leftHandSource = source;
        break;
      case "right":
        rightHandSource = source;
        break;
    }
  });
});
```

The `inputsourceschange` event is also fired once when the session's creation callback first completes execution, so you can use it to fetch the input source list as soon as it's available at startup time. The event is delivered as an `XRInputSourcesChangeEvent`, which includes three properties of interest:

- `session`
    The `XRSession` for which the input sources have changed.
- `added`
    An array of zero or more `XRInputSource` objects indicating the input sources that have been newly added to the XR system.
- `removed`
    An array of zero or more `XRInputSource` objects indicating any input sources that have been removed from the XR system.

### Identifying the input's profile

Each input source has a `profiles` property, which contains a live list of the WebXR input profiles which apply to the input source, in order of specificity from most-specific to least.

In order to do anything meaningful involving scanning of profiles beyond basic <example-value> of features, you may need to import the JSON profile database from the WebXR Input Profiles Registry.

See Input profiles for more specific details on working with input profiles.

### Choosing the primary controller

In order to avoid having problems introduced by multiple controllers trying to inadvertently manipulate the UI at the same time, your app may need to have a "primary" controller. Not only would this controller then take the responsibility of clicking through the user interface of your app, but it would also be considered the "main hand," while other controllers would then be off-hand or additional controllers.

> **Note:**
> This doesn't mean your app _needs_ to decide upon a primary controller. But if it does, these strategies may help.

There are a few ways you can decide upon a primary controller. We'll look at three.

#### Handedness

The most direct way to decide which controller is primary is to have a user-definable "Handedness" preference that the user sets to indicate which of their hands is dominant. You would then look at each input source and find one matching this, if available, falling back to another controller if no controller is in that hand.

```js
const primaryInputSource =
  xrSession.inputSources.find((src) => src.handedness === user.handedness) ??
  xrSession.inputSources[0];
```

This snippet of code starts by assuming that the first input source is the primary, but then looks for one whose `handedness` matches the one specified in the `user` object. If it matches, that input source is selected as the primary.

#### First-used

Another option is to use the first input the user triggers the select action on. The code below starts by assuming the first input source is the primary, then establishes a handler for the `select` event that records the event's source as the primary input source. Then the `select` event handler is replaced with the function `realSelectHandler()`, which will be used for handling all future `select` events. Then we pass the event through to `realSelectHandler()` to allow the event to be processed as normal.

```js
let primaryInputSource = xrSession.inputSources[0];

xrSession.onselect = (event) => {
  primaryInputSource = event.inputSource;
  xrSession.onselect = realSelectHandler;
  return realSelectHandler(event);
};
```

The effect is that we set the primary input source the first time a `select` event is received, regardless of which input source it comes from, handle the event as normal from there, and from then on handle the events as usual without any further worries about which input source is primary.

#### User-selected

The most complex way to determine a primary input source is highly flexible but can require a great deal of work to implement. In this scenario, you iterate over the list of input sources and their profiles to gather information about each input source, then present a user interface describing each input, allowing the user to assign uses to each of them. Doing this well could be a big job, but it might be useful for complex apps that may involve several user inputs.

Much of the information you need in order to implement this can be found in the section on Input profiles, below. Details are beyond the scope of this article, however.

## Input profiles

As mentioned above, each input source has a list of input profile names that correspond to a set of information describing that input source and how it can be used. Those names are found in the input source's `profiles` property, and the official registry of these profile strings is maintained in the WebXR Input Profiles Registry on GitHub.

For example, the `generic-trigger-squeeze-touchpad` profile name can be used to locate the following JSON profile data by locating the `profileId` field that has the value `generic-trigger-squeeze-touchpad`.

```json
{
  "profileId": "generic-trigger-squeeze-touchpad",
  "fallbackProfileIds": [],
  "layouts": {
    "left-right-none": {
      "selectComponentId": "xr-standard-trigger",
      "components": {
        "xr-standard-trigger": { "type": "trigger" },
        "xr-standard-squeeze": { "type": "squeeze" },
        "xr-standard-touchpad": { "type": "touchpad" }
      },
      "gamepad": {
        "mapping": "xr-standard",
        "buttons": [
          "xr-standard-trigger",
          "xr-standard-squeeze",
          "xr-standard-touchpad"
        ],
        "axes": [
          { "componentId": "xr-standard-touchpad", "axis": "x-axis" },
          { "componentId": "xr-standard-touchpad", "axis": "y-axis" }
        ]
      }
    }
  }
}
```

This is a controller which regardless of which hand it's in (and even if it's not currently associated with a specific hand) has three components: a standard trigger, a standard squeeze input, and a touchpad. According to the `selectComponentId` property, the `xr-standard-trigger` component is the one used to perform a primary action.

Additionally, the `gamepad` object maps those inputs to the gamepad, assigning the trigger, squeeze, and touchpad tap to the input source's button list and the touchpad's "axes" to the axis list.

The list in `profiles` is in order of reverse specificity; that is, the most precise description is first, and the least precise description is last. The first entry in the list is typically indicative of the precise model of the controller, or of a model with which the controller is compatible.

For example, entry 0 in `profiles` for an Oculus Touch controller is `oculus-touch`. The next entry is `generic-trigger-squeeze-thumbstick`, indicating a generic device with a trigger, a squeeze control, and a thumbstick. While the Oculus Touch controller actually has a thumbpad rather than a thumbstick, the overall description is "close enough" that the details within the profile matching the name will let the controller be interpreted usefully.
