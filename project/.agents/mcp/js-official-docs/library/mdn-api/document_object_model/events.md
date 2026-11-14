---
title: "DOM events (part 1 of 2)"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/document_object_model/events/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# DOM events

Events are fired to notify code of "interesting changes" that may affect code execution. These can arise from user interactions such as using a mouse or resizing a window, changes in the state of the underlying environment (e.g., low battery or media events from the operating system), and other causes.

Each event is represented by an object that is based on the `Event` interface, and may have additional custom fields and/or functions to provide information about what happened. The documentation for every event has a table (near the top) that includes a link to the associated event interface, and other relevant information. A full list of the different event types is given in Event > Interfaces based on Event.

This topic provides an index to the main _sorts_ of events you might be interested in (animation, clipboard, workers etc.) along with the main classes that implement those sorts of events.

## Event index

       | Event type
       | Description
       | Documentation

       | Animation
       |

          Events related to the
          Web Animation API.

          Used to respond to changes in animation status (e.g., when an animation
          starts or ends).

       |
        Animation events fired on
        `Document`,
        `Window`,
        `HTMLElement`.

       | Asynchronous data fetching
       | Events related to the fetching data.
       |
        Events fired on
        `AbortSignal`,
        `XMLHttpRequest`,
        `FileReader`.

       | Clipboard
       |

          Events related to the
          Clipboard API.

        Used to notify when content is cut, copied, or pasted.

       |
        Events fired on
        `Document`,
        `Element`,
        `Window`.

       | Composition
       |

          Events related to composition; entering text "indirectly" (rather than
          using normal keyboard presses).

          For example, text entered via a speech to text engine, or using
          special key <example-value> that modify keyboard presses to represent new
          characters in another language.

       |
        Events fired on
        `Element`.

       | CSS transition
       |

          Events related to
          CSS Transitions.

          Provides notification events when CSS transitions start, stop, are
          canceled, etc.

       |
        Events fired on
        `Document`,
        `HTMLElement`,
        `Window`.

       | Database
       |

          Events related to database operations: opening, closing, transactions,
          errors, etc.

       |
        Events fired on
        `IDBDatabase`,
        `IDBOpenDBRequest`,
        `IDBRequest`,
        `IDBTransaction`.

       | DOM mutation
       |

          Events related to modifications to the Document Object Model (DOM)
          hierarchy and nodes.

       |

            Warning:
            Mutation Events are
            deprecated.
            Mutation Observers
            should be used instead.

       | Drag'n'drop, Wheel
       |

          Events related to using the
          HTML Drag and Drop API
          and wheel events.

          Drag and Wheel events are derived from mouse events. While they are
          fired when using mouse wheel or drag/drop, they may also be used with
          other appropriate hardware.

       |

          Drag events fired on
          `Document`

          Wheel events fired on
          `Element`

       | Focus
       | Events related to elements gaining and losing focus.
       |
        Events fired on
        `Element`,
        `Window`.

       | Form
       |
        Events related to forms being constructed, reset and submitted.

       |
        Events fired on
        `HTMLFormElement`.

       | Fullscreen
       |

          Events related to the
          Fullscreen API.

          Used to notify when the transitioning between full screen and windowed
          modes, and also of errors occurring during this transition.

       |
        Events fired on
        `Document`,
        `Element`.

       | Gamepad
       |

          Events related to the
          Gamepad API.

       |
        Events fired on
        `Window`.

       | Gestures
       |

          Touch events are
          recommended for implementing gestures.

       |

          Events fired on
          `Document`,
          `Element`.

        In addition there are a number of non-standard gesture events:

            Non-standard WebKit specific events on
            `Element`:
            `gesturestart` event,
            `gesturechange` event,
            `gestureend` event.

       | History
       |

          Events related to the
          History API.

       |
        Events fired on
        `Window`.

       | HTML element content display management
       |

          Events related to changing the state of a display or textual element.

       |
        Events fired on
        `HTMLDetailsElement`,
        `HTMLDialogElement`,
        `HTMLSlotElement`.

       | Inputs
       |

          Events related to HTML input elements e.g.
          ``, `<select>`, or
          `<textarea>`.

       |
        Events fired on
        `HTMLElement`,
        `HTMLInputElement`.

       | Keyboard
       |

          Events related to using a
          keyboard.

        Used to notify when keys are moved up, down, or just pressed.

       |
        Events fired on
        `Document`,
        `Element`.

       | Loading/unloading documents
       | Events related to loading and unloading documents.
       |

          Events fired on
          `Document`
          and
          `Window`.

       | Manifests
       |

          Events related to installation of
          progressive web app manifests.

       |
        Events fired on
        `Window`.

       | Media
       |

          Events related to media usage (including the
          Media Capture and Streams API,
          Web Audio API,
          Picture-in-Picture API, etc.).

       |
        Events fired on
        `ScriptProcessorNode`,
        `HTMLMediaElement`,
        `AudioTrackList`,
        `AudioScheduledSourceNode`,
        `MediaRecorder`,
        `MediaStream`,
        `MediaStreamTrack`,
        `VideoTrackList`,
        `HTMLTrackElement`,
        `OfflineAudioContext`,
        `TextTrack`,
        `TextTrackList`,
        Element/audio,
        Element/video.

       | Messaging
       |

          Events related to a window receiving a message from another browsing
          context.

       |
        Events fired on
        `Window`.

       | Mouse
       |

          Events related to using a
          computer mouse.

          Used to notify when the mouse is clicked, double-clicked, up and down
          events, right-click, movement in and out of an element, text
          selection, etc.

          Pointer events provide a hardware-agnostic alternative to mouse
          events. Drag and Wheel events are derived from mouse events.

       |
        Mouse events fired on
        `Element`

       | Network/Connection
       | Events related to gaining and losing network connection.
       |

          Events fired on
          `Window`.

          Events fired on
          `NetworkInformation`
          (Network Information API).

       | Payments
       |

          Events related to the
          Payment Request API.

       |

          Events fired on
          `PaymentRequest`,
          `PaymentResponse`.

       | Performance
       |

          Events related to any performance-related spec grouped into
          Performance APIs.

       |

          Events fired on
          `Performance`.

       | Pointer
       |

          Events related to the
          Pointer Events API.

          Provides hardware-agnostic notification from pointing devices
          including Mouse, Touch, pen/stylus.

       |
        Events fired on
        `Document`,
        `HTMLElement`.

       | Print
       | Events related to printing.
       |
        Events fired on
        `Window`.

       | Promise rejection
       |

          Events sent to the global script context when any JavaScript promise
          is rejected.

       |
        Events fired on
        `Window`.

       | Sockets
       |

          Events related to the
          WebSockets API.

       |
        Events fired on
        `WebSocket`.

       | SVG
       | Events related to SVG images.
       |

          Events fired on
          `SVGElement`,
          `SVGAnimationElement`,
          `SVGGraphicsElement`.

       | Text selection
       |

          Selection API events
          related to selecting text.

       |

          Event (`selectionchange`) fired on
          `HTMLTextAreaElement`,
          `HTMLInputElement`.

       | Touch
       |

          Events related to the
          Touch Events API.

          Provides notification events from interacting with a touch sensitive
          screen (i.e., using a finger or stylus). Not related to the
          Force Touch API.

       |
        Events fired on
        `Document`,
        `Element`.

       | Virtual reality
       |

          Events related to the
          WebXR Device API.

            Warning: The
            WebVR API (and
            associated
            `Window` events) are deprecated.

       |
        Events fired on
        `XRSystem`,
        `XRSession`,
        `XRReferenceSpace`.

       | RTC (real-time communication)
       |

          Events related to the
          WebRTC API.

       |
        Events fired on
        `RTCDataChannel`,
        `RTCDTMFSender`,
        `RTCIceTransport`,
        `RTCPeerConnection`.

       | Server-sent events
       |

          Events related to the
          server sent events API.

       |
        Events fired on
        `EventSource`.

       | Speech
       |

          Events related to the
          Web Speech API.

       |
        Events fired on
        `SpeechSynthesisUtterance`.

       | Workers
       |

          Events related to the
          Web Workers API,
          Service Worker API,
          Broadcast Channel API, and
          Channel Messaging API.

          Used to respond to new messages and message sending errors. Service
          workers can also be notified of other events, including push
          notifications, users clicking on displayed notifications, that push
          subscription has been invalidated, deletion of items from the content
          index, etc.

       |
        Events fired on
        `ServiceWorkerGlobalScope`,
        `DedicatedWorkerGlobalScope`,
        `SharedWorkerGlobalScope`,
        `WorkerGlobalScope`,
        `Worker`,
        `BroadcastChannel`,
        `MessagePort`.

