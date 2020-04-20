import { parseFromString } from '../../utils/index';
import { exampleStyle } from './example-button.dynamic-style';
import { fontSizeMap } from './example-button.config';

class HTMLExampleButtonElement extends HTMLElement {
    private _examplebuttoncolor: string;
    private _examplefont: string;
    private _examplesize: string;
    private _exampletext = '';
    private _exampletextcolor: string;
    private _exampletype = 'button';
    private _style: string;
    private _styleOptions: StyleOptions;
    private _template: HTMLElement;

    constructor() {
        super();

        this.attachShadow({
            mode: 'open'
        });

        this._setup();
    }

    static get observedAttributes() {
        return [
            'examplebuttoncolor',
            'examplefont',
            'examplesize',
            'exampletext',
            'exampletextcolor',
            'exampletype'
        ];
    }

    public get examplebuttoncolor(): string {
        return this._examplebuttoncolor;
    }

    public set examplebuttoncolor(val: string) {
        this._examplebuttoncolor = val;
        this._styleOptions.backgroundColor = val;
        this._syncPropToAttr('examplebuttoncolor');
    }

    public get examplefont(): string {
        return this._examplefont;
    }

    public set examplefont(val: string) {
        this._examplefont = val;
        this._styleOptions.fontFamily = val;
        this._syncPropToAttr('examplefont');
    }

    public get examplesize(): string {
        return this._examplesize;
    }

    public set examplesize(val: string) {
        this._examplesize = val;
        this._styleOptions.fontSize = fontSizeMap[val];
        this._syncPropToAttr('examplesize');
    }

    public get exampletext(): string {
        return this._exampletext;
    }

    public set exampletext(val: string) {
        this._exampletext = val;
        this._syncPropToAttr('exampletext');
    }

    public get exampletextcolor(): string {
        return this._exampletextcolor;
    }

    public set exampletextcolor(val: string) {
        this._exampletextcolor = val;
        this._styleOptions.color = val;
        this._syncPropToAttr('exampletextcolor');
    }

    public get exampletype(): string {
        return this._exampletype;
    }

    public set exampletype(val: string) {
        this._exampletype = val;
        this._syncPropToAttr('exampletype');
    }

    connectedCallback() {
        this._render();
    }

    disconnectedCallback() {
        // ...
    }

    attributeChangedCallback(attr: string, oldVal: string | null, newVal: string | null) {
        if (this[attr] === newVal || oldVal === newVal) {
            return;
        }

        this[attr] = newVal;
    }

    private _getTemplate(): HTMLButtonElement {
        const template = parseFromString(`
            <button class="example-component__button" type="${this._exampletype}">${this._exampletext}</button>
        `);

        return template;
    }

    private _render() {
        this._updateStyle();

        if (this._template) {
            this.shadowRoot.replaceChild(this._getTemplate(), this.shadowRoot.children[1]);

            return;
        }

        this._template = this._getTemplate();
        this.shadowRoot.appendChild(this._template);
    }

    private _setup() {
        const style = document.createElement('style');
        this.shadowRoot.appendChild(style);

        this._styleOptions = {
            backgroundColor: this.getAttribute('examplebuttoncolor'),
            color: this.getAttribute('exampletextcolor'),
            fontFamily: this.getAttribute('examplefont'),
            fontSize: fontSizeMap[this.getAttribute('examplesize')] || fontSizeMap.medium
        };
    }

    private _syncPropToAttr(prop: string) {
        if (this[prop] === null) {
            this.removeAttribute(prop);
        } else {
            this.setAttribute(prop, this[prop]);
        }

        this._render();
    }

    private _updateStyle() {
        if (this._style === exampleStyle(this._styleOptions)) {
            return;
        }

        this._style = exampleStyle(this._styleOptions);
        this.shadowRoot.querySelector('style').innerHTML = this._style;
    }
}

export default (function () {
    const TAG = 'example-button';
    customElements.define(TAG, HTMLExampleButtonElement);
})();
