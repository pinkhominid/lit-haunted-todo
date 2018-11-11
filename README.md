# lit-haunted-todo
lit-html + Haunted TodoMVC Example

Demonstrates the complete [TodoMVC](http://todomvc.com/) feature set (minus the styling) using [lit-html](https://polymer.github.io/lit-html/) and [Haunted](https://www.npmjs.com/package/@matthewp/haunted).

![Screenshot of unstyled TodoManager component](https://user-images.githubusercontent.com/206228/48176335-8b72b380-e2dd-11e8-92b0-3ac1fb15a2dc.png)

## Run

```sh
npm i && npm start
```

Todo
* Haunted: document observedAttrs feature
* Haunted: document useEffect second param
* Haunted: document useEffect empty Array second param
* Haunted: error when setting prop .hidden on nested component
* Haunted: removeAttribute on boolean observedAttr sets prop to null
* Haunted: document custom Hooks
* Haunted: export {hook, Hook}
* Create a faq for lit-html + Haunted
  * how to init props?
  * how to sync props/attrs when pre-upgrade attribs are set?
  * how to trigger render on prop change?
  * how to trigger render on attrib change?
  * how to reflect prop value to attr?
  * how to dispatch events?
  * how to run effects conditionally?
  * should I dispatch events on prop/attr change not driven by user action?
  * when should I use useState and when not?
  * when should I destructure props and when not?
