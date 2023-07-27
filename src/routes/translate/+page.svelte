<script lang="ts">
	import { onMount } from "svelte";

    let htmlData:any;
    let mkDown:HTMLElement
    let contentTable:string|undefined

    onMount(async () => {
        htmlData = localStorage.getItem("html-data")
        if(!htmlData){
            return
        } 
        htmlData = JSON.parse(htmlData)
        const doc = new DOMParser().parseFromString(htmlData,"text/html")
        mkDown = doc.body ?? ""
        let temp:HTMLElement|null = mkDown.querySelector(".entry-content")
        temp?.querySelectorAll("img, .wp-block-embed, figure").forEach((el) =>{
            el.remove()
        })
        if(temp) createTable(temp)
    })

    const createTable = (doc:HTMLElement) =>{
        const table = document.createElement("table")
        Array.from(doc.children).forEach((child) =>{
            if(child.innerHTML){
                const row = document.createElement("tr")
                row.classList.add("border-r-2", "w-full")
                const firstCol = document.createElement("td")
                firstCol.innerHTML = child.innerHTML
                firstCol.classList.add("p-2")
                const secondCol = firstCol.cloneNode(true)
                row.append(firstCol, secondCol)
                table.append(row)
            }
        })
        contentTable = table.outerHTML
    }

</script>

<div class="m-4"> 
    {#if contentTable}
        {@html contentTable}
    {:else}
        <div>Please input an HTML element first <a class="text-sky-400" href="/">here</a></div>
    {/if}
    
</div>