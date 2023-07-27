<script lang="ts">
	import { onMount } from "svelte";
    import SvelteMarkdown from 'svelte-markdown'
    import HtmlToMarkdown from "$lib/helpers/HtmlToMarkdown";

    interface word{
        index:number,
        word:string
    }

    let targetWords:string[] = []
    let foundWords:word[] = []
    
    let currIndex = 0;

    let htmlData:any;
    let mkDown:string | undefined | null
    let mkDownEditor:HTMLDivElement;
    let contentContainer:HTMLDivElement;
    
    let wordsExist = false;
    let toggleEditor = true;
    let toggleContent = true;
    // will make loading state work for scan later when it gets big
    let loadingScan = false;


    onMount(async () => {
        htmlData = localStorage.getItem("html-data")
        if(!htmlData){
            return
        } 
        htmlData = JSON.parse(htmlData)
        const doc = new DOMParser().parseFromString(htmlData,"text/html")
        const something = HtmlToMarkdown(doc) 
        mkDown = something.body.textContent
        if(!mkDown) return;
        trimTextareaLines(mkDown);

        const words = await fetch("targetWords.txt")
        const res = await words.text()
        targetWords = res.split(/\s+/);
    })

    const trimTextareaLines = (markdown: string) => {
        let lines = markdown.split('\n');
        // trim whitespace at the start of each line
        let trimmedLines = lines.map(line => line.trimStart());
        mkDown = trimmedLines.join('\n');
        // remove consecutive \ns with just two 
        let trimmedText = mkDown.replace(/\n{2,}/g, '\n\n');
        mkDown = trimmedText;

    }

    const handleChange = () => {
        mkDown = mkDownEditor.textContent || ""
    };

    const scanText = () =>{
        // reset selection so if we are on word 4/5 and we press scan we go back to 0
        currIndex = 0
        // will hold the words that exist but arent capitalized
        foundWords = []
        // will hold the index of the word in textarea 
        let tempIndex = 0
        mkDown?.split(" ").forEach((word)=>{
            // fully upper all > check > if exists, check original version
            targetWords.forEach((targetWord)=>{
                let tempWord = word.toUpperCase()
                let tempTarget = targetWord.toUpperCase()
                if(tempWord === tempTarget){
                    if(!targetWords.includes(word)){
                    let obj = {
                        index: tempIndex,
                        word: word
                    }
                    foundWords.push(obj)
                }
                }
            })
            // tempindex will increase by every word length we iterate over so when we find a word our index will be the length of everything before it
            tempIndex += word.length + 1
        })
        // automatically fly to the first word  if words exist
        if(foundWords.length > 0){
            scrollTextarea()
            wordsExist = true;
        }
        else{
            wordsExist = false;
        }
        
    }

    const previousTargetWord = () =>{
        if(currIndex === 0) return
        currIndex -= 1
        scrollTextarea()
    }

    const nextTargetWord = () =>{
        if(currIndex === foundWords.length - 1) return
        currIndex += 1
        scrollTextarea()

    }

    const scrollTextarea = () =>{
        mkDownEditor.blur()
        mkDownEditor.focus()
        // will use this to navigate the markdown editor with selection range 
        const range = document.createRange()
        range.setStart(mkDownEditor, foundWords[currIndex].index)
        range.setEnd(mkDownEditor, foundWords[currIndex].index + foundWords[currIndex].word.length)
        const selection = window.getSelection()
        selection?.removeAllRanges()
        selection?.addRange(range)
    }

</script>

<div class="m-4">

    {#if !mkDown}
        <div>Please input an HTML element first <a class="text-sky-400" href="/">here</a></div>
    {:else}

        <button on:click={scanText}>Scan</button>
        {#if loadingScan}
            <p>Loading</p>
        {/if}

        {#if !loadingScan && wordsExist}
            <div class="sticky top-0 bg-[#1a1a1a]">
                <p>{currIndex + 1} / {foundWords.length}</p>
                <button on:click={previousTargetWord}>Previous</button>
                <button on:click={nextTargetWord}>Next</button>
                <button on:click={()=>wordsExist = !wordsExist}>Close</button>
            </div>
        {/if}

            <div class="h-full m-4 overflow-auto">
                

                    <div class="flex gap-4 mb-2">
                        <button class="flex-1" on:click={()=>toggleEditor = !toggleEditor}>{toggleEditor ? 'Hide Editor' : 'Show Editor'}</button>
                        <button class="flex-1" on:click={()=>toggleContent = !toggleContent}>{toggleContent ? 'Hide Content' : 'Show Content'}</button>

                    </div>
                    <div class="flex gap-4">
                        <div class="bg-gray-800 whitespace-pre-wrap rounded-lg hover:cursor-pointer p-4 flex-1 h-screen overflow-auto {toggleEditor ? "block" : "hidden"}" 
                        bind:this={mkDownEditor} 
                        on:input={handleChange}
                        contenteditable={true}
                        >
                        {mkDown}
                        </div>
                        <div bind:this={contentContainer} class="flex-1 p-2 bg-gray-800 {toggleContent ? "block" : "hidden"} h-screen overflow-auto">
                            <SvelteMarkdown source={mkDown}/>
                        </div>
                    </div>

                </div>
        {/if}
    
</div>