function initTableOfContents() {
    const container = document.querySelector("#toc");
    if (!container) return;
    
    // Look for both h2 and h3 headings
    const allHeadings = document.querySelectorAll("h2, h3, a");
    if (allHeadings.length < 2) return;
    
    let output = "<b>Table of Contents:</b><ol>";
    
    [...allHeadings].forEach((headingEl) => {
        const title = headingEl.innerHTML;
        const link = headingEl.getAttribute("id") || encodeURI(
            title
                .replaceAll(" ", "-")
                .replaceAll("#", "")
                .replaceAll("&", "")
                .replaceAll(/<[^>]*>?/gm, "")
                .replaceAll("--", "-")
        ).toLowerCase();
        
        headingEl.setAttribute("id", link);
        output += `<li><a href="#${link}">${title}</a></li>`;
    });
    
    container.innerHTML = output + "</ol>";
}

// Call the function
initTableOfContents();