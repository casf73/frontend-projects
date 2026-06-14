window.addEventListener("load", function () {
    const title = document.querySelector(".title");
    const bg = document.querySelector(".page-bg");

    setTimeout(function () {
        title.classList.add("small");
    }, 500);

    setTimeout(function () {
        bg.classList.add("show");
        title.classList.add("white");
    }, 2500);
});