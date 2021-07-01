# Reate

> A lightweight react global state management library.

## ✨ Feature

  - Simple and easy to use, only three APIs.
  - Only 4kb size after build.
  - Support TypeScript static check.
  - No dependencies.

## 🌈  Install

```bash
$ npm i reate --save
```

## 😊 Usage

**create a store**

```javascript
// store.js
import Reate from 'reate';

export default new Reate(
  {
    visible: false,
  },
  {
    changeVisible: (store, { visible }) => store.setState({ visible });
  }
);
```

**use this store in react**

```javascript
// Test.js
import React from 'react';
import store from './store.js';

function Test() {
  const visible = store.useState('visible');
  return (
    <div>
      <div
        onClick={() => store.dispatch('changeVisible', { visible: !visible })}
      >
        ChangeVisible
      </div>
      {visible ? <div>Hide</div> : <div>Show</div>}
    </div>
  );
}
```

## 🔨  License

[MIT](LICENSE)