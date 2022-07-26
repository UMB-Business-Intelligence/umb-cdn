function formatProfile (profile) {
    // if (!state.id) {
    //   return state.text;
    // }
    // var baseUrl = "/user/pages/images/flags";
    var $state = $(
      '<span>' + profile.text + '&ensp;' + '<span class = "gls-text-meta">' + profile.id + '</span>' + '</span>'
    );
    return $state;
  };

document.addEventListener("DOMContentLoaded", () =>
{ 
    document.querySelectorAll(".fancySelectMultiple").forEach( (hidden_input, index) =>
    {
        hidden_input.hidden = true;
        var api_endpoint = hidden_input.dataset.api_endpoint;
        var model_field = hidden_input.dataset.model_field;
        var pre_selected_values = hidden_input.value === '' ? null : hidden_input.value.split(",");
        var is_required = hidden_input.required ? 'required' : '';
        
        hidden_input.insertAdjacentHTML('afterend', `<select ${is_required} id="fancy-select-multiple-ajax-${index}" style="display:block"></select>`);
        var fancy_select = $(`#fancy-select-multiple-ajax-${index}`);

        fancy_select.select2({
            ajax: {
                url: `/api/${api_endpoint}`,
                dataType: 'json',
                data: function (params) {
                    var query = {
                        search: params.term,
                        page: params.page || 1
                    }
                    // Query parameters will be ?search=[term]&page=[page]
                    return query;
                },
                processResults: function (data) {
                    // Transforms the top-level keys of the response to 'pagination' and 'results'
                    return {
                        pagination: data.pagination,
                        results: $.map(data.results, result => {
                            return { id: result["unid"], text: result[model_field] };
                        })
                    };
                }
            },
            dropdownParent: hidden_input.parentElement,
            multiple: true,
            placeholder: hidden_input.placeholder,
            width: "100%",
            selectionCssClass: "select2-custom-selection",
            templateResult: formatProfile
        });

        // Fetch the preselected item, and add to the control
        if (pre_selected_values !== null)
        {
            pre_selected_values.forEach( value => {
                $.ajax({
                    type: 'GET',
                    url: `/api/${api_endpoint}/` + value
                }).then( result => {
                    // create the option and append to Select2
                    var option = new Option(result[model_field], result["unid"], true, true);
                    fancy_select.append(option);
                });
            });
        }

        fancy_select.on('select2:select', event => {
            var unid = event.params.data.id;
            hidden_input.value = hidden_input.value === "" ? unid : hidden_input.value + "," + unid;
        });

        fancy_select.on('select2:unselect', event => {
            var unid = event.params.data.id;
            var current_values = hidden_input.value.split(",");
            var updated_values = current_values.filter(i => i !== unid).join(",");
            hidden_input.value = updated_values;
        });

    });

    document.querySelectorAll(".fancySelect").forEach( (hidden_input, index) =>
    {
        hidden_input.hidden = true;
        var api_endpoint = hidden_input.dataset.api_endpoint;
        var model_field = hidden_input.dataset.model_field;
        var pre_selected_value = hidden_input.value === '' ? null : hidden_input.value;
        var is_required = hidden_input.required ? 'required' : '';
        
        hidden_input.insertAdjacentHTML('afterend', `<select ${is_required} id="fancy-select-ajax-${index}" style="display:block"></select>`);
        var fancy_select = $(`#fancy-select-ajax-${index}`);

        fancy_select.select2({
            ajax: {
                url: `/api/${api_endpoint}`,
                dataType: 'json',
                data: function (params) {
                    var query = {
                        search: params.term,
                        page: params.page || 1
                    }
                    // Query parameters will be ?search=[term]&page=[page]
                    return query;
                },
                processResults: function (data) {
                    // Transforms the top-level keys of the response to 'pagination' and 'results'
                    return {
                        pagination: data.pagination,
                        results: $.map(data.results, result => {
                            return { id: result["unid"], text: result[model_field] };
                        })
                    };
                }
            },
            dropdownParent: hidden_input.parentElement,
            multiple: false,
            placeholder: hidden_input.placeholder,
            width: "100%",
            selectionCssClass: "select2-custom-selection",
            templateResult: formatProfile
        });

        // Fetch the preselected item, and add to the control
        if (pre_selected_value !== null)
        {
            $.ajax({
                type: 'GET',
                url: `/api/${api_endpoint}/` + pre_selected_value
            }).then( result => {
                // create the option and append to Select2
                var option = new Option(result[model_field], result["unid"], true, true);
                fancy_select.append(option);
            });
        }

        fancy_select.on('select2:select', event => {
            var unid = event.params.data.id;
            hidden_input.value = unid;
            hidden_input.dispatchEvent(new Event('change'));
        });

    });

});