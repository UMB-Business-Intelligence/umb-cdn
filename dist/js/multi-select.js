document.addEventListener("DOMContentLoaded", () => { 
    document.querySelectorAll(".multiSelect").forEach( elem => {

        var self = elem.parentNode;
        var field = elem;
        var fieldOption = field.querySelectorAll('option');
        var placeholder = field.getAttribute('placeholder');

        self.style.position = "relative";

        // field.hidden = true;
        // "Hide" the default <select> tag
        field.style.opacity = 0;
        field.style.height = 0;
        field.style.margin = 0;
        field.style.padding = 0;
        field.style.position = "absolute";
        field.style.bottom = '0%';
        field.style.left = '50%';
        field.style.transform = 'translateX(-50%)';

        self.insertAdjacentHTML('beforeend',  `<div class="multiSelect_dropdown"></div>
                                                <span class="multiSelect_placeholder">` + placeholder + `</span>
                                                <ul class="multiSelect_list"></ul>
                                                <span class="multiSelect_arrow"></span>
                                                <svg style="display: none;">
                                                    <symbol viewBox="0 0 24 24" id="iconX">
                                                        <g stroke-linecap="round" stroke-linejoin="round">
                                                            <line x1="18" y1="6" x2="6" y2="18"></line>
                                                            <line x1="6" y1="6" x2="18" y2="18"></line>
                                                        </g>
                                                    </symbol>
                                                </svg>`);

        fieldOption.forEach( elem => {
            self.querySelector('.multiSelect_list').insertAdjacentHTML('beforeend', `<li class="multiSelect_option" data-value="` + elem.value + `">
                                                                                        <a class="multiSelect_text">` + elem.text + `</a>
                                                                                    </li>`);
        });

        var dropdown = self.querySelector('.multiSelect_dropdown');
        var list = self.querySelector('.multiSelect_list');
        var option = self.querySelectorAll('.multiSelect_option');
        var optionText = self.querySelectorAll('.multiSelect_text');

        field.querySelectorAll("option").forEach( elem => {
            if (elem.hasAttribute("selected"))
            {
                list_elem = list.querySelector(`li[data-value='${elem.value}']`);
                list_elem.classList.toggle("-selected");
                dropdown.insertAdjacentHTML('beforeend', '<span class="multiSelect_choice" data-value="'+ elem.value +'">'+ list_elem.querySelector('.multiSelect_text').innerHTML +'<svg class="multiSelect_deselect -iconX"><use href="#iconX"></use></svg></span>');
                dropdown.classList.add('-hasValue');
                if (list.querySelector("li:not(.-selected)") == null && list.querySelector(".multiSelect_noselections") == null)
                    list.insertAdjacentHTML('beforeend', '<h5 class="multiSelect_noselections">No Options Left</h5>');
                dropdown.lastElementChild.addEventListener('click', event => moveSelectedElement(event) );
            }
        });

        dropdown.addEventListener( "click", event => {
            document.querySelectorAll(".multiSelect_dropdown").forEach(elem => {
                if (elem.classList.contains('-open') && elem !== event.currentTarget)
                {
                    elem.classList.toggle('-open');
                    elem.parentElement.querySelector(".multiSelect_list").classList.toggle('-open');
                    elem.parentElement.querySelector(".multiSelect_list").scrollTop = 0;
                }
            });
            dropdown.classList.toggle('-open');
            list.classList.toggle('-open');
            list.scrollTop = 0;
            list.style.top = (dropdown.getBoundingClientRect().height + 1).toString() + "px";
        });

        option.forEach( elem => { elem.addEventListener( "click", event => {
            elem.classList.toggle('-selected');
            field.querySelector(`option[value='${elem.dataset.value}']`).toggleAttribute('selected');
            dropdown.insertAdjacentHTML('beforeend', '<span class="multiSelect_choice" data-value="'+ elem.dataset.value +'">'+ elem.querySelector('.multiSelect_text').innerHTML +'<svg class="multiSelect_deselect -iconX"><use href="#iconX"></use></svg></span>');
            dropdown.lastElementChild.addEventListener('click', event => moveSelectedElement(event) );
            list.style.top = (dropdown.getBoundingClientRect().height + 1).toString() + "px";

            dropdown.classList.add('-hasValue');
            if (list.querySelector("li:not(.-selected)") == null && list.querySelector(".multiSelect_noselections") == null)
                list.insertAdjacentHTML('beforeend', '<h5 class="multiSelect_noselections">No Options Left</h5>');
        })});

        function moveSelectedElement(event)
        {
            event.currentTarget.remove();
            list.querySelector(`li[data-value='${event.currentTarget.dataset.value}']`).classList.toggle("-selected");
            field.querySelector(`option[value='${event.currentTarget.dataset.value}']`).toggleAttribute('selected');
            dropdown.childElementCount > 0 ? dropdown.classList.add("-hasValue") : dropdown.classList.remove("-hasValue");
            if (list.querySelector(".multiSelect_noselections") != null)
                list.querySelector(".multiSelect_noselections").remove();
            list.style.top = (dropdown.getBoundingClientRect().height + 1).toString() + "px";
        }
    
    });

    document.addEventListener('click', event => {
        document.querySelectorAll(".multiSelect_dropdown").forEach(elem => {
            if (elem.classList.contains('-open') && event.target != elem && !event.target.classList.contains('multiSelect_text'))
            {
                elem.classList.toggle('-open');
                elem.parentElement.querySelector(".multiSelect_list").classList.toggle('-open');
                elem.parentElement.querySelector(".multiSelect_list").scrollTop = 0;
            }
        });
    }, true);
});
