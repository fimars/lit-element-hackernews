import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { ofetch } from "ofetch";

import "./item";

@customElement("lit-hackernews")
export class SimpleGreeting extends LitElement {
  // Define scoped styles right with your component, in plain CSS
  static override styles = css`
    :host {
      color: blue;
    }
  `;

  // Declare reactive properties
  @property({ attribute: false })
  tops: number[] = [];

  // Render the UI as a function of component state
  override render() {
    console.log(this.tops);
    return html`
      <h3>Tops ${this.tops?.length}</h3>
      <ul>
        ${this.tops.map((id) => html`<lit-hackernews-item hid="${id}" />`)}
      </ul>
    `;
  }

  override connectedCallback() {
    super.connectedCallback();

    ofetch(
      "https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty"
    ).then((tops) => {
      this.tops = tops.slice(0, 40);
      this.requestUpdate();
    });
  }
}
