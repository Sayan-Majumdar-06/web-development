document.addEventListener("DOMContentLoaded", function () {
    const display = document.querySelector(".display-container");
    const calcButtons = document.querySelectorAll(".calc-button");

    calcButtons.forEach(btn => {
        btn.addEventListener("click",function displayData() {

            if(btn.textContent === "Clear") {
                display.textContent = "";
            }
            
            else if(btn.textContent === "del") {
                var string = display.textContent;
                string = string.substr(0,string.length-1);
                display.textContent = string;
            } 
            
            else if(btn.textContent === "=") {
                display.textContent = eval(display.textContent);
            }

            else {
                if(display.textContent.length <= 20) {
                    display.textContent = display.textContent + btn.textContent;
                }
            }
        });
    });
});