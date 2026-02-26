[Index.html](https://github.com/user-attachments/files/25575263/Index.html)
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Aplikasi Rencana Saya</title>
    <link rel="manifest" href="manifest.json">
    <style>
        body { font-family: sans-serif; display: flex; justify-content: center; padding: 50px; background: #f4f4f9; }
        .card { background: white; padding: 20px; border-radius: 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); width: 320px; }
        input { width: 65%; padding: 10px; border: 1px solid #ddd; border-radius: 4px; }
        button { padding: 10px; cursor: pointer; background: #2ecc71; color: white; border: none; border-radius: 4px; font-weight: bold; }
        ul { list-style: none; padding: 0; margin-top: 20px; }
        li { background: #eee; margin-bottom: 8px; padding: 10px; border-radius: 4px; display: flex; justify-content: space-between; align-items: center; }
        .delete-btn { color: #e74c3c; cursor: pointer; font-weight: bold; padding: 5px; }
    </style>
</head>
<body>

<div class="card">
    <h3>Daftar Tugas 🚀</h3>
    <div style="display: flex; gap: 5px;">
        <input type="text" id="taskInput" placeholder="Mau ngerjain apa?">
        <button onclick="tambahTugas()">Tambah</button>
    </div>
    <ul id="taskList"></ul>
</div>

<script>
    // Load data saat buka app
    window.onload = function() {
        let savedTasks = JSON.parse(localStorage.getItem('myTasks')) || [];
        savedTasks.forEach(task => renderTask(task));
        
        // Daftarkan Service Worker untuk PWA
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('sw.js');
        }
    };

    function tambahTugas() {
        let input = document.getElementById('taskInput');
        if (input.value.trim() === "") return;
        renderTask(input.value);
        saveToLocal(input.value);
        input.value = "";
    }

    function renderTask(taskText) {
        let list = document.getElementById('taskList');
        let li = document.createElement('li');
        li.innerHTML = `<span>${taskText}</span> <span class="delete-btn" onclick="hapusTugas(this, '${taskText}')">✕</span>`;
        list.appendChild(li);
    }

    function saveToLocal(task) {
        let tasks = JSON.parse(localStorage.getItem('myTasks')) || [];
        tasks.push(task);
        localStorage.setItem('myTasks', JSON.stringify(tasks));
    }

    function hapusTugas(element, taskText) {
        element.parentElement.remove();
        let tasks = JSON.parse(localStorage.getItem('myTasks')) || [];
        let filteredTasks = tasks.filter(t => t !== taskText);
        localStorage.setItem('myTasks', JSON.stringify(filteredTasks));
    }
</script>

</body>
</html>
[manifest.json](https://github.com/user-attachments/files/25575267/manifest.json)
{
  "name": "Daftar Tugas Pintar",
  "short_name": "Tugasku",
  "start_url": "index.html",
  "display": "standalone",
  "background_color": "#f4f4f9",
  "theme_color": "#2ecc71",
  "icons": [
    {
      "src": "https://cdn-icons-png.flaticon.com/512/906/906334.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}
[sw.js](https://github.com/user-attachments/files/25575270/sw.js)
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
