// ── URL dinámica: local o Render ──────────────────────────────────────────
const API = (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')
  ? 'http://localhost:3000'
  
  : '';   

const form    = document.getElementById('form');
const lista   = document.getElementById('lista');
const contador = document.getElementById('contador');
const modal   = document.getElementById('modal');
const formEdit = document.getElementById('form-edit');

function mostrarToast(msg, tipo = 'ok') {
  const toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.className = `toast toast-${tipo}`;
  setTimeout(() => toast.classList.add('hidden'), 2800);
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const data = {
    nombre:   document.getElementById('nombre').value.trim(),
    email:    document.getElementById('email').value.trim(),
    edad:     document.getElementById('edad').value,
    ciudad:   document.getElementById('ciudad').value.trim(),
    telefono: document.getElementById('telefono').value.trim(),
  };

  try {
    const res = await fetch(`${API}/usuarios`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const err = await res.json();
      mostrarToast('❌ Error: ' + (err.error || 'No se pudo guardar'), 'error');
      return;
    }

    form.reset();
    mostrarToast('✅ Usuario agregado correctamente');
    cargarUsuarios();
  } catch {
    mostrarToast('❌ No se pudo conectar al servidor', 'error');
  }
});

async function cargarUsuarios() {
  try {
    const res  = await fetch(`${API}/usuarios`);
    const data = await res.json();

    lista.innerHTML = '';
    contador.textContent = `${data.length} usuario${data.length !== 1 ? 's' : ''}`;

    if (data.length === 0) {
      lista.innerHTML = '<p class="empty">No hay usuarios registrados aún.</p>';
      return;
    }

    data.forEach(renderTarjeta);
  } catch {
    lista.innerHTML = '<p class="empty error-msg">⚠️ Error al cargar usuarios.</p>';
  }
}

function renderTarjeta(u) {
  const card = document.createElement('div');
  card.className = 'user-card';
  card.innerHTML = `
    <div class="user-avatar">${u.nombre.charAt(0).toUpperCase()}</div>
    <div class="user-info">
      <h3>${u.nombre}</h3>
      <p>✉ ${u.email}</p>
      <p>📍 ${u.ciudad || '—'} &nbsp;|&nbsp; 🎂 ${u.edad || '—'} años</p>
      <p>📱 ${u.telefono || '—'}</p>
    </div>
    <div class="user-actions">
      <button class="btn btn-edit"   onclick="abrirModal(${u.id})">✏️ Editar</button>
      <button class="btn btn-delete" onclick="eliminar(${u.id})">🗑 Eliminar</button>
    </div>
  `;
  lista.appendChild(card);
}

async function eliminar(id) {
  if (!confirm('¿Seguro que quieres eliminar este usuario?')) return;

  try {
    const res = await fetch(`${API}/usuarios/${id}`, { method: 'DELETE' });
    if (!res.ok) { mostrarToast('❌ No se pudo eliminar', 'error'); return; }
    mostrarToast('🗑 Usuario eliminado');
    cargarUsuarios();
  } catch {
    mostrarToast('❌ Error de conexión', 'error');
  }
}

async function abrirModal(id) {
  try {
    const res = await fetch(`${API}/usuarios/${id}`);
    const u   = await res.json();

    document.getElementById('edit-id').value       = u.id;
    document.getElementById('edit-nombre').value   = u.nombre;
    document.getElementById('edit-email').value    = u.email;
    document.getElementById('edit-edad').value     = u.edad;
    document.getElementById('edit-ciudad').value   = u.ciudad;
    document.getElementById('edit-telefono').value = u.telefono;

    modal.classList.remove('hidden');
  } catch {
    mostrarToast('❌ Error al cargar usuario', 'error');
  }
}

function cerrarModal() {
  modal.classList.add('hidden');
}

modal.addEventListener('click', (e) => {
  if (e.target === modal) cerrarModal();
});

formEdit.addEventListener('submit', async (e) => {
  e.preventDefault();

  const id   = document.getElementById('edit-id').value;
  const data = {
    nombre:   document.getElementById('edit-nombre').value.trim(),
    email:    document.getElementById('edit-email').value.trim(),
    edad:     document.getElementById('edit-edad').value,
    ciudad:   document.getElementById('edit-ciudad').value.trim(),
    telefono: document.getElementById('edit-telefono').value.trim(),
  };

  try {
    const res = await fetch(`${API}/usuarios/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (!res.ok) { mostrarToast('❌ Error al actualizar', 'error'); return; }

    cerrarModal();
    mostrarToast('✅ Usuario actualizado');
    cargarUsuarios();
  } catch {
    mostrarToast('❌ Error de conexión', 'error');
  }
});

cargarUsuarios();