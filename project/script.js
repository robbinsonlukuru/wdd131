/**
 * LOCAL FOODIE BLOG - Main JavaScript
 * Original code by Robbinson
 * All functionality written from scratch
 */

(function() {
  'use strict';

  // ============================================================
  // DATA STORE - Objects and Arrays
  // ============================================================
  const DATA = {
    restaurants: [
      {
        id: 'r1',
        name: 'The Rustic Spoon',
        cuisine: 'Italian',
        description: 'Cozy atmosphere with handmade pasta and wood-fired pizzas. A hidden gem for date night.',
        image: 'https://picsum.photos/seed/rustic/600/400',
        rating: 4.8
      },
      {
        id: 'r2',
        name: 'Green Leaf Bistro',
        cuisine: 'Farm-to-Table',
        description: 'Seasonal ingredients sourced from local farms. Menu changes weekly with the harvest.',
        image: 'https://picsum.photos/seed/greenleaf/600/400',
        rating: 4.6
      },
      {
        id: 'r3',
        name: 'Harbor Fish Co.',
        cuisine: 'Seafood',
        description: 'Fresh catch delivered daily. Waterfront dining with stunning sunset views.',
        image: 'https://picsum.photos/seed/harbor/600/400',
        rating: 4.7
      },
      {
        id: 'r4',
        name: 'Spice Route Kitchen',
        cuisine: 'Indian',
        description: 'Authentic Indian cuisine with bold flavors and aromatic spices. Family recipes passed down generations.',
        image: 'https://picsum.photos/seed/spice/600/400',
        rating: 4.5
      }
    ],
    recipes: [
      {
        id: 'rec1',
        name: 'Zucchini & Herb Frittata',
        description: 'Perfect for using up farmer\'s market zucchini. Light, fluffy, and packed with fresh herbs.',
        image: 'https://picsum.photos/seed/frittata/600/400',
        prepTime: '25 min',
        difficulty: 'Easy'
      },
      {
        id: 'rec2',
        name: 'Heirloom Tomato Pasta',
        description: 'Simple, fresh, and bursting with summer flavor. Just tomatoes, garlic, basil, and love.',
        image: 'https://picsum.photos/seed/tomato/600/400',
        prepTime: '20 min',
        difficulty: 'Easy'
      },
      {
        id: 'rec3',
        name: 'Grilled Peach & Burrata Salad',
        description: 'Sweet grilled peaches, creamy burrata, and a honey-balsamic drizzle. Pure summer.',
        image: 'https://picsum.photos/seed/peach/600/400',
        prepTime: '15 min',
        difficulty: 'Medium'
      },
      {
        id: 'rec4',
        name: 'Roasted Butternut Soup',
        description: 'Velvety smooth soup with a hint of ginger and coconut milk. Perfect for chilly evenings.',
        image: 'https://picsum.photos/seed/soup/600/400',
        prepTime: '40 min',
        difficulty: 'Medium'
      }
    ],
    events: [
      {
        id: 'e1',
        name: 'Farmers Market Fiesta',
        date: 'August 21, 2026',
        time: '9:00 AM – 2:00 PM',
        location: 'Central Square',
        description: 'Local vendors, live music, and cooking demonstrations. Sample the season\'s best produce.'
      },
      {
        id: 'e2',
        name: 'Wine & Dine Night',
        date: 'September 5, 2026',
        time: '7:00 PM – 10:00 PM',
        location: 'The Cellar',
        description: 'Five-course dinner with wine pairings. Featuring local chefs and sommeliers.'
      },
      {
        id: 'e3',
        name: 'Street Food Festival',
        date: 'September 12, 2026',
        time: '11:00 AM – 8:00 PM',
        location: 'Waterfront Park',
        description: 'Global street food from 30+ vendors. Live cooking competitions and family activities.'
      },
      {
        id: 'e4',
        name: 'Pie Baking Championship',
        date: 'September 19, 2026',
        time: '1:00 PM – 5:00 PM',
        location: 'Community Hall',
        description: 'Amateur bakers compete for the golden rolling pin. Tastings and workshops included.'
      }
    ]
  };

  // ============================================================
  // HELPER FUNCTIONS
  // ============================================================

  // Generate a star rating HTML using template literal
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

  // Build card HTML using template literals (exclusively)
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

  // ============================================================
  // LOCAL STORAGE FUNCTIONS
  // ============================================================

  function getSavedItems() {
    try {
      return JSON.parse(localStorage.getItem('foodieSaves')) || [];
    } catch {
      return [];
    }
  }

  function saveItem(item) {
    const saved = getSavedItems();
    const exists = saved.some(s => s.id === item.id);
    if (!exists) {
      saved.push(item);
      localStorage.setItem('foodieSaves', JSON.stringify(saved));
      return true;
    }
    return false;
  }

  function removeItem(id) {
    let saved = getSavedItems();
    saved = saved.filter(item => item.id !== id);
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

  // ============================================================
  // RENDER FUNCTIONS
  // ============================================================

  function renderHome() {
    const container = document.getElementById('pageContent');
    const restaurants = DATA.restaurants;

    let cardsHtml = restaurants.map(r => buildCard(r, 'restaurant')).join('');

    const html = `
      <section>
        <h2>Discover Your City's Best Bites</h2>
        <p style="font-size:1.1rem; color:#5D6D7E;">
          Explore local restaurants, seasonal recipes, and community events.
          ${getSavedItems().length > 0 ? `<span style="background:#F1C40F; padding:0.1rem 0.8rem; border-radius:1rem; font-size:0.8rem;">❤️ ${getSavedItems().length} saved</span>` : ''}
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

    const cardsHtml = recipes.map(r => buildCard(r, 'recipe')).join('');

    const html = `
      <section>
        <h2>Seasonal Recipes</h2>
        <p style="color:#5D6D7E;">Fresh, seasonal recipes from our community. Save your favorites!</p>
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

    const cardsHtml = events.map(e => buildCard(e, 'event')).join('');

    const html = `
      <section>
        <h2>Upcoming Food Events</h2>
        <p style="color:#5D6D7E;">Mark your calendar for these tasty gatherings in our community.</p>
        <div class="grid">${cardsHtml}</div>
      </section>
    `;

    container.innerHTML = html;
    attachSaveListeners();
    setActiveNav('events');
  }

  function renderSaved() {
    const container = document.getElementById('pageContent');
    const saved = getSavedItems();

    let html = `
      <section>
        <h2>❤️ Your Saved Favorites</h2>
        <p>Items you've saved from across the blog.</p>
    `;

    if (saved.length === 0) {
      html += `
        <div class="empty-state">
          <span class="emoji">🍽️</span>
          <p>You haven't saved anything yet.</p>
          <p class="text-muted">Explore the blog and click "Save" on your favorites!</p>
          <div style="margin-top:1rem;">
            <a href="index.html" class="btn btn-primary">Explore Now</a>
          </div>
        </div>
      `;
    } else {
      html += `<div>`;
      // Use forEach array method
      saved.forEach((item) => {
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

    // Remove button listeners
    document.querySelectorAll('.remove-save-btn').forEach(btn => {
      btn.addEventListener('click', function(e) {
        const id = this.dataset.id;
        removeItem(id);
        renderSaved(); // Re-render using conditional branching
      });
    });

    // Clear all button
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

  // ============================================================
  // SAVE BUTTON HANDLING
  // ============================================================

  function attachSaveListeners() {
    const saved = getSavedItems();
    const savedIds = saved.map(item => item.id);

    document.querySelectorAll('.save-btn').forEach(btn => {
      const id = btn.dataset.id;
      // Check if already saved using array method (some)
      const isSaved = savedIds.some(sid => sid === id);

      if (isSaved) {
        btn.textContent = '✅ Saved';
        btn.disabled = true;
      }

      btn.addEventListener('click', function(e) {
        const id = this.dataset.id;
        const name = this.dataset.name;
        const type = this.dataset.type;

        const item = { id, name, type };
        const success = saveItem(item);

        if (success) {
          this.textContent = '✅ Saved!';
          this.disabled = true;
          // Update saved count in header if on home page
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

  // ============================================================
  // NEWSLETTER FORM HANDLING
  // ============================================================

  function setupNewsletterForm() {
    const form = document.getElementById('newsletterForm');
    if (!form) return;

    form.addEventListener('submit', function(e) {
      e.preventDefault();
      const email = document.getElementById('newsEmail').value.trim();
      const feedback = document.getElementById('formFeedback');

      // Conditional branching for validation
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

      // Use template literal for output
      const name = email.split('@')[0];
      const success = addNewsletterSub(email);

      if (success) {
        feedback.innerHTML = `✅ Thanks, ${name}! You're subscribed to our newsletter.`;
        feedback.style.color = '#27AE60';
        this.reset();
      } else {
        feedback.innerHTML = `ℹ️ ${name}, you're already subscribed!`;
        feedback.style.color = '#F39C12';
      }
    });
  }

  // ============================================================
  // NAVIGATION
  // ============================================================

  function setActiveNav(page) {
    document.querySelectorAll('.nav-links a').forEach(link => {
      link.classList.remove('active');
      if (link.dataset.page === page) {
        link.classList.add('active');
      }
    });
  }

  function setupNavigation() {
    const hamburger = document.getElementById('hamburgerBtn');
    const navLinks = document.getElementById('navLinks');

    // Hamburger toggle (event listener)
    hamburger.addEventListener('click', function() {
      navLinks.classList.toggle('open');
    });

    // Close menu on link click
    document.querySelectorAll('.nav-links a').forEach(link => {
      link.addEventListener('click', function(e) {
        navLinks.classList.remove('open');
      });
    });
  }

  // ============================================================
  // PAGE ROUTING (conditional branching)
  // ============================================================

  function routePage() {
    const path = window.location.pathname;
    const page = path.split('/').pop().replace('.html', '') || 'index';

    if (page === 'index' || page === '') {
      renderHome();
    } else if (page === 'recipes') {
      renderRecipes();
    } else if (page === 'events') {
      renderEvents();
    } else if (page === 'saved') {
      renderSaved();
    } else if (page === 'contact') {
      
      setActiveNav('contact');
      
      const container = document.getElementById('pageContent');
      if (container && container.children.length === 0) {
        
        container.innerHTML = `
          <section>
            <h2>Contact Us</h2>
            <p>Please use the form below to get in touch.</p>
          </section>
        `;
      }
    } else {
      renderHome();
    }
  }



  function setupContactForm() {
    const form = document.getElementById('contactForm');
    if (form) {
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
          <br><small style="font-weight:normal; color:#5D6D7E;">We'll respond within 24 hours.</small>
        `;
        feedback.style.color = '#27AE60';
        
        
        let messages = JSON.parse(localStorage.getItem('contactMessages')) || [];
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
  }

  

  document.addEventListener('DOMContentLoaded', function() {
    setupNavigation();
    routePage();
    setupContactForm();

   
    const saved = getSavedItems();
    console.log(`📦 ${saved.length} items saved in localStorage`);
    console.log(`📧 ${getNewsletterSubs().length} newsletter subscribers`);
    console.log(`📬 ${JSON.parse(localStorage.getItem('contactMessages') || '[]').length} contact messages`);
  });

})();