export default function headerToMarkdown(htmlData:Document){
    htmlData.querySelectorAll("h1, h2, h3, h4, h5, h6").forEach((header) =>{
        // get the last value in the header node name, this will return 1 for H1, 2 for H2, etc..
        const count = parseInt(header.nodeName[header.nodeName.length - 1])
        //  need an empty line befor and every header cause best practices
        header.replaceWith("\n", `${"#".repeat(count)} ${header.textContent}`, "\n ")
    })
    return htmlData
}