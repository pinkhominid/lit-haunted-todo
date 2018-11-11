import {useEffect} from '@matthewp/haunted';

export function useProps(propsDef) {
  for (const name in propsDef) {
    const def = propsDef[name];

    // initialize
    if (def.initVal !== undefined) {
      useEffect(() => {
        if (this[name] === undefined) this[name] = def.initVal;
      }, []);
    }

    // reflect
    if (def.reflect) {
      useEffect(() => {
        switch (def.type) {
          case Boolean:
            this[`${this[name] ? 'set' : 'remove'}Attribute`](name, '');
            // needed because removing the attr incorrectly sets prop to null
            this[name] = !!this[name];
            break;
          default:
            this.setAttribute(name, this[name]);
        }
      }, [this[name]]);
    }
  }
};
