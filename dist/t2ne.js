import { LitElement, html, css } from "https://cdn.skypack.dev/lit";

export class T2neElement extends LitElement {
  static properties = {
    currentPhrase: { type: String },
    activeSection: { type: String },
    isTransitioning: { type: Boolean },
  };

  constructor() {
    super();
    this.phrases = [
      "hi, i'm t2ne",
      "web developer",
      "music enthusiast",
      "calisthenics enjoyer",
    ];
    this.currentPhrase = "";
    this.isDeleting = false;
    this.index = 0;
    this.speed = 100;
    this.typingStarted = false;
    this.activeSection = "home";
    this.isTransitioning = false;
    this.isIdle = false;
  }

  connectedCallback() {
    super.connectedCallback();
    document.addEventListener("splashScreenRemoved", () => {
      this.startTyping();
    });
  }

  copyToClipboard(event) {
    const contactContent = event.target.closest(".contact-content");
    if (contactContent) {
      const textToCopy = contactContent.querySelector("div").innerText;
      navigator.clipboard.writeText(textToCopy).then(() => {
        contactContent.classList.add("active");
        setTimeout(() => {
          contactContent.classList.remove("active");
        }, 2000);
      });
    }
  }

  startTyping() {
    if (!this.typingStarted) {
      this.typingStarted = true;
      this.typing();
    }
  }

  typing() {
    if (this.activeSection === "home") {
      const currentPhrase = this.phrases[this.index % this.phrases.length];
      if (this.isDeleting) {
        this.currentPhrase = currentPhrase.substring(
          0,
          this.currentPhrase.length - 1
        );
        this.speed = 50;
        this.isIdle = false;
      } else {
        this.currentPhrase = currentPhrase.substring(
          0,
          this.currentPhrase.length + 1
        );
        this.speed = 100;
        this.isIdle = false;
      }

      if (!this.isDeleting && this.currentPhrase === currentPhrase) {
        this.speed = 2000;
        this.isDeleting = true;
        this.isIdle = true;
      } else if (this.isDeleting && this.currentPhrase === "") {
        this.isDeleting = false;
        this.index++;
        this.speed = 500;
        this.isIdle = false;
      }

      this.requestUpdate();
      setTimeout(() => this.typing(), this.speed);
    }
  }

  changeSection(section) {
    if (this.activeSection !== section) {
      this.isTransitioning = true;
      setTimeout(() => {
        this.activeSection = section;
        this.isTransitioning = false;
        if (section === "home") {
          this.typing();
        }
      }, 500);
    }
  }

  renderContent() {
    switch (this.activeSection) {
      case "home":
        return html`
          ${this.currentPhrase}
          <span class="cursor ${this.isIdle ? "" : "cursor-static"}"></span>
        `;
      case "about":
        return html`
          <div class="about-content">
            t2ne (tone) is a 20-year-old third-year university student pursuing
            a bachelor's degree in graphic computer science and multimedia. With
            a solid foundation in programming languages like java and expertise
            in web development using html, css, and javascript, t2ne is
            committed to harnessing technical and creative skills in projects
            that blend engineering precision with visual storytelling.
            Passionate about innovation in multimedia technology, t2ne is keen
            on developing applications and websites that push the boundaries of
            user experience.
            <a
              href="https://t2ne.github.io/energy-guardian"
              class="about-link"
              target="_blank"
              rel="noopener noreferrer"
              >?</a
            >
          </div>
        `;
      case "skills":
        return html` <div class="skills-grid">${this.renderSkills()}</div> `;
      case "contact":
        return html`
          <div class="contact-content" @click=${this.copyToClipboard}>
            <div>hi@t2ne.eu</div>
            <span class="copied-bubble">Copied</span>
          </div>
        `;
      default:
        return "";
    }
  }

