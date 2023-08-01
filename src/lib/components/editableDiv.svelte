<script lang="ts">
	import SvelteMarkdown from "svelte-markdown";

    let loadMarkdown = false;
    export let markdownContent:string = ""

    $:{
        if(markdownContent.length > 0) loadMarkdown = true;
    }


</script>


<div 
    class="flex-1 p-4 bg-gray-800 rounded-lg overflow-auto"
>
    {#if loadMarkdown}
        <SvelteMarkdown source={markdownContent}/>
    {/if}
</div>

<div 
    class="flex-1 p-4 bg-gray-800 rounded-lg hover:cursor-pointer overflow-auto"
    contenteditable={true}
>
    {#if loadMarkdown}
        <SvelteMarkdown source={markdownContent}/>
    {/if}
</div>
