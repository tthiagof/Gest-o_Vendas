import express from 'express'
import { jsPDF } from 'jspdf'
import ExcelJS from 'exceljs'

import DbClientes from '../../repositories/clientes.db.js'
import DbProdutos from '../../repositories/produtos.db.js'
import DbVendas from '../../repositories/vendas.db.js'

const router = express.Router()

router.get('/api/relatorio/produtos/pdf', async (req, res) => {
    try {
        const produtos = await DbProdutos.getproducts()
        const doc = new jsPDF({ orientation: 'landscape' })
    
        doc.setFontSize(18)
        doc.text('Relatório Geral de Produtos', 10, 15)
    
        doc.setFontSize(10)
        doc.setFont('helvetica', 'bold')
    
        const colNome = 10
        const colPreco = 90
        const colQtd = 120
        const colStatus = 150
        const colData = 180
    
        doc.text('Nome do Produto', colNome, 25)
        doc.text('Preço Unitário', colPreco, 25)
        doc.text('Estoque', colQtd, 25)
        doc.text('Status', colStatus, 25)
        doc.text('Data Cadastro', colData, 25)
    
        doc.line(10, 27, 285, 27)
    
        doc.setFont('helvetica', 'normal')
        let y = 35;
    
        (produtos || []).forEach((produto) => {
            if (y > 190) {
                doc.addPage()
                y = 20
            }
    
            const precoFormatado = `R$ ${Number(produto.preco).toFixed(2)}`
            const dataStr = produto.criado_em ? new Date(produto.criado_em).toLocaleDateString('pt-BR') : '-'
            const statusStr = produto.ativo ? 'Ativo' : 'Inativo'
            
            doc.text(produto.nome || 'Sem Nome', colNome, y)
            doc.text(precoFormatado, colPreco, y)
            doc.text(String(produto.quantidade || 0), colQtd, y)
            
            if (!produto.ativo) doc.setTextColor(200, 0, 0) 
            doc.text(statusStr, colStatus, y)
            doc.setTextColor(0, 0, 0) 
    
            doc.text(dataStr, colData, y)
    
            y += 10
        })
    
        const pdfOutput = doc.output('arraybuffer')
        res.setHeader('Content-Type', 'application/pdf')
        res.setHeader('Content-Disposition', 'inline; filename=relatorio_produtos.pdf')
    
        res.send(Buffer.from(pdfOutput))
    
    } catch (error) {
        console.error('Erro ao gerar PDF de produtos:', error)
        res.status(500).json({ erro: 'Erro ao gerar relatório de produtos' })
    }
})

router.get('/api/relatorio/produtos/excel', async (req, res) => {
    try {
        const produtos = await DbProdutos.getproducts()
        console.log(produtos)

        const workbook = new ExcelJS.Workbook()
        const worksheet = workbook.addWorksheet('Produtos')

        worksheet.columns = [
            { header: 'Nome', key: 'nome', width: 30 },
            { header: 'Preço', key: 'preco', width: 20, style: { numFmt: '"R$ "#,##0.00' } },
            { header: 'Estoque', key: 'quantidade', width: 20 },
            { header: 'Status', key: 'ativo', width: 15 },
            { header: 'Data de Cadastro', key: 'criado_em', width: 20 },
        ]

        produtos.forEach(produto => {
            const data_criacao = new Date(produto.criado_em)

            worksheet.addRow({
                nome: produto.nome,
                preco: produto.preco,
                quantidade: produto.quantidade,
                ativo: produto.ativo ? 'Ativo' : 'Inativo',
                criado_em: data_criacao.toLocaleDateString('pt-BR')
            })
        })

        worksheet.getRow(1).eachCell((cell) => {
            cell.font = { bold: true, color: { argb: 'FFFFFF' } }
            cell.fill = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: { argb: 'FF2E75B6' }
            }
            cell.alignment = { horizontal: 'center' }
        })

        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
        res.setHeader('Content-Disposition', 'attachment; filename=relatorio_produtos.xlsx')

        await workbook.xlsx.write(res)
        res.end()

    } catch (error) {
        console.error('Erro ao gerar Excel de Produtos:', error)
        res.status(500).json({ erro: 'Erro ao gerar relatório' })

    }
})

