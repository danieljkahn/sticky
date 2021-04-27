class Sticky {
	constructor(stickyEl, boundaryEl,scroller = window, log = false) {
		let self = this;
		this.stickyEl = stickyEl;
		this.boundaryEl = boundaryEl;
		this.stuckScroll = 0;
		
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

		});
	}
	makeSticky(docTop) {
		let elementPos = this.stickyEl.getBoundingClientRect(),
			boundaryPos = this.boundaryEl.getBoundingClientRect(),
			elY = elementPos.y,
			boundY = boundaryPos.y + boundaryPos.height;
		if ( (elY <= boundY) && !this.stickyEl.classList.contains('sticky')) {
			this.stickyEl.classList.add('sticky');
			this.ogPos = docTop;

		} else if (docTop <= this.ogPos) {
				this.stickyEl.classList.remove('sticky');
		}
		if (this.log) {
			console.log(this.stickyEl.classList[0]+': element pos: '+elY);
			console.log('this.ogPos: '+this.ogPos);
		}
	}
}