## Creating and dispatching events

In addition to the events fired by built-in interfaces, you can create and dispatch DOM events yourself. Such events are commonly called _synthetic events_, as opposed to the events fired by the browser.

### Creating custom events

Events can be created with the `Event` constructor as follows:

```js
const event = new Event("build");

// Listen for the event.
elem.addEventListener("build", (e) => {
  /* … */
});

// Dispatch the event.
elem.dispatchEvent(event);
```

This code example uses the EventTarget.dispatchEvent() method.

### Adding custom data – CustomEvent()

To add more data to the event object, the CustomEvent interface exists and the **detail** property can be used to pass <example-value> data.
For example, the event could be created as follows:

```js
const event = new CustomEvent("build", { detail: elem.dataset.time });
```

This will then allow you to access the additional data in the event listener:

```js
function eventHandler(e) {
  console.log(`The time is: ${e.detail}`);
}
```

### Adding custom data – subclassing Event

The `Event` interface can also be subclassed. This is particularly useful for reuse, or for more complex custom data, or even adding methods to the event.

```js
class BuildEvent extends Event {
  #buildTime;

  constructor(buildTime) {
    super("build");
    this.#buildTime = buildTime;
  }

  get buildTime() {
    return this.#buildTime;
  }
}
```

This code example defines a `BuildEvent` class with a read-only property and a fixed event type.

