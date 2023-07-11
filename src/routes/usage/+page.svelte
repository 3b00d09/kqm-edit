<article>
    <div class="flex flex-wrap gap-6">
        <div>
            <h1>About</h1>
            <p>Convert HTML to markdown to lift the majority of work transferring over to new KQM site</p>
            <p>Markdown can be edited and previewed in /edit</p>
            <p>Can also be used to QC transcriptions.</p>
            <p>Evenly scrolling between editor and content is not possible because content will always have shorter height compared to editor (if there's enough content to scroll.)</p>
            <p>Note: Currently this saves work in your browser memory, meaning you cant ask someone else to look at your work just by making them visit the site.</p>
            <li>Will change this in the future so work is shared between everyone</li>
            <p>Message anon64942495 (3b00d) on discord for any changes you want made.</p>
        </div>
        <div class="max-w-[40%]">
            <h1>Spell-checker (Heavily WIP)</h1>
            <p>In the "edit" page you can "scan" text to detect Genshin terms that should be capitalized but aren't. You can press Next and Previous to navigate between words and edit them.</p>
            <p>Note: Every time you press "scan" the app will look for words, if you correct words you must press scan again to avoid have it selected.</p>
            <p>Note #2: If you edit the text AFTER you scan for words it will mess up because the scanner remembers the position of words.</p>
            <p>Note #3: Only works for single-word phrases (ATK, DMG, etc). Words such as Elemental Reaction don't get detected at the moment.</p>
        </div>
    </div>

    <h1>Instructions</h1>
    <ol class="list-decimal mx-6 my-2">
        <li class="my-4">
            Open up the guide page you would like to work on (Sorry I know you already did this)
        </li>
        <li class="my-4">
            Right-click on the guide page and click on "inspect". 
            <img class= "max-w-[500px] my-2" src="/images/InspectElement.png" alt="Right click to open dev tools">
        </li>
        <li class="my-4">
            You should see a console area open on the left of your browser (also known as Dev Tools). Click on the icon with a red arrow pointing to it.
            <img class= "max-w-[500px] my-2" src="/images/Devtools.jpg" alt="Right click to open dev tools">
        </li>
        <li class="my-4">
            You will notice that you can "select" sections in the guide. Stuff will be highlighted as you move your mouse around. Move your mouse to where the red circle is in the image. Our target here is the div with class "inside-article".
            <img class="my-2" src="/images/SelectDiv.jpg" alt="">
        </li>
        <li class="my-4">
            Right-click on inside-article in the console itself and click on "copy" then click on "copy element". Go to the homepage of this site and paste it in and click "Convert".
        </li>
    </ol>
</article>

<style>
    article{
        padding: 1rem;
    }
</style>