document.addEventListener('DOMContentLoaded', function() {
  const hamburger = document.getElementById('hamburgerBtn');
  const navLinks = document.getElementById('navLinks');

  if (hamburger) {
    hamburger.addEventListener('click', function() {
      navLinks.classList.toggle('open');
    });
  }

  document.querySelectorAll('.nav-links a').forEach(function(link) {
    link.addEventListener('click', function(e) {
      if (navLinks) {
        navLinks.classList.remove('open');
      }
    });
  });

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

  function updateSaveButtons() {
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
    });
  }

  document.querySelectorAll('.save-btn').forEach(function(btn) {
    btn.addEventListener('click', function(e) {
      const id = this.dataset.id;
      const name = this.dataset.name;
      const type = this.dataset.type;

      const item = { id: id, name: name, type: type };
      const success = saveItem(item);

      if (success) {
        this.textContent = '✅ Saved!';
        this.disabled = true;
      } else {
        this.textContent = '⭐ Already saved';
        this.disabled = true;
      }
    });
  });

  updateSaveButtons();

  const newsletterForm = document.getElementById('newsletterForm');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
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
      let subs = JSON.parse(localStorage.getItem('newsletterSubs') || '[]');
      if (!subs.includes(email)) {
        subs.push(email);
        localStorage.setItem('newsletterSubs', JSON.stringify(subs));
        feedback.innerHTML = '✅ Thanks, ' + name + '! You are subscribed to our newsletter.';
        feedback.style.color = '#27AE60';
        this.reset();
      } else {
        feedback.innerHTML = 'ℹ️ ' + name + ', you are already subscribed!';
        feedback.style.color = '#F39C12';
      }
    });
  }

  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
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

      feedback.innerHTML = '✅ Thanks, ' + name + '! Your ' + (subjectLabels[subject] || 'message') + ' has been sent.<br><small style="font-weight:normal; color:#5D6D7E;">We will respond within 24 hours.</small>';
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

  const savedPage = document.getElementById('savedPage');
  if (savedPage) {
    function renderSaved() {
      const container = document.getElementById('savedContainer');
      if (!container) return;

      const saved = getSavedItems();
      let html = '';

      if (saved.length === 0) {
        html = `
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
        html += `
          <div style="margin-top:1.5rem; text-align:center;">
            <button class="btn btn-outline" id="clearAllSaved">🗑️ Clear All</button>
          </div>
        `;
      }

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
    }

    renderSaved();
  }

  const currentPage = window.location.pathname.split('/').pop().replace('.html', '');
  const navLink = document.querySelector('.nav-links a[data-page="' + currentPage + '"]');
  if (navLink) {
    navLink.classList.add('active');
  }
});