  renderSkills() {
    const skills = [
      {
        name: "CSS3",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
        link: null,
      },
      {
        name: "HTML5",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
        link: null,
      },
      {
        name: "Bootstrap",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg",
        link: "https://github.com/t2ne/pw-project",
      },
      {
        name: "JavaScript",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
        link: "https://github.com/t2ne?tab=repositories&q=&type=&language=javascript&sort=",
      },
      {
        name: "TypeScript",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
        link: null,
      },
      {
        name: "C#",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg",
        link: null,
      },
      {
        name: "Java",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
        link: "https://github.com/t2ne/chinese-checkers",
      },
      {
        name: "PHP",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg",
        link: null,
      },
      {
        name: "JSON",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/json/json-original.svg",
        link: null,
      },
      {
        name: "MySQL",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
        link: null,
      },
      {
        name: "Ruby",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ruby/ruby-original.svg",
        link: null,
      },
      {
        name: "Git",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
        link: null,
      },
      {
        name: "Node.js",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
        link: null,
      },
      {
        name: "Bun",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bun/bun-original.svg",
        link: null,
      },
      {
        name: "Svelte",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/svelte/svelte-original.svg",
        link: "https://github.com/t2ne/sound808",
      },
      {
        name: "Swagger",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/swagger/swagger-original.svg",
        link: null,
      },
      {
        name: "Angular",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg",
        link: "https://github.com/t2ne/eu-compro",
      },
      {
        name: "Firebase",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-original.svg",
        link: null,
      },
      {
        name: "PostgreSQL",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
        link: null,
      },
      {
        name: "Docker",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
        link: "https://github.com/t2ne/geo-docker",
      },
      {
        name: "Ionic",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ionic/ionic-original.svg",
        link: null,
      },
      {
        name: "Yii",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/yii/yii-original.svg",
        link: "https://github.com/t2ne/yii-mechanic",
      },
      {
        name: "p5.js",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/p5js/p5js-original.svg",
        link: "https://t2ne.github.io/road-surf/",
      },
      {
        name: "After Effects",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/aftereffects/aftereffects-original.svg",
        link: null,
      },
      {
        name: "Illustrator",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/illustrator/illustrator-plain.svg",
        link: "https://github.com/t2ne/conference-poster",
      },
      {
        name: "Photoshop",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/photoshop/photoshop-original.svg",
        link: null,
      },
      {
        name: "Premiere Pro",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/premierepro/premierepro-original.svg",
        link: null,
      },
      {
        name: "Blender",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/blender/blender-original.svg",
        link: "https://github.com/t2ne/3d-portfolio",
      },
      {
        name: "Maya",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/maya/maya-original.svg",
        link: "https://github.com/t2ne/anim-portfolio",
      },
      {
        name: "VS Code",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg",
        link: null,
      },
      {
        name: "Android Studio",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/androidstudio/androidstudio-original.svg",
        link: null,
      },
      {
        name: "Figma",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg",
        link: null,
      },
    ];

    return skills.map(
      (skill) => html`
        <div class="skill-item">
          <img
            src="${skill.logo}"
            alt="${skill.name} logo"
            style="cursor: ${skill.link ? "pointer" : "default"}"
            @click=${skill.link
              ? () => window.open(skill.link, "_blank")
              : null}
          />
          <span class="skill-name">${skill.name}</span>
        </div>
      `
    );
  }

  render() {
    return html`
      <header>
        <nav>
          ${["home", "about", "skills", "contact"].map(
            (section) => html`
              <a
                href="#"
                @click=${() => this.changeSection(section.toLowerCase())}
                >${section}</a
              >
            `
          )}
        </nav>
      </header>
      <div class="content ${this.isTransitioning ? "transitioning" : ""}">
        ${this.renderContent()}
      </div>
      <footer>
        <a
          class="app-icon"
          href="https://github.com/t2ne"
          target="_blank"
          rel="noopener noreferrer"
          ><img
            src="assets/footer/github.avif"
            alt="GitHub"
            width="20"
            height="20"
        /></a>
        <a
          class="app-icon"
          href="https://linkedin.com/in/t2ne/"
          target="_blank"
          rel="noopener noreferrer"
          ><img
            src="assets/footer/linkedin.avif"
            alt="LinkedIn"
            width="20"
            height="20"
        /></a>
        <a
          class="app-icon"
          href="https://linktr.ee/t2ne/"
          target="_blank"
          rel="noopener noreferrer"
          ><img
            src="assets/footer/linktree.avif"
            alt="LinkTree"
            width="20"
            height="20"
        /></a>
        <a
          class="app-icon"
          href="https://open.spotify.com/user/aantryy"
          target="_blank"
          rel="noopener noreferrer"
          ><img
            src="assets/footer/spotify.avif"
            alt="Spotify"
            width="20"
            height="20"
        /></a>
        <a
          class="app-icon"
          href="https://www.chess.com/member/t2ne"
          target="_blank"
          rel="noopener noreferrer"
          ><img
            src="assets/footer/pawn.avif"
            alt="Chess"
            width="20"
            height="20"
        /></a>
        <a
          class="app-icon"
          href="https://youtube.com/@t2ne"
          target="_blank"
          rel="noopener noreferrer"
          ><img
            src="assets/footer/youtube.avif"
            alt="YouTube"
            width="20"
            height="20"
        /></a>
        <a
          class="app-icon"
          href="https://steamcommunity.com/id/t2ne"
          target="_blank"
          rel="noopener noreferrer"
          ><img
            src="assets/footer/steam.avif"
            alt="Steam"
            width="20"
            height="20"
        /></a>
      </footer>
    `;
  }

