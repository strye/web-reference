import config from '/js/config.js';
    
let template = document.createElement('template');
template.innerHTML = /*html*/`
	<style>
        .icon {display:block; 
            height:24px; 
            width:24px;
            background-size: 24px;
            float:left;
            margin: 3px 4px; 
            cursor: pointer; 
        }
        .icon-sm {height:16px;width:16px;background-size: 16px;}
        .icon-lg {height:32px;width:32px;background-size: 32px;}

        .icon-add { background-image:url('/assets/add.png');}
        .icon-save { background-image:url('/assets/diskette.png');}
        .icon-refresh { background-image:url('/assets/update.png');}
        .icon-delete { background-image:url('/assets/delete.png');}
        .icon-cancel { background-image:url('/assets/cancel.png');}

        .icon-dis { filter: grayscale(100%);}
        /*.icon-click { animation: button-pulse 1s 1; }*/
        .icon-active {}

        .hidden {display: none;}

        .icon-active:active {
            transform: scale(0.7);
        }

	</style>
	<div>
        <span id="bt_add" class="icon icon-add icon-sm" title="Add New"></span>
        <span id="bt_cancel" class="icon icon-cancel" title="Cancel/Revert"></span>
        <span id="bt_delete" class="icon icon-delete" title="Delete"></span>
        <span id="bt_save" class="icon icon-save" title="Save"></span>
        <span id="bt_refresh" class="icon icon-refresh icon-lg" title="Refresh"></span>
	</div>
`;

class EditButtons extends HTMLElement {
    static get is() { return 'edit-buttons'; }
    constructor(options) {
        super();

        this._iconSize='medium';

        // Button states are -- 0: hidden, 1:enabled, 2:disabled
        this._addBtn=2;
        this._saveBtn=2;
        this._deleteBtn=2;
        this._refreshBtn=2;
        this._cancelBtn=2;

        // Attach a shadow root to the element.
        const shadowRoot = this.attachShadow({mode: 'open'});
        shadowRoot.appendChild(template.content.cloneNode(true));
    }
    get add() {return this._addBtn;}
    set add(val) {this._addBtn = val; this.render();}

    get save() {return this._saveBtn;}
    set save(val) {this._saveBtn = val; this.render();}

    get delete() {return this._deleteBtn;}
    set delete(val) {this._deleteBtn = val; this.render();}

    get refresh() {return this._refreshBtn;}
    set refresh(val) {this._refreshBtn = val; this.render();}

    get cancel() {return this._cancelBtn;}
    set cancel(val) {this._cancelBtn = val; this.render();}

    render() {

        this.renderButton('add')
        this.renderButton('cancel')
        this.renderButton('save')
        this.renderButton('refresh')
        this.renderButton('delete')
    }

    renderButton(name) {
        let iconSz = this._iconSize.toLocaleLowerCase(),
            sm = (iconSz === 'small' || iconSz === 'sm'),
            lg = (iconSz === 'large' || iconSz === 'lg'),
            btnElm = this.shadowRoot.querySelector(`#bt_${name}`),
            btnVar = this[`_${name}Btn`];
            
        btnElm.classList.toggle("icon-dis", (btnVar !== 1))
        btnElm.classList.toggle("icon-active", (btnVar === 1))
        
        btnElm.classList.toggle("hidden", (btnVar === 0))
        btnElm.classList.toggle("icon-sm", sm)
        btnElm.classList.toggle("icon-lg", lg)

    }


    processClick(eventName) {
        //let btnElm = this.shadowRoot.querySelector(`#bt_${eventName}`);
        
        if(this[`_${eventName}Btn`] === 1) {
            this.dispatchEvent(new Event(eventName, { bubbles: true,  cancelable: false }));
            //btnElm.classList.toggle("icon-click", true)
            //setTimeout(() => { btnElm.classList.toggle("icon-click", false); }, 1000);
        }
    }

    connectedCallback() {
        let self = this;

        if (this.getAttribute('icon-size')) this._iconSize = this.getAttribute('icon-size');

        if (this.getAttribute('add')) this._addBtn = parseInt(this.getAttribute('add'));
        if (this.getAttribute('save')) this._saveBtn = parseInt(this.getAttribute('save'));
        if (this.getAttribute('delete')) this._deleteBtn = parseInt(this.getAttribute('delete'));
        if (this.getAttribute('refresh')) this._refreshBtn = parseInt(this.getAttribute('refresh'));
        if (this.getAttribute('cancel')) this._cancelBtn = parseInt(this.getAttribute('cancel'));

        this.shadowRoot.querySelector("#bt_add").addEventListener('click', e => { 
            self.processClick('add');
        });
        this.shadowRoot.querySelector("#bt_refresh").addEventListener('click', e => { 
            self.processClick('refresh');
        });
        this.shadowRoot.querySelector("#bt_save").addEventListener('click', e => { 
            if(self._saveBtn === 1) self.dispatchEvent(new Event("save", { bubbles: true,  cancelable: false }));
        });
        this.shadowRoot.querySelector("#bt_delete").addEventListener('click', e => { 
            if(self._deleteBtn === 1) self.dispatchEvent(new Event("delete", { bubbles: true,  cancelable: false }));
        });
        this.shadowRoot.querySelector("#bt_cancel").addEventListener('click', e => { 
            if(self._cancelBtn === 1) self.dispatchEvent(new Event("cancel", { bubbles: true,  cancelable: false }));
        });

        this.render()
    }
    attributeChangedCallback(name, oldValue, newValue) {
        switch (name.toLowerCase()) {
            case 'icon-size': this._iconSize = newValue; break;
            case 'add': this._addBtn = parseInt(newValue); break;
            case 'save': this._saveBtn = parseInt(newValue); break;
            case 'delete': this._deleteBtn = parseInt(newValue); break;
            case 'refresh': this._refreshBtn = parseInt(newValue); break;
            case 'cancel': this._cancelBtn = parseInt(newValue); break;
        }
        this.render()
    }


}  // END EditButtons

customElements.define(EditButtons.is, EditButtons);
    
export default EditButtons;    