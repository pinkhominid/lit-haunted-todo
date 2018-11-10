import {html} from 'lit-html';

export const blockStyle = html`
  <style>
    :host {display: block;}
    :host([hidden]) {display: none;}
  </style>
`;
