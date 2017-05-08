function serializeForm(formElement) {
  const inputs = formElement.querySelectorAll('input:not([type=submit])');
  const response = {};

  for (const input of inputs) {
    Object.assign(response, { [input.name]: input.value });
  }

  return response;
}

function refresh() {
  location.reload();
}