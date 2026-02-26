<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <title>Aplikasi Rencana Saya</title>
    <style>
        body { font-family: sans-serif; display: flex; justify-content: center; padding: 50px; background: #f4f4f9; }
        .card { background: white; padding: 20px; border-radius: 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); width: 300px; }
        input { width: 70%; padding: 8px; border: 1px solid #ddd; border-radius: 4px; }
        button { padding: 8px; cursor: pointer; background: #2ecc71; color: white; border: none; border-radius: 4px; }
        ul { list-style: none; padding: 0; margin-top: 20px; }
        li { background: #eee; margin-bottom: 5px; padding: 8px; border-radius: 4px; display: flex; justify-content: space-between; }
        .delete-btn { color: red; cursor: pointer; font-weight: bold; }
    </style>
</head>
<body>

<div class="card">
    <h3>Daftar Tugas 🚀</h3>
    <input type="text" id="taskInput" placeholder="Mau ngerjain apa?">
    <button onclick="tambahTugas()">Tambah</button>
    <ul id="taskList"></ul>
</div>

<script>
    // 1. Fungsi untuk memuat data saat halaman dibuka
    window.onload = function() {
        let savedTasks = JSON.parse(localStorage.getItem('myTasks')) || [];
        savedTasks.forEach(task => renderTask(task));
    };

    function tambahTugas() {
        let input = document.getElementById('taskInput');
        if (input.value === "") return;

        renderTask(input.value);
        saveToLocal(input.value); // Simpan ke memori browser
        input.value = "";
    }

    // 2. Fungsi untuk menampilkan teks ke layar
    function renderTask(taskText) {
        let list = document.getElementById('taskList');
        let li = document.createElement('li');
        li.innerHTML = `${taskText} <span class="delete-btn" onclick="hapusTugas(this, '${taskText}')">X</span>`;
        list.appendChild(li);
    }

    // 3. Fungsi Simpan ke LocalStorage
    function saveToLocal(task) {
        let tasks = JSON.parse(localStorage.getItem('myTasks')) || [];
        tasks.push(task);
        localStorage.setItem('myTasks', JSON.stringify(tasks));
    }

    // 4. Fungsi Hapus dari Layar & LocalStorage
    function hapusTugas(element, taskText) {
        element.parentElement.remove();
        let tasks = JSON.parse(localStorage.getItem('myTasks')) || [];
        let filteredTasks = tasks.filter(t => t !== taskText);
        localStorage.setItem('myTasks', JSON.stringify(filteredTasks));
    }
</script>
    }
</script>

</body>
</html>
{
  "name": "Daftar Tugas Pintar",
  "short_name": "Tugasku",
  "start_url": "index.html",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#2ecc71",
  "icons": [
    {
      "src": "https://cdn-icons-png.flaticon.com/512/906/906334.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open('v1').then((cache) => {
      return cache.addAll(['index.html', 'manifest.json']);
    })
  );
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      return response || fetch(e.request);
    })
  );
});
