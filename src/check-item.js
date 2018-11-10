/**
 * TODO: observe attr/prop changes
 */
import {html} from 'lit-html';
import {component} from '@matthewp/haunted';
import {blockStyle} from './block-style';

function CheckItem(host) {
  function onCheckboxChange(evt) {
    host.checked = evt.target.checked;
    host.dispatchEvent(new CustomEvent('change', {bubbles: true}));
  }

  return html`
    ${blockStyle}
    <input type=checkbox .checked=${host.checked} @change=${onCheckboxChange}>
    <slot></slot>
  `;
}

CheckItem.observedAttributes = ['checked'];

customElements.define('check-item', component(CheckItem));
