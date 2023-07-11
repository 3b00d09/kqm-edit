export default function removeImages(doc:Document){
    doc.querySelectorAll("img").forEach((img)=>{
        img.parentElement?.removeChild(img)
    })
    return doc;
}