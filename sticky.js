class Sticky {
	constructor(stickyEl, boundaryEl,scroller = window, log = false) {
		let self = this;
		this.stickyEl = stickyEl;
		this.boundaryEl = boundaryEl;
		this.stuckScroll = 0;
		this.elementPos = this.stickyEl.getBoundingClientRect();
		this.boundaryPos = this.boundaryEl.getBoundingClientRect();
		this.elY = this.elementPos.y;
		this.boundY = this.boundaryPos.y + this.boundaryPos.height;
		
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
				self.logStuff();
			}
		});
	}
	makeSticky(docTop) {
		this.elementPos = this.stickyEl.getBoundingClientRect();
		this.boundaryPos = this.boundaryEl.getBoundingClientRect();
		this.elY = this.elementPos.y;
		this.boundY = this.boundaryPos.y + this.boundaryPos.height;
		if ( (this.elY <= this.boundY) && !this.stickyEl.classList.contains('sticky')) {
			this.stickyEl.classList.add('sticky');
			this.ogPos = docTop; /// WTF
		} else if (docTop <= this.ogPos) {
				this.stickyEl.classList.remove('sticky');
		}
	}
	logStuff() {
		console.log(this.stickyEl.classList[0]+': element pos: '+this.elY);
		console.log('this.ogPos: '+this.ogPos);
	}
}
