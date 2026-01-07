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