document.addEventListener("DOMContentLoaded", function () {
    // Získáme reference na formulář a tlačítka                                                                                                                                                                                                         //fake ass
    const coffeeForm = document.getElementById("coffeeForm");
    const submitButton = document.getElementById("submitButton");
    const reportButton = document.getElementById("showReport");
    const reportDiv = document.getElementById("report");

    // Definujeme pole názvů všech typů nápojů
    const ranges = ["mleko", "espresso", "caffe", "long", "doppio"];
    
    // Pro každý typ nápoje nastavíme událost, která aktualizuje hodnotu rozsahu
    ranges.forEach(function (range) {
        const rangeInput = document.getElementById(range); // Input typu range
        const rangeValue = document.getElementById(range + "Value"); // Zobrazení hodnoty
        rangeInput.addEventListener("input", function () {
            rangeValue.textContent = rangeInput.value; // Aktualizace zobrazené hodnoty na stránce
        });
    });

    //tlačítko "Odeslat"
    submitButton.addEventListener("click", function () {
        // Získáme vybranou osobu z formuláře (radio input)
        const selectedPerson = document.querySelector('input[name="person"]:checked');
        
        // Pokud není vybrána osoba, zobrazí se varování a odeslání se zastaví
        if (!selectedPerson) {
            alert("Vyberte osobu.");
            return;
        }

        // Vytvoříme objekt obsahující data formuláře
        const formData = {
            person: selectedPerson.value, // Hodnota vybrané osoby
            mleko: document.getElementById("mleko").value, // Hodnoty jednotlivých nápojů
            espresso: document.getElementById("espresso").value,
            caffe: document.getElementById("caffe").value,
            long: document.getElementById("long").value,
            doppio: document.getElementById("doppio").value
        };

        // Vytvoření požadavku XMLHttpRequest pro odeslání dat na server
        const xhr = new XMLHttpRequest();
        xhr.open("POST", "/procedure.php?cmd=saveDrinks", true); // Typ požadavku a URL
        xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8"); // Nastavení typu obsahu
        xhr.onload = function () {
            // Kontrola, zda byl požadavek úspěšně dokončen (status 200 = OK)
            if (xhr.status === 200) {
                alert("Data byla úspěšně odeslána!");
            } else {
                alert("Došlo k chybě při odesílání dat."); // Ošetření chyby při odeslání dat
            }
        };
        xhr.send(JSON.stringify(formData)); // Odeslání dat jako JSON na server
    });

    //tlačítko "Zobrazit přehled"
    reportButton.addEventListener("click", function () {
        // Vytvoření GET požadavku pro získání přehledu nápojů z serveru
        const xhr = new XMLHttpRequest();
        xhr.open("GET", "/procedure.php?cmd=getDrinksReport", true); // URL pro získání přehledu
        xhr.onload = function () {
            // Pokud byl požadavek úspěšný, zobrazíme přehled
            if (xhr.status === 200) {
                reportDiv.innerHTML = xhr.responseText; // Vložíme přijatý HTML obsah do divu pro přehled
            } else {
                alert("Došlo k chybě při načítání přehledu."); // Ošetření chyby při získávání dat
            }
        };
        xhr.send(); // Odeslání požadavku
    });
});
