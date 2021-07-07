import { useState, useEffect } from 'react';

interface State {
  [key: string]: any;
}

type EventCallback<T> = (k: T) => void;

function isPlainObject(value: any): boolean {
  if (typeof value !== 'object' || value === null) {
    return false;
  }

  if (Object.getPrototypeOf(value) === null) {
    return true;
  }

  let proto = value;
  while (Object.getPrototypeOf(proto) !== null) {
    proto = Object.getPrototypeOf(proto);
  }

  return Object.getPrototypeOf(value) === proto;
}

class Reate<
  S extends State,
  E extends {
    [key: string]: (store: Reate<S, E>, payload?: any) => void;
  }
> {
  private state: any = {};
  private event: any = {};
  private effect: any = {};

  constructor(state: S, effect?: E) {
    if (!isPlainObject(state)) {
      throw new Error('state is must be a plain object');
    }
    this.state = state;
    this.effect = effect;
  }

  private on<K extends keyof S>(key: K, callback: EventCallback<S[K]>): void {
    if (!this.event[key]) {
      this.event[key] = callback;
    }
  }

  private off<K extends keyof S>(key: K): void {
    if (this.event[key]) {
      this.event[key] = undefined;
    }
  }

  useState<K extends keyof S>(key: K): S[K] {
    const [value, setValue] = useState(this.state[key]);

    useEffect(() => {
      this.on(key, setValue);
      return () => this.off(key);
    }, [key]);

    return value;
  }

  setState(state: Partial<S>): void {
    if (!isPlainObject(state)) {
      throw new Error('state is must be a plain object');
    }

    Object.keys(state).forEach((key) => {
      this.state[key] = state[key];
      if (this.event[key]) {
        this.event[key](state[key]);
      }
    });
  }

  dispatch<K extends keyof E>(key: K, payload?: any): void {
    if (typeof this.effect[key] === 'function') {
      return this.effect[key](this, payload);
    }
    throw new Error(`effect not found: ${key}`);
  }
}

export default Reate;
