export default function captionToText(doc:Document){
    doc.querySelectorAll("figcaption").forEach((caption)=>{
        caption.replaceWith("\n \n" + caption.innerText + "\n \n")
    })

    return doc;
}