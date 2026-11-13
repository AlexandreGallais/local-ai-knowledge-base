---
title: "Drag and drop (part 3 of 6)"
tool: "angular"
version: "22.2"
source: "https://github.com/angular/angular/blob/dda2d41d948380d63619d597c9815db0aa77fd1d/adev/src/content/guide/drag-drop.md"
commit: "dda2d41d948380d63619d597c9815db0aa77fd1d"
license: "CC-BY-4.0"
---

# Drag and drop (part 3 of 6)

## Dragging customizations

### Customize drag handle

By default, the user can drag the entire `cdkDrag` element to move it around. To restrict the user to only be able to do so using a handle element, add the `cdkDragHandle` directive to an element inside of `cdkDrag`. You can have as many `cdkDragHandle` elements as you want.

  File: `app.html`

```html
<div class="example-box" cdkDrag>
  I can only be dragged using the handle

  <div class="example-handle" cdkDragHandle>
    <svg width="24px" fill="currentColor" viewBox="0 0 24 24">
      <path
        d="M10 9h4V6h3l-5-5-5 5h3v3zm-1 1H6V7l-5 5 5 5v-3h3v-4zm14 2l-5-5v3h-3v4h3v3l5-5zm-9 3h-4v3H7l5 5 5-5h-3v-3z"
      ></path>
      <path d="M0 0h24v24H0z" fill="none"></path>
    </svg>
  </div>
</div>
```
  File: `app.ts`

```ts
import {CdkDrag, CdkDragHandle} from '@angular/cdk/drag-drop';
import {Component} from '@angular/core';

/**
 * @title Drag&Drop with a handle
 */
@Component({
  selector: 'cdk-drag-drop-handle-example',
  templateUrl: 'app.html',
  styleUrl: 'app.css',
  imports: [CdkDrag, CdkDragHandle],
})
export class CdkDragDropHandleExample {}
```
  File: `app.css`

```css
.example-box {
  width: 200px;
  height: 200px;
  padding: 10px;
  box-sizing: border-box;
  border: solid 1px #ccc;
  color: rgba(0, 0, 0, 0.87);
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  background: #fff;
  border-radius: 4px;
  position: relative;
  z-index: 1;
  font-family: sans-serif;
  transition: box-shadow 200ms cubic-bezier(0, 0, 0.2, 1);
  box-shadow:
    0 3px 1px -2px rgba(0, 0, 0, 0.2),
    0 2px 2px 0 rgba(0, 0, 0, 0.14),
    0 1px 5px 0 rgba(0, 0, 0, 0.12);
}

.example-box:active {
  box-shadow:
    0 5px 5px -3px rgba(0, 0, 0, 0.2),
    0 8px 10px 1px rgba(0, 0, 0, 0.14),
    0 3px 14px 2px rgba(0, 0, 0, 0.12);
}

.example-handle {
  position: absolute;
  top: 10px;
  right: 10px;
  color: #ccc;
  cursor: move;
  width: 24px;
  height: 24px;
}
```

You can use the `CDK_DRAG_HANDLE` injection token that can be used to reference instances of `cdkDragHandle`. For more information see the dependency injection guide and the drag handle injection token API.

### Customize drag preview

A preview element becomes visible when a `cdkDrag` element is being dragged. By default, the preview is a clone of the original element positioned next to the user's cursor.

To customize the preview, provide a custom template via `*cdkDragPreview`. The custom preview won't match the size of the original dragged element since assumptions aren't made about the element's content. To match the size of the element for the drag preview, pass true to the `matchSize` input.

The cloned element removes its id attribute in order to avoid having multiple elements with the same id on the page. This will cause any CSS that targets that id not to be applied.

  File: `app.html`

```html
<div cdkDropList class="example-list" (cdkDropListDropped)="drop($event)">
  @for (movie of movies; track movie) {
    <div class="example-box" cdkDrag>
      {{ movie.title }}
      <img *cdkDragPreview [src]="movie.poster" [alt]="movie.title" />
    </div>
  }
</div>
```
  File: `app.ts`

