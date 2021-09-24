/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/


/**
 * Define Global Variables
 * 
*/

//Getting navbarList to add items dynamically
const navbarList=document.querySelector('#navbar__list');

//Getting section to loop through them
const sections = document.querySelectorAll('section');

//Creating fragment to handle performance while 
//adding listItems to the navbarList
const fragment=document.createDocumentFragment();

/**
 * End Global Variables

 * Begin Main Functions
 * 
*/

//Creating intersectionObserver to access the current section
// at the viewport
function markActiveSection()
{
//creating options and callback for the observer object
const options ={
    root: null ,threshold: .3, rootMargin: "0px"
};
let callback = (entries, observer) => {
entries.forEach(entry => {
        if (entry.isIntersecting) {       
    
            // Add class 'active' to section when near top of viewport
            //make class active when the current section equal 
            //to the current entry and the class is not active
            sections.forEach((section , index )=> {
                if(entry.target.getAttribute('data-nav') == 
                section.getAttribute('data-nav') && 
                !section.classList.contains('your-active-class'))
                {
                section.classList.add('your-active-class');
                }
                else{
                    section.classList.remove('your-active-class');
                }
                
            });
         // }
        }       
});
};

observer = new IntersectionObserver(callback, options);

//looping through sections to add observer for each section
sections.forEach((section , index )=> {
    observer.observe(section);
});
}

// build the nav
function buildNavbar(){
sections.forEach((section , index )=> {
    let newLi=document.createElement('li');
    newLi.innerText=section.getAttribute('data-nav');
    newLi.classList.add('menu__link')
    
    
    

// Scroll to anchor ID using scrollTO event
// Scroll to section on link click
    //scroll by clicking the links
    newLi.addEventListener('click',function(){
        section.scrollIntoView(
        {behavior: "smooth", block: "end", inline: "nearest"})
    });
    fragment.appendChild(newLi);
    
});
//append with fragment to mantain performance
navbarList.appendChild(fragment);

}


// Build menu 
buildNavbar();

// Set sections as active
markActiveSection();





