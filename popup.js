function callApi() {
    chrome.tabs.getSelected(null, function(tab) {
        var ur = new URL(tab.url);
        var input = ur.hostname;
        var url = 'http://127.0.0.1:5000/input/' + input;
        fetch(url)
            .then(res => res.json())
            .then(function(data) {
                let obj = data.val;
                var activeTabUrl1 = document.getElementById("header-title");
                var text1 = document.createTextNode("The Permissions required by the website are :\n");
                activeTabUrl1.appendChild(text1);
                for (let keyword in obj) {
                    text2 = document.createTextNode(obj[keyword] + ", ");
                    activeTabUrl1.appendChild(text2);
                }

            })
            .catch(err => console.log(err));
    })
}

function showCookiesForTab(tabs) {
    //to get the first tab object in the array
    var tab = tabs;
    chrome.cookies.getAll({
        domain: tab.url
    }, function(cookies) {
        //set the header of the panel
        var activeTabUrl = document.getElementById("header-title");
        var text = document.createTextNode("Cookies at: " + tab.title + "\n");
        var cookieList = document.getElementById('cookie-list');
        activeTabUrl.appendChild(text);
        if (cookies.length >= 0) {
            //add an <li> item with the name and value of the cookie to the list
            for (let cookie of cookies) {
                let li = document.createElement("li");
                let content = document.createTextNode(cookie.name + ": " + cookie.value);
                li.append(content);
                cookieList.appendChild(li);
            }
        } else {
            let p = document.createElement("p");
            let content = document.createTextNode("No cookies in this tab.");
            let parent = cookieList.parentNode;

            p.appendChild(content);
            parent.appendChild(p);
        }
    });
}

//get active tab to run an callback function.
//it sends to our callback an array of tab objects
function getActiveTab() {
    return chrome.tabs.getSelected(null, function(tab) {
        showCookiesForTab(tab);
    });

}
callApi();
getActiveTab();