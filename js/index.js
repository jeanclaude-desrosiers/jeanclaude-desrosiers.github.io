const load = $.proxy(localStorage.getItem, localStorage),
  save = $.proxy(localStorage.setItem, localStorage);
let errorHideTimeout;

function displayError(t) {
  clearTimeout(errorHideTimeout), $("button#lang").attr("data-content", t), $("button#lang").popover("show"), errorHideTimeout = setTimeout(() => $("button#lang").popover("hide"), 4e3)
}

function changeLanguage(t) {
  save("lang", t), sendAJAX()
}

function sendAJAX(t = load("lang")) {
  $.ajax({
    url: `res/${t}.json`,
    dataType: "json",
    async: !0,
    success: updateWords,
    error: t => displayError(`${t.status} : ${t.statusText}`)
  })
}

function updateWords(t) {
  $("#lang").text(t.lang), $("#lang").attr("data-title", t.error), $("#alt").attr("alt", t.profile), $("#heading").text(t.welcome), $("#short-1").text(t.nerd), $("#short-2").text(t.puns), $("#short-3").text(t.people), $("#presentation-name").text(t.name), $("#presentation-occupation").text(t.occupation), $("#presentation-closing").text(t.challenge), $("#cv-link").attr("href", t.cvFile), $("#cv-link").attr("data-original-title", t.cvTooltip), $("#mail-link").attr("data-original-title", t.mailTooltip)
}
$(document).ready(() => {
  $("button#lang").popover({
    animation: !0,
    placement: "auto",
    trigger: "manual",
    content: "Oups, impossible d'obtenir la traduction",
    title: "Il y a eu une erreur"
  }), $("a#mail-link").tooltip({
    animation: !0,
    title: "Vous pouvez me contacter par email"
  }), $("a#cv-link").tooltip({
    animation: !0,
    title: "Voici mon CV"
  }), $("button#lang").click(() => changeLanguage("en" === load("lang") ? "fr" : "en")), changeLanguage("fr")
});