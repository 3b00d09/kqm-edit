export default function listToMarkdown(doc:Document){
    doc.querySelectorAll("ul").forEach((list)=>{
        let fullList:string = ""
        list.querySelectorAll("li").forEach((item)=>{
            item.innerText = item.innerText.trim()
            fullList += "+ " + item.innerText + "\n"
            
        })
        list.replaceWith(fullList)
    })

    doc.querySelectorAll("ol").forEach((list)=>{
        let fullList:string = ""
        list.querySelectorAll("li").forEach((item, i)=>{
            fullList +=  `${i + 1}. ` + item.innerText + `\n`
        })
        list.replaceWith(fullList)
    })
    return doc
}