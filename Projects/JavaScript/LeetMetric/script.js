document.addEventListener("DOMContentLoaded", function() {
    const usernameInput = document.querySelector("#username-input");
    const searchButton = document.querySelector("#search-button");
    const userStatsContainer = document.querySelector(".user-stats");
    const metricPiesContainer = document.querySelector(".metric-pies");

    const easyProgressCircle = document.querySelector(".easy-pie");
    const mediumProgressCircle = document.querySelector(".medium-pie");
    const hardProgressCircle = document.querySelector(".hard-pie");

    const easyLabel = document.querySelector("#easy-label");
    const mediumLabel = document.querySelector("#medium-label");
    const hardLabel = document.querySelector("#hard-label");

    const metricCards = document.querySelector(".metric-boxes");

    let temp = userStatsContainer.innerHTML;
    function checkValidity(username) {
        if(username.trim === "") {
            alert("Username can't be empty !");
            return false;
        }

        const regex = /^[a-zA-Z0-9_]{3,20}$/;
        const isValid = regex.test(username);

        if(!isValid) {
            alert("Invalid username !");
        }

        return isValid;
    }
    async function fetchUserDetails(username) {
        searchButton.textContent = "Searching...";
        searchButton.disabled = true;
        userStatsContainer.style.setProperty("display", "none");

        try{
            const proxyUrl = "https://corsproxy.io/";
            const targetUrl = 'https://leetcode.com/graphql';
            
            const myHeaders = new Headers();
            myHeaders.append("content-type", "application/json");

            const graphql = JSON.stringify({
                query: "\n    query userSessionProgress($username: String!) {\n  allQuestionsCount {\n    difficulty\n    count\n  }\n  matchedUser(username: $username) {\n    submitStats {\n      acSubmissionNum {\n        difficulty\n        count\n        submissions\n      }\n      totalSubmissionNum {\n        difficulty\n        count\n        submissions\n      }\n    }\n  }\n}\n    ",
                variables: { "username": `${username}` }
            })

            const requestOptions = {
                method: "POST",
                headers: myHeaders,
                body: graphql,
            };

            const response = await fetch(proxyUrl+targetUrl, requestOptions);

            if(!response.ok) {
                throw new Error("Unable to fetch user data");
            }

            const parsedData = await response.json();
            userStatsContainer.style.setProperty("display", "flex"); 
            displayUserData(parsedData);

            console.log("logging user data :", parsedData);

        } 

        catch(error) {
            alert("Username not found !");
        } 
        
        finally {
            searchButton.textContent = "Search";
            searchButton.disabled = false;  
        }
    }

    function updateProgress(solved, total, label, circle) {
        const percentSolved = (solved / total) * 100;
        circle.style.setProperty("--progress-degree", `${percentSolved}%`);
        label.textContent = `${solved}/${total}`;
    }

    function displayUserData(parsedData) {
        const totalQues = parsedData.data.allQuestionsCount[0].count;
        const totalEasyQues = parsedData.data.allQuestionsCount[1].count;
        const totalMediumQues = parsedData.data.allQuestionsCount[2].count;
        const totalHardQues = parsedData.data.allQuestionsCount[3].count;

        const totalSolvedQues = parsedData.data.matchedUser.submitStats.acSubmissionNum[0].count;
        const easySolvedQues = parsedData.data.matchedUser.submitStats.acSubmissionNum[1].count;
        const mediumSolvedQues = parsedData.data.matchedUser.submitStats.acSubmissionNum[2].count;
        const hardSolvedQues = parsedData.data.matchedUser.submitStats.acSubmissionNum[3].count;

        updateProgress(easySolvedQues, totalEasyQues, easyLabel, easyProgressCircle);
        updateProgress(mediumSolvedQues, totalMediumQues, mediumLabel, mediumProgressCircle);
        updateProgress(hardSolvedQues, totalHardQues, hardLabel, hardProgressCircle);

        const cardsData = [
            {label: "Total Submissions", value: parsedData.data.matchedUser.submitStats.totalSubmissionNum[0].submissions},
            {label: "Total Easy Submissions", value: parsedData.data.matchedUser.submitStats.totalSubmissionNum[1].submissions},
            {label: "Total Medium Submissions", value: parsedData.data.matchedUser.submitStats.totalSubmissionNum[2].submissions},
            {label: "Total Hard Submissions", value: parsedData.data.matchedUser.submitStats.totalSubmissionNum[3].submissions}
        ];

        metricCards.innerHTML = cardsData.map(
            data => {
                return `
                <div class="stat-card">
                    <h3>${data.label}</h3>
                    <p>${data.value}</p>
                </div>
                `
            }
        ).join("");
    }

    searchButton.addEventListener('click', function() {
        const username = usernameInput.value;

        if(checkValidity(username)) {
            fetchUserDetails(username);
        }
    });
});