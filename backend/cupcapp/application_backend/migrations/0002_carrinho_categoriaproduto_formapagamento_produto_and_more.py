# Generated by Django 4.2.7 on 2024-11-21 15:12

import django.core.validators
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('application_backend', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Carrinho',
            fields=[
                ('codigoVenda', models.AutoField(editable=False, primary_key=True, serialize=False, unique=True)),
                ('dataCompra', models.DateField(auto_now_add=True)),
                ('codigoCliente', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='application_backend.usuario')),
            ],
        ),
        migrations.CreateModel(
            name='CategoriaProduto',
            fields=[
                ('id', models.AutoField(editable=False, primary_key=True, serialize=False, unique=True)),
                ('nome', models.CharField(max_length=100)),
                ('descricao', models.CharField(max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name='FormaPagamento',
            fields=[
                ('id', models.AutoField(editable=False, primary_key=True, serialize=False, unique=True)),
                ('descricao', models.CharField(max_length=100)),
                ('parcelas', models.IntegerField()),
            ],
        ),
        migrations.CreateModel(
            name='Produto',
            fields=[
                ('codigo', models.CharField(max_length=100, primary_key=True, serialize=False)),
                ('nome', models.CharField(max_length=100)),
                ('descricao', models.CharField(max_length=100)),
                ('preco', models.DecimalField(decimal_places=2, max_digits=10)),
                ('nota', models.IntegerField(default=0, null=True, validators=[django.core.validators.MinValueValidator(0), django.core.validators.MaxValueValidator(5)])),
                ('categoria', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='application_backend.categoriaproduto')),
            ],
        ),
        migrations.CreateModel(
            name='ItensCarrinho',
            fields=[
                ('id', models.AutoField(editable=False, primary_key=True, serialize=False, unique=True)),
                ('codigoCarrinho', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='application_backend.carrinho')),
                ('codigoProduto', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='application_backend.produto')),
            ],
        ),
        migrations.AddField(
            model_name='carrinho',
            name='formaPagamento',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='application_backend.formapagamento'),
        ),
    ]