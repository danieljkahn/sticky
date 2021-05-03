class Sticky {
	constructor(stickyEl, boundaryEl,scroller = window, log = false) {
		let self = this;
		this.stickyEl = stickyEl;
		this.stickyHolder = stickyEl.parentNode;
		this.boundaryEl = boundaryEl;
		this.elementPos = this.stickyHolder.getBoundingClientRect();
		this.boundaryPos = this.boundaryEl.getBoundingClientRect();
		this.elY = this.elementPos.y;
		this.boundY = this.boundaryPos.y + this.boundaryPos.height;
		this.ogPos = this.elY - this.boundY;
		
		this.log = log;
		this.scroller = scroller;

		// CLEAN THIS SHIT UP
		let doc = document.documentElement,
		docLeft = (window.pageXOffset || doc.scrollLeft) - (doc.clientLeft || 0),
		docTop = (window.pageYOffset || doc.scrollTop)  - (doc.clientTop || 0);

		if (scroller != window) {
			docTop = scroller.scrollTop;
		}

		this.scroller.addEventListener('scroll', function() {
			if (scroller != window) {
				docTop = scroller.scrollTop;
			} else {
				docLeft = (window.pageXOffset || doc.scrollLeft) - (doc.clientLeft || 0);
				docTop = (window.pageYOffset || doc.scrollTop)  - (doc.clientTop || 0);
			}
			self.makeSticky(docTop);
			if (self.log) {
				self.logStuff(docTop);
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
			// this.ogPos = scrollPos; /// WTF
		} else if (scrollPos <= this.ogPos) {
				this.stickyEl.classList.remove('sticky');
		}
	}
	logStuff(scrollPos) {
		console.log('stickyEl pos: '+this.elY);
		console.log('boundaryEl pos: '+this.boundY);
		console.log('this.ogPos: '+this.ogPos);
		console.log('scrollPos: '+scrollPos);
		console.log(this.stickyContainer);
	}
}
