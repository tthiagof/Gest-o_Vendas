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
    const addForm = document.getElementById('addForm')
    addForm.classList.toggle('hidden')
}

function toggleEdit(id) {
    const editSection = document.getElementById(`edit-${id}`)
    editSection.classList.toggle('hidden')
}

document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', () => {
        document.getElementById('loading-overlay').style.display = 'flex'
    })
})