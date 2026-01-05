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
    const form = document.getElementById('addForm')
    form.classList.toggle('hidden')
}

function atualizarPreco() {
    calcularTotal()
}

function calcularTotal() {
    const select = document.getElementById('produtoSelect')
    const quantidade = document.getElementById('quantidadeInput').value
    const totalInput = document.getElementById('totalVenda')

    if (select.value && quantidade) {
        const option = select.options[select.selectedIndex]
        const preco = parseFloat(option.dataset.preco)
        const estoque = parseInt(option.dataset.estoque)
        const qtd = parseInt(quantidade)

        if (qtd > estoque) {
            alert(`Estoque insuficiente! Disponível: ${estoque} unidades`)
            document.getElementById('quantidadeInput').value = estoque
            return
        }

        const total = preco * qtd
        totalInput.value = `R$ ${total.toFixed(2)}`
    } else {
        totalInput.value = 'R$ 0,00'
    }
}
const loader = document.getElementById('loading-overlay')

function showLoader() {
    loader.classList.remove('hidden')
    loader.classList.add('flex')
}

function hideLoader() {
    loader.classList.add('hidden')
    loader.classList.remove('flex')
}

document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', showLoader)
})