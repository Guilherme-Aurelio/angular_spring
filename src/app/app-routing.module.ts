import { FabricanteComponent } from './fabricante/fabricante.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ProdutoComponent } from './produto/produto.component';
import { authGuard } from './auth.guard';
import { CategoriaComponent } from './categoria/categoria.component';
import { ClienteComponent } from './cliente/cliente.component';
import { VendaComponent } from './venda/venda.component';
import { FornecedorComponent } from './fornecedor/fornecedor.component';
import { EntradaProdutoComponent } from './entrada-produto/entrada-produto.component';
import { HomeComponent } from './home/home.component';
import { CadastroComponent } from './cadastro/cadastro.component';


const routes: Routes = [
  { path: 'produtos', component: ProdutoComponent },
  { path: 'login',  component: LoginComponent},
  { path: 'categorias', component: CategoriaComponent},
  { path: 'fabricantes', component: FabricanteComponent},
  { path: 'clientes', component: ClienteComponent},
  { path: 'vendas', component: VendaComponent},
  { path: 'fornecedores', component: FornecedorComponent},
  { path: 'entradaprodutos', component: EntradaProdutoComponent},
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'home', component: HomeComponent},
  { path: 'cadastro', component: CadastroComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
