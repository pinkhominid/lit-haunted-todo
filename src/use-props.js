import {useEffect} from '@matthewp/haunted';

export function useProps(propsDef) {
  for (const name in propsDef) {
    const def = propsDef[name];

    // initialize
    useEffect(() => {
      if (def.initVal !== undefined) {
        if (this[name] === undefined) this[name] = def.initVal;
      }
    }, []);

    // reflect
    useEffect(() => {
      if (def.reflect) {
        switch (def.type) {
          case Boolean:
            this[`${this[name] ? 'set' : 'remove'}Attribute`](name, '');
            // needed because removing the attr incorrectly sets prop to null
            this[name] = !!this[name];
            break;
          default:
            this.setAttribute(name, this[name]);
        }
      }
    }, [this[name]]);
  }
};
