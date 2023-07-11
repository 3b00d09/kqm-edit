export default function tabbedContentToMarkdown(doc:Document){

    doc.querySelectorAll(".wp-block-ub-tabbed-content").forEach((tabbed)=>{
        
        // go over tab panels and just yoink them, dont need to care about headers every tab panel starts with a header anyway
        let map:Array<Element> = []

        tabbed.querySelectorAll("[role=tabpanel]").forEach((panel)=>{
            map.push(panel)
        })

        let finalContent:string = ""
        map.forEach((item:Element)=>{
            finalContent += `\n ${item.innerHTML} \n`
        })
        tabbed.replaceWith(new DOMParser().parseFromString(finalContent, "text/html").body)
    })

    return doc;
}