---
title: "`capture` HTML attribute"
tool: "mdn-html"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/html/reference/attributes/capture/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `capture` HTML attribute

The **`capture`** attribute specifies that, optionally, a new file should be captured, and which device should be used to capture that new media of a type defined by the `accept` attribute.

Values include `user` and `environment`. The capture attribute is supported on the `<file>` input type.

The `capture` attribute takes as its value a string that specifies which camera to use for capture of image or video data, if the accept attribute indicates that the input should be of one of those types.

| Value         | Description                                                |
| ------------- | ---------------------------------------------------------- |
| `user`        | The user-facing camera and/or microphone should be used.   |
| `environment` | The outward-facing camera and/or microphone should be used |

> **Note:**
> Capture was previously a Boolean attribute which, if present, requested that the device's media capture device(s) such as camera or microphone be used instead of requesting a file input.

```html
<label for="selfie">Take a picture of your face:</label>

<input type="file" id="selfie" name="selfie" accept="image/*" capture="user" />

<label for="picture">Take a picture using back facing camera:</label>

<input
  type="file"
  id="picture"
  name="picture"
  accept="image/*"
  capture="environment" />
```

```css
label {
  display: block;
  margin-top: 1rem;
}

input {
  margin-bottom: 1rem;
}
```

## Examples

When set on a file input type, operating systems with microphones and cameras will display a user interface allowing the selection from an existing file or the creating of a new one.

```html
<p>
  <label for="soundFile">What does your voice sound like?:</label>
  <input type="file" id="soundFile" capture="user" accept="audio/*" />
</p>
<p>
  <label for="videoFile">Upload a video:</label>
  <input type="file" id="videoFile" capture="environment" accept="video/*" />
</p>
<p>
  <label for="imageFile">Upload a photo of yourself:</label>
  <input type="file" id="imageFile" capture="user" accept="image/*" />
</p>
```

Note these work better on mobile devices; if your device is a desktop computer, you'll likely get a typical file picker.

## See also

- Using files from web applications
- File API
- `HTMLInputElement.files`