  static styles = css`
    body,
    .content {
      overflow-x: hidden;
    }

    :host {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      min-height: 100vh;
      width: 100%;
      margin: 0;
      padding: 0;
      overflow-x: hidden;
      background-color: black;
      color: white;
      font-family: "Arial Black", Arial, sans-serif;
    }
    header {
      width: 100%;
      background-color: black;
      padding: 1em;
    }
    nav {
      display: flex;
      justify-content: center;
      gap: 1em;
      flex-wrap: wrap;
      font-family: "Arial Black", Arial, sans-serif;
    }
    nav a {
      color: white;
      text-decoration: none;
      cursor: pointer;
      transition: color 0.2s;
      padding: 0.5em;
    }
    nav a:hover {
      color: #cccccc;
      transform: scale(1.1);
    }
    .content {
      font-size: 2em;
      font-weight: bold;
      text-align: center;
      flex-grow: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: opacity 0.5s ease-in-out;
      padding: 0;
      width: 100%;
      max-width: calc(100% - 15px);
      margin: 0 auto;
      overflow-y: auto;
      margin-left: 0;
      margin-right: 0;
      box-sizing: border-box;
      transform: translateX(-7px);
    }

    @media (max-width: 768px) {
      .content {
        font-size: 1.5em;
        padding: 0.5em;
      }
    }
    @media (max-width: 480px) {
      .content {
        transform: translateX(1px);
      }
    }
    .content.transitioning {
      opacity: 0;
    }
    .cursor {
      display: inline-block;
      width: 3px;
      height: 1em;
      background-color: white;
      margin-left: 2px;
      animation: blink 0.7s infinite;
    }

    .cursor-static {
      animation: none;
    }

    @keyframes blink {
      0% {
        opacity: 0;
      }
      50% {
        opacity: 1;
      }
      100% {
        opacity: 0;
      }
    }
    footer {
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: black;
      padding: 1em;
      width: 100%;
      flex-wrap: wrap;
    }
    .app-icon {
      width: 20px;
      height: 20px;
      margin: 0 10px;
      cursor: pointer;
      transition: transform 0.2s;
    }
    .app-icon img {
      filter: invert(1);
      width: 20px;
      height: 20px;
    }
    .about-content {
      font-size: 1rem;
      max-width: 60%;
      line-height: 1.6;
      text-align: center;
      margin: 5%;
    }
    @media (max-width: 896px) {
      .about-content {
        font-size: 0.9rem;
        max-width: 50%;
        line-height: 1.5;
        margin: 10%;
      }
    }
    @media (max-width: 480px) {
      .about-content {
        font-size: 0.9rem;
        line-height: 1.5;
        max-width: 90%;
        transform: translateX(-3px);
        margin: 10%;
      }
    }
    .about-link {
      display: block;
      font-size: 1rem;
      max-width: 5%;
      line-height: 1.6;
      text-align: center;
      margin: 5% auto;
      margin-top: 2%;
      text-decoration: underline;
      color: inherit;
      cursor: pointer;
    }
    @media (max-width: 896px) {
      .about-link {
        font-size: 1.1rem;
        max-width: 90%;
        line-height: 1.4;
        margin: 3% auto;
        margin-top: 5%;
      }
    }
    @media (max-width: 480px) {
      .about-link {
        font-size: 1.1rem;
        line-height: 1.4;
        max-width: 90%;
        margin-top: 8%;
        transform: translateX(8px);
      }
    }
    .contact-content {
      position: relative;
      font-size: 1.2rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1em;
      cursor: pointer;
    }
    @media (max-width: 480px) {
      .contact-content {
        transform: translateX(3px);
      }
    }
    .copied-bubble {
      position: absolute;
      top: -20px;
      right: -20px;
      font-size: 0.7rem;
      color: white;
      background-color: #141414;
      padding: 2px 6px;
      border-radius: 4px;
      opacity: 0;
      transform: translateY(-5px);
      transition: opacity 0.3s ease, transform 0.3s ease;
      white-space: nowrap;
    }
    .contact-content.active .copied-bubble {
      opacity: 1;
      transform: translateY(0);
    }
    .skills-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
      gap: 1.5em;
      justify-items: center;
      align-items: start;
      width: 100%;
      max-width: 1000px;
      margin: 0 auto;
      padding: 1em;
      justify-content: center;
    }
    .skill-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
    }
    .app-icon:hover {
      transform: scale(1.1);
    }
    .skill-item img {
      width: 40px;
      height: 40px;
      margin-bottom: 0.5em;
    }
    .skill-name {
      font-size: 0.7rem;
    }
    @media (max-width: 50%) {
      .skills-grid {
        grid-template-columns: repeat(auto-fill, minmax(50px, 1fr));
        gap: 0.8em;
        transform: translateX(8px);
      }
      .skill-item img {
        width: 30px;
        height: 30px;
      }
      .skill-name {
        font-size: 0.6rem;
      }
    }
  `;
}

customElements.define("t2ne-element", T2neElement);
