function searchCity() {
    const keyword = document.getElementById("destinationSearch").value.toLowerCase();
    const display = document.getElementById("result");
    display.innerHTML = "";
    function addSubDisplay(location) {
        const subDisplay = document.createElement("div");
        subDisplay.innerHTML += `<h2>${location.name}</h2>`;
        subDisplay.innerHTML += `<img src="${location.imageUrl}" alt="image">`;
        subDisplay.innerHTML += `<p><strong>${location.description}</strong></p>`;

        display.appendChild(subDisplay);
    }
    fetch("travel_recommendation_api.json")
    .then(response => response.json())
    .then(data => {
        if (keyword === "beach") {
            const beaches = data.beaches;
            beaches.forEach((location) => {addSubDisplay(location);})
        } else if (keyword === "temple") {
            const temples = data.temples;
            temples.forEach((location) => {addSubDisplay(location);})
        } else {
            const country = data.countries.find(item => item.name.toLowerCase() === keyword);
            if (country) {
                country.cities.forEach((location) => {addSubDisplay(location);})
            } else {
                window.alert("Bad search! We only accepts \"beach\", \"temple\", \"australia\", \"japan\", \"brazil\" (Case insensitive).");
            }
        }
    })
}
btnSearch.addEventListener("click", searchCity);