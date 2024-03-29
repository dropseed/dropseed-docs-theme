require("@dropseed/pitchfork/search")
require("@dropseed/codeplus/dist/browser")

import { Fancybox } from "@fancyapps/ui"
import "@fancyapps/ui/dist/fancybox.css";

Fancybox.bind(".content a > img", {
    // options
});

const videos = document.querySelectorAll(".content video");
if (videos.length > 1) {
    for (const video of videos) {
        video.removeAttribute("autoplay")
        video.addEventListener("mouseenter", event => {
          for (const v of videos) {
            v.pause();
          }
          video.play();
        });
    }
    videos[0].play();  // Start playing the first one
}

// Use / to jump to the search bar
document.addEventListener("keydown", event => {
    if (event.target === document.body && event.key === "/") {
        document.querySelector("[data-pitchfork-input]").focus()
        event.preventDefault()
        return
    }
});

// Highlight links to the current page
for (const activeContainer of document.querySelectorAll("[data-active-url]")) {
    const activeClass = activeContainer.getAttribute("data-active-url")
    for (const link of activeContainer.querySelectorAll("a[href='" + window.location.pathname + "']")) {
        // add every activeClass split by spaces
        for (const active of activeClass.split(" ")) {
            link.classList.add(active)
            // Support nested nav by finding the parent li and highlighting that anchor too
            if (link.parentElement.parentElement.parentElement.tagName === "LI") {
                link.parentElement.parentElement.parentElement.querySelector("a").classList.add(active);
            }
        }
    }
}

// Dynamically populate the "on this page" links
const otp = document.querySelector("[data-on-this-page]")
if (otp) {
    const headings = document.querySelectorAll(".content h2[id], .content h3[id]")
    if (headings.length > 0) {
        const linkClass = otp.getAttribute("data-on-this-page")
        for (const heading of headings) {
            const headingID = heading.getAttribute("id")
            const link = document.createElement("a")
            link.href = "#" + headingID
            link.innerHTML = heading.innerText
            link.className = linkClass
            if (heading.tagName !== "H2") {
                link.classList.add("pl-2")
            }
            otp.appendChild(link)
        }
        otp.style.display = ""
    }
}

// Toggle classes based on scroll position
for (const el of document.querySelectorAll("[data-scroll-class]")) {
    el.addEventListener("scroll", event => {
        const scrollClass = event.target.getAttribute("data-scroll-class").split(" ")
        let hasScrollClass = true
        for (const s of scrollClass) {
            hasScrollClass = hasScrollClass && event.target.classList.contains(s)
        }
        if (event.target.scrollTop === 0 && hasScrollClass) {
            event.target.classList.remove(...scrollClass)
        } else if (!hasScrollClass) {
            event.target.classList.add(...scrollClass)
        }
    })
}

// Mobile nav
const sidebarToggle = document.querySelector("[data-toggle-sidebar]")
if (sidebarToggle) {
    const sidebar = document.querySelector("[data-sidebar]")
    const sidebarToggleClass = sidebarToggle.getAttribute("data-toggle-sidebar")
    document.addEventListener("click", event => {
        // Hide the sidebar if we click anywhere else
        if (!event.target.matches("[data-sidebar] *") && !sidebar.classList.contains(sidebarToggleClass)) {
            sidebar.classList.add(sidebarToggleClass)
        }
    })
    sidebarToggle.addEventListener("click", event => {
        if (sidebar.classList.contains(sidebarToggleClass)) {
            sidebar.classList.remove(sidebarToggleClass)
            event.stopPropagation()
        }
    })
}

// Allow clicks on h1, h2, h3 (without an <a>) and highlight them
// if the url navigates straight to an anchor #hash
for (const heading of document.querySelectorAll("h1[id], h2[id], h3[id]")) {
    if (heading.querySelector("a")) {
        continue;
    }
    heading.classList.add("anchored-heading");
    heading.addEventListener("click", event => {
        event.preventDefault()
        const hash = event.target.getAttribute("id")
        window.history.pushState(null, null, "#" + hash)
        window.dispatchEvent(new HashChangeEvent("hashchange"))
    })
}
const hash = window.location.hash
if (hash) {
    const link = document.querySelector(".anchored-heading[id='" + hash.substr(1) + "']")
    if (link) {
        link.classList.add("active-anchored-heading")
    }
}
