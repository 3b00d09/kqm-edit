export default function linksToMarkdown(doc:Document){
    doc.querySelectorAll("a").forEach((element)=>{
        const link = element.href
        const name = element.innerText
        element.replaceWith(`[${name}](${link})`)
    })
    return doc;
}