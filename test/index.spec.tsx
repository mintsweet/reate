import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import Reate from '../src';

let container;

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  document.body.removeChild(container);
  container = null;
});

test('new Reate()', () => {
  expect(() => new Reate(undefined)).toThrow('state is must be a plain object');
  expect(() => new Reate(null)).toThrow('state is must be a plain object');
});

test('.useState', () => {
  const global = new Reate({ text: 'Test' });

  function Test() {
    const ctx = global.useState('text');
    return <div>{ctx}</div>;
  }

  act(() => {
    ReactDOM.render(<Test />, container);
  });

  const dom = container.querySelector('div');
  expect(dom.textContent).toEqual('Test');
});

test('.setState', () => {
  const global = new Reate({ visible: false });

  function Test() {
    const visible = global.useState('visible');
    return visible ? <div>Hide</div> : <div>Show</div>;
  }

  act(() => {
    ReactDOM.render(<Test />, container);
  });

  const dom = container.querySelector('div');
  expect(dom.textContent).toEqual('Show');

  act(() => {
    global.setState({ visible: true });
  });

  expect(dom.textContent).toEqual('Hide');
});

test('.dispatch', () => {
  const global = new Reate(
    { visible: false },
    {
      changeVisible: (store, { visible }) => {
        store.setState({ visible });
      },
    }
  );

  function Test() {
    const visible = global.useState('visible');
    return visible ? <div>Hide</div> : <div>Show</div>;
  }

  act(() => {
    ReactDOM.render(<Test />, container);
  });

  const dom = container.querySelector('div');
  expect(dom.textContent).toEqual('Show');

  act(() => {
    global.dispatch('changeVisible', { visible: true });
  });

  expect(dom.textContent).toEqual('Hide');
});