```ts
import {
  CdkDrag,
  CdkDragDrop,
  CdkDragPreview,
  CdkDropList,
  moveItemInArray,
} from '@angular/cdk/drag-drop';
import {Component} from '@angular/core';

/**
 * @title Drag&Drop custom preview
 */
@Component({
  selector: 'cdk-drag-drop-custom-preview-example',
  templateUrl: 'app.html',
  styleUrl: 'app.css',
  imports: [CdkDropList, CdkDrag, CdkDragPreview],
})
export class CdkDragDropCustomPreviewExample {
  // tslint:disable:max-line-length
  movies = [
    {
      title: 'Episode I - The Phantom Menace',
      poster: 'https://upload.wikimedia.org/wikipedia/en/4/40/Star_Wars_Phantom_Menace_poster.jpg',
    },
    {
      title: 'Episode II - Attack of the Clones',
      poster:
        'https://upload.wikimedia.org/wikipedia/en/3/32/Star_Wars_-_Episode_II_Attack_of_the_Clones_%28movie_poster%29.jpg',
    },
    {
      title: 'Episode III - Revenge of the Sith',
      poster:
        'https://upload.wikimedia.org/wikipedia/en/9/93/Star_Wars_Episode_III_Revenge_of_the_Sith_poster.jpg',
    },
    {
      title: 'Episode IV - A New Hope',
      poster: 'https://upload.wikimedia.org/wikipedia/en/8/87/StarWarsMoviePoster1977.jpg',
    },
    {
      title: 'Episode V - The Empire Strikes Back',
      poster:
        'https://upload.wikimedia.org/wikipedia/en/3/3f/The_Empire_Strikes_Back_%281980_film%29.jpg',
    },
    {
      title: 'Episode VI - Return of the Jedi',
      poster: 'https://upload.wikimedia.org/wikipedia/en/b/b2/ReturnOfTheJediPoster1983.jpg',
    },
    {
      title: 'Episode VII - The Force Awakens',
      poster:
        'https://upload.wikimedia.org/wikipedia/en/a/a2/Star_Wars_The_Force_Awakens_Theatrical_Poster.jpg',
    },
    {
      title: 'Episode VIII - The Last Jedi',
      poster: 'https://upload.wikimedia.org/wikipedia/en/7/7f/Star_Wars_The_Last_Jedi.jpg',
    },
    {
      title: 'Episode IX – The Rise of Skywalker',
      poster:
        'https://upload.wikimedia.org/wikipedia/en/a/af/Star_Wars_The_Rise_of_Skywalker_poster.jpg',
    },
  ];
  // tslint:enable:max-line-length

  drop(event: CdkDragDrop<{title: string; poster: string}[]>) {
    moveItemInArray(this.movies, event.previousIndex, event.currentIndex);
  }
}
```
  File: `app.css`

```css
.example-list {
  width: 500px;
  max-width: 100%;
  border: solid 1px #ccc;
  min-height: 60px;
  display: block;
  background: white;
  border-radius: 4px;
  overflow: hidden;
  font-family: sans-serif;
}

.example-box {
  padding: 20px 10px;
  border-bottom: solid 1px #ccc;
  color: rgba(0, 0, 0, 0.87);
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  cursor: move;
  background: white;
  font-size: 14px;
  font-family: sans-serif;
}

.cdk-drag-preview {
  box-sizing: border-box;
  border-radius: 4px;
  box-shadow:
    0 5px 5px -3px rgba(0, 0, 0, 0.2),
    0 8px 10px 1px rgba(0, 0, 0, 0.14),
    0 3px 14px 2px rgba(0, 0, 0, 0.12);
}

.cdk-drag-placeholder {
  opacity: 0;
}

.cdk-drag-animating {
  transition: transform 250ms cubic-bezier(0, 0, 0.2, 1);
}

.example-box:last-child {
  border: none;
}

.example-list.cdk-drop-list-dragging .example-box:not(.cdk-drag-placeholder) {
  transition: transform 250ms cubic-bezier(0, 0, 0.2, 1);
}
```

You can use the `CDK_DRAG_PREVIEW` injection token that can be used to reference instances of `cdkDragPreview`. For more information see the dependency injection guide and the drag preview injection token API.

### Customize drag insertion point

By default, Angular inserts the `cdkDrag` preview into the `<body>` of the page in order to avoid issues with positioning and overflow. This may not be desirable in some cases because the preview won't have its inherited styles applied.

You can change where Angular inserts the preview using the `cdkDragPreviewContainer` input on `cdkDrag`. The possible values are:

