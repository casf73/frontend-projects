let main = window.addEventListener("load", () => {
    const title = document.querySelector(".title");
    const bg = document.querySelector(".page-bg");

    setTimeout(() => {
        title.classList.add("small");
    }, 500);

    setTimeout(() => {
        bg.classList.add("show");
        title.classList.add("white");
    }, 2500);
});

export {
    main
}