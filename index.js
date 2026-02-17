// Table of Contents Function - includes h3 headings AND links
function initTableOfContents() {
    const container = document.querySelector("#toc");
    if (!container) {
        console.log("TOC container not found");
        return;
    }
    
    // Get all h3 headings and all links
    const headings = document.querySelectorAll(".folder-item h3");
    const allLinks = document.querySelectorAll(".folder-links a");
    
    if (headings.length < 1 && allLinks.length < 1) {
        container.innerHTML = "<b>Table of Contents:</b><p>No content yet</p>";
        return;
    }
    
    let output = "<b>Table of Contents:</b>";
    
    // Add all h3 headings first
    if (headings.length > 0) {
        output += "<h4>Sections:</h4><ul>";
        [...headings].forEach((heading) => {
            const title = heading.textContent;
            const link = "section-" + title
                .toLowerCase()
                .trim()
                .replaceAll(" ", "-")
                .replaceAll(/[^a-z0-9-]/g, "");
            
            heading.setAttribute("id", link);
            output += `<li><a href="#${link}">${title}</a></li>`;
        });
        output += "</ul>";
    }
    
    // Add all links
    if (allLinks.length > 0) {
        output += "<h4>All Links:</h4><ul>";
        [...allLinks].forEach((link, index) => {
            const title = link.textContent;
            const linkId = "link-" + index + "-" + title
                .toLowerCase()
                .trim()
                .replaceAll(" ", "-")
                .replaceAll(/[^a-z0-9-]/g, "");
            
            link.setAttribute("id", linkId);
            output += `<li><a href="#${linkId}">${title}</a></li>`;
        });
        output += "</ul>";
    }
    
    container.innerHTML = output;
    console.log("TOC updated with", headings.length, "sections and", allLinks.length, "links");
}

// Smooth scroll for TOC links
function initSmoothScroll() {
    document.addEventListener('click', function(e) {
        if (e.target.tagName === 'A' && e.target.getAttribute('href')?.startsWith('#')) {
            e.preventDefault();
            
            const targetId = e.target.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'start' 
                });
                
                // Highlight the target temporarily
                targetElement.style.backgroundColor = 'rgba(138, 222, 222, 0.3)';
                setTimeout(() => {
                    targetElement.style.backgroundColor = '';
                }, 1000);
            }
        }
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM loaded, initializing...");
    
    initTableOfContents();
    initSmoothScroll();
});