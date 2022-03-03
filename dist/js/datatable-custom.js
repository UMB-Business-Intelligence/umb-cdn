document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll("table.umb-sort-table").forEach( elem => {
        new DataTable(elem, {
            //Remove pagination
            paging: false, 
            // Remove table information at bottom
            "info": false,
            "searching":false
        })
    })
})
