'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const parseFromString = (template, type = 'text/html') => {
    return new DOMParser().parseFromString(template, type).body.firstElementChild;
};

function styleInject(css, ref) {
  if ( ref === void 0 ) ref = {};
  var insertAt = ref.insertAt;

  if (!css || typeof document === 'undefined') { return; }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css_248z = ".example-component__button {\n  cursor: pointer;\n  box-shadow: -5px 5px black;\n  -webkit-user-select: none;\n      -ms-user-select: none;\n          user-select: none; }\n\n.example-component__button[type=submit] {\n  background: violet;\n  color: black;\n  text-transform: uppercase; }\n\n.example-component__button:active {\n  box-shadow: 0px 0px;\n  transform: translate(-5px, 5px); }\n";
styleInject(css_248z);

const exampleStyle = (styleOptions = {}) => {
    const DEFAULT_STYLES = {
        backgroundColor: 'aliceblue',
        color: 'black',
        fontFamily: 'inherit',
        fontSize: '1em'
    };
    const VAR_STYLES = {
        border: 'solid black',
        padding: '10px',
    };
    const PROP_STYLES = {
        backgroundColor: styleOptions.backgroundColor || DEFAULT_STYLES.backgroundColor,
        color: styleOptions.color || DEFAULT_STYLES.color,
        fontFamily: styleOptions.fontFamily || DEFAULT_STYLES.fontFamily,
        fontSize: styleOptions.fontSize || DEFAULT_STYLES.fontSize
    };

    return `
${css_248z}
.example-component__button {
    background-color: ${PROP_STYLES.backgroundColor};
    color: ${PROP_STYLES.color};
    font-family: ${PROP_STYLES.fontFamily};
    font-size: ${PROP_STYLES.fontSize};
    border: var(--border, ${VAR_STYLES.border});
    padding: var(--padding, ${VAR_STYLES.padding});
}
`.trim();
};

const fontSizeMap = {
    small: '.66em',
    medium: '1em',
    large: '1.5em'
};

class HTMLExampleButtonElement extends HTMLElement {
    constructor() {
        super();
        this._exampletext = '';
        this._exampletype = 'button';
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
    get examplebuttoncolor() {
        return this._examplebuttoncolor;
    }
    set examplebuttoncolor(val) {
        this._examplebuttoncolor = val;
        this._styleOptions.backgroundColor = val;
        this._syncPropToAttr('examplebuttoncolor');
    }
    get examplefont() {
        return this._examplefont;
    }
    set examplefont(val) {
        this._examplefont = val;
        this._styleOptions.fontFamily = val;
        this._syncPropToAttr('examplefont');
    }
    get examplesize() {
        return this._examplesize;
    }
    set examplesize(val) {
        this._examplesize = val;
        this._styleOptions.fontSize = fontSizeMap[val];
        this._syncPropToAttr('examplesize');
    }
    get exampletext() {
        return this._exampletext;
    }
    set exampletext(val) {
        this._exampletext = val;
        this._syncPropToAttr('exampletext');
    }
    get exampletextcolor() {
        return this._exampletextcolor;
    }
    set exampletextcolor(val) {
        this._exampletextcolor = val;
        this._styleOptions.color = val;
        this._syncPropToAttr('exampletextcolor');
    }
    get exampletype() {
        return this._exampletype;
    }
    set exampletype(val) {
        this._exampletype = val;
        this._syncPropToAttr('exampletype');
    }
    connectedCallback() {
        this._render();
    }
    disconnectedCallback() {
        // ...
    }
    attributeChangedCallback(attr, oldVal, newVal) {
        if (this[attr] === newVal || oldVal === newVal) {
            return;
        }
        this[attr] = newVal;
    }
    _getTemplate() {
        const template = parseFromString(`
            <button class="example-component__button" type="${this._exampletype}">${this._exampletext}</button>
        `);
        return template;
    }
    _render() {
        this._updateStyle();
        if (this._template) {
            this.shadowRoot.replaceChild(this._getTemplate(), this.shadowRoot.children[1]);
            return;
        }
        this._template = this._getTemplate();
        this.shadowRoot.appendChild(this._template);
    }
    _setup() {
        const style = document.createElement('style');
        this.shadowRoot.appendChild(style);
        this._styleOptions = {
            backgroundColor: this.getAttribute('examplebuttoncolor'),
            color: this.getAttribute('exampletextcolor'),
            fontFamily: this.getAttribute('examplefont'),
            fontSize: fontSizeMap[this.getAttribute('examplesize')] || fontSizeMap.medium
        };
    }
    _syncPropToAttr(prop) {
        if (this[prop] === null) {
            this.removeAttribute(prop);
        }
        else {
            this.setAttribute(prop, this[prop]);
        }
        this._render();
    }
    _updateStyle() {
        if (this._style === exampleStyle(this._styleOptions)) {
            return;
        }
        this._style = exampleStyle(this._styleOptions);
        this.shadowRoot.querySelector('style').innerHTML = this._style;
    }
}
var exampleButton_component = (function () {
    const TAG = 'example-button';
    customElements.define(TAG, HTMLExampleButtonElement);
})();

exports.HTMLExampleButtonElement = exampleButton_component;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2ViLWNvbXBvbmVudHMtZXhhbXBsZS5janMuanMiLCJzb3VyY2VzIjpbIi4uL3NyYy91dGlscy9wYXJzZS1mcm9tLXN0cmluZy9wYXJzZS1mcm9tLXN0cmluZy51dGlsLmpzIiwiLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWluamVjdC9kaXN0L3N0eWxlLWluamVjdC5lcy5qcyIsIi4uL3NyYy93ZWItY29tcG9uZW50cy9leGFtcGxlLWJ1dHRvbi9leGFtcGxlLWJ1dHRvbi5keW5hbWljLXN0eWxlLmpzIiwiLi4vc3JjL3dlYi1jb21wb25lbnRzL2V4YW1wbGUtYnV0dG9uL2V4YW1wbGUtYnV0dG9uLmNvbmZpZy50cyIsIi4uL3NyYy93ZWItY29tcG9uZW50cy9leGFtcGxlLWJ1dHRvbi9leGFtcGxlLWJ1dHRvbi5jb21wb25lbnQudHMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNvbnN0IHBhcnNlRnJvbVN0cmluZyA9ICh0ZW1wbGF0ZSwgdHlwZSA9ICd0ZXh0L2h0bWwnKSA9PiB7XG4gICAgcmV0dXJuIG5ldyBET01QYXJzZXIoKS5wYXJzZUZyb21TdHJpbmcodGVtcGxhdGUsIHR5cGUpLmJvZHkuZmlyc3RFbGVtZW50Q2hpbGQ7XG59O1xuIiwiZnVuY3Rpb24gc3R5bGVJbmplY3QoY3NzLCByZWYpIHtcbiAgaWYgKCByZWYgPT09IHZvaWQgMCApIHJlZiA9IHt9O1xuICB2YXIgaW5zZXJ0QXQgPSByZWYuaW5zZXJ0QXQ7XG5cbiAgaWYgKCFjc3MgfHwgdHlwZW9mIGRvY3VtZW50ID09PSAndW5kZWZpbmVkJykgeyByZXR1cm47IH1cblxuICB2YXIgaGVhZCA9IGRvY3VtZW50LmhlYWQgfHwgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2hlYWQnKVswXTtcbiAgdmFyIHN0eWxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3R5bGUnKTtcbiAgc3R5bGUudHlwZSA9ICd0ZXh0L2Nzcyc7XG5cbiAgaWYgKGluc2VydEF0ID09PSAndG9wJykge1xuICAgIGlmIChoZWFkLmZpcnN0Q2hpbGQpIHtcbiAgICAgIGhlYWQuaW5zZXJ0QmVmb3JlKHN0eWxlLCBoZWFkLmZpcnN0Q2hpbGQpO1xuICAgIH0gZWxzZSB7XG4gICAgICBoZWFkLmFwcGVuZENoaWxkKHN0eWxlKTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgaGVhZC5hcHBlbmRDaGlsZChzdHlsZSk7XG4gIH1cblxuICBpZiAoc3R5bGUuc3R5bGVTaGVldCkge1xuICAgIHN0eWxlLnN0eWxlU2hlZXQuY3NzVGV4dCA9IGNzcztcbiAgfSBlbHNlIHtcbiAgICBzdHlsZS5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBzdHlsZUluamVjdDtcbiIsImltcG9ydCBzdHlsZSBmcm9tICcuL2V4YW1wbGUtYnV0dG9uLnN0YXRpYy1zdHlsZS5zY3NzJztcblxuZXhwb3J0IGNvbnN0IGV4YW1wbGVTdHlsZSA9IChzdHlsZU9wdGlvbnMgPSB7fSkgPT4ge1xuICAgIGNvbnN0IERFRkFVTFRfU1RZTEVTID0ge1xuICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6ICdhbGljZWJsdWUnLFxuICAgICAgICBjb2xvcjogJ2JsYWNrJyxcbiAgICAgICAgZm9udEZhbWlseTogJ2luaGVyaXQnLFxuICAgICAgICBmb250U2l6ZTogJzFlbSdcbiAgICB9O1xuICAgIGNvbnN0IFZBUl9TVFlMRVMgPSB7XG4gICAgICAgIGJvcmRlcjogJ3NvbGlkIGJsYWNrJyxcbiAgICAgICAgcGFkZGluZzogJzEwcHgnLFxuICAgIH07XG4gICAgY29uc3QgUFJPUF9TVFlMRVMgPSB7XG4gICAgICAgIGJhY2tncm91bmRDb2xvcjogc3R5bGVPcHRpb25zLmJhY2tncm91bmRDb2xvciB8fCBERUZBVUxUX1NUWUxFUy5iYWNrZ3JvdW5kQ29sb3IsXG4gICAgICAgIGNvbG9yOiBzdHlsZU9wdGlvbnMuY29sb3IgfHwgREVGQVVMVF9TVFlMRVMuY29sb3IsXG4gICAgICAgIGZvbnRGYW1pbHk6IHN0eWxlT3B0aW9ucy5mb250RmFtaWx5IHx8IERFRkFVTFRfU1RZTEVTLmZvbnRGYW1pbHksXG4gICAgICAgIGZvbnRTaXplOiBzdHlsZU9wdGlvbnMuZm9udFNpemUgfHwgREVGQVVMVF9TVFlMRVMuZm9udFNpemVcbiAgICB9O1xuXG4gICAgcmV0dXJuIGBcbiR7c3R5bGV9XG4uZXhhbXBsZS1jb21wb25lbnRfX2J1dHRvbiB7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogJHtQUk9QX1NUWUxFUy5iYWNrZ3JvdW5kQ29sb3J9O1xuICAgIGNvbG9yOiAke1BST1BfU1RZTEVTLmNvbG9yfTtcbiAgICBmb250LWZhbWlseTogJHtQUk9QX1NUWUxFUy5mb250RmFtaWx5fTtcbiAgICBmb250LXNpemU6ICR7UFJPUF9TVFlMRVMuZm9udFNpemV9O1xuICAgIGJvcmRlcjogdmFyKC0tYm9yZGVyLCAke1ZBUl9TVFlMRVMuYm9yZGVyfSk7XG4gICAgcGFkZGluZzogdmFyKC0tcGFkZGluZywgJHtWQVJfU1RZTEVTLnBhZGRpbmd9KTtcbn1cbmAudHJpbSgpO1xufTtcbiIsImV4cG9ydCBjb25zdCBmb250U2l6ZU1hcCA9IHtcbiAgICBzbWFsbDogJy42NmVtJyxcbiAgICBtZWRpdW06ICcxZW0nLFxuICAgIGxhcmdlOiAnMS41ZW0nXG59O1xuIiwiaW1wb3J0IHsgcGFyc2VGcm9tU3RyaW5nIH0gZnJvbSAnLi4vLi4vdXRpbHMvaW5kZXgnO1xuaW1wb3J0IHsgZXhhbXBsZVN0eWxlIH0gZnJvbSAnLi9leGFtcGxlLWJ1dHRvbi5keW5hbWljLXN0eWxlJztcbmltcG9ydCB7IGZvbnRTaXplTWFwIH0gZnJvbSAnLi9leGFtcGxlLWJ1dHRvbi5jb25maWcnO1xuXG5jbGFzcyBIVE1MRXhhbXBsZUJ1dHRvbkVsZW1lbnQgZXh0ZW5kcyBIVE1MRWxlbWVudCB7XG4gICAgcHJpdmF0ZSBfZXhhbXBsZWJ1dHRvbmNvbG9yOiBzdHJpbmc7XG4gICAgcHJpdmF0ZSBfZXhhbXBsZWZvbnQ6IHN0cmluZztcbiAgICBwcml2YXRlIF9leGFtcGxlc2l6ZTogc3RyaW5nO1xuICAgIHByaXZhdGUgX2V4YW1wbGV0ZXh0ID0gJyc7XG4gICAgcHJpdmF0ZSBfZXhhbXBsZXRleHRjb2xvcjogc3RyaW5nO1xuICAgIHByaXZhdGUgX2V4YW1wbGV0eXBlID0gJ2J1dHRvbic7XG4gICAgcHJpdmF0ZSBfc3R5bGU6IHN0cmluZztcbiAgICBwcml2YXRlIF9zdHlsZU9wdGlvbnM6IFN0eWxlT3B0aW9ucztcbiAgICBwcml2YXRlIF90ZW1wbGF0ZTogSFRNTEVsZW1lbnQ7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoKTtcblxuICAgICAgICB0aGlzLmF0dGFjaFNoYWRvdyh7XG4gICAgICAgICAgICBtb2RlOiAnb3BlbidcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5fc2V0dXAoKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgZ2V0IG9ic2VydmVkQXR0cmlidXRlcygpIHtcbiAgICAgICAgcmV0dXJuIFtcbiAgICAgICAgICAgICdleGFtcGxlYnV0dG9uY29sb3InLFxuICAgICAgICAgICAgJ2V4YW1wbGVmb250JyxcbiAgICAgICAgICAgICdleGFtcGxlc2l6ZScsXG4gICAgICAgICAgICAnZXhhbXBsZXRleHQnLFxuICAgICAgICAgICAgJ2V4YW1wbGV0ZXh0Y29sb3InLFxuICAgICAgICAgICAgJ2V4YW1wbGV0eXBlJ1xuICAgICAgICBdO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXQgZXhhbXBsZWJ1dHRvbmNvbG9yKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLl9leGFtcGxlYnV0dG9uY29sb3I7XG4gICAgfVxuXG4gICAgcHVibGljIHNldCBleGFtcGxlYnV0dG9uY29sb3IodmFsOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5fZXhhbXBsZWJ1dHRvbmNvbG9yID0gdmFsO1xuICAgICAgICB0aGlzLl9zdHlsZU9wdGlvbnMuYmFja2dyb3VuZENvbG9yID0gdmFsO1xuICAgICAgICB0aGlzLl9zeW5jUHJvcFRvQXR0cignZXhhbXBsZWJ1dHRvbmNvbG9yJyk7XG4gICAgfVxuXG4gICAgcHVibGljIGdldCBleGFtcGxlZm9udCgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5fZXhhbXBsZWZvbnQ7XG4gICAgfVxuXG4gICAgcHVibGljIHNldCBleGFtcGxlZm9udCh2YWw6IHN0cmluZykge1xuICAgICAgICB0aGlzLl9leGFtcGxlZm9udCA9IHZhbDtcbiAgICAgICAgdGhpcy5fc3R5bGVPcHRpb25zLmZvbnRGYW1pbHkgPSB2YWw7XG4gICAgICAgIHRoaXMuX3N5bmNQcm9wVG9BdHRyKCdleGFtcGxlZm9udCcpO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXQgZXhhbXBsZXNpemUoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2V4YW1wbGVzaXplO1xuICAgIH1cblxuICAgIHB1YmxpYyBzZXQgZXhhbXBsZXNpemUodmFsOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5fZXhhbXBsZXNpemUgPSB2YWw7XG4gICAgICAgIHRoaXMuX3N0eWxlT3B0aW9ucy5mb250U2l6ZSA9IGZvbnRTaXplTWFwW3ZhbF07XG4gICAgICAgIHRoaXMuX3N5bmNQcm9wVG9BdHRyKCdleGFtcGxlc2l6ZScpO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXQgZXhhbXBsZXRleHQoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2V4YW1wbGV0ZXh0O1xuICAgIH1cblxuICAgIHB1YmxpYyBzZXQgZXhhbXBsZXRleHQodmFsOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5fZXhhbXBsZXRleHQgPSB2YWw7XG4gICAgICAgIHRoaXMuX3N5bmNQcm9wVG9BdHRyKCdleGFtcGxldGV4dCcpO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXQgZXhhbXBsZXRleHRjb2xvcigpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5fZXhhbXBsZXRleHRjb2xvcjtcbiAgICB9XG5cbiAgICBwdWJsaWMgc2V0IGV4YW1wbGV0ZXh0Y29sb3IodmFsOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5fZXhhbXBsZXRleHRjb2xvciA9IHZhbDtcbiAgICAgICAgdGhpcy5fc3R5bGVPcHRpb25zLmNvbG9yID0gdmFsO1xuICAgICAgICB0aGlzLl9zeW5jUHJvcFRvQXR0cignZXhhbXBsZXRleHRjb2xvcicpO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXQgZXhhbXBsZXR5cGUoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2V4YW1wbGV0eXBlO1xuICAgIH1cblxuICAgIHB1YmxpYyBzZXQgZXhhbXBsZXR5cGUodmFsOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5fZXhhbXBsZXR5cGUgPSB2YWw7XG4gICAgICAgIHRoaXMuX3N5bmNQcm9wVG9BdHRyKCdleGFtcGxldHlwZScpO1xuICAgIH1cblxuICAgIGNvbm5lY3RlZENhbGxiYWNrKCkge1xuICAgICAgICB0aGlzLl9yZW5kZXIoKTtcbiAgICB9XG5cbiAgICBkaXNjb25uZWN0ZWRDYWxsYmFjaygpIHtcbiAgICAgICAgLy8gLi4uXG4gICAgfVxuXG4gICAgYXR0cmlidXRlQ2hhbmdlZENhbGxiYWNrKGF0dHI6IHN0cmluZywgb2xkVmFsOiBzdHJpbmcgfCBudWxsLCBuZXdWYWw6IHN0cmluZyB8IG51bGwpIHtcbiAgICAgICAgaWYgKHRoaXNbYXR0cl0gPT09IG5ld1ZhbCB8fCBvbGRWYWwgPT09IG5ld1ZhbCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpc1thdHRyXSA9IG5ld1ZhbDtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9nZXRUZW1wbGF0ZSgpOiBIVE1MQnV0dG9uRWxlbWVudCB7XG4gICAgICAgIGNvbnN0IHRlbXBsYXRlID0gcGFyc2VGcm9tU3RyaW5nKGBcbiAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJleGFtcGxlLWNvbXBvbmVudF9fYnV0dG9uXCIgdHlwZT1cIiR7dGhpcy5fZXhhbXBsZXR5cGV9XCI+JHt0aGlzLl9leGFtcGxldGV4dH08L2J1dHRvbj5cbiAgICAgICAgYCk7XG5cbiAgICAgICAgcmV0dXJuIHRlbXBsYXRlO1xuICAgIH1cblxuICAgIHByaXZhdGUgX3JlbmRlcigpIHtcbiAgICAgICAgdGhpcy5fdXBkYXRlU3R5bGUoKTtcblxuICAgICAgICBpZiAodGhpcy5fdGVtcGxhdGUpIHtcbiAgICAgICAgICAgIHRoaXMuc2hhZG93Um9vdC5yZXBsYWNlQ2hpbGQodGhpcy5fZ2V0VGVtcGxhdGUoKSwgdGhpcy5zaGFkb3dSb290LmNoaWxkcmVuWzFdKTtcblxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fdGVtcGxhdGUgPSB0aGlzLl9nZXRUZW1wbGF0ZSgpO1xuICAgICAgICB0aGlzLnNoYWRvd1Jvb3QuYXBwZW5kQ2hpbGQodGhpcy5fdGVtcGxhdGUpO1xuICAgIH1cblxuICAgIHByaXZhdGUgX3NldHVwKCkge1xuICAgICAgICBjb25zdCBzdHlsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJyk7XG4gICAgICAgIHRoaXMuc2hhZG93Um9vdC5hcHBlbmRDaGlsZChzdHlsZSk7XG5cbiAgICAgICAgdGhpcy5fc3R5bGVPcHRpb25zID0ge1xuICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiB0aGlzLmdldEF0dHJpYnV0ZSgnZXhhbXBsZWJ1dHRvbmNvbG9yJyksXG4gICAgICAgICAgICBjb2xvcjogdGhpcy5nZXRBdHRyaWJ1dGUoJ2V4YW1wbGV0ZXh0Y29sb3InKSxcbiAgICAgICAgICAgIGZvbnRGYW1pbHk6IHRoaXMuZ2V0QXR0cmlidXRlKCdleGFtcGxlZm9udCcpLFxuICAgICAgICAgICAgZm9udFNpemU6IGZvbnRTaXplTWFwW3RoaXMuZ2V0QXR0cmlidXRlKCdleGFtcGxlc2l6ZScpXSB8fCBmb250U2l6ZU1hcC5tZWRpdW1cbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9zeW5jUHJvcFRvQXR0cihwcm9wOiBzdHJpbmcpIHtcbiAgICAgICAgaWYgKHRoaXNbcHJvcF0gPT09IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlQXR0cmlidXRlKHByb3ApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5zZXRBdHRyaWJ1dGUocHJvcCwgdGhpc1twcm9wXSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9yZW5kZXIoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF91cGRhdGVTdHlsZSgpIHtcbiAgICAgICAgaWYgKHRoaXMuX3N0eWxlID09PSBleGFtcGxlU3R5bGUodGhpcy5fc3R5bGVPcHRpb25zKSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fc3R5bGUgPSBleGFtcGxlU3R5bGUodGhpcy5fc3R5bGVPcHRpb25zKTtcbiAgICAgICAgdGhpcy5zaGFkb3dSb290LnF1ZXJ5U2VsZWN0b3IoJ3N0eWxlJykuaW5uZXJIVE1MID0gdGhpcy5fc3R5bGU7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCAoZnVuY3Rpb24gKCkge1xuICAgIGNvbnN0IFRBRyA9ICdleGFtcGxlLWJ1dHRvbic7XG4gICAgY3VzdG9tRWxlbWVudHMuZGVmaW5lKFRBRywgSFRNTEV4YW1wbGVCdXR0b25FbGVtZW50KTtcbn0pKCk7XG4iXSwibmFtZXMiOlsic3R5bGUiXSwibWFwcGluZ3MiOiI7Ozs7QUFBTyxNQUFNLGVBQWUsR0FBRyxDQUFDLFFBQVEsRUFBRSxJQUFJLEdBQUcsV0FBVyxLQUFLO0FBQ2pFLElBQUksT0FBTyxJQUFJLFNBQVMsRUFBRSxDQUFDLGVBQWUsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDO0FBQ2xGLENBQUM7O0FDRkQsU0FBUyxXQUFXLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRTtBQUMvQixFQUFFLEtBQUssR0FBRyxL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