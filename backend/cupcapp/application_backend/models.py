from django.db import models
from django.core.exceptions import ValidationError
from django.core.validators import MinValueValidator, MaxValueValidator

# Create your models here.
class Usuario(models.Model):
    tipo = (
        ("A", "Admin"),
        ("C", "Cliente"),
        ("F", "Funcionário"),
    )

    id = models.AutoField(primary_key=True, unique=True, editable=False, null=False)
    nome = models.CharField(max_length=100, null=False, blank=False)
    email = models.EmailField(max_length=100, unique=True, null=False, blank=False)
    senha = models.CharField(max_length=100, null=False, blank=False)
    cpfCnpj = models.CharField(max_length=100, unique=True, null=False, blank=False)
    numTelefone = models.CharField(max_length=100, unique=True, null=False, blank=True)
    tipoUsuario = models.CharField(max_length=1, null=False, blank=False, choices=tipo, default="C")

    def __str__(self):
        return self.nome



class CategoriaProduto(models.Model):
    id = models.AutoField(primary_key=True, unique=True, editable=False, null=False)
    nome = models.CharField(max_length=100, null=False, blank=False)
    descricao = models.CharField(max_length=100, null=False, blank=False)

    def __str__(self):
        return self.nome


class Produto(models.Model):
    codigo = models.CharField(primary_key=True, max_length=100, null=False, blank=False)
    nome = models.CharField(max_length=100, null=False, blank=False)
    descricao = models.CharField(max_length=100, null=False, blank=False)
    categoria = models.ForeignKey(CategoriaProduto, on_delete=models.SET_NULL, null=True)
    preco = models.DecimalField(max_digits=10, decimal_places=2, null=False, blank=False)
    valorPromocional = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True, default=0.00)
    nota = models.IntegerField(null=True, blank=False, default=0, validators=[MinValueValidator(0), MaxValueValidator(5)])

    def __str__(self):
        return self.nome


class FormaPagamento(models.Model):
    id = models.AutoField(primary_key=True, unique=True, editable=False, null=False)
    descricao = models.CharField(max_length=100, null=False, blank=False)
    parcelas = models.IntegerField(null=False, blank=True, default=1)

    def __str__(self):
        return self.descricao


class Carrinho(models.Model):
    status = [
        ('P', 'Pendente'),
        ('C', 'Cancelado'),
        ('F', 'Finalizado'),
    ]

    codigoVenda = models.AutoField(primary_key=True, unique=True, editable=False, null=False)
    codigoCliente = models.ForeignKey(Usuario, on_delete=models.SET_NULL, null=True)
    formaPagamento = models.ForeignKey(FormaPagamento, on_delete=models.SET_NULL, null=True)
    dataCompra = models.DateField(auto_now_add=True, null=False, blank=False)
    statusPedido = models.CharField(max_length=1, null=False, blank=False, choices=status, default='P')

    def __str__(self):
        return str(self.codigoVenda)


class ItensCarrinho(models.Model):
    id = models.AutoField(primary_key=True, unique=True, editable=False, null=False)
    codigoCarrinho = models.ForeignKey(Carrinho, on_delete=models.CASCADE, null=True, related_name='itens')
    codigoProduto = models.ForeignKey(Produto, on_delete=models.SET_NULL, null=True)
    quantidade = models.IntegerField(null=False, blank=False, default=1)

    def __str__(self):
        return f'Pedido: {str(self.codigoCarrinho)} | Produto: {str(self.codigoProduto)}'