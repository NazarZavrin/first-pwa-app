document.querySelector(".drag-and-drop").style.display = "none";
document.addEventListener("DOMContentLoaded", event => {
    document.querySelector(".loading-page").style.display = "none";
    document.querySelector(".drag-and-drop").style.display = "block";
    const field = document.querySelector('.field');
    const box = document.querySelector('.box');

    box.addEventListener("mousedown", function (event) {
        event.preventDefault();// чтобы текст не выделялся мышью
	    let shiftX = event.offsetX;
	    let shiftY = event.offsetY;
        // ↑ отступы курсора от краёв коробки при нажатии
        // используется, чтобы при переносе box-а курсор был в точке нажатия мыши
	    let boxSizes = {
	    	width: box.offsetWidth,
	    	height: box.offsetHeight
	    }
	    let fieldSizes = {
	    	left: field.getBoundingClientRect().left + scrollX,
	    	top: field.getBoundingClientRect().top + scrollY,
	    	right: field.getBoundingClientRect().left + scrollX + field.offsetWidth,
	    	bottom: field.getBoundingClientRect().top + scrollY + field.offsetHeight
	    }
	    box.style.zIndex = 1000;
	    document.body.append(box);
        // ↑ позиционируется относительно body

	    moveItem(event.pageX, event.pageY);
        // ↑ переместить в точку с координатами event.pageX, event.pageY

	    function moveItem(pageX, pageY) {
	    	let currentX = pageX - shiftX;
	    	let currentY = pageY - shiftY;
            // ↑ расстояние от краёв окна до краёв элемента
	    	if (
	    		currentX + boxSizes.width <= fieldSizes.right &&
	    		currentX >= fieldSizes.left
                // если коробка не выходит за левую и правую границы поля
	    	) {
	    		box.style.left = `${currentX}px`;
	    	} else {
	    		if (currentX + boxSizes.width > fieldSizes.right) {
                    // если коробка выходит правую границу поля
	    			box.style.left = `${fieldSizes.right - boxSizes.width}px`;
	    		}
	    		if (currentX < fieldSizes.left) {
                    // если коробка выходит левую границу поля
	    			box.style.left = `${fieldSizes.left}px`;
	    		}
	    	}
	    	if (
	    		currentY + boxSizes.height <= fieldSizes.bottom &&
	    		currentY >= fieldSizes.top
                // если коробка не выходит за верхнюю и нижнюю границы поля
	    	) {
	    		box.style.top = `${currentY}px`;
	    	} else {
	    		if (currentY + boxSizes.height > fieldSizes.bottom) {
                    // если коробка выходит за нижнюю границу поля
	    			box.style.top = `${fieldSizes.bottom - boxSizes.height}px`;
	    		}
	    		if (currentY < fieldSizes.top) {
                    // если коробка выходит за верхнюю границу поля
	    			box.style.top = `${fieldSizes.top}px`;
	    		}
	    	}
	    }

	    let currentDroppable = null;

	    function checkElemBelow(event) {
	    	moveItem(event.pageX, event.pageY);

	    	box.style.display = 'none';
	    	let elemBelow = document.elementFromPoint(event.clientX, event.clientY);
	    	box.style.display = 'block';

	    	if (!elemBelow) return;
	    	let droppableBelow = elemBelow.closest('.hollow');
            // ↑ элемент попал в hollow (имеет ли elemBelow предка с классом .hollow)?

	    	if (currentDroppable !== droppableBelow) {
	    		if (currentDroppable) {
                    // логика обработки процесса "вылета" из droppable 
	    			currentDroppable.classList.remove('_active');
	    			box.classList.remove('_active');
	    		}
	    		currentDroppable = droppableBelow;
	    		if (currentDroppable) {
                    // логика обработки процесса, когда мы "влетаем" в droppable
	    			currentDroppable.classList.add('_active');
	    			box.classList.add('_active');
	    		}
	    	}
	    }
	    document.addEventListener('mousemove', checkElemBelow);

	    document.addEventListener("mouseup", function (event) {
	    	document.removeEventListener('mousemove', checkElemBelow);
	    }, { "once": true });
    });
    box.addEventListener("dragstart", function (event) {
    	event.preventDefault();
    });
});

