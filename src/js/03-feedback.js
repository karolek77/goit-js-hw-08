import throttle from 'lodash.throttle';
export function formSetup() {
  const form = document.querySelector('.feedback-form');
  const emailInput = form.querySelector("input[name='email']");
  const messageTextarea = form.querySelector("textarea[name='message']");

  const localStorageKey = 'feedback-form-state';
  form.addEventListener('input', () => {
    const formData = {
      email: emailInput.value,
      message: messageTextarea.value,
    };
    localStorage.setItem(localStorageKey, JSON.stringify(formData));
  });

  try {
    const savedSettings = localStorage.getItem(localStorageKey);
    const parsedSetings = JSON.parse(savedSettings);
    if (parsedSetings && parsedSetings.email && parsedSetings.message) {
      emailInput.value = parsedSetings.email || '';
      messageTextarea.value = parsedSetings.message || '';
    }
  } catch (error) {
    console.error(
      'Błąd podczas odczytu danych z localStorage: ',
      error.message
    );
  }

  form.addEventListener('submit', evt => {
    evt.preventDefault();
    localStorage.removeItem(localStorageKey);
    form.reset();
  });

  form.addEventListener(
    'input',
    throttle(() => {
      const dataToSave = {
        email: emailInput.value,
        message: messageTextarea.value,
      };
      localStorage.setItem(localStorageKey, JSON.stringify(dataToSave));
    }, 500)
  );
}
