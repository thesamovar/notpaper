const slideTime = 500;

// from https://stackoverflow.com/questions/7627000/javascript-convert-string-to-safe-class-name-for-css
function makeSafeForCSS(name) {
    return name.replace(/[^a-z0-9]/g, function(s) {
        var c = s.charCodeAt(0);
        if (c == 32) return '-';
        if (c >= 65 && c <= 90) return '_' + s.toLowerCase();
        return '__' + ('000' + c.toString(16)).slice(-4);
    });
}

function updateRelated(elem, wasPinned) {
    if(elem.relatedCount==1 || (wasPinned && elem.relatedCount>=1)) {
        const tgt = document.querySelector("#colRelated");
        if(wasPinned) {
            $(elem).slideUp(slideTime, function() {
                tgt.appendChild(elem);
                $(elem).slideDown(slideTime);
            });
        } else {
            tgt.appendChild(elem);
            //if(elem.style.display!="block") {
            $(elem).slideDown(slideTime);
            //}
        }
        //elem.style.display = "block";
    }
    if(elem.relatedCount==0) {
        const tgt = document.querySelector("#colMain");
        //elem.style.display = "none";
        $(elem).slideUp(slideTime, function() {  tgt.appendChild(elem) });
        //tgt.appendChild(elem); // move here so we don't have to sort it
    }
}

function showRelated(entries, observer) {
    entries.forEach(entry => {
        if(!entry.isIntersecting && !('initialIntersectionPassDone' in entry.target)) {
            return;
        }
        entry.target.initialIntersectionPassDone = true;
        if('related' in entry.target.dataset) {
            let related = document.querySelectorAll(entry.target.dataset.related);
            related.forEach(elem => {
                if(!('relatedCount' in elem)) {
                    elem.relatedCount = 0;
                }
                if(entry.isIntersecting) {
                    elem.relatedCount += 1;
                } else {
                    elem.relatedCount -= 1;
                }
                if(!elem.isPinned) {
                    updateRelated(elem, false);
                }
            })
        }
    });
}

function clickRelated(elem) {
    //toggleHighlightRelatedElement(elem);
    if(elem.isPinned) {
        elem.isPinned = false;
        updateRelated(elem, true);
        return;
    }
    $(elem).slideUp(slideTime, function() {
        document.querySelector("#colPinned").appendChild(elem);
        elem.isPinned = true;
        $(elem).slideDown(slideTime);
    })
}

function toggleHighlightRelatedElement(elem) {
    let sel = "";
    if(elem.classList.contains('related')) {
        // then we want to find the corresponding hasRelated
        sel = '.hasRelated[data-related*="#'+elem.id+'"]';
    } else {
        // then we want to find the corresponding related
        sel = elem.dataset.related;
    }
    document.querySelectorAll(sel).forEach(item => {
        item.classList.toggle("highlighted");
    });
    elem.classList.toggle("highlighted");
}

function toggleHighlightRelated(event) {
    toggleHighlightRelatedElement(event.target);
}

////////////////////// TRANSFORM SOME ELEMENTS /////////////////

// Set all references to be related only
document.querySelectorAll(".csl-entry").forEach(elem => {
    elem.classList.add("related");
});

// Set all citations to have a related item
document.querySelectorAll(".citation").forEach(elem => {
    elem.classList.add("hasRelated");
    elem.dataset.related = elem.dataset.cites.split(' ').map(function(a) { return '#ref-'+a; }).join(',');
});

// Set all figures to be a related item
document.querySelectorAll("figure").forEach(elem => {
    elem.classList.add("related");
    const embed = elem.querySelector("embed");
    const id = makeSafeForCSS(embed.id);
    embed.removeAttribute('id');
    elem.id = id;
    // need to add its name
});

// Set all figure references to have a related item
document.querySelectorAll('a[data-reference-type="ref"]').forEach(elem => {
    //console.log(elem);
    elem.classList.add("hasRelated");
    elem.dataset.related = '#'+makeSafeForCSS(elem.dataset.reference);
    elem.removeAttribute('href')
});

// Make all hasRelated items be observed
const related_options = {}
const observer = new IntersectionObserver(showRelated, related_options);
document.querySelectorAll(".hasRelated").forEach(div => {
    observer.observe(div);
})

// Set all related items to have a pin function
document.querySelectorAll(".related").forEach(elem => {
    elem.onclick = function() { clickRelated(elem); };
    elem.isPinned = false;
})

// Set all related items or hasRelated items to mutually highlight on mouseover
// Needs some work to make sure it works when you pin
document.querySelectorAll(".related,.hasRelated").forEach(elem => {
    elem.addEventListener("mouseenter", toggleHighlightRelated, false);
    elem.addEventListener("mouseleave", toggleHighlightRelated, false);
});

// Set all related items to have an order
let order_count = 0;
document.querySelectorAll(".related").forEach(elem => {
    elem.style.order = order_count;
    order_count += 1;
});
