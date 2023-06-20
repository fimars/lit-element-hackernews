import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { ofetch } from "ofetch";

@customElement("lit-hackernews-item")
export class SimpleGreeting extends LitElement {
  // Define scoped styles right with your component, in plain CSS
  static override styles = css`
    :host {
      color: blue;
    }
  `;

  // Declare reactive properties
  @property()
  hid?: string | undefined;
  @property({ attribute: false })
  data?: any;

  // Render the UI as a function of component state
  override render() {
    return html`
      ${!this.data
        ? html`<li>loading... ${this.hid}</li>`
        : html`
            <li>
              [${this.data.type}]
              <a target="_blank" href="${this.data.url}">${this.data.title}</a>
            </li>
          `}
    `;
  }

  override connectedCallback() {
    super.connectedCallback();

    ofetch(`https://hacker-news.firebaseio.com/v0/item/${this.hid}.json`).then(
      (data) => {
        this.data = data;
        this.requestUpdate();
      }
    );
  }
}
