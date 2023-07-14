<script lang="ts">

    let embedLink:string = ""
    let thumbnailUrl:string = ""
    let messageDiv:HTMLDivElement;
    let embedContainer:HTMLElement;

    const convertLinkToFrame = () =>{
        const thumbnailImage = document.createElement("img")
        thumbnailImage.src = thumbnailUrl
        thumbnailImage.setAttribute("onclick", "replaceEmbed(event)")
        const scriptTag = document.createElement("script")
        embedLink = "`" + embedLink + "`"
        scriptTag.textContent = 
         `
            const replaceEmbed = (e) =>{
                const embedLink = ${embedLink}
                const tempDOM = new DOMParser().parseFromString(embedLink,"text/html")
                const newFrameElement = tempDOM.querySelector("iframe")
                newFrameElement.height = "100%"
                newFrameElement.width = "100%"
                e.target.replaceWith(newFrameElement)
            }
        `

        const finalEmbedContainer = scriptTag.outerHTML + "\n" + thumbnailImage.outerHTML
        embedContainer.textContent = (finalEmbedContainer)
    }

    const copyToClipboard = () =>{
        if(embedContainer.textContent){
            try{
            navigator.clipboard.writeText(embedContainer.textContent)
            messageDiv.textContent = "Copied Sucessfully"
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
    <input bind:value={embedLink} class="p-2 rounded-full" type="text" placeholder="Youtube link"/>
    <input bind:value={thumbnailUrl} class = "p-2 rounded-full" type="text" placeholder="image url"/>
    <button class="p-2" on:click={convertLinkToFrame}>Convert</button>
    <div class="grid bg-gray-900 my-6">
        <pre class="max-w-[100%] overflow-x-auto word-break">
            <code bind:this={embedContainer}></code>
        </pre>
    </div>
    <button on:click={copyToClipboard} class="p-2">Copy</button>
    <div bind:this={messageDiv} class="message mt-4"></div>
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