router.get('/api/relatorio/vendas/excel', async (req, res) => {
    try {

        const vendas = await DbVendas.getAllvendas()

        const workbook = new ExcelJS.Workbook()
        const worksheet = workbook.addWorksheet('Relatório de Vendas')

        worksheet.columns = [
            { header: 'Cliente', key: 'cliente', width: 25 },
            { header: 'Produto', key: 'produto', width: 25 },
            { header: 'Qtd', key: 'quantidade', width: 10 },
            { header: 'Preço Unit.', key: 'preco_unitario', width: 15, style: { numFmt: '"R$ "#,##0.00' } },
            { header: 'Valor Total', key: 'valor_total', width: 15, style: { numFmt: '"R$ "#,##0.00' } },
            { header: 'Observação', key: 'observacoes', width: 40 },
            { header: 'Data', key: 'data', width: 15, style: { numFmt: 'dd/mm/yyyy' } }
        ]

        vendas.forEach(venda => {
            const data_venda = new Date(venda.data_venda)
            // console.log(data_venda)

            worksheet.addRow({
                cliente: venda.clienteNome ? venda.clienteNome : 'Cliente excluído',
                produto: venda.produtoNome ? venda.produtoNome : 'Produto excluído',
                quantidade: venda.quantidade,
                preco_unitario: Number(venda.preco_unitario),
                valor_total: Number(venda.valor_total),
                data: data_venda
            })
        })

        worksheet.getRow(1).eachCell((cell) => {
            cell.font = { bold: true, color: { argb: 'FFFFFF' } }
            cell.fill = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: { argb: 'FF2E75B6' }
            }
            cell.alignment = { horizontal: 'center' }
        })

        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
        res.setHeader('Content-Disposition', 'attachment; filename=relatorio_vendas.xlsx')

        await workbook.xlsx.write(res)
        res.end()

    } catch (error) {
        console.error('Erro ao gerar Excel de vendas:', error)
        res.status(500).json({ erro: 'Erro ao gerar relatório' })
    }
})

router.get('/api/relatorio/vendas/pdf', async (req, res) => {
    try {
        const vendas = await DbVendas.getAllvendas()
        const doc = new jsPDF({ orientation: 'landscape' })

        doc.setFontSize(18)
        doc.text('Relatório de Vendas', 10, 15)

        doc.setFontSize(10)
        doc.setFont('helvetica', 'bold')

        const colData = 10
        const colCliente = 35
        const colProd = 85
        const colQtd = 135
        const colUnit = 155
        const colTotal = 185
        const colObs = 215

        doc.text('Data', colData, 25)
        doc.text('Cliente', colCliente, 25)
        doc.text('Produto', colProd, 25)
        doc.text('Qtd', colQtd, 25)
        doc.text('Unitário', colUnit, 25)
        doc.text('Total', colTotal, 25)
        doc.text('Observação', colObs, 25)

        doc.line(10, 27, 285, 27)

        doc.setFont('helvetica', 'normal')
        let y = 35

        vendas.forEach((venda) => {
            if (y > 190) {
                doc.addPage()
                y = 20
            }

            const dataStr = venda.data_venda ? new Date(venda.data_venda).toLocaleDateString('pt-BR') : 'N/A'
            const unitario = `R$ ${Number(venda.preco_unitario).toFixed(2)}`
            const total = `R$ ${Number(venda.valor_total).toFixed(2)}`
            const obs = venda.observacoes ? venda.observacoes.substring(0, 30) : '-'

            doc.text(dataStr, colData, y)
            doc.text(venda.clienteNome || 'Excluído', colCliente, y)
            doc.text(venda.produtoNome || 'Excluído', colProd, y)
            doc.text(String(venda.quantidade), colQtd, y)
            doc.text(unitario, colUnit, y)
            doc.text(total, colTotal, y)
            doc.text(obs, colObs, y)

            y += 10
        })

        const pdfOutput = doc.output('arraybuffer')
        res.setHeader('Content-Type', 'application/pdf')
        res.setHeader('Content-Disposition', 'inline; filename=vendas.pdf')

        res.send(Buffer.from(pdfOutput))
    } catch (error) {
        console.error('Erro ao gerar PDF de vendas:', error)
        res.status(500).json({ erro: 'Erro ao gerar relatório' })
    }
})

