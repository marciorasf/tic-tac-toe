function removeBtnExecutioActiveAnimation() {
	this.removeEventListener("animationend", removeBtnExecutioActiveAnimation);
	this.classList.remove("btn--execution--active");
}

function handleBtnExecutionClick() {
	this.classList.add("btn--execution--active");
	this.addEventListener("mouseleave", removeBtnExecutioActiveAnimation);
}

function initializeAllBtnExecution() {
	var btns = document.getElementsByClassName("btn--execution");
	for (btn of btns) {
		btn.addEventListener("click", handleBtnExecutionClick);
	}
}
