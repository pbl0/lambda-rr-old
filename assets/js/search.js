---
---

!(function () {
    // code here
    const PREFIX = '/lambda-rr'
    const input = document.getElementById('search-input');
    const resultsContainer = document.getElementById('results-container');
    const pages = {{ site.html_pages | jsonify }};
    const site = {{ site | jsonify}}
    console.log('pages',pages);
    console.log('site', site)
    input.addEventListener("keyup", function(value){
        if (input.value == ''){
            borrarTodos();
        } else {
            borrarNoCoincide(input.value)
            let result = pages.filter(item => item.title.toUpperCase().includes(input.value.toUpperCase()));
    
            result.forEach(element => {
    
                if (!alreadyExists(element.path)){
                    const link = document.createElement('a');
                    link.id = element.path.replace('.', '-');
                    link.classList.add('search-element');
                    link.href = PREFIX + element.url
                    const text = document.createTextNode(element.title);
                    link.appendChild(text)
                    resultsContainer.appendChild(link)
                }
            });
        }


    })

    function alreadyExists(page_path) {
        const element = document.getElementById(page_path.replace('.', '-'));
        if (element){
            return true;
        } else {
            return false;
        }
    }

    function borrarNoCoincide(searchInput) {
        const resultadosActuales = document.querySelectorAll('#results-container>a');

        resultadosActuales.forEach(element =>{
            if (!element.firstChild.textContent.includes(searchInput)){
                element.remove();
            }
        })
    }

    function borrarTodos() {
        borrarNoCoincide('4 8 15 16 23 42');
    }
})();