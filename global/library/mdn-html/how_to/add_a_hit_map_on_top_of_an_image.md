---
title: "Add a hitmap on top of an image"
tool: "mdn-html"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/html/how_to/add_a_hit_map_on_top_of_an_image/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Add a hitmap on top of an image

You can create a clickable image map in HTML using `<area>` and `<map>` elements.
This article describes how to set up an image map, and some downsides to consider before you build one.

Here are some things you need to know

       | Prerequisites:
       |
        You should already know how to create a basic HTML document and how to add accessible images to a webpage.

       | Objective:
       |
        Learn how to make different regions of one image link to different pages.

> **Warning:**
> This article discusses client-side image maps only. Do not use server-side image maps, which require the user to have a mouse.

## Image maps, and their drawbacks

When you nest an image inside ``, the entire image links to one webpage. An image map, on the other hand, contains several active regions (called "hotspots") that each link to a different resource.

Formerly, image maps were a popular navigation device, but it's important to thoroughly consider their performance and accessibility ramifications.

> **Warning:**
> Multiple images referencing the same image map may lead to unexpected browser behavior, severely degrading usability and accessibility. For example, when a user keyboard navigates an image with a re-used image map in Safari and Chromium-based browsers, latter image instances using that same image map are skipped entirely. In Firefox, all image maps get keyboard focus simultaneously and when the user keyboard navigates past the image, the next focused element is the one after the last image instance, effectively skipping everything between the two images.

Text links (perhaps styled with CSS) are preferable to image maps for several reasons: text links are lightweight, maintainable, often more SEO-friendly, and support accessibility needs (e.g., screen readers, text-only browsers, translation services).

## How to insert an image map, properly

### Step 1: The image

Not just any image is acceptable.

- The image must make it clear what happens when people follow image links. `alt` text is mandatory, of course, but many people never see it.
- The image must clearly indicate where hotspots begin and end.
- Hotspots must be large enough to tap comfortably, at any viewport size. How large is large enough? 72 × 72 CSS pixels is a good minimum, with additional generous gaps between touch targets. The map of the world at 50languages.com (as of time of writing) illustrates the problem perfectly. It's much easier to tap Russia or North America than Albania or Estonia.

You insert your image much the same way as always (with an `` element and `alt` text). If the image is only present as a navigation device, you may write `alt=""`, provided you furnish appropriate `alt` text in the `<area>` elements later on.

You will need a special `usemap` attribute. Come up with a unique name, containing no spaces, for your image map. Then assign that name (preceded by a hash) as the value for the `usemap` attribute:

```html
<img src="image-map.png" alt="" usemap="#example-map-1" />
```

### Step 2: Activate your hotspots

In this step, put all your code inside a `<map>` element. `<map>` only needs one attribute, the same map `name` as you used in your `usemap` attribute above:

```html
<map name="example-map-1"> </map>
```

Inside the `<map>` element, we need `<area>` elements. An `<area>` element corresponds to a single hotspot. To keep keyboard navigation intuitive, make sure the source order of `<area>` elements corresponds to the visual order of hotspots.

`<area>` elements are void elements, but do require four attributes:

- `shape`
    The `shape` attribute takes one of four values: `circle`, `rect`, `poly`, and `default`. An `<area>` whose `shape` is `default` occupies the entire image, minus any other hotspots you've defined.
    If there is any overlap between the defined areas, the source order determines which area takes preference.
    The shape you choose determines the coordinate information you'll need to provide in `coords`.

- `coords`
    Coordinates are given in CSS pixels, and its value is dependent on the `shape` selected.
    - For a circle, provide the center's x and y coordinates, followed by the length of the radius.
    - For a rectangle, provide the x and y coordinates of the upper-left and bottom-right corners.
    - For a polygon, to provide the x and y coordinates of each corner (so, at least six values).

- `href`
    The URL of the resource you're linking to. You may leave this attribute blank if you _don't_ want the current area to link anywhere (say, if you're making a hollow circle.)

- `alt`
    A mandatory attribute, telling people where the link goes or what it does. `alt` text only displays when the image is unavailable. Please refer to our guidelines for writing accessible link text.

    You may write `alt=""` if the `href` attribute is blank _and_ the entire image already has an `alt` attribute.

```html
<map name="example-map-1">
  <area
    shape="circle"
    coords="200,250,25"
    href="page-2.html"
    alt="circle example" />

  <area
    shape="rect"
    coords="10, 5, 20, 15"
    href="page-3.html"
    alt="rectangle example" />
</map>
```

### Step 3: Make sure it works for everybody

You aren't done until you test image maps rigorously on many browsers and devices. Try following links with your keyboard alone. Try turning images off.

If your image map is wider than about 240px, you'll need to make further adjustments to make your website responsive. It's not enough to resize the image for small screens, because the coordinates stay the same and no longer match the image.

## Learn more

- ``
- `<map>`
- `<area>`
- Online image map editor
