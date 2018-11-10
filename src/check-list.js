import {html} from 'lit-html';
import {component} from '@matthewp/haunted';
import {blockStyle} from './block-style';

function CheckList() {
  return html`
    ${blockStyle}
    <style>
      :host {
        margin: 16px 0;
        padding-left: 18px;
      }
    </style>
    <slot></slot>
  `;
}

customElements.define('check-list', component(CheckList));
