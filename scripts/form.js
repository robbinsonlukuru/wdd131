(function () {
    const products = [
        { id: "p1", name: "Laptop Pro X" },
        { id: "p2", name: "Wireless Earbuds" },
        { id: "p3", name: "Smart Watch S8" },
        { id: "p4", name: "Bluetooth Speaker" },
        { id: "p5", name: "USB-C Hub" }
    ];

    const selectEl = document.getElementById('productName');
    if (selectEl) {
        products.forEach(p => {
            const opt = document.createElement('option');
            opt.value = p.id;
            opt.textContent = p.name;
            selectEl.appendChild(opt);
        });
    }

    const dateInput = document.getElementById('installDate');
    if (dateInput) {
        const today = new Date();
        dateInput.value = today.toISOString().split('T')[0];
    }

    const lastModifiedEl = document.getElementById('lastModified');
    if (lastModifiedEl) {
        lastModifiedEl.textContent = document.lastModified;
    }
})();