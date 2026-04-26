/*
  Template to use to create a new parser
*/
"use strict";

// Use this function if site's host name is sufficient.  
// i.e. All pages are on same site, and use same format.
parserFactory.register("daotekno.com", () => new DaoTeKnoParser());


class DaoTeKnoParser extends Parser { // eslint-disable-line no-unused-vars
    constructor() {
        super();
        //Optional Parameters:

        this.minimumThrottle = 3000;
    }

    async getChapterUrls(dom, chapterUrlsUI) {
        
        // Need to walk multiple ToC pages, page by page
        return (await this.walkTocPages(dom, 
            DaoTeKnoParser.chaptersFromDom, 
            DaoTeKnoParser.nextTocPageUrl, 
            chapterUrlsUI
        ));

    }

    findContent(dom) {
        // typical implementation is find node with all wanted content
        // return is the element holding just the wanted content.
        return dom.querySelector(".epcontent");
    }
    

    // title of the story  
    extractTitleImpl(dom) {
        return dom.querySelector("h1");
    }
    
    // metadata sections removed for simplicity since I'm trying to scrape directly from daotekno which doesn't include the metadata instead of daotranslate which doesn't include content


    // Optional, supply if individual chapter titles are not inside the content element
    /* can't tell because of issues with their mobile page
    findChapterTitle(dom) {
        // typical implementation is find node with the Title
        // Return Title element, OR the title as a string
        return dom.querySelector("h3.dashhead-title");
    }
    */

    // return true if response is a challenge response
    isCustomError(response){
        return (response.responseXML.title == "Just a moment...");
    }

    // what to do if encounter challenge
    setCustomErrorResponse(url, wrapOptions){
        let newresp = {};
        newresp.url = url;
        newresp.wrapOptions = wrapOptions;
        newresp.response = {};
        newresp.response.url = this.RestToUrl(checkedresponse.response.url);
        newresp.response.status = 403;
        return newresp;
    }
}
