const leaveBtn = document.getElementById("leaveCommentBtn");
const form = document.getElementById("commentForm");

leaveBtn.addEventListener("click", () => {
    form.style.display = form.style.display === "block" ? "none" : "block";
    if(form.style.display === "block"){
    form.scrollIntoView({behavior: "smooth"});
    }
});