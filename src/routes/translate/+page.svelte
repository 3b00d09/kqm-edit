<script lang="ts">
	import { onMount } from "svelte";

    let translateDate:any;
    let mkDown:HTMLElement
    let contentTable:string|undefined
    let textareaContent: string
    // to make our page wait for us to fetch local storage then display whatever it needs to display (prob can use await instead of a variable)
    let fetchedLocalStorage:boolean = false;

    onMount(async () => {
        translateDate = localStorage.getItem("translate-data")
        fetchedLocalStorage = true
        if(!translateDate){
            return
        } 
        translateDate = JSON.parse(translateDate)
        console.log(translateDate)
    })
    
    const setTranslateData = () =>{
        const trimmed = textareaContent.replace(/<img[^>]*>|<figure[^>]*>[\s\S]*?<\/figure>|<a[^>]*>[\s\S]*?<\/a>/g, '').replace(/>\s+</g, '><').replace(/<!--.*?-->/g, '').replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '').replace(/<h[123456]/g, '<hr class="border-2">$&').trim();
        localStorage.setItem("translate-data", JSON.stringify(trimmed))
        location.reload()
    }

    // const createTable = (doc:HTMLElement) =>{
    //     const table = document.createElement("table")
    //     Array.from(doc.children).forEach((child) =>{
    //         if(child.innerHTML){
    //             const row = document.createElement("tr")
    //             row.classList.add("border-r-2", "w-full")
    //             const firstCol = document.createElement("td")
    //             firstCol.innerHTML = child.innerHTML
    //             firstCol.classList.add("p-2")
    //             const secondCol = firstCol.cloneNode(true)
    //             row.append(firstCol, secondCol)
    //             table.append(row)
    //         }
    //     })
    //     contentTable = table.outerHTML
    // }

</script>

<div class="m-4"> 
    {#if fetchedLocalStorage}
        {#if translateDate}
        <table class="border-2">
            <tr>
                <td class="p-2">
                    {@html translateDate}
                </td>
                <td class="p-2">
                    {@html translateDate}
                </td>
            </tr>
        </table>

        {:else}
            <div class="flex flex-col gap-4 items-center">
                <textarea class="w-4/5" name="html-input" bind:value={textareaContent}></textarea>
                <button class="p-4" type="submit" on:click={setTranslateData}>Convert to columns</button>   
            </div>
        {/if}
    {/if}
    
</div>