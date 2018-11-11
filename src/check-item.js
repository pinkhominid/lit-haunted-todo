import {html} from 'lit-html';
import {component} from '@matthewp/haunted';
import {useProps} from './use-props';
import {blockStyle} from './block-style';

CheckItem.observedAttributes = ['checked'];

function CheckItem(host) {
  useProps.bind(host)({
    checked: {type: Boolean, reflect: true, initVal: false}
  });

  function onCheckboxChange(evt) {
    host.checked = evt.target.checked
    host.dispatchEvent(new CustomEvent('change', {bubbles: true}));
  }

  return html`
    ${blockStyle}
    <input type=checkbox .checked=${host.checked} @change=${onCheckboxChange}>
    <slot></slot>
  `;
}

customElements.define('check-item', component(CheckItem));
