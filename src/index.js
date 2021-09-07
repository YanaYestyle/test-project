import "./styles/reset.css";
import "./styles/style.css";



//For time and date
const timeAndDate = setInterval(function() {
    const date = new Date();
    if((date.getMonth() + 1) < 10 ) {
        document.getElementById("date").innerHTML = (date.getFullYear() + "-" + '0' +  (date.getMonth() + 1) + "-" + date.getDate());
    }

    if(date.getDate() < 10) {
        document.getElementById("date").innerHTML = (date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + "0" + date.getDate());
    }

    if((date.getMonth() + 1) < 10 && date.getDate() < 10) {
        document.getElementById("date").innerHTML = (date.getFullYear() + "-" + '0' +  (date.getMonth() + 1) + "-" + "0" + date.getDate());
    }

    if((date.getMonth() + 1) > 10 && date.getDate() > 10) {
        document.getElementById("date").innerHTML = (date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate());
    }

    if(date.getHours() < 10 ) {
        document.getElementById("time").innerHTML = ("0" + date.getHours() + ":" + date.getMinutes());
    }

    if(date.getMinutes() < 10) {
        document.getElementById("time").innerHTML = (date.getHours() + ":" + "0" + date.getMinutes());
    }

    if(date.getHours() < 10 && date.getMinutes() < 10) {
        document.getElementById("time").innerHTML = ("0" + date.getHours() + ":" + "0" + date.getMinutes());
    }

    if(date.getHours() > 10 && date.getMinutes() > 10) {
        document.getElementById("time").innerHTML = (date.getHours() + ":" + date.getMinutes());
    }
}, 1000);


//for more text
const buttonMore = document.getElementById("btn1");
const modalSize = document.getElementById("changeBox");
const box = document.getElementById("box");
const modal = document.getElementById("modalTop");
buttonMore.onclick = function() {
    
    if(modal.classList.contains("changeTop") && modalSize.classList.contains("changeMain") && box.classList.contains("open")) {
        modalSize.classList.remove("changeMain");
        box.classList.remove("open");
        modal.classList.remove("changeTop");
    } else {
        modal.classList.add("changeTop");
        modalSize.classList.add("changeMain");
        box.classList.add("open");
    }
}


//for close the text before modal2
const buttonTwo = document.getElementById("btn2");
buttonTwo.onclick = function() {
    
    if(modal.classList.contains("changeTop") && modalSize.classList.contains("changeMain") && box.classList.contains("open")) {
        modalSize.classList.remove("changeMain");
        box.classList.remove("open");
        modal.classList.remove("changeTop");
    }
}


//for photos
window.onload = function fetchPhotos() {
    const http = new XMLHttpRequest();
    const urlMain = "https://picsum.photos/v2/list?limit=10";
    http.open("GET", urlMain);
    http.send();
    http.onload = function() {
        const object = http.response;
        const json = JSON.parse(object);
        const allSelectors = document.querySelectorAll('img.slider');
		const authorAll = document.querySelectorAll('div.author');
		const divAll = document.querySelectorAll('div.sim-slider-element');
		var img1;
		var authorText;
		var idApi;
		for(var j=0; j<json.length; j++) {
            img1 = json[j].download_url;
			authorText = json[j].author;
			idApi = json[j].id;

			for(let k=0; k<authorAll.length; k++){
			    if(divAll[k].id == idApi){
			    document.getElementById(authorAll[k].id).innerHTML = authorText;
				}
			}
			
			for(let i=0; i<allSelectors.length; i++){
			    if(divAll[i].id == idApi){
				    document.getElementById(allSelectors[j].id).setAttribute('src', img1);
			    } 
            }
        }
    }
};



//for slider
function Sim(sldrId) {
	let id = document.getElementById(sldrId);
	if(id) {
		this.sldrRoot = id
	}
	else {
		this.sldrRoot = document.querySelector('.sim-slider')
	};

	// Carousel objects
	this.sldrList = this.sldrRoot.querySelector('.sim-slider-list');
	this.sldrElements = this.sldrList.querySelectorAll('.sim-slider-element');
	this.sldrElemFirst = this.sldrList.querySelector('.sim-slider-element');
	this.leftArrow = document.getElementById('leftBtn');//this.sldrRoot.querySelector('div.sim-slider-arrow-left');
	this.rightArrow = document.getElementById('rightBtn');//this.sldrRoot.querySelector('div.sim-slider-arrow-right');
	this.btnLeftDis = document.getElementById('leftBtn');
	this.btnLeftDis.disabled ; 

	// Initialization
	this.options = Sim.defaults;
	Sim.initialize(this)
};

Sim.defaults = {
	// Default options for the carousel
	arrows: true,
};

Sim.prototype.elemPrev = function(num) {
	num = num || 1;

	let prevElement = this.currentElement;
	this.currentElement -= num;
	if(this.currentElement < 0) this.currentElement = this.elemCount-1;

	if(this.currentElement == 0) {
		this.btnLeftDis.disabled = true;
	} else {
		this.btnLeftDis.disabled = false;
	}
	this.sldrElements[this.currentElement].style.opacity = '1';
	this.sldrElements[prevElement].style.opacity = '0';
};

Sim.prototype.elemNext = function(num) {
	num = num || 1;
	
	let prevElement = this.currentElement;
	this.currentElement += num;
	if(this.currentElement >= this.elemCount) this.currentElement = 0;

	if(this.currentElement == this.elemCount-1) {
		this.btnLeftDis.disabled = true;
	} else {
		this.btnLeftDis.disabled = false;
	}
	
	this.sldrElements[this.currentElement].style.opacity = '1';
	this.sldrElements[prevElement].style.opacity = '0';
};

Sim.initialize = function(that) {

	// Constants
	that.elemCount = that.sldrElements.length; 

	// Variables
	that.currentElement = 0;
	let bgTime = getTime();

	// Functions
	function getTime() {
		return new Date().getTime();
	};
	
	if(that.elemCount >= 1) {  
		that.sldrElemFirst.style.opacity = '1';
	};

	if(that.options.arrows) {  
		that.leftArrow.addEventListener('click', function() {
			let fnTime = getTime();
			if(fnTime - bgTime > 1000) {
				bgTime = fnTime; that.elemPrev()
			}
		}, false);
		that.rightArrow.addEventListener('click', function() {
			let fnTime = getTime();
			if(fnTime - bgTime > 1000) {
				bgTime = fnTime; that.elemNext()
			}
		}, false)
	}
	else {
		that.btnLeftDis.disabled = false; 
		that.rightArrow.style.display = 'none';
	};
};

new Sim();