router.get('/api/relatorio/clientes/excel', async (req, res) => {
    try {
        const clientes = await DbClientes.getUsers()

        const workbook = new ExcelJS.Workbook()
        const worksheet = workbook.addWorksheet('Clientes')

        worksheet.columns = [
            { header: 'Nome', key: 'nome', width: 30 },
            { header: 'E-mail', key: 'email', width: 35 },
            { header: 'Telefone', key: 'numero', width: 20 },
            { header: 'Data de Cadastro', key: 'criado_em', width: 20 },
            { header: 'Status', key: 'status', width: 15 }
        ]

        clientes.forEach(cliente => {
            worksheet.addRow({
                nome: cliente.nome,
                email: cliente.email,
                numero: cliente.numero || 'N/A',
                criado_em: cliente.criado_em ? new Date(cliente.criado_em).toLocaleDateString('pt-BR') : 'N/A',
                status: cliente.ativo ? 'Ativo' : 'Inativo'
            })
        })

        const headerRow = worksheet.getRow(1)

        headerRow.eachCell((cell) => {
            cell.font = { bold: true, color: { argb: '000000' } }
            cell.fill = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: { argb: 'FFD3D3D3' }
            }
            cell.border = {
                top: { style: 'thin' },
                left: { style: 'thin' },
                bottom: { style: 'thin' },
                right: { style: 'thin' }
            }
        })

        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
        res.setHeader('Content-Disposition', 'attachment; filename=relatorio-clientes.xlsx')

        await workbook.xlsx.write(res)
        res.end()

    } catch (error) {
        console.log(error)
        res.status(500).json({ erro: 'Erro ao buscar clientes' })

    }
})

router.get('/api/relatorio/clientes/pdf', async (req, res) => {
    try {
        const clientes = await DbClientes.getUsers()

        const doc = new jsPDF()

        doc.setFontSize(18)
        doc.text('Relatório de Clientes', 10, 10)

        doc.setFontSize(10)
        doc.setFont('helvetica', 'bold')
        doc.text('Nome', 10, 25)
        doc.text('Email', 60, 25)
        doc.text('Criado_em', 130, 25)
        doc.text('Status', 180, 25)
        doc.line(10, 27, 200, 27)

        doc.setFont('helvetica', 'normal')
        let y = 35

        clientes.forEach((cliente) => {
            if (y > 280) {
                doc.addPage()
                y = 20
            }

            const status = cliente.ativo ? 'Ativo' : 'Inativo'
            const dataFormatada = cliente.criado_em
                ? new Date(cliente.criado_em).toLocaleDateString('pt-BR')
                : 'N/A'

            doc.text(`${cliente.nome}`, 10, y)
            doc.text(`${cliente.email}`, 60, y)
            doc.text(`${dataFormatada}`, 130, y)
            doc.text(`${status}`, 180, y)

            y += 10
        })

        const pdfOutput = doc.output('arraybuffer')
        res.setHeader('Content-Type', 'application/pdf')
        res.setHeader('Content-Disposition', 'inline; filename=Clientes.pdf')

        res.send(Buffer.from(pdfOutput))

    } catch (error) {
        console.log(error)
        res.status(500).json({ erro: 'Erro ao buscar clientes' })

    }
})
export default router