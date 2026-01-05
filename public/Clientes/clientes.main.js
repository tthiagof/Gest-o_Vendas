function toggleSidebar() {
    const sidebar = document.getElementById('sidebar')
    const overlay = document.getElementById('overlay')
    const mainContent = document.getElementById('mainContent')

    if (sidebar.classList.contains('-translate-x-full')) {
        sidebar.classList.remove('-translate-x-full')
        overlay.classList.remove('hidden')
        mainContent.classList.add('ml-64')
    } else {
        sidebar.classList.add('-translate-x-full')
        overlay.classList.add('hidden')
        mainContent.classList.remove('ml-64')
    }
}

function toggleAddForm() {
    document.getElementById('addForm').classList.toggle('hidden')
}

function toggleEdit(id) {
    document.getElementById(`edit-${id}`).classList.toggle('hidden')
}

function filterById() {
    const searchValue = document.getElementById('searchById').value
    document.querySelectorAll('.cliente-item').forEach(cliente => {
        const id = cliente.getAttribute('data-id')
        cliente.style.display =
            searchValue === '' || id.includes(searchValue)
                ? 'flex'
                : 'none'
    })
}
document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', () => {
        document.getElementById('loading-overlay').style.display = 'flex'
    })
})