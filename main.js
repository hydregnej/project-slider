let images = [
	{
		src: "./img/image-0.jpg",
		title: "Rostov-on-Don, Admiral"
	},
	{
		src: "./img/image-1.jpg",
		title: "Sochi Thieves"
	},
	{
		src: "./img/image-2.jpg",
		title: "Rostov-on-Don Patriotic"
	}
]

function initSlider() {
	if (!images || !images.length) return

	let sliderImage = document.querySelector(".main__slider-img")
	let sliderArrows = document.querySelectorAll(".main__arrow")
	let sliderDots = document.querySelector(".main__dot-block")
	let sliderTitle = document.querySelector(".main__title-slider")

	initImages()
	initArrows()
	initDots()
	initTitles()

	function initImages() {
		images.forEach((img, index) => {
			let mainImg = `<img src="${images[index].src}" alt="Slider Image" class="main__slider-img-item main__number-slider-${index} ${index === 0 ? "main__slider-img-active" : ""}" data-index="${index}">`
			sliderImage.innerHTML += mainImg
		})
	}

	function initArrows() {
		sliderArrows.forEach(arrow => {
			arrow.addEventListener("click", function () {
				let curNum = +sliderImage.querySelector(".main__slider-img-active").dataset.index
				let nextImg
				if (arrow.classList.contains("main__arrow-left")) {
					nextImg = curNum === 0 ? images.length - 1 : curNum - 1
				} else {
					nextImg = curNum === images.length - 1 ? 0 : curNum + 1
				}
				moveSlider(nextImg)

				const activeDot = sliderDots.querySelector(".main__slider-img-active_dots")
				if (activeDot) {
					activeDot.classList.remove("main__slider-img-active", "main__slider-img-active_dots")
				}
				const nextDot = sliderDots.querySelector(`.main__number-slider-${nextImg}`)
				if (nextDot) {
					nextDot.classList.add("main__slider-img-active", "main__slider-img-active_dots")
				}

				const correspondingTitle = sliderTitle.querySelector(`.main__h3_slider-titles[data-index="${nextImg}"]`)
				if (correspondingTitle) {
					correspondingTitle.click()
				}
			})
		})
	}

	function initDots() {
		images.forEach((img, index) => {
			let dot = `<img src="./icons/dot.svg" alt="Dot" class="main__dot main__number-slider-${index} ${index === 0 ? "main__slider-img-active main__slider-img-active_dots" : ""}" data-index="${index}">`
			sliderDots.innerHTML += dot
		})
		sliderDots.querySelectorAll(".main__dot").forEach(dot => {
			dot.addEventListener("click", function () {
				moveSlider(this.dataset.index)
				const activeDot = sliderDots.querySelector(".main__slider-img-active_dots")
				if (activeDot) {
					activeDot.classList.remove("main__slider-img-active", "main__slider-img-active_dots")
				}
				this.classList.add("main__slider-img-active", "main__slider-img-active_dots")
				const correspondingTitle = sliderTitle.querySelector(`.main__h3_slider-titles[data-index="${this.dataset.index}"]`)
				if (correspondingTitle) {
					correspondingTitle.click()
				}
			})
		})
	}


	function moveSlider(num) {
		sliderImage.querySelector(".main__slider-img-active").classList.remove("main__slider-img-active")
		sliderImage.querySelector(".main__number-slider-" + num).classList.add("main__slider-img-active")
		// changeTitle(num)
	}


	function initTitles() {
		images.forEach((img, index) => {
			let titleDiv = `<h3 class="main__h3 main__h3_slider-titles" data-index="${index}">${img.title}</h3>`
			sliderTitle.innerHTML += titleDiv
		})

		sliderTitle.querySelectorAll(".main__h3_slider-titles").forEach(title => {
			title.addEventListener("click", function () {
				const index = parseInt(this.dataset.index)
				moveSlider(index)
				const activeTitle = sliderTitle.querySelector(".main__h3_slider-titles.main__slider-img-active_title")
				if (activeTitle) {
					activeTitle.classList.remove("main__slider-img-active", "main__slider-img-active_title")
				}
				this.classList.add("main__slider-img-active", "main__slider-img-active_title")
				const activeDot = sliderDots.querySelector(".main__slider-img-active_dots")
				if (activeDot) {
					activeDot.classList.remove("main__slider-img-active", "main__slider-img-active_dots")
				}
				const nextDot = sliderDots.querySelector(`.main__number-slider-${index}`)
				if (nextDot) {
					nextDot.classList.add("main__slider-img-active", "main__slider-img-active_dots")
				}
			})
		})
		const firstTitle = document.querySelector(".main__h3_slider-titles")
		if (firstTitle) {
			firstTitle.click()
		}

	}

}

document.addEventListener("DOMContentLoaded", initSlider)










