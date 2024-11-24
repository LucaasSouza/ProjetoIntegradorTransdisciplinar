from application_backend.models import Usuario, CategoriaProduto, Produto, FormaPagamento, Carrinho, ItensCarrinho
from rest_framework import serializers

class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = "__all__"


class CategoriaProdutoSerializer(serializers.ModelSerializer):
    class Meta:
        model = CategoriaProduto
        fields = "__all__"


class ProdutoSerializer(serializers.ModelSerializer):
    categoriaDescricao = serializers.SerializerMethodField()

    class Meta:
        model = Produto
        # fields = "__all__"
        fields = ["codigo", "nome", "descricao", "preco", "valorPromocional", "nota", "categoria", "categoriaDescricao"]

    def get_categoriaDescricao(self, obj):
        return obj.categoria.nome


class FormaPagamentoSerializer(serializers.ModelSerializer):
    class Meta:
        model = FormaPagamento
        fields = "__all__"


class ItensCarrinhoSerializer(serializers.ModelSerializer):
    nomeProduto = serializers.SerializerMethodField()
    precoUnitario = serializers.SerializerMethodField()

    class Meta:
        model = ItensCarrinho
        fields = ["codigoCarrinho", "codigoProduto", "nomeProduto", "precoUnitario", "quantidade"]

    # Acessa o nome do produto a partir do código do produto no item do carrinho
    def get_nomeProduto(self, obj):
        return obj.codigoProduto.nome

    def get_precoUnitario(self, obj):
        return obj.codigoProduto.preco


class CarrinhoSerializer(serializers.ModelSerializer):
    itens = ItensCarrinhoSerializer(many=True, read_only=True)
    valorCompra = serializers.SerializerMethodField()

    class Meta:
        model = Carrinho
        fields = ["codigoVenda", "codigoCliente", "formaPagamento", "dataCompra", "statusPedido", "valorCompra", "itens"]

    def get_valorCompra(self, obj):
        # Calcula o valor total da compra a partir dos itens do carrinho
        total = 0

        for item in obj.itens.all():
            total += item.codigoProduto.preco * item.quantidade

        return total