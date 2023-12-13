import { convertTableToMarkdown } from "./functions/tableToMarkdown"
import headerToMarkdown from "./functions/headersToMarkdown"
import paragraphToMarkdown from "./functions/paragraphToMarkdown"
import listToMarkdown from "./functions/listToMarkdown"
import linksToMarkdown from "./functions/linksToMarkdown"
import accordionToMarkdown from "./functions/accordionToMarkdown"
import tabbedContentToMarkdown from "./functions/tabbedContentToMarkdown"
import removeImages from "./functions/removeImages"
import filterToMarkdown from "./functions/filterToMarkdown"
import captionToText from "./functions/captionToText"

export default function HtmlToMarkdown(HtmlDocument:Document){

   HtmlDocument =  headerToMarkdown(HtmlDocument)
   HtmlDocument = convertTableToMarkdown(HtmlDocument)
   HtmlDocument = paragraphToMarkdown(HtmlDocument)
   HtmlDocument = listToMarkdown(HtmlDocument)
   HtmlDocument = linksToMarkdown(HtmlDocument)
   HtmlDocument = accordionToMarkdown(HtmlDocument)
   HtmlDocument = tabbedContentToMarkdown(HtmlDocument)
   HtmlDocument = removeImages(HtmlDocument)
   HtmlDocument = filterToMarkdown(HtmlDocument)
   HtmlDocument = captionToText(HtmlDocument)
   
   
    return HtmlDocument
}