// CONFIGURACIÓN: URL de la aplicación web de Google Apps Script.
// Reemplaza esta URL con la obtenida tras publicar el script como Aplicación Web.
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwF1gTnSJoawxdhZUfe-62K5VbwugQlmDzp90o9aX23eOZ3Md_cJESZCcTk75PJrSYU/exec';

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.contact-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      const originalText = btn.textContent;

      // Mostrar estado de carga
      btn.textContent = 'Enviando...';
      btn.disabled = true;

      // Obtener y serializar datos del formulario
      const formData = new FormData(form);
      const searchParams = new URLSearchParams();

      formData.forEach((value, key) => {
        searchParams.append(key, value);
      });

      // Enviar datos usando fetch a Google Apps Script
      fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors', // Evita problemas de CORS al usar redirección de Apps Script
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: searchParams
      })
        .then(() => {
          // En modo 'no-cors' no podemos leer la respuesta, pero si se resuelve la promesa el envío fue exitoso
          btn.textContent = '✓ Consulta enviada';
          btn.style.background = '#2a6e3f';
          btn.style.color = '#fff';

          setTimeout(() => {
            btn.textContent = originalText;
            btn.style.background = '';
            btn.style.color = '';
            btn.disabled = false;
            form.reset();
          }, 3500);
        })
        .catch((error) => {
          console.error('Error al enviar la consulta:', error);
          btn.textContent = '❌ Error al enviar';
          btn.style.background = '#a83232';
          btn.style.color = '#fff';

          setTimeout(() => {
            btn.textContent = originalText;
            btn.style.background = '';
            btn.style.color = '';
            btn.disabled = false;
          }, 3500);
        });
    });
  }
});

// ── STEP INTERACTIVITY ──
function activateStep(element, stepNumber) {
  if (element.classList.contains('active') || element.classList.contains('loading')) {
    return;
  }

  const allSteps = document.querySelectorAll('.step');
  allSteps.forEach(step => {
    step.classList.remove('active', 'loading');
    const bar = step.querySelector('.step-progress-bar');
    if (bar) {
      bar.style.transition = 'none';
      bar.style.width = '0%';
    }
  });

  element.classList.add('loading');
  const progressBar = element.querySelector('.step-progress-bar');

  setTimeout(() => {
    if (progressBar) {
      progressBar.style.transition = 'width 1.5s cubic-bezier(0.25, 0.8, 0.25, 1)';
      progressBar.style.width = '100%';
    }
  }, 50);

  setTimeout(() => {
    element.classList.remove('loading');
    element.classList.add('active');
  }, 1550);
}

