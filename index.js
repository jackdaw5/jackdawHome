// Table of Contents Function
function initTableOfContents() {
    const container = document.querySelector("#toc");
    if (!container) {
        console.log("TOC container not found");
        return;
    }
    
    const headings = document.querySelectorAll(".folder-item h3");
    const allLinks = document.querySelectorAll(".folder-links a");
    
    if (headings.length < 1 && allLinks.length < 1) {
        container.innerHTML = "<b>Table of Contents:</b><p>No content yet</p>";
        return;
    }
    
    let output = "<b>Table of Contents:</b>";
    
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
                
                targetElement.style.backgroundColor = 'rgba(138, 222, 222, 0.3)';
                setTimeout(() => {
                    targetElement.style.backgroundColor = '';
                }, 1000);
            }
        }
    });
}

// ============================================
// FIXED: Folder hover positioning - ALWAYS BELOW WITH SCROLLBAR
// ============================================

let hideTimeout;

function initFolderHover() {
    const folderItems = document.querySelectorAll('.folder-item');
    
    folderItems.forEach(item => {
        const image = item.querySelector('.folder-image');
        const links = item.querySelector('.folder-links');
        
        if (!image || !links) return;
        
        image.addEventListener('mouseenter', function(e) {
            if (hideTimeout) {
                clearTimeout(hideTimeout);
            }
            
            document.querySelectorAll('.folder-links').forEach(l => {
                if (l !== links) {
                    l.style.display = 'none';
                }
            });
            
            positionLinks(image, links);
        });
        
        image.addEventListener('mouseleave', function() {
            hideTimeout = setTimeout(() => {
                if (!links.matches(':hover')) {
                    links.style.display = 'none';
                }
            }, 300);
        });
        
        links.addEventListener('mouseenter', function() {
            if (hideTimeout) {
                clearTimeout(hideTimeout);
            }
            links.style.display = 'flex';
        });
        
        links.addEventListener('mouseleave', function() {
            hideTimeout = setTimeout(() => {
                links.style.display = 'none';
            }, 100);
        });
    });
}

// FIXED: Always positions links BELOW the image with scrollbar
function positionLinks(image, links) {
    // Get image position
    const imageRect = image.getBoundingClientRect();
    
    // Get viewport dimensions
    const viewportHeight = window.innerHeight;
    const viewportWidth = window.innerWidth;
    
    // Calculate menu dimensions
    const menuWidth = 200; // 12em ≈ 200px
    
    // Calculate horizontal position (centered under image)
    let leftPos = imageRect.left + (imageRect.width / 2) - (menuWidth / 2);
    
    // Horizontal boundary checks
    if (leftPos < 10) {
        leftPos = 10;
    }
    if (leftPos + menuWidth > viewportWidth - 10) {
        leftPos = viewportWidth - menuWidth - 10;
    }
    
    // ALWAYS position below the image
    let topPos = imageRect.bottom + 5;
    
    // Calculate how much space is available below
    const spaceBelow = viewportHeight - topPos - 10;
    
    // Reset any previous inline styles
    links.style.maxHeight = '';
    
    // If there's very little space below, make it small but still scrollable
    if (spaceBelow < 100) {
        links.style.maxHeight = '80px'; // Minimum usable height
    } 
    // If there's some space but not full 40vh
    else if (spaceBelow < 300) {
        links.style.maxHeight = spaceBelow + 'px'; // Use exact available space
    }
    // Plenty of space - use default
    else {
        links.style.maxHeight = '40vh'; // Default
    }
    
    // Apply position
    links.style.position = 'fixed';
    links.style.top = topPos + 'px';
    links.style.left = leftPos + 'px';
    links.style.width = menuWidth + 'px';
    links.style.display = 'flex';
}

// Hide links when scrolling
function initScrollHide() {
    const main = document.querySelector('main');
    if (main) {
        main.addEventListener('scroll', function() {
            document.querySelectorAll('.folder-links').forEach(links => {
                links.style.display = 'none';
            });
        });
    }
}

// Handle window resize
function initResizeHide() {
    window.addEventListener('resize', function() {
        document.querySelectorAll('.folder-links').forEach(links => {
            links.style.display = 'none';
        });
    });
}

// Initialize everything
document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM loaded, initializing...");
    
    initTableOfContents();
    initSmoothScroll();
    initFolderHover();
    initScrollHide();
    initResizeHide();
});

setTimeout(function() {
    console.log("Running initialization again...");
    initTableOfContents();
}, 500);