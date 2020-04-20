import './example-button.component';

import { parseFromString } from '../../utils/index';

describe('<example-button>', () => {
    beforeEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    it('should contain an HTMLButtonElement with an innerHTML equal to the value of its exampletext attribute', async () => {
        const el = parseFromString(`
            <example-button exampletext="HEEFT U EEN TAFEL VOOR TWEE PERSONA"></example-button>
        `);

        document.body.appendChild(el);

        let button = el.shadowRoot.querySelector('button');

        expect(button.innerHTML).toEqual('HEEFT U EEN TAFEL VOOR TWEE PERSONA');
        expect(el.getAttribute('exampletext')).toEqual('HEEFT U EEN TAFEL VOOR TWEE PERSONA');
        expect(el.exampletext).toEqual('HEEFT U EEN TAFEL VOOR TWEE PERSONA');

        el.exampletext = 'GEEN IDEE';

        button = el.shadowRoot.querySelector('button');

        expect(button.innerHTML).toEqual('GEEN IDEE');
        expect(el.exampletext).toEqual('GEEN IDEE');
        expect(el.getAttribute('exampletext')).toEqual('GEEN IDEE');
    });
});
