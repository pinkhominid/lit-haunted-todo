import {html} from 'lit-html';
import {component, useEffect} from '@matthewp/haunted';
import {blockStyle} from './block-style';

function CheckItem(host) {
  useEffect(() => {
    // reflect prop to attr
    host[`${host.checked ? 'set' : 'remove'}Attribute`]('checked', '');

    host.dispatchEvent(new CustomEvent('change', {bubbles: true}));
  }, [host.checked]);

  function onCheckboxChange(evt) {
    host.checked = evt.target.checked;
  }

  return html`
    ${blockStyle}
    <input type=checkbox .checked=${host.checked} @change=${onCheckboxChange}>
    <slot></slot>
  `;
}

CheckItem.observedAttributes = ['checked'];

customElements.define('check-item', component(CheckItem));
