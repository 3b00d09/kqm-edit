export function convertTableToMarkdown(htmlData:Document){
    
    htmlData.querySelectorAll("table").forEach((table) =>{
        // get all rows so we can go to first row and count how many columns we have
        const rows = table.querySelectorAll("tr")
        const firstRow = rows[0]

        // count how many columns we have from the first row
        let firstCol = firstRow.querySelectorAll("td")
        // some tables use th with <thead>
        if(firstCol.length === 0){
            firstCol = firstRow.querySelectorAll("th")
        }

        // the variable that will hold the final markdown table
        let mdTable:string = ""

        // the first row in our markdown table that we'll get from innerText in every td in the first tr
        let headerRow:string = "\n | "

        // the second row in a markdown table that defines how many columns we have
        let seperateRow:string = " | "

        // populate header row and the seperate row following it
        firstCol.forEach((col) =>{
            headerRow = headerRow + col.innerText.trim() + " | " 
            seperateRow = seperateRow + "--- | "
        })
        mdTable += headerRow + "\n" + seperateRow + "\n"


        // loop over every row in our table
        rows.forEach((row) =>{
            // ignore first row we already dealt with it
            if(row === firstRow) return
            mdTable += " | "
            // loop over every cell in that row and start populating
            const cells = row.querySelectorAll("td")
            cells.forEach((cell) =>{
                mdTable += cell.innerText.trim() + " | "
            })
            mdTable += "\n"
        })
        table.replaceWith(mdTable)
    })
    
    return htmlData
}