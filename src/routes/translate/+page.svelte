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
        const data = new DOMParser().parseFromString(translateDate, "text/html")

        data.querySelectorAll("video").forEach((video)=>{
            video.remove();
        })

        data.querySelectorAll("img").forEach((img)=>{
            img.remove();
        })

        data.querySelectorAll("iframe").forEach((iframe)=>{
            iframe.remove();
        })

        // tabbed content
        data.querySelectorAll(".wp-block-ub-tabbed-content").forEach((el)=>{
            // gets rid of all the headers of the tabs
            if(el.firstChild) el.removeChild(el.firstChild)
            el.childNodes.forEach((child)=>{
                child.before(document.createElement("hr"))
                
            })
        })

        // accordions
        data.querySelectorAll(".wp-block-ub-tabbed-content-accordion-toggle").forEach((el)=>{
            el.remove()
        })

        data.querySelectorAll(".wp-block-ub-content-toggle-accordion-title-wrap").forEach((el)=>{
            if(el.firstChild){
                el.firstChild.childNodes.forEach((child)=>{
                    child.before(document.createElement("hr"))
                })
            }
        })

        data.querySelectorAll(".wp-block-ub-content-toggle-accordion-content-wrap").forEach((el)=>{
            el.childNodes.forEach((child)=>{
                child.appendChild(document.createElement("hr"))
            })
        })

        // content filters

        // remove filter header section because every filter section starts with header 
        data.querySelectorAll(".ub-content-filter-category").forEach((header)=>{
            header.remove()
        })

        translateDate = data.body.innerHTML
    })
    
    const setTranslateData = () =>{
        const trimmed = textareaContent //remove style tags
                                        .replace(/style="[^"]*"/g, '')
                                        // removes <a> tags but keep text content
                                        .replace(/<a[^>]*>(.*?)<\/a>/g, '$1')
                                        // remove whitespace
                                        .replace(/>\s+</g, '><')
                                        // removes comments
                                        .replace(/<!--.*?-->/g, '')
                                        // removes script tags
                                        .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
                                        // replaces headers with a horizontal break
                                        .replace(/<h[123456]/g, '<hr>$&')
                                        .trim();

        localStorage.setItem("translate-data", JSON.stringify(trimmed))
        location.reload()
    }

    const clearTranslation = () =>{
        localStorage.removeItem("translate-data")
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
        <button class="m-2 w-full p-4" on:click={clearTranslation}>Clear Translation</button>
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

<style>
    :global(hr){
        border: 2px solid white;
    }
</style>