from django.contrib import admin
from django.urls import include, path
from rest_framework import routers

from application_backend.views import UsuarioViewSet, CategoriaProdutoViewSet, ProdutoViewSet, FormaPagamentoViewSet, CarrinhoViewSet, ItensCarrinhoViewSet

router = routers.DefaultRouter()
router.register(r'usuarios', UsuarioViewSet)
router.register(r'forma-pagamento', FormaPagamentoViewSet)
router.register(r'categoria-produto', CategoriaProdutoViewSet)
router.register(r'produto', ProdutoViewSet)
router.register(r'carrinho', CarrinhoViewSet)
router.register(r'itens-carrinho', ItensCarrinhoViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include(router.urls)),
]
