import { LitElement, html, css } from "https://cdn.skypack.dev/lit";

export class SplashElement extends LitElement {
  constructor() {
    super();
  }

  render() {
    return html`
      <img
        src="assets/signature/tone.avif"
        alt="Splash Logo"
        @click=${this._handleClick}
      />
    `;
  }

  _handleClick() {
    this.classList.add("fade-out");
    setTimeout(() => {
      this.remove();
      document.dispatchEvent(new CustomEvent("splashScreenRemoved"));
    }, 1000);
  }

  static styles = css`
    :host {
      display: flex;
      justify-content: center;
      align-items: center;
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background-color: black;
      opacity: 1;
      z-index: 999;
      transition: opacity 1s ease-out;
    }

    @keyframes opacitySlide {
      0% {
        clip-path: inset(0 100% 0 0);
        opacity: 0;
      }
      100% {
        clip-path: inset(0 0 0 0);
        opacity: 1;
      }
    }

    img {
      width: 300px;
      height: auto;
      opacity: 0;
      animation: opacitySlide 2s ease-out forwards;
      cursor: pointer;
    }

    :host(.fade-out) {
      opacity: 0;
    }
  `;
}

customElements.define("splash-element", SplashElement);
