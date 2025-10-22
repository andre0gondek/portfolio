const form = document.getElementById('form-contato');

form.addEventListener('submit', function (e) {
  e.preventDefault();

  const nome = form.querySelector('input[type="text"]').value;
  const email = form.querySelector('input[type="email"]').value;
  const mensagem = form.querySelector('textarea').value;

  if (!nome || !email || !mensagem) {
    alert('Por favor, preencha todos os campos.');
    return;
  }

  alert('Mensagem enviada com sucesso!');
  form.reset();
});