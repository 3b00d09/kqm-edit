// accordions are kinda just working for now so can do this later

export default function accordionToMarkdown(doc:Document){

    doc.querySelectorAll(".wp-block-ub-content-toggle").forEach((accordion)=>{

        // need to trim cause there is whitespace sometimes
        const header = `##### ${accordion.querySelector(".wp-block-ub-content-toggle-accordion-title-wrap")?.textContent?.trim()}` || ""
        const content = accordion.querySelector("[role=region]")?.textContent || ""
        accordion.replaceWith(header, '\n', content)
    })
    
    return doc;
}