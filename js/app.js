


/* declaring necessary Variables */
const liContainer = document.createDocumentFragment(),
sections = document.querySelectorAll("section"),
Navbar = document.getElementById("navbar__list"),
navElements = document.querySelectorAll("#navbar__list>li"),
TopButton = document.getElementById("top")

    /* Function to auto disable unactive classes */
const classDisabler = function(){
    Navbar.childNodes.forEach(function(element){
        element.classList.remove("menu__link_selected")
    })
    sections.forEach(function(element){
        element.classList.remove("your-active-class")
    });
}

/*creating UL Elements of Navbar and give them classes */
sections.forEach(function(section,io){
    const ulElement = document.createElement("li")
    ulElement.setAttribute("class","menu__link")
    ulElement.setAttribute("nav_value",`Section ${io+1}`)
    /* Get it's text content from section Data nav attribute */
    ulElement.textContent= section.getAttribute("data-nav")
    liContainer.appendChild(ulElement)


})
Navbar.appendChild(liContainer)
/* Add event when click to an button of nav to move to an Section */
Navbar.addEventListener("click" , function(e){
    
    if (e.target.nodeName==="LI"){
        classDisabler() /* First remove all active classes from navbar and check if u pressed on LI button not an Text node */
        e.target.classList.add("menu__link_selected")
        }
    sections.forEach(function(element){ /* looping on elements of section if clicked LI have same Text context of Element of section Atrribute Move to this Element by Scroll into view func */
        if(e.target.textContent===element.getAttribute("data-nav")){
            element.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"});
            element.classList.add("your-active-class")
        }
    })

})

let tracker = new IntersectionObserver(
    function(entries){
        entries.forEach(function(entry){
            const SyncingNav = document.querySelector(`[nav_value="${entry.target.getAttribute("data-nav")}"]`) /* select The Navbar element bar of class Nav_value that have the same value of attribute data-nav in sections  */
            if(entry.isIntersecting){
                entry.target.classList.add("your-active-class")
                SyncingNav.classList.add("menu__link_selected")/* Give it the selected class to make it Selected */
            }
            else{
                entry.target.classList.remove("your-active-class")
                SyncingNav.classList.remove("menu__link_selected") /* if not that element navbar then just remove the Selected class if it avialable */
            };
    })}
,{threshold:0.65})
sections.forEach(function(el,i){
    tracker.observe(el)
})
window.onscroll=function(){
    if (window.pageYOffset > 700){
        TopButton.style.display="block"
    }
    else{
        TopButton.style.display="none"
    }
}
TopButton.addEventListener("click",function(){
    window.scrollTo(0,0)
})