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

    const ratingContainer = document.getElementById('ratingContainer');
    if (ratingContainer) {
        for (let i = 1; i <= 5; i++) {
            const label = document.createElement('label');
            label.className = 'rating-label';

            const radio = document.createElement('input');
            radio.type = 'radio';
            radio.name = 'rating';
            radio.value = i;
            radio.id = `rating_${i}`;
            radio.required = true;

            const starSpan = document.createElement('span');
            starSpan.className = 'rating-stars';
            starSpan.textContent = '★'.repeat(i) + '☆'.repeat(5 - i);

            const numSpan = document.createElement('span');
            numSpan.className = 'rating-num';
            numSpan.textContent = i;

            label.append(radio, starSpan, numSpan);
            ratingContainer.appendChild(label);
        }
    }

    const featureList = [
        { id: 'battery', name: 'Battery life' },
        { id: 'sound', name: 'Sound quality' },
        { id: 'design', name: 'Design / ergonomics' },
        { id: 'speed', name: 'Performance' },
        { id: 'connect', name: 'Connectivity' }
    ];

    const featuresContainer = document.getElementById('featuresContainer');
    if (featuresContainer) {
        featureList.forEach(f => {
            const label = document.createElement('label');
            const cb = document.createElement('input');
            cb.type = 'checkbox';
            cb.name = 'features';
            cb.value = f.id;
            cb.id = `feat_${f.id}`;
            label.append(cb, document.createTextNode(f.name));
            featuresContainer.appendChild(label);
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