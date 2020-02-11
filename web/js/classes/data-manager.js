import { DataComms } from "/js/shared/data-comms.js";
import { Collection } from "/js/shared/collection.js";

class DataManager {
    constructor(options) {
        super();
        this.ready = false;

        this._topic = options.topic || '';

        this._data= new Collection();
        this._keyField= 'id';
        this._editMode= true;

        this._rowFields= new Collection();
        if (options.fields) {
            options.fields.forEach(fld => {
                this._rowFields.put(fld.name, fld)
            });
        }

        this._updateQ= new Collection();

        this._comms = new DataComms({topic: this._topic})


        this._changeEvent = new Event("change", {
            bubbles: true,
            cancelable: false,
        });

        const shadowRoot = this.attachShadow({mode: 'open'});
        const template = owner.querySelector('#activation-data-template');
        shadowRoot.appendChild(template.content.cloneNode(true));
    }
    get data() { return this._data.toArray(); }

    get rowFields() { return this._rowFields.toArray(); }

    get keyField() { return this._keyField; }

    get updateQ() { return this._updateQ.toArray(); }
    //set updateQ(val) { this._updateQ = val; }


    refresh(filter){
        this._comms.sendRefreshEvent(filter);
    }

    getItem(id){
        return this._data.get(id);
    }
    _removeItem(id) {
        this._data.remove(id);
    }


    editEvent(id, fld, newV, oldV){
        let evt = {
            id: id, 
            field: fld, 
            newValue: newV, 
            oldValue: oldV
        }
        if (config.verbose) console.log(evt);
        this.processItemEvent(evt)

        this._comms.sendEditEvent(evt)
    }

    commitUpdates() {
        let self = this;

        self._updateQ.iterator((qItem, idx) => {
            let match = true;
            self._rowFields.iterator((fld, idx) => {
                if (qItem.original[fld.name] != qItem.update[fld.name]) { match = false }
            });
            if (match) {
                // Remove from q and clean dirty flag
                let key = `row_${qItem[self._keyField]}`;
                self._updateQ.remove(key)
                // remove dirty flags  self._data.get(id)?
            } else {
                self._comms.sendUpdateEvent(qItem)
            }
        })
    }


    processItemEvent(evt) {
        if (config.verbose) console.log(evt);
        //processItemEvent({id: id, field: fld, newValue: newV, oldValue: oldV})
        let item = this._data.get(evt.id);

        // Prep updated record
        let udPacket = {}
        this._rowFields.iterator((fld, idx) => {
            udPacket[fld.name] = item[fld.name]
        });

        udPacket[evt.field] = evt.newValue;
        let dirty = true;

        // Check Queue
        let key = `row_${evt.id}`,
            qItem = this._updateQ.get(key);

        if (qItem) {
            let match = true;
            this._rowFields.iterator((fld, idx) => {
                if (qItem.original[fld.name] != udPacket[fld.name]) { match = false }
            });
            if (match) {
                dirty = false;
                this._updateQ.remove(key)
            } else {
                qItem.update = udPacket;
            }
        } else {
            let orgD = {}
            this._rowFields.iterator((fld, idx) => {
                orgD[fld.name] = item[fld.name]
            });

            qItem = {original: orgD, update: udPacket }
            this._updateQ[key] = qItem
        }


        // Update list
        item[evt.field] = evt.newValue;
        let dirtyKey = `${evt.field}_dirty`;

        if (this.verbose) console.log(dirtyKey, dirty)
        item[dirtyKey] = dirty;

        this.dispatchEvent(this._changeEvent);
        this.dispatchEvent(new CustomEvent('item.change', { 
            bubbles: true, 
            detail: { itemId: evt.id }
        }))

    }

    prepData(dirtyFlag){
        let self = this;
        self._data.iterator((comp, idx) => {
            comp.editMode = self._editMode;
            if (dirtyFlag) {
                self._rowFields.iterator((fld, idx) => {
                    let key = `${fld.name}_dirty`;
                    comp[key] = false;
                });
            }
        });
    }

    resetRow(item) {
        let row = this._data.get(item[this._keyField])
        this._rowFields.iterator((fld, idx) => {
            if (fld.name != this._keyField) {
                row[fld.name] = item[fld.name]
                let key = `${fld.name}_dirty`;
                row[key] = false;
            }
        });
    }


    deleteItem(id) {
        if (config.verbose) console.log("delete", id)
    }

    addItem(item) {
        if (config.verbose) console.log("add", item)
    }

    hasPendingChanges() {
        return (this._updateQ.size > 0);
    }





