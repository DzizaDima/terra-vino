class NewsletterSuccessPopup extends HTMLElement {
  constructor() {
    super();
    this.closeButton = this.querySelector('.newsletter-success-popup__close');
    this.overlay = this.querySelector('.newsletter-success-popup__overlay');

    // Block scroll when popup is shown
    document.body.classList.add('overflow-hidden');

    // Add event listeners
    this.closeButton?.addEventListener('click', this.close.bind(this));
    this.overlay?.addEventListener('click', this.close.bind(this));

    // Close on Escape key
    this.onKeyupEvent = this.onKeyup.bind(this);
    document.addEventListener('keyup', this.onKeyupEvent);
  }

  onKeyup(event) {
    if (event.code.toUpperCase() === 'ESCAPE') {
      this.close();
    }
  }

  close() {
    // Remove overflow-hidden class to enable scroll
    document.body.classList.remove('overflow-hidden');

    // Remove event listener
    document.removeEventListener('keyup', this.onKeyupEvent);

    // Remove the popup from DOM
    this.remove();

    // Clean up URL by removing customer_posted parameter and hash
    const url = new URL(window.location.href);
    url.searchParams.delete('customer_posted');
    url.hash = '';
    
    // Update URL without reloading the page
    window.history.replaceState({}, '', url.toString());
  }
}

customElements.define('newsletter-success-popup', NewsletterSuccessPopup);

