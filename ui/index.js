let visible = {
    "aboutme-joseph": false,
    "aboutme-max": false,
    "dataprotection": false,
};

/* Extends Element Objects with a function named scrollIntoViewPromise
*  options: the normal scrollIntoView options without any changes
*/

Element.prototype.scrollIntoViewPromise = function(options){

    // "this" refers to the current element (el.scrollIntoViewPromise(options): this = el)
    this.scrollIntoView(options);
    
    // I create a variable that can be read inside the returned object ({ then: f() }) to expose the current element 
    let parent = this;
    
    // I return an object with just a property inside called then
    // then contains a function which accept a function as parameter that will be execute when the scroll ends 
    return { 
      then: function(x){
        // Check out https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API for more informations  
        const intersectionObserver = new IntersectionObserver((entries) => {
          let [entry] = entries;
          
          // When the scroll ends (when our element is inside the screen)
          if (entry.isIntersecting) {
          
            // Execute the function into then parameter and stop observing the html element
            setTimeout(() => {x(); intersectionObserver.unobserve(parent)}, 100)
          }
        });
        
        // I start to observe the element where I scrolled 
        intersectionObserver.observe(parent);
      }
    };
  }

function changeVisibility(divname){
    var div = document.getElementById(divname)
    
    if (!visible[divname]) {
        div.style.display = "block"
        if (divname === "dataprotection") 
            div.scrollIntoView({behavior: "smooth"})
    } else {
        if (divname === "dataprotection") 
            document.getElementById("title").scrollIntoViewPromise({behavior: "smooth"}).then(() => {div.style.display = "none"})
        else
            div.style.display = "none"
    }

    visible[divname] = !visible[divname]
}
