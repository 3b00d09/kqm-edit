export default function replaceBR(doc:Document){
    doc.querySelectorAll("br").forEach((br)=>{
        br.replaceWith("<br>")
    })
    return doc;
    
}