    setupListeners() {
        let self = this;

        self.comms.addEventListener('list', e => {
            if(self.verbose) console.log("list event", e.detail.list.length)
            self._data = e.detail.list;
            self.prepData()
            self.dispatchEvent(self._changeEvent);
        });
        self.comms.addEventListener('item', e => {
            self.resetRow(e.detail.item)
            self.dispatchEvent(self._changeEvent);
            self.dispatchEvent(new CustomEvent('item.change', { 
                bubbles: true, 
                detail: { item: e.detail.item[this._keyField] }
            }))
        });
        self.comms.addEventListener('item.edit', e => {
            if(self.verbose) console.log("item.edit event cap", e.detail.evt)

            self.processItemEvent(e.detail.evt);
            self.dispatchEvent(self._changeEvent);
            self.dispatchEvent(new CustomEvent('item.change', { 
                bubbles: true, 
                detail: { itemId: e.detail.evt.id }
            }))
        });
        self.comms.addEventListener('item.updated', e => {
            if(self.verbose) console.log("item.updated", e.detail.item)
            self.resetRow(e.detail.item)
            self.dispatchEvent(self._changeEvent);
            self.dispatchEvent(new CustomEvent('item.change', { 
                bubbles: true, 
                detail: { itemId: e.detail.item[this._keyField] }
            }))
        });

        self.comms.addEventListener('item.add', e => {
            if(self.verbose) console.log("item.add", e.detail.item)
            self._data.push(e.detail.item);
            self.dispatchEvent(self._changeEvent);
            self.dispatchEvent(new CustomEvent('item.add', { 
                bubbles: true, 
                detail: { itemId: e.detail.item[this._keyField] }
            }))
        });
        self.comms.addEventListener('item.delete', e => {
            if(self.verbose) console.log("item.delete", e.detail.itemId)
            // self.resetRow(e.detail.item)
            let row = this._removeItem(e.detail.itemId);
            self.dispatchEvent(self._changeEvent);
            self.dispatchEvent(new CustomEvent('item.delete', { 
                bubbles: true, 
                detail: { itemId: e.detail.itemId }
            }));
        });


        //comms.socketSetup();
        this.ready = true;
    }

}


	class ActivationData extends HTMLElement {
        // CUSTOM METHODS

		// LIFECYCLE EVENTS

		//Invoked each time the custom element is appended into a document-connected element. This will happen each time the node is moved, and may happen before the element's contents have been fully parsed.
		connectedCallback() {
            let self = this;
            if (self.getAttribute('edit-mode')) self._editMode = (self.getAttribute('edit-mode').toLowerCase() === 'true');
            if (self.getAttribute('verbose')) self.verbose = (self.getAttribute('verbose').toLowerCase() === 'true')

            let comms = self.shadowRoot.querySelector("#comms");
            comms.addEventListener('list', e => {
                if(self.verbose) console.log("list event", e.detail.list.length)
                self._data = e.detail.list;
                self.prepData()
                self.dispatchEvent(self._changeEvent);
            });
            comms.addEventListener('item', e => {
                self.resetRow(e.detail.item)
                self.dispatchEvent(self._changeEvent);
                self.dispatchEvent(new CustomEvent('item.change', { 
                    bubbles: true, 
                    detail: { item: e.detail.item[this._keyField] }
                }))
            });
            comms.addEventListener('item.edit', e => {
                if(self.verbose) console.log("item.edit event cap", e.detail.evt)

                self.processItemEvent(e.detail.evt);
                self.dispatchEvent(self._changeEvent);
                self.dispatchEvent(new CustomEvent('item.change', { 
                    bubbles: true, 
                    detail: { itemId: e.detail.evt.id }
                }))
            });
            comms.addEventListener('item.updated', e => {
                if(self.verbose) console.log("item.updated", e.detail.item)
                self.resetRow(e.detail.item)
                self.dispatchEvent(self._changeEvent);
                self.dispatchEvent(new CustomEvent('item.change', { 
                    bubbles: true, 
                    detail: { itemId: e.detail.item[this._keyField] }
                }))
            });

            comms.addEventListener('item.add', e => {
                if(self.verbose) console.log("item.add", e.detail.item)
                self._data.push(e.detail.item);
                self.dispatchEvent(self._changeEvent);
                self.dispatchEvent(new CustomEvent('item.add', { 
                    bubbles: true, 
                    detail: { itemId: e.detail.item[this._keyField] }
                }))
            });
            comms.addEventListener('item.delete', e => {
                if(self.verbose) console.log("item.delete", e.detail.itemId)
                // self.resetRow(e.detail.item)
                let row = this._removeItem(e.detail.itemId);
                self.dispatchEvent(self._changeEvent);
                self.dispatchEvent(new CustomEvent('item.delete', { 
                    bubbles: true, 
                    detail: { itemId: e.detail.itemId }
                }));
            });


            comms.socketSetup();
            this.ready = true;
        }

		//Invoked each time the custom element is disconnected from the document's DOM.
		disconnectedCallback() {
            this._data = [];
        }

		//Invoked each time the custom element is moved to a new document.
		adoptedCallback() {}

		//Invoked each time one of the custom element's attributes is added, removed, or changed. Which attributes to notice change for is specified in a static get observedAttributes method
		attributeChangedCallback(name, oldValue, newValue) {
            if (name === 'edit-mode' && newValue != this._editMode) {
                self._editMode = (newValue.toLowerCase() === 'true');
            }
            if (name === 'verbose') {
                this.verbose = (newValue.toLowerCase() === 'true')
                self.shadowRoot.querySelector("#comms").verbose = this.verbose;
            }
        }

	}
	
