document.addEventListener("DOMContentLoaded", () => {
    const tabs = Array.from(document.querySelectorAll(".tab__navigation .tab"));
    const tabsContent = Array.from(document.querySelectorAll(".tab__contents .tab__content"));

    tabs.forEach((tab, index) => tab.addEventListener("click", event => {
        //reset tabs
        const changedChecker = document.querySelector(".tab.tab_active");
        const changedTab = document.querySelector(".tab__content.tab__content_active");

        if(changedChecker && changedTab) {
            changedChecker.classList.remove("tab_active");
            changedTab.classList.remove("tab__content_active");
        }

        //set currrent tab
        if(tabs[index] && tabsContent[index]) {
            tabs[index].classList.add("tab_active"); 
            tabsContent[index].classList.add("tab__content_active");
        }
    }));
});