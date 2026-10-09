(() => {
  const button = document.querySelector('.email-copy__button');
  if (!button) return;
  const status = button.parentElement.querySelector('.email-copy__status');
  let dismiss;

  function copyFallback(email) {
    const field = document.createElement('textarea');
    field.value = email;
    field.readOnly = true;
    field.style.cssText = 'position:fixed;top:0;left:0;opacity:0;pointer-events:none';
    document.body.appendChild(field);
    field.select();
    field.setSelectionRange(0, email.length);
    try {
      return document.execCommand('copy');
    } finally {
      field.remove();
      button.focus({ preventScroll: true });
    }
  }

  button.addEventListener('click', async () => {
    clearTimeout(dismiss);
    status.textContent = '';
    const email = button.dataset.email;
    let copied = false;
    try {
      await navigator.clipboard.writeText(email);
      copied = true;
    } catch {
      try { copied = copyFallback(email); } catch { /* Show the address below. */ }
    }
    status.textContent = copied ? 'Email Address Copied' : `Copy manually: ${email}`;
    if (copied) dismiss = setTimeout(() => { status.textContent = ''; }, 2500);
  });
})();