// ── MODAL SYSTEM ──
const modalData = {
  terminos: {
    title: 'Términos y Condiciones de Uso',
    body: `
      <p>Bienvenido al sitio web de <strong>Arriaza & Ramírez Asociados</strong>. Al acceder y utilizar este sitio web, usted acepta cumplir y estar sujeto a los siguientes términos y condiciones de uso:</p>
      <h4>1. Información General</h4>
      <p>Este sitio web tiene fines exclusivamente informativos y de contacto inicial. El contenido del sitio no constituye, ni reemplaza en caso alguno, la asesoría legal formal. La transmisión y recepción de la información contenida en este sitio no genera una relación cliente-abogado.</p>
      <h4>2. Propiedad Intelectual</h4>
      <p>Todos los contenidos, marcas, logos, designs y textos de esta página son propiedad de Arriaza & Ramírez Asociados o de sus licenciantes y están protegidos por las leyes de propiedad intelectual de la República de Chile.</p>
      <h4>3. Limitación de Responsabilidad</h4>
      <p>Arriaza & Ramírez Asociados realiza sus mejores esfuerzos para mantener la información actualizada, pero no garantiza la absoluta exactitud o vigencia de los contenidos legales debido a las constantes reformas legislativas o jurisprudenciales. El uso del material en este sitio es bajo su propio riesgo.</p>
      <h4>4. Jurisdicción</h4>
      <p>Cualquier controversia derivada del uso de este sitio web será regulada por la legislación chilena y sometida a la jurisdicción de los tribunales ordinarios de justicia de Santiago de Chile.</p>
    `
  },
  privacidad: {
    title: 'Política de Privacidad',
    body: `
      <p>En <strong>Arriaza & Ramírez Asociados</strong>, valoramos su privacidad y nos comprometemos a proteger sus datos personales de acuerdo con las leyes vigentes.</p>
      <h4>1. Recolección de Datos</h4>
      <p>Recopilamos información de contacto voluntaria enviada a través de nuestro formulario de consulta, que incluye su nombre, dirección de correo electrónico, número de teléfono y una breve descripción de su caso laboral.</p>
      <h4>2. Uso de la Información</h4>
      <p>Los datos suministrados serán utilizados única y exclusivamente para ponernos en contacto con usted, evaluar la viabilidad preliminar de su caso y agendar una primera reunión. No utilizaremos sus datos para campañas de spam ni publicidad no solicitada.</p>
      <h4>3. Divulgación a Terceros</h4>
      <p>Bajo ninguna circunstancia venderemos, alquilaremos, transferiremos ni divulgaremos sus datos personales a terceras personas o empresas externas sin su consentimiento previo por escrito, a menos que sea exigido por orden judicial o autoridad legal competente.</p>
      <h4>4. Derechos del Titular</h4>
      <p>Usted puede solicitar en cualquier momento la rectificación, actualización o eliminación de sus datos de nuestro registro interno enviando un correo a: <strong>consultas@ayrasociados.cl</strong>.</p>
    `
  },
  datos: {
    title: 'Tratamiento de Datos Personales',
    body: `
      <p>Esta política regula el tratamiento de los datos personales proporcionados por los usuarios en conformidad con la <strong>Ley N° 19.628 sobre Protección de la Vida Privada</strong> y sus modificaciones posteriores en la República de Chile.</p>
      <h4>1. Consentimiento del Usuario</h4>
      <p>Al completar el formulario de consulta, el usuario autoriza expresamente a Arriaza & Ramírez Asociados a tratar sus datos personales con el fin de prestar asesoría legal y de representación jurídica preliminar.</p>
      <h4>2. Secreto Profesional</h4>
      <p>Toda la información y antecedentes proporcionados sobre su situación laboral o corporativa están estrictamente resguardados bajo la garantía legal del <strong>secreto profesional</strong> (Artículo 247 del Código Penal chileno y normas deontológicas del Colegio de Abogados de Chile).</p>
      <h4>3. Seguridad de los Datos</h4>
      <p>Hemos adoptado medidas técnicas y organizativas para evitar la pérdida, mal uso, alteración, acceso no autorizado y robo de los datos personales facilitados en esta web. Sin embargo, el usuario debe ser consciente de que las medidas de seguridad en Internet no son infalibles.</p>
    `
  },
  cookies: {
    title: 'Política de Cookies',
    body: `
      <p>Este sitio web utiliza cookies para mejorar la experiencia de navegación del usuario y analizar el tráfico de forma anónima.</p>
      <h4>1. ¿Qué es una Cookie?</h4>
      <p>Una cookie es un pequeño archivo de texto que un sitio web almacena en el navegador del usuario al visitarlo, permitiendo recordar sus preferencias o realizar análisis estatíscos.</p>
      <h4>2. Tipos de Cookies que Utiliza esta Web</h4>
      <ul>
        <li><strong>Cookies técnicas o necesarias:</strong> Permiten el correcto funcionamiento de elementos interactivos de la página, como el envío seguro del formulario de contacto y las animaciones de la línea de tiempo.</li>
        <li><strong>Cookies de análisis:</strong> Empleamos herramientas básicas (como Google Analytics, anonimizando las IPs) para conocer el número de visitas recibidas y las páginas más consultadas de manera agregada y sin identificar al usuario.</li>
      </ul>
      <h4>3. Cómo Desactivar las Cookies</h4>
      <p>Usted puede permitir, bloquear o eliminar las cookies instaladas en su equipo mediante la configuración de las opciones del navegador que utiliza (Chrome, Firefox, Safari, Edge, etc.). Tenga en cuenta que desactivar ciertas cookies técnicas puede limitar algunas funciones interactivas del sitio.</p>
    `
  }
};

function openModal(modalKey) {
  const data = modalData[modalKey];
  if (!data) return;

  document.getElementById('modal-title-text').innerText = data.title;
  document.getElementById('modal-body-content').innerHTML = data.body;

  const modal = document.getElementById('modal-legal');
  modal.classList.add('active');
  document.body.classList.add('modal-open');
}

function closeModal() {
  const modal = document.getElementById('modal-legal');
  modal.classList.remove('active');
  document.body.classList.remove('modal-open');
}

function closeModalOnOverlay(event) {
  if (event.target === document.getElementById('modal-legal')) {
    closeModal();
  }
}

// Close modal with ESC key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeModal();
  }
});

// Auto-activate first step on load
document.addEventListener('DOMContentLoaded', () => {
  const firstStep = document.querySelector('.step');
  if (firstStep) {
    firstStep.classList.add('active');
  }
});

// Smooth reveal on scroll
const observer = new IntersectionObserver((entries) => {
  entries.forEach(el => {
    if (el.isIntersecting) {
      el.target.style.opacity = '1';
      el.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.service-card, .step, .why-item, .testimony, .contact-item').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(el);
});
