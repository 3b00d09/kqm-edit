<script lang="ts">

    let embedLink:string = ""
    let messageDiv:HTMLDivElement;
    let embedContainer:HTMLElement;
    let copyBtn:HTMLButtonElement;
    let prevInput:string = "";

    const convertLinkToFrame = () =>{

        if (prevInput === embedLink) return
        copyBtn.classList.remove("hidden")
        prevInput = embedLink
        // encoding that we undo later on to avoid the iframe crashing the html element causing the image to go poof
        embedLink = embedLink.replaceAll("<","%3C");
        embedLink = embedLink.replaceAll(">", "%3E")
    
        // need to contain everything in parent for the nice center alignmenet with not entire bg being black
        const parentContainer = document.createElement("div")
        parentContainer.classList.add("custom-iframe-parent")

        // the black bg div that also holds the img and the onclick event
        const thumbnailPlaceholder = document.createElement("div")
        thumbnailPlaceholder.classList.add("placeholder-div")
        thumbnailPlaceholder.setAttribute("onclick", "replaceEmbed(event)")
        thumbnailPlaceholder.setAttribute("data-embed-url", embedLink)
        parentContainer.appendChild(thumbnailPlaceholder)

        // the play btn img 
        const playBtnImg = document.createElement("img")
        playBtnImg.setAttribute("src", "https://editors.keqingmains.com/wp-content/uploads/2023/07/YouTube-Logo.webp")
        thumbnailPlaceholder.appendChild(playBtnImg)

        const scriptTag = document.createElement("script")
        const styleTag = document.createElement("style")


        scriptTag.textContent = 
        `
            const replaceEmbed = (e) =>{
                let elementToRemove;
                if(e.target.nodeName === "IMG"){
                    elementToRemove = e.target.parentNode;
                }
                else{
                    elementToRemove = e.target
                }
                elementToRemove.parentNode.style.height = "auto"
                elementToRemove.dataset.embedUrl = elementToRemove.dataset.embedUrl.replaceAll("%3C","<")
                elementToRemove.dataset.embedUrl = elementToRemove.dataset.embedUrl.replaceAll("%3E",">")
                const embedLink = elementToRemove.dataset.embedUrl;
                const tempDOM = new DOMParser().parseFromString(embedLink,"text/html")
                const newFrameElement = tempDOM.querySelector("iframe")
                newFrameElement.height = "100%"
                newFrameElement.width = "100%"
                elementToRemove.replaceWith(newFrameElement)
            }
        `
        styleTag.textContent = 
        `
        .placeholder-div{
            display: grid;
            place-items: center;
            width: 80%;
            height: 100%;
            background-color: black;
        }
    
        .custom-iframe-parent{
            width: 100%; 
            height: 20rem;
            padding: 1rem; 
            display: grid; 
            place-items:center;
        }

        .custom-iframe-parent > iframe{
            aspect-ratio: 16/9;
            width: 80%;
            display: block;
            margin: auto;
        }

        .placeholder-div > img{
            width: 96px;
        }

        @media (max-width: 768px){
            .placeholder-div{
                width: 100%;
            }
            .custom-iframe-parent{
                display: block;
            }
        }
        `

        const finalEmbedContainer = scriptTag.outerHTML + "\n" + parentContainer.outerHTML + "\n" + styleTag.outerHTML
        embedContainer.textContent = (finalEmbedContainer)
    }

    const copyToClipboard = () =>{
        if(embedContainer.textContent){
            try{
            navigator.clipboard.writeText(embedContainer.textContent)
            messageDiv.textContent = "Copied Successfully"
            messageDiv.style.backgroundColor = ("#DDFFDD")
            }
            catch(err){
                messageDiv.textContent = "Failed to copy"
                messageDiv.style.backgroundColor = ("#FFCCCC")
            }
        }

    }

</script>

<div class="m-4">
    <input bind:value={embedLink} class="p-2 rounded-full" type="text" placeholder="Embed Code.."/>
    <button class="p-2" on:click={convertLinkToFrame}>Convert</button>
    <button bind:this={copyBtn} on:click={copyToClipboard} class="p-2 hidden">Copy</button>
    <div bind:this={messageDiv} class="message mt-4"></div>
    <div class="grid bg-gray-900 my-6">
        <pre class="max-w-[100%] overflow-x-auto word-break">
            <code bind:this={embedContainer}></code>
        </pre>
    </div>
</div>

<style>
    .message{
        background-color: "#FFCCCC";
        padding: 6px;
        border-radius: 1rem;
        max-width: fit-content;
        color: black;
        font-size: large;
    }
</style>