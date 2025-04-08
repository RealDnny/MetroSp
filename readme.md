## Imagens do projeto

![Banner do Projeto MetroSP](https://raw.githubusercontent.com/RealDnny/MetroSp/main/banner-metrosp.jpg)
![MetroSp - Perdidos e Achados](./banner-metrosp.jpg)
# MetroSP - Perdidos e Achados

**MetroSP** é um aplicativo web  open source criado para facilitar o registro e a busca de itens perdidos e achados no metrô de São Paulo.

O projeto foi idealizado para ser simples, acessível e colaborativo — qualquer pessoa pode postar um item perdido ou encontrado, sem precisar de login.

## Funcionalidades

- Postagem de itens perdidos ou achados (sem necessidade de login)
- Upload de imagens dos itens
- Marcação de itens como recuperados com envio de prova
- Visualização otimizada para dispositivos móveis (PWA)
- Integração com pontos físicos de entrega
- Suporte a dispositivos de rastreamento em itens importantes

## Tecnologias utilizadas

- **Frontend:** HTML, CSS, JavaScript, PWA
- **Backend:** Node.js, Express, Prisma
- **Banco de Dados:** PostgreSQL
- **Hospedagem:** (ex: Vercel, Render, etc.)

## Como rodar o projeto localmente

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/metrosp-perdidos-achados.git
cd metrosp-perdidos-achados

# Instale as dependências (backend)
cd backend
npm install

# Configure o banco de dados (ex: PostgreSQL + Prisma)
npx prisma migrate dev

# Inicie o servidor
npm run dev

# Em outra aba, rode o frontend (separado ou embutido no mesmo projeto)
```

## Como contribuir

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b minha-feature`)
3. Faça o commit das suas mudanças (`git commit -m 'feat: adicionei nova funcionalidade'`)
4. Faça o push para a branch (`git push origin minha-feature`)
5. Abra um Pull Request

Contribuições são bem-vindas!

## Licença

Este projeto está licenciado sob os termos da **Licença MIT**. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

**Desenvolvido por [Danilson Armando Alfredo](mailto:danilsonarmando9@gmail.com)**

