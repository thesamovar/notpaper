const hasRelatedDivs = document.querySelectorAll(".hasRelated");
//console.log(hasRelatedDivs);

const options = {}

function updateRelated(elem, wasPinned) {
    if(elem.relatedCount==1 || (wasPinned && elem.relatedCount>=1)) {
        let tgt = document.querySelector("#colRelated");
        tgt.appendChild(elem);
        elem.style.display = "block";
    }
    if(elem.relatedCount==0) {
        elem.style.display = "none";
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

const observer = new IntersectionObserver(showRelated, options);

hasRelatedDivs.forEach(div => {
    observer.observe(div);
})

//////////////////////

function clickRelated(elem) {
    if(elem.isPinned) {
        elem.isPinned = false;
        updateRelated(elem, true);
        return;
    }
    document.querySelector("#colPinned").appendChild(elem);
    elem.isPinned = true;
}

document.querySelectorAll(".related").forEach(elem => {
    elem.onclick = function() { clickRelated(elem); };
    elem.isPinned = false;
})

/////////////////////

// function moveItTo(targetId) {
//     src = document.getElementById('movable');
//     tgt = document.getElementById(targetId);
//     tgt.appendChild(src);
// }