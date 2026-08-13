(function() {
  'use strict';

  const DATA = {
    restaurants: [
      {
        id: 'r1',
        name: 'Kibandaski Cafe',
        cuisine: 'Kenyan',
        description: 'Authentic local cuisine with nyama choma, ugali, and sukuma wiki. A true taste of Nairobi.',
        image: 'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=600',
        rating: 4.9
      },
      {
        id: 'r2',
        name: 'Talisman Restaurant',
        cuisine: 'African Fusion',
        description: 'Elegant dining in Karen with a blend of African and international flavors. Famous for their lamb chops.',
        image: 'https://images.pexels.com/photos/1640773/pexels-photo-1640773.jpeg?auto=compress&cs=tinysrgb&w=600',
        rating: 4.8
      },
      {
        id: 'r3',
        name: 'Carnivore Restaurant',
        cuisine: 'Barbecue',
        description: 'Nairobi\'s iconic meat lovers paradise. Game meat and unlimited roasted meats carved at your table.',
        image: 'https://images.pexels.com/photos/2323398/pexels-photo-2323398.jpeg?auto=compress&cs=tinysrgb&w=600',
        rating: 4.7
      },
      {
        id: 'r4',
        name: 'Mama Oliech Restaurant',
        cuisine: 'Kenyan',
        description: 'Famous for fried fish (tilapia) with ugali and kachumbari. A local favorite in Eastleigh.',
        image: 'https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=600',
        rating: 4.6
      },
      {
        id: 'r5',
        name: 'Java House',
        cuisine: 'Cafe',
        description: 'Nairobi\'s favorite coffee house serving breakfast, lunch, and amazing Kenyan coffee.',
        image: 'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=600',
        rating: 4.4
      }
    ],
    recipes: [
      {
        id: 'rec1',
        name: 'Nyama Choma with Kachumbari',
        description: 'Grilled meat served with fresh tomato and onion salsa. A Kenyan barbecue classic.',
        image: 'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=600',
        prepTime: '45 min',
        difficulty: 'Medium'
      },
      {
        id: 'rec2',
        name: 'Ugali and Sukuma Wiki',
        description: 'Staple Kenyan meal - cornmeal porridge with sautéed collard greens. Simple and nutritious.',
        image: 'https://images.pexels.com/photos/1640773/pexels-photo-1640773.jpeg?auto=compress&cs=tinysrgb&w=600',
        prepTime: '30 min',
        difficulty: 'Easy'
      },
      {
        id: 'rec3',
        name: 'Kenyan Pilau Rice',
        description: 'Fragrant spiced rice with beef or chicken. A Swahili coastal favorite for special occasions.',
        image: 'https://images.pexels.com/photos/2323398/pexels-photo-2323398.jpeg?auto=compress&cs=tinysrgb&w=600',
        prepTime: '40 min',
        difficulty: 'Medium'
      },
      {
        id: 'rec4',
        name: 'Maharagwe (Bean Stew)',
        description: 'Coconut bean stew with tomatoes and spices. A vegetarian Kenyan comfort food.',
        image: 'https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=600',
        prepTime: '35 min',
        difficulty: 'Easy'
      }
    ],
    events: [
      {
        id: 'e1',
        name: 'Nairobi Street Food Festival',
        date: 'August 28, 2026',
        time: '10:00 AM – 8:00 PM',
        location: 'Uhuru Park',
        description: 'Nairobi\'s largest street food gathering featuring 50+ local vendors, live music, and cooking competitions.'
      },
      {
        id: 'e2',
        name: 'Karen Food and Wine Fair',
        date: 'September 5, 2026',
        time: '2:00 PM – 10:00 PM',
        location: 'Karen Blixen Museum Gardens',
        description: 'Premium wine tasting with gourmet food from Nairobi\'s top chefs. Live jazz performances.'
      },
      {
        id: 'e3',
        name: 'Kibandaski Farmers Market',
        date: 'September 12, 2026',
        time: '7:00 AM – 2:00 PM',
        location: 'Kibandaski Market',
        description: 'Fresh local produce, artisanal foods, and homemade Kenyan delicacies. Meet the farmers!'
      },
      {
        id: 'e4',
        name: 'Carnivore Grill & Chill',
        date: 'September 19, 2026',
        time: '6:00 PM – 11:00 PM',
        location: 'Carnivore Grounds',
        description: 'All-you-can-eat barbecue night with live entertainment. Special game meat tasting menu available.'
      }
    ]
  };

  function renderStars(rating) {
    const full = Math.floor(rating);
    const half = rating % 1 >= 0.5 ? 1 : 0;
    const empty = 5 - full - half;
    let stars = '';
    for (let i = 0; i < full; i++) stars += '⭐';
    if (half) stars += '½';
    for (let i = 0; i < empty; i++) stars += '☆';
    return stars;
  }

  function buildCard(item, type) {
    let content = '';

    if (type === 'restaurant') {
      content = `
        <div class="card" data-id="${item.id}" data-type="${type}">
          <h3>${item.name}</h3>
          <div class="meta">
            <span class="tag">${item.cuisine}</span>
            <span>${renderStars(item.rating)}</span>
          </div>
          <img class="card-image" src="${item.image}" alt="${item.name}" loading="lazy" />
          <p>${item.description}</p>
          <button class="btn btn-primary save-btn" data-id="${item.id}" data-name="${item.name}" data-type="${type}">❤️ Save</button>
        </div>
      `;
    } else if (type === 'recipe') {
      content = `
        <div class="card" data-id="${item.id}" data-type="${type}">
          <h3>${item.name}</h3>
          <div class="meta">
            <span>⏱️ ${item.prepTime}</span>
            <span class="tag">${item.difficulty}</span>
          </div>
          <img class="card-image" src="${item.image}" alt="${item.name}" loading="lazy" />
          <p>${item.description}</p>
          <button class="btn btn-primary save-btn" data-id="${item.id}" data-name="${item.name}" data-type="${type}">❤️ Save</button>
        </div>
      `;
    } else if (type === 'event') {
      content = `
        <div class="card" data-id="${item.id}" data-type="${type}">
          <h3>${item.name}</h3>
          <div class="meta">
            <span>📅 ${item.date}</span>
            <span>🕐 ${item.time}</span>
          </div>
          <p><strong>📍 ${item.location}</strong></p>
          <p>${item.description}</p>
          <button class="btn btn-primary save-btn" data-id="${item.id}" data-name="${item.name}" data-type="${type}">❤️ Save</button>
        </div>
      `;
    }

    return content;
  }

  function getSavedItems() {
    try {
      return JSON.parse(localStorage.getItem('foodieSaves')) || [];
    } catch {
      return [];
    }
  }

  function saveItem(item) {
    const saved = getSavedItems();
    const exists = saved.some(function(s) {
      return s.id === item.id;
    });
    if (!exists) {
      saved.push(item);
      localStorage.setItem('foodieSaves', JSON.stringify(saved));
      return true;
    }
    return false;
  }

  function removeItem(id) {
    let saved = getSavedItems();
    saved = saved.filter(function(item) {
      return item.id !== id;
    });
    localStorage.setItem('foodieSaves', JSON.stringify(saved));
  }

  function getNewsletterSubs() {
    try {
      return JSON.parse(localStorage.getItem('newsletterSubs')) || [];
    } catch {
      return [];
    }
  }

  function addNewsletterSub(email) {
    const subs = getNewsletterSubs();
    if (!subs.includes(email)) {
      subs.push(email);
      localStorage.setItem('newsletterSubs', JSON.stringify(subs));
      return true;
    }
    return false;
  }

  function renderHome() {
    const container = document.getElementById('pageContent');
    const restaurants = DATA.restaurants;

    let cardsHtml = restaurants.map(function(r) {
      return buildCard(r, 'restaurant');
    }).join('');

    const savedCount = getSavedItems().length;
    const savedBadge = savedCount > 0 ? 
      `<span style="background:#F1C40F; padding:0.1rem 0.8rem; border-radius:1rem; font-size:0.8rem;">❤️ ${savedCount} saved</span>` : '';

    const html = `
      <section>
        <h2>Discover Nairobi's Best Bites</h2>
        <p style="font-size:1.1rem; color:#5D6D7E;">
          Explore local restaurants, seasonal recipes, and community events in Nairobi.
          ${savedBadge}
        </p>
        <div class="grid">${cardsHtml}</div>

        <div class="highlight-box">
          <h3>📬 Stay in the Loop</h3>
          <p>Get weekly foodie updates straight to your inbox. No spam, just delicious content.</p>
          <form id="newsletterForm">
            <div class="form-row">
              <div class="form-group">
                <label for="newsEmail">Email Address</label>
                <input type="email" id="newsEmail" placeholder="you@example.com" required />
              </div>
              <div class="form-group" style="display:flex; align-items:flex-end;">
                <button type="submit" class="btn btn-primary">Subscribe</button>
              </div>
            </div>
            <div id="formFeedback" style="margin-top:0.5rem; font-weight:600;"></div>
          </form>
        </div>
      </section>
    `;

    container.innerHTML = html;
    attachSaveListeners();
    setupNewsletterForm();
    setActiveNav('home');
  }

  function renderRecipes() {
    const container = document.getElementById('pageContent');
    const recipes = DATA.recipes;

    const cardsHtml = recipes.map(function(r) {
      return buildCard(r, 'recipe');
    }).join('');

    const html = `
      <section>
        <h2>Seasonal Kenyan Recipes</h2>
        <p style="color:#5D6D7E;">Fresh, authentic recipes from our community. Save your favorites!</p>
        <div class="grid">${cardsHtml}</div>
      </section>
    `;

    container.innerHTML = html;
    attachSaveListeners();
    setActiveNav('recipes');
  }

  function renderEvents() {
    const container = document.getElementById('pageContent');
    const events = DATA.events;

    const cardsHtml = events.map(function(e) {
      return buildCard(e, 'event');
    }).join('');

    const html = `
      <section>
        <h2>Upcoming Food Events in Nairobi</h2>
        <p style="color:#5D6D7E;">Mark your calendar for these tasty gatherings in our community.</p>
        <div class="grid">${cardsHtml}</div>
      </section>
    `;

    container.innerHTML = html;
    attachSaveListeners();
    setActiveNav('events');
  }

  function renderContact() {
    const container = document.getElementById('pageContent');

    const html = `
      <section>
        <h2>📬 Get in Touch</h2>
        <p style="color:#5D6D7E;">Have a food recommendation, recipe to share, or event to suggest? We would love to hear from you!</p>

        <div class="highlight-box">
          <h3>Send Us a Message</h3>
          <form id="contactForm">
            <div class="form-row">
              <div class="form-group">
                <label for="contactName">Your Name</label>
                <input type="text" id="contactName" placeholder="Jane Doe" required />
              </div>
              <div class="form-group">
                <label for="contactEmail">Email Address</label>
                <input type="email" id="contactEmail" placeholder="jane@example.com" required />
              </div>
            </div>
            <div class="form-group">
              <label for="contactSubject">Subject</label>
              <select id="contactSubject">
                <option value="recommendation">Recommend a Restaurant</option>
                <option value="recipe">Share a Recipe</option>
                <option value="event">Suggest an Event</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div class="form-group">
              <label for="contactMessage">Message</label>
              <textarea id="contactMessage" rows="5" placeholder="Tell us about your food discovery..." required></textarea>
            </div>
            <button type="submit" class="btn btn-primary">Send Message</button>
            <div id="contactFeedback" style="margin-top:0.8rem; font-weight:600;"></div>
          </form>
        </div>

        <div class="contact-info">
          <h3>📍 Visit or Reach Us</h3>
          <p><span class="icon">📌</span> <strong>Address:</strong> Kibandaski Lane, Nairobi, Kenya</p>
          <p><span class="icon">📧</span> <strong>Email:</strong> hello@kibandaski.com</p>
          <p><span class="icon">🕐</span> <strong>Hours:</strong> Monday – Saturday, 8:00 AM – 8:00 PM</p>
          <p><span class="icon">📞</span> <strong>Phone:</strong> +254 700 123 456</p>
        </div>
      </section>
    `;

    container.innerHTML = html;
    setupContactForm();
    setActiveNav('contact');
  }

  function renderSaved() {
    const container = document.getElementById('pageContent');
    const saved = getSavedItems();

    let html = `
      <section>
        <h2>❤️ Your Saved Favorites</h2>
        <p>Items you have saved from across the blog.</p>
    `;

    if (saved.length === 0) {
      html += `
        <div class="empty-state">
          <span class="emoji">🍽️</span>
          <p>You have not saved anything yet.</p>
          <p class="text-muted">Explore the blog and click "Save" on your favorites!</p>
          <div style="margin-top:1rem;">
            <a href="index.html" class="btn btn-primary">Explore Now</a>
          </div>
        </div>
      `;
    } else {
      html += `<div>`;
      saved.forEach(function(item) {
        const typeLabels = {
          restaurant: '🍽️ Restaurant',
          recipe: '👨‍🍳 Recipe',
          event: '📅 Event'
        };
        html += `
          <div class="saved-item">
            <div class="item-name">
              <span>${item.name}</span>
              <span class="item-type">${typeLabels[item.type] || item.type}</span>
            </div>
            <button class="btn btn-outline btn-sm remove-save-btn" data-id="${item.id}">Remove</button>
          </div>
        `;
      });
      html += `</div>`;
      html += `
        <div style="margin-top:1.5rem; text-align:center;">
          <button class="btn btn-outline" id="clearAllSaved">🗑️ Clear All</button>
        </div>
      `;
    }

    html += `</section>`;
    container.innerHTML = html;

    document.querySelectorAll('.remove-save-btn').forEach(function(btn) {
      btn.addEventListener('click', function(e) {
        const id = this.dataset.id;
        removeItem(id);
        renderSaved();
      });
    });

    const clearBtn = document.getElementById('clearAllSaved');
    if (clearBtn) {
      clearBtn.addEventListener('click', function() {
        if (confirm('Remove all saved items?')) {
          localStorage.removeItem('foodieSaves');
          renderSaved();
        }
      });
    }

    setActiveNav('saved');
  }

  function attachSaveListeners() {
    const saved = getSavedItems();
    const savedIds = saved.map(function(item) {
      return item.id;
    });

    document.querySelectorAll('.save-btn').forEach(function(btn) {
      const id = btn.dataset.id;
      const isSaved = savedIds.some(function(sid) {
        return sid === id;
      });

      if (isSaved) {
        btn.textContent = '✅ Saved';
        btn.disabled = true;
      }

      btn.addEventListener('click', function(e) {
        const id = this.dataset.id;
        const name = this.dataset.name;
        const type = this.dataset.type;

        const item = { id: id, name: name, type: type };
        const success = saveItem(item);

        if (success) {
          this.textContent = '✅ Saved!';
          this.disabled = true;
          const countSpan = document.querySelector('p span[style*="background"]');
          if (countSpan) {
            const count = getSavedItems().length;
            countSpan.textContent = `❤️ ${count} saved`;
          }
        } else {
          this.textContent = '⭐ Already saved';
          this.disabled = true;
        }
      });
    });
  }

  function setupNewsletterForm() {
    const form = document.getElementById('newsletterForm');
    if (!form) return;

    form.addEventListener('submit', function(e) {
      e.preventDefault();
      const email = document.getElementById('newsEmail').value.trim();
      const feedback = document.getElementById('formFeedback');

      if (!email) {
        feedback.innerHTML = '⚠️ Please enter your email address.';
        feedback.style.color = '#C0392B';
        return;
      }

      if (!email.includes('@') || !email.includes('.')) {
        feedback.innerHTML = '⚠️ Please enter a valid email address.';
        feedback.style.color = '#C0392B';
        return;
      }

      const name = email.split('@')[0];
      const success = addNewsletterSub(email);

      if (success) {
        feedback.innerHTML = `✅ Thanks, ${name}! You are subscribed to our newsletter.`;
        feedback.style.color = '#27AE60';
        this.reset();
      } else {
        feedback.innerHTML = `ℹ️ ${name}, you are already subscribed!`;
        feedback.style.color = '#F39C12';
      }
    });
  }

  function setupContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    form.addEventListener('submit', function(e) {
      e.preventDefault();

      const name = document.getElementById('contactName').value.trim();
      const email = document.getElementById('contactEmail').value.trim();
      const subject = document.getElementById('contactSubject').value;
      const message = document.getElementById('contactMessage').value.trim();
      const feedback = document.getElementById('contactFeedback');

      if (!name || !email || !message) {
        feedback.innerHTML = '⚠️ Please fill out all required fields.';
        feedback.style.color = '#C0392B';
        return;
      }

      if (!email.includes('@') || !email.includes('.')) {
        feedback.innerHTML = '⚠️ Please enter a valid email address.';
        feedback.style.color = '#C0392B';
        return;
      }

      const subjectLabels = {
        'recommendation': 'restaurant recommendation',
        'recipe': 'recipe share',
        'event': 'event suggestion',
        'other': 'inquiry'
      };

      feedback.innerHTML = `
        ✅ Thanks, ${name}! Your ${subjectLabels[subject] || 'message'} has been sent.
        <br><small style="font-weight:normal; color:#5D6D7E;">We will respond within 24 hours.</small>
      `;
      feedback.style.color = '#27AE60';

      let messages = JSON.parse(localStorage.getItem('contactMessages') || '[]');
      messages.push({
        name: name,
        email: email,
        subject: subject,
        message: message,
        date: new Date().toISOString()
      });
      localStorage.setItem('contactMessages', JSON.stringify(messages));

      this.reset();
    });
  }

  function setActiveNav(page) {
    document.querySelectorAll('.nav-links a').forEach(function(link) {
      link.classList.remove('active');
      if (link.dataset.page === page) {
        link.classList.add('active');
      }
    });
  }

  function setupNavigation() {
    const hamburger = document.getElementById('hamburgerBtn');
    const navLinks = document.getElementById('navLinks');

    hamburger.addEventListener('click', function() {
      navLinks.classList.toggle('open');
    });

    document.querySelectorAll('.nav-links a').forEach(function(link) {
      link.addEventListener('click', function(e) {
        navLinks.classList.remove('open');
      });
    });
  }

  function routePage() {
    const path = window.location.pathname;
    const page = path.split('/').pop().replace('.html', '') || 'index';

    if (page === 'index' || page === '') {
      renderHome();
    } else if (page === 'recipes') {
      renderRecipes();
    } else if (page === 'events') {
      renderEvents();
    } else if (page === 'contact') {
      renderContact();
    } else if (page === 'saved') {
      renderSaved();
    } else {
      renderHome();
    }
  }

  document.addEventListener('DOMContentLoaded', function() {
    setupNavigation();
    routePage();

    const saved = getSavedItems();
    console.log(`📦 ${saved.length} items saved in localStorage`);
    console.log(`📧 ${getNewsletterSubs().length} newsletter subscribers`);
  });

})();