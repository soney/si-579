import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Shuffle from "shufflejs";

const shuffleArray = (array) => {
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		const temp = array[i];
		array[i] = array[j];
		array[j] = temp;
	}
	return array;
};
const container = document.getElementById("list-container");

import("../assets/data.json")
	.then((data) => {
		let order = Array.from(Array(data.length).keys());
		order = shuffleArray(order);
		for (let psid = 1; psid < 5; psid++) {
			for (let i = 0; i < data.length; i++) {
				const ele = data[order[i]];
				if(ele['Opt-out']) continue;
				const newCard = document.createElement("div");
				newCard.classList.add("card", "mycard");
				newCard.setAttribute("data-groups", `["PS${psid}"]`);
				newCard.innerHTML = `<a href="${ele["PS" + psid.toString()]}" target="_blank" >
                <div class="card-header mycard-item--title">
                    PS${psid} / ${ele["First Name"]} ${ele["Last Name"]}
                </div>
                <iframe
                    class="card-img-top card-preview"
                    src="${ele["PS" + psid.toString()]}"
                    sandbox
                    loading="lazy"
                ></iframe>
            </a>`;
				container.append(newCard);
			}
		}
	})
	.then(() => {
		new Demo(container);
	});

class Demo {
	constructor(element) {
		this.element = element;
		this.shuffle = new Shuffle(element, {
			itemSelector: ".mycard",
		});
		this.addSearchFilter();
		this.addFilterButtons();
	}

	addFilterButtons() {
		const options = document.querySelector(".filter-options");

		const filterButtons = Array.from(options.children);
		const onclick = this._handleFilterClick.bind(this);
		filterButtons.forEach((button) => {
			button.addEventListener("click", onclick, false);
		});
	}

	addSearchFilter() {
		const searchInput = document.querySelector(".js-shuffle-search");
		searchInput.addEventListener(
			"keyup",
			this._handleSearchKeyup.bind(this)
		);
	}

	_handleFilterClick(evt) {
		const btn = evt.currentTarget;
		const isActive = btn.classList.contains("active");
		const btnGroup = btn.getAttribute("data-group");

		this._removeActiveClassFromChildren(btn.parentNode);

		let filterGroup;
		if (isActive) {
			btn.classList.remove("active");
			filterGroup = Shuffle.ALL_ITEMS;
		} else {
			btn.classList.add("active");
			filterGroup = btnGroup;
		}

		this.shuffle.filter(filterGroup);
	}

	_removeActiveClassFromChildren(parent) {
		const { children } = parent;
		for (let i = children.length - 1; i >= 0; i--) {
			children[i].classList.remove("active");
		}
	}

	_handleSearchKeyup(evt) {
		const searchText = evt.target.value.toLowerCase();
		this.shuffle.filter((element, shuffle) => {
			// If there is a current filter applied, ignore elements that don't match it.
			if (shuffle.group !== Shuffle.ALL_ITEMS) {
				// Get the item's groups.
				const groups = JSON.parse(element.getAttribute("data-groups"));
				const isElementInCurrentGroup =
					groups.indexOf(shuffle.group) !== -1;
				// Only search elements in the current group
				if (!isElementInCurrentGroup) {
					return false;
				}
			}
			const titleElement = element.querySelector(".mycard-item--title");
			const titleText = titleElement.textContent.toLowerCase().trim();
			return titleText.indexOf(searchText) !== -1;
		});
	}
}