| Value                         | Description                                                                            | Advantages                                                                                                                  | Disadvantages                                                                                                                                                             |
| :---------------------------- | :------------------------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `global`                      | Default value. Angular inserts the preview into the <body> or the closest shadow root. | Preview won't be affected by `z-index` or `overflow: hidden`. It also won't affect `:nth-child` selectors and flex layouts. | Doesn't retain inherited styles.                                                                                                                                          |
| `parent`                      | Angular inserts the preview inside the parent of the element that is being dragged.    | Preview inherits the same styles as the dragged element.                                                                    | Preview may be clipped by `overflow: hidden` or be placed under other elements due to `z-index`. Furthermore, it can affect `:nth-child` selectors and some flex layouts. |
| `ElementRef` or `HTMLElement` | Angular inserts the preview into the specified element.                                | Preview inherits styles from the specified container element.                                                               | Preview may be clipped by `overflow: hidden` or be placed under other elements due to `z-index`. Furthermore, it can affect `:nth-child` selectors and some flex layouts. |

Alternatively, you can modify the `CDK_DRAG_CONFIG` injection token to update `previewContainer` within the config if the value is `global` or `parent`. For more information see the dependency injection guide, drag config injection token API, and the drag drop config API.

### Customize drag placeholder

While a `cdkDrag` element is being dragged, the directive creates a placeholder element that shows where the element will be placed when dropped. By default, the placeholder is a clone of the element that is being dragged. You can replace the placeholder with a custom one using the `*cdkDragPlaceholder` directive:

  File: `app.html`

```html
<div cdkDropList class="example-list" (cdkDropListDropped)="drop($event)">
  @for (movie of movies; track movie) {
    <div class="example-box" cdkDrag>
      <div class="example-custom-placeholder" *cdkDragPlaceholder></div>
      {{ movie }}
    </div>
  }
</div>
```
  File: `app.ts`

```ts
import {
  CdkDrag,
  CdkDragDrop,
  CdkDragPlaceholder,
  CdkDropList,
  moveItemInArray,
} from '@angular/cdk/drag-drop';
import {Component} from '@angular/core';

/**
 * @title Drag&Drop custom placeholder
 */
@Component({
  selector: 'cdk-drag-drop-custom-placeholder-example',
  templateUrl: 'app.html',
  styleUrl: 'app.css',
  imports: [CdkDropList, CdkDrag, CdkDragPlaceholder],
})
export class CdkDragDropCustomPlaceholderExample {
  movies = [
    'Episode I - The Phantom Menace',
    'Episode II - Attack of the Clones',
    'Episode III - Revenge of the Sith',
    'Episode IV - A New Hope',
    'Episode V - The Empire Strikes Back',
    'Episode VI - Return of the Jedi',
    'Episode VII - The Force Awakens',
    'Episode VIII - The Last Jedi',
    'Episode IX - The Rise of Skywalker',
  ];

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.movies, event.previousIndex, event.currentIndex);
  }
}
```
  File: `app.css`

```css
.example-list {
  width: 500px;
  max-width: 100%;
  border: solid 1px #ccc;
  min-height: 60px;
  display: block;
  background: white;
  border-radius: 4px;
  overflow: hidden;
  font-family: sans-serif;
}

.example-box {
  padding: 20px 10px;
  border-bottom: solid 1px #ccc;
  color: rgba(0, 0, 0, 0.87);
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  cursor: move;
  background: white;
  font-size: 14px;
  font-family: sans-serif;
}

.cdk-drag-preview {
  box-sizing: border-box;
  border-radius: 4px;
  box-shadow:
    0 5px 5px -3px rgba(0, 0, 0, 0.2),
    0 8px 10px 1px rgba(0, 0, 0, 0.14),
    0 3px 14px 2px rgba(0, 0, 0, 0.12);
}

.cdk-drag-animating {
  transition: transform 250ms cubic-bezier(0, 0, 0.2, 1);
}

.example-box:last-child {
  border: none;
}

.example-list.cdk-drop-list-dragging .example-box:not(.cdk-drag-placeholder) {
  transition: transform 250ms cubic-bezier(0, 0, 0.2, 1);
}

.example-custom-placeholder {
  background: #ccc;
  border: dotted 3px #999;
  min-height: 60px;
  transition: transform 250ms cubic-bezier(0, 0, 0.2, 1);
}
```

You can use the `CDK_DRAG_PLACEHOLDER` injection token that can be used to reference instances of `cdkDragPlaceholder`. For more information see the dependency injection guide and the drag placeholder injection token API.
