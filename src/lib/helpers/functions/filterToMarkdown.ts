export default function filterToMarkdown(doc:Document){

    doc.querySelectorAll(".wp-block-ub-content-filter").forEach((filter)=>{
        
        // go over tab panels and just yoink them, dont need to care about headers every tab panel starts with a header anyway
        let map:Array<Element> = []

        filter.querySelectorAll(".ub-content-filter-panel").forEach((panel)=>{
            map.push(panel)
        })

        let finalContent:string = ""
        map.forEach((item:Element)=>{
            finalContent += `\n ${item.innerHTML} \n`
        })
        filter.replaceWith(new DOMParser().parseFromString(finalContent, "text/html").body)
    })

    return doc;
}