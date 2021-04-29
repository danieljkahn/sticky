# sticky
Basic vanilla JS sticky element class

# documentation

See index.html for examples.

To adapt to specific uses, some CSS may need to be adjusted. Sticky element fixed positioning is not calculated in JS, and must be assigned as CSS. Maybe this will be adapted in future, but works fine for now. You know what to do.


### javascript
Initialize:
```js

let stickyEl = document.getElementById('stickyElement');
let boundaryEl = document.getElementById('boundaryElement');
let viewport = window; // for scrolling modal, set this as overflow container
let log = false; // set to true for debugging
let stickyObj = new Sticky(stickyEl, stickyBoundary, viewport, true);
```

# next up
Fix bug on window refresh when already scrolled