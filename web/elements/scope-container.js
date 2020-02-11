let template = document.createElement('template');
template.innerHTML = /*html*/`
<style>
	@import url("/styles/active-icons.css");
	:host { text-align: left; }
	::slotted(a) {color:var(--secondary-fn-color)}
	::slotted(a:hover) {background-color: var(--nike-yellow);color:#000;}
</style>
<div>
	<slot name="navMenu" class="nav-menu"></slot>
</div>
`;


class MyItem extends HTMLElement {
    static get is() {
        return 'my-item';
    }
    constructor() {
        super();
        // Attach a shadow root to the element.
        const shadowRoot = this.attachShadow({mode: 'open'});
        shadowRoot.appendChild(template.content.cloneNode(true));
    }


    connectedCallback() {
        this._pageTitle = this.getAttribute('page-title');
    }
    attributeChangedCallback(attrName, oldVal, newVal) {
        if (name === 'page-title') this._pageTitle = newValue
    }

    get pageTitle(){ return this._pageTitle; }
    set pageTitle(val){ this._pageTitle = val; }

}  // END MyItem

customElements.define(MyItem.is, MyItem);
//export default MyItem;
