document.addEventListener("DOMContentLoaded", function () {
    const submitButton = document.getElementById("submitButton");
    const reportButton = document.getElementById("showReport");
    const monthFilterButton = document.getElementById("filterByMonth");
    const reportDiv = document.getElementById("report");

    // Posuvníky - aktualizace hodnot
    document.querySelectorAll('input[type="range"]').forEach(range => {
        range.addEventListener("input", function () {
            this.nextElementSibling.textContent = this.value;
        });
    });

    // Ukládání dat do lokálního úložiště při odeslání
    submitButton.addEventListener("click", function () {
        const selectedPerson = document.querySelector('input[name="person"]:checked');
        if (!selectedPerson) {
            alert("Vyberte osobu.");
            return;
        }

        // Získání hodnot z formuláře
        const formData = {
            person: selectedPerson.value,
            mleko: document.getElementById("mleko").value,
            espresso: document.getElementById("espresso").value,
            caffe: document.getElementById("caffe").value,
            long: document.getElementById("long").value,
            doppio: document.getElementById("doppio").value,
            date: new Date().toISOString() // Uložíme datum jako ISO formát
        };

        // Uložení do localStorage
        let coffeeRecords = JSON.parse(localStorage.getItem("coffeeRecords")) || [];
        coffeeRecords.push(formData);
        localStorage.setItem("coffeeRecords", JSON.stringify(coffeeRecords));

        alert("Údaje o kávě byly úspěšně uloženy.");
    });

    // Zobrazení celkového přehledu
    reportButton.addEventListener("click", function () {
        let coffeeRecords = JSON.parse(localStorage.getItem("coffeeRecords")) || [];
        displayReport(coffeeRecords);
    });

    // Filtrování dle měsíce
    monthFilterButton.addEventListener("click", function () {
        const selectedMonth = parseInt(document.getElementById("monthSelect").value);
        let coffeeRecords = JSON.parse(localStorage.getItem("coffeeRecords")) || [];

        // Filtrace podle měsíce
        const filteredRecords = coffeeRecords.filter(record => {
            const recordDate = new Date(record.date);
            return recordDate.getMonth() + 1 === selectedMonth;
        });

        displayReport(filteredRecords);
    });

    // Funkce pro vykreslení přehledu
    function displayReport(data) {
        reportDiv.innerHTML = "";
        if (data.length === 0) {
            reportDiv.innerHTML = "<p>Nebyla nalezena žádná data.</p>";
        } else {
            data.forEach(item => {
                reportDiv.innerHTML += `<p><strong>${item.person}</strong>: mleko: ${item.mleko
                }, Espresso: ${item.espresso}, Caffe: ${item.caffe}, Long: ${item.long}, Doppio: ${item.doppio} - Datum: ${new Date(item.date).toLocaleDateString()}</p>`;
            });
        }
    }
});
