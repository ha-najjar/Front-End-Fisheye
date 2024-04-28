const setDropdownList = (medias, photographerName) => {
    const SPACEBAR_KEY_CODE = [0, 32];
	const ENTER_KEY_CODE = 13;
	const DOWN_ARROW_KEY_CODE = 40;
	const UP_ARROW_KEY_CODE = 38;
	const ESCAPE_KEY_CODE = 27;

	const list = document.querySelector(".dropdown__list");
	const listContainer = document.querySelector(".dropdown__list-container");
	const dropdownArrow = document.querySelector(".fa-chevron-up");
	const listItems = document.querySelectorAll(".dropdown__list-item");
	const dropdownSelectedDOM = document.querySelector("#dropdown__selected");
	const listItemIds = [];

	dropdownSelectedDOM.addEventListener("click", e =>
		toggleListVisibility(e)
	);
	dropdownArrow.addEventListener("click", e =>
		toggleListVisibility(e)
	);
	dropdownSelectedDOM.addEventListener("keydown", e =>
		toggleListVisibility(e)
	);

	listItems.forEach(item => listItemIds.push(item.id));

	listItems.forEach(item => {
		item.addEventListener("click", e => {
			setSelectedListItem(e);
			closeList();
		});

		item.addEventListener("keydown", e => {
			switch (e.keyCode) {
			case ENTER_KEY_CODE:
				setSelectedListItem(e);
				closeList();
				return;

			case DOWN_ARROW_KEY_CODE:
				focusNextListItem(DOWN_ARROW_KEY_CODE);
				return;

			case UP_ARROW_KEY_CODE:
				focusNextListItem(UP_ARROW_KEY_CODE);
				return;

			case ESCAPE_KEY_CODE:
				closeList();
				return;

			default:
				return;
			}
		});
	});

	function setSelectedListItem(e) {
		switch (e.target.id) {
		case "option-1": sortByPopularity(medias);
			break;
		case "option-2": sortByDateRecentToOld(medias);
			break;
		case "option-3": sortByName(medias);
			break;
		default: break;
		}
		let selectedTextToAppend = document.createTextNode(e.target.innerText);
		dropdownSelectedDOM.innerHTML = null;
		dropdownSelectedDOM.appendChild(selectedTextToAppend);
	}

	function closeList() {
		list.classList.remove("open");
		dropdownArrow.classList.remove("expanded");
		listContainer.setAttribute("aria-expanded", false);
	}

	function toggleListVisibility(e) {
		let openDropDown =
            SPACEBAR_KEY_CODE.includes(e.keyCode) || e.keyCode === ENTER_KEY_CODE;

		if (e.keyCode === ESCAPE_KEY_CODE) {
			closeList();
		}

		if (e.type === "click" || openDropDown) {
			list.classList.toggle("open");
			dropdownArrow.classList.toggle("expanded");
			listContainer.setAttribute(
				"aria-expanded",
				list.classList.contains("open")
			);
		}

		if (e.keyCode === DOWN_ARROW_KEY_CODE) {
			focusNextListItem(DOWN_ARROW_KEY_CODE);
		}

		if (e.keyCode === UP_ARROW_KEY_CODE) {
			focusNextListItem(UP_ARROW_KEY_CODE);
		}
	}

	function focusNextListItem(direction) {
		const activeElementId = document.activeElement.id;
		if (activeElementId === "dropdown__selected") {
			document.querySelector(`#${listItemIds[0]}`).focus();
		} else {
			const currentActiveElementIndex = listItemIds.indexOf(
				activeElementId
			);
			if (direction === DOWN_ARROW_KEY_CODE) {
				const currentActiveElementIsNotLastItem =
                    currentActiveElementIndex < listItemIds.length - 1;
				if (currentActiveElementIsNotLastItem) {
					const nextListItemId = listItemIds[currentActiveElementIndex + 1];
					document.querySelector(`#${nextListItemId}`).focus();
				}
			} else if (direction === UP_ARROW_KEY_CODE) {
				const currentActiveElementIsNotFirstItem =
                    currentActiveElementIndex > 0;
				if (currentActiveElementIsNotFirstItem) {
					const nextListItemId = listItemIds[currentActiveElementIndex - 1];
					document.querySelector(`#${nextListItemId}`).focus();
				}
			}
		}
	}

    function sortByName(photographerMedias) {
        photographerMedias.sort(function(a, b) {
            return a.title.localeCompare(b.title);
        });

        const mediasContainer = document.querySelector(".photographer-medias");

        // Supprimer tous les articles de medias-container
        while (mediasContainer.firstChild) {
            mediasContainer.removeChild(mediasContainer.firstChild);
        }
        photographerMedias.forEach(media => {
            mediaTemplate(media, photographerName);
        });
    }
    
    function sortByPopularity(photographerMedias) {
        photographerMedias.sort(function(a, b) {
            return b.likes - a.likes;
        });
        const mediasContainer = document.querySelector(".photographer-medias");

        // Supprimer tous les articles de medias-container
        while (mediasContainer.firstChild) {
            mediasContainer.removeChild(mediasContainer.firstChild);
        }
        photographerMedias.forEach(media => {
            mediaTemplate(media, photographerName);
        });
    }
    
    function sortByDateRecentToOld(photographerMedias) {
        photographerMedias.sort(function(a, b) {
            const dateA = new Date(a.date);
            const dateB = new Date(b.date);
            return dateB - dateA;
        });
        const mediasContainer = document.querySelector(".photographer-medias");

        // Supprimer tous les articles de medias-container
        while (mediasContainer.firstChild) {
            mediasContainer.removeChild(mediasContainer.firstChild);
        }
        photographerMedias.forEach(media => {
            mediaTemplate(media, photographerName);
        });
    }
}


