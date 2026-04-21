function createUnderConstruction(parentSelector = "body", depth = 0, child = "false") {
    // Build the relative path prefix (e.g., "", "../", "../../")
    const pathPrefix = "../".repeat(depth);

    // Create elements
    const aside = document.createElement("aside");
    aside.className = "under-construction";

    const heading = document.createElement("h2");
    heading.textContent = "UNDER CONSTRUCTION";

    const img = document.createElement("img");
    img.src = pathPrefix + "images/under-construction.gif";
    img.alt = "Under Construction";
    img.className = "under-construction-img";

    const paragraph = document.createElement("p");
    paragraph.textContent = "This page is currently under construction. Please check back later for updates!";

    // Assemble elements
    aside.appendChild(heading);
    aside.appendChild(img);
    aside.appendChild(paragraph);

    // Append to chosen parent
    const parent = document.querySelector(parentSelector);
    if (parent) {
        if(child === "false"){
            parent.after(aside);
        } else {
            parent.appendChild(aside);
        }
    } else {
        console.warn("Parent element not found:", parentSelector);
    }
}