The event could then be created as follows:

```js
const event = new BuildEvent(elem.dataset.time);
```

The additional data can then be accessed in the event listeners using the custom properties:

```js
function eventHandler(e) {
  console.log(`The time is: ${e.buildTime}`);
}
```

### Event bubbling

It is often desirable to trigger an event from a child element and have an ancestor catch it; optionally, you can include data with the event:

```html
<form>
  <textarea></textarea>
</form>
```

```js
const form = document.querySelector("form");
const textarea = document.querySelector("textarea");

// Create a new event, allow bubbling, and provide any data you want to pass to the "detail" property
const eventAwesome = new CustomEvent("awesome", {
  bubbles: true,
  detail: { text: () => textarea.value },
});

// The form element listens for the custom "awesome" event and then consoles the output of the passed text() method
form.addEventListener("awesome", (e) => console.log(e.detail.text()));

// As the user types, the textarea inside the form dispatches/triggers the event to fire, using itself as the starting point
textarea.addEventListener("input", (e) => e.target.dispatchEvent(eventAwesome));
```

### Creating and dispatching events dynamically

Elements can listen for events that haven't been created yet:

```html
<form>
  <textarea></textarea>
</form>
```

```js
const form = document.querySelector("form");
const textarea = document.querySelector("textarea");

form.addEventListener("awesome", (e) => console.log(e.detail.text()));

textarea.addEventListener("input", function () {
  // Create and dispatch/trigger an event on the fly
  // Note: Optionally, we've also leveraged the "function expression" (instead of the "arrow function expression") so "this" will represent the element
  this.dispatchEvent(
    new CustomEvent("awesome", {
      bubbles: true,
      detail: { text: () => textarea.value },
    }),
  );
});
```

## Triggering built-in events

This example demonstrates simulating a click (that is programmatically generating a click event) on a checkbox using DOM methods. View the example in action.

```js
function simulateClick() {
  const event = new MouseEvent("click", {
    view: window,
    bubbles: true,
    cancelable: true,
  });
  const cb = document.getElementById("checkbox");
  const cancelled = !cb.dispatchEvent(event);

  if (cancelled) {
    // A handler called preventDefault.
    alert("cancelled");
  } else {
    // None of the handlers called preventDefault.
    alert("not cancelled");
  }
}
```
