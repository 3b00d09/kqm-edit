export default function paragraphToMarkdown(doc:Document){
    
    doc.querySelectorAll("p").forEach((paragraph)=>{
        // <strong> will get mixed in with <p> and looks yikes
        paragraph.querySelectorAll("strong").forEach((el) =>{
            
            if(el.textContent) el.replaceWith(" " + el.innerText + " ")
        })

        paragraph.replaceWith("\n",paragraph.innerText, "\n")
    })

    // my attempt at grabbing text from divs (idk if it actually works properly but it kind of does)
    doc.querySelectorAll("div").forEach((div) =>{
        Array.from(div.childNodes).forEach((child) => {
            if(child.nodeType === Node.TEXT_NODE) child.replaceWith("\n" , child.textContent || "", "\n ");
        });
    });
    
    return doc
}