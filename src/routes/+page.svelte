<script lang="ts">
    import { goto } from '$app/navigation';
    let textareaContent: string = '';

    function handleClick() {
        // attempt to clear as much whitespace as we can
        const trimmed = textareaContent.replace(/>\s+</g, '><').replace(/<!--.*?-->/g, '').replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '').trim();
        localStorage.setItem("html-data", JSON.stringify(trimmed))
        goto("/edit")
    }
</script>

<main class="grid place-items-center mt-16">
    <div class="flex flex-col gap-4">
        <textarea name="html-input" bind:value={textareaContent}></textarea>
        <button type="submit" on:click={handleClick}>Convert to Markdown</button>   
    </div>
</main>

<style>
    textarea{
        min-height: 400px;
        min-width: 400px;
        resize: both;
        padding: 16px;
    }
</style>
