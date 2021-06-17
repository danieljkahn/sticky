class Sticky {
	constructor(stickyEl, boundaryEl, activeNav, scroller = window, log = false) {
		var body = document.body,
    		html = document.documentElement;
		var height = Math.max( body.scrollHeight, body.offsetHeight, 
                       html.clientHeight, html.scrollHeight, html.offsetHeight );
		let self = this;
		let doc = document.documentElement,
		docLeft = (window.pageXOffset || doc.scrollLeft) - (doc.clientLeft || 0),
		docTop = (window.pageYOffset || doc.scrollTop)  - (doc.clientTop || 0);
		if (scroller != window) {
			docTop = scroller.scrollTop;
		}

		this.stickyEl = stickyEl;
		this.stickyHolder = stickyEl.parentNode;
		this.boundaryEl = boundaryEl;
		this.elementPos = this.stickyHolder.getBoundingClientRect();
		this.boundaryPos = this.boundaryEl.getBoundingClientRect();
		this.elY = this.elementPos.y;
		this.boundY = this.boundaryPos.y + this.boundaryPos.height;
		this.ogPos = this.elY - this.boundY + docTop;
		
		this.log = log;
		this.scroller = scroller;

		this.pageNavLinks = document.querySelectorAll('.page-nav-link');
		let idLocs = this.getMenuIdLocs(this.stickyEl,height);
		console.log(idLocs);


		this.scroller.addEventListener('scroll', function() {
			if (scroller != window) {
				docTop = scroller.scrollTop;
			} else {
				docLeft = (window.pageXOffset || doc.scrollLeft) - (doc.clientLeft || 0);
				docTop = (window.pageYOffset || doc.scrollTop)  - (doc.clientTop || 0);
			}
			self.makeSticky(docTop);
			console.log(docTop)

			// highlight active nav element on intersect
			if (activeNav) {
				if (docTop < idLocs[0]) {
					self.clearMenuItems();
				} else {
					for (let i = 0; i < idLocs.length; i++) {
						if (docTop >= idLocs[i] && docTop < idLocs[i+1]) {
							self.focusMenuItem(i);
						} else {

						}
					}
				}
			}
		});
	}
	makeSticky(scrollPos) {
		this.elementPos = this.stickyEl.getBoundingClientRect();
		this.boundaryPos = this.boundaryEl.getBoundingClientRect();
		this.elY = this.elementPos.y;
		this.boundY = this.boundaryPos.y + this.boundaryPos.height;
		if ( (this.elY <= this.boundY) && !this.stickyEl.classList.contains('sticky')) {
			this.stickyEl.classList.add('sticky');
		} else if (scrollPos <= this.ogPos) {
			this.stickyEl.classList.remove('sticky');
		}
	}
	getMenuIdLocs(el,doc) {
		let ids = [];
		let links = [];
		let sections = [];
		let idLocs = [];
		this.pageNavLinks.forEach(function(i){
			links.push([i,i.hash]);
			ids.push(i.hash.substr(1));
		});
		document.querySelectorAll('section').forEach(i => sections.push([i,i.id]));
		
		for (let item of sections) {
			if (ids.indexOf(item[1]) > -1) {
				idLocs.push(item[0].getBoundingClientRect().y);
			}
		}
		idLocs.push(doc);
		return idLocs;
	}
	focusMenuItem(i) {
		console.log(i);
		if (!this.pageNavLinks[i].classList.contains('active')) {
			this.clearMenuItems();
			this.pageNavLinks[i].classList.add('active');
		}
	}
	clearMenuItems() {
		this.pageNavLinks.forEach(function(l){l.classList.remove('active')});
	}

	logStuff(scrollPos) {
		console.log('stickyEl pos: '+this.elY);
		console.log('boundaryEl pos: '+this.boundY);
		console.log('this.ogPos: '+this.ogPos);
		console.log('scrollPos: '+scrollPos);
	}
}