import DM from "/js/dm.js";
//import ElementHlpr from "/js/dm/elementHlpr.js";


let menuItems = [
	{ id:1, title:'About', url:'/about', desc:'About this app and the project.'},
	{ id:2, title:'Scopes', url:'/scopes', desc:'A list of available scopes to work with.'},
]


let manager = {
	dataCol: null,
	render() {
		document.getElementById("cards").innerHTML = "";
		let cnt = DM.Target("#cards");

		this.dataCol.forEach(itm => {
			let link = cnt.append('a')
			.class('card-a', true)
			.attr("href", itm.url);
			
			let crd = link.append('display-card')
			.attr('card-title', itm.title)
			.attr('card-desc', itm.desc);
			// let crd = link.append('div').class('card', true);
			// crd.append('div').class('card-bg',true);
			// crd.append('div').class('card-title',true).text(itm.title);
			// crd.append('div').class('card-desc',true).text(itm.desc);
		});
	},
	prepData(data) {
		let self = this;
		this.dataCol = DM.Collection(data, "id");

		this.dataCol.subscribe('update', (data) => {
			console.log(data)
			self.render();
		})

		return this.dataCol;
	},
	testWatch() {
		let item = this.dataCol.get(1);
		item.title = "TEST!"
	},
}


document.addEventListener('DOMContentLoaded', event => {

	menuItems = manager.prepData(menuItems);

	manager.render();

	//manager.testWatch();
	document.getElementById("btUpdate").addEventListener("click", ev => {
		manager.testWatch();	
	})
})
