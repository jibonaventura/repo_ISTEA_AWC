const API_TOKEN = 'patvSjQormZgmfkzi.bc4061cdf61176c5f422b8621a07caf753409d9d43db50629515e4b2a7653960';
const BASE_ID = 'appyonjokIdkozPKl';
const TABLE_NAME = 'Clients';
const API_URL = `https://api.airtable.com/v0/${BASE_ID}/${TABLE_NAME}`;

document.getElementById('contactForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const formData = {
    fields: {
      name: e.target.name.value,
      mail: e.target.mail.value,
      query: e.target.query.value
    }
  };

  fetch(API_URL, {
    method: 'POST',
    headers:{
        'Authorization': `Bearer ${API_TOKEN}`,
        'Content-Type': 'application/json'
    },

    body: JSON.stringify(formData)
  })
  .then(response => response.json())
  .then(data => {
    console.log(data);
    alert('¡Consulta enviada con éxito!');
  })
  .catch(error => {
    alert('Error al enviar consulta.');
    console.error(error);
  });
});