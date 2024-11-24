from rest_framework import viewsets
from rest_framework.filters import SearchFilter, OrderingFilter
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.response import Response
from rest_framework import status
from application_backend.models import Usuario, CategoriaProduto, Produto, FormaPagamento, Carrinho, ItensCarrinho
from application_backend.serializers import UsuarioSerializer, CategoriaProdutoSerializer, ProdutoSerializer, FormaPagamentoSerializer, CarrinhoSerializer, ItensCarrinhoSerializer


class UsuarioViewSet(viewsets.ModelViewSet):
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer
    filter_backends = (DjangoFilterBackend, SearchFilter, OrderingFilter)
    filterset_fields = ["email", "senha"]  # Defina os campos que você quer filtrar
    search_fields = ["email", "senha"]  # Defina os campos para pesquisa com query string
    ordering_fields = ["email", "senha"]  # Defina os campos para ordenar


class CategoriaProdutoViewSet(viewsets.ModelViewSet):
    queryset = CategoriaProduto.objects.all()
    serializer_class = CategoriaProdutoSerializer


class ProdutoViewSet(viewsets.ModelViewSet):
    queryset = Produto.objects.all()
    serializer_class = ProdutoSerializer
    filter_backends = (DjangoFilterBackend, SearchFilter, OrderingFilter)
    filterset_fields = ["codigo", "nome"]  # Defina os campos que você quer filtrar
    search_fields = ["codigo", "nome"]  # Defina os campos para pesquisa com query string
    ordering_fields = ["codigo", "nome"]  # Defina os campos para ordenar


class FormaPagamentoViewSet(viewsets.ModelViewSet):
    queryset = FormaPagamento.objects.all()
    serializer_class = FormaPagamentoSerializer


class CarrinhoViewSet(viewsets.ModelViewSet):
    queryset = Carrinho.objects.all()
    serializer_class = CarrinhoSerializer

    def get(self, request, codigoVenda):
        try:
            carrinho = Carrinho.objects.get(codigoVenda=codigoVenda)
        except Carrinho.DoesNotExist:
            return Response({'detail': 'Carrinho não encontrado'}, status=status.HTTP_404_NOT_FOUND)

        serializer = CarrinhoSerializer(carrinho)
        return Response(serializer.data)


class ItensCarrinhoViewSet(viewsets.ModelViewSet):
    queryset = ItensCarrinho.objects.all()
    serializer_class = ItensCarrinhoSerializer