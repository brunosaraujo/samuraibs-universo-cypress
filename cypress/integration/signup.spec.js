import signupPage from '../support/pages/signup'

describe('cadastro', function () {

  before(function(){
    cy.fixture('bruno').then(function(bruno){
      this.bruno = bruno

    })
  })

  context.only('quando o usuário é novato', function () {
    before(function () {
      //Remove o email antes de cadastrar.
      cy.task('removeUser', this.bruno.email)
        .then(function (result) {
          console.log(result)
        })
    })

    it('deve cadastrar com sucesso. Mock', function () {

      //acessando a página de cadastro
      signupPage.go()

      signupPage.form(this.bruno)

      //Ouvinte para esperar até que uma requisição na porta users aconteça
      // Aqui nos vamos interceptar a chamada para que troque o statusCode para 200
      cy.intercept('POST', '/users', {
        statusCode: 200
      }).as('postUser')

      signupPage.submit()

      // Esperamos acontecer para trocar de statusCode 400 para statusCode 200
      cy.wait('@postUser')

      //validação do resultado esperado
      signupPage.toast.shouldHaveText('Agora você se tornou um(a) Samurai, faça seu login para ver seus agendamentos!')
      // Utilizamos como mock de api. Aqui estamos testando somente a aplicação. Não estamos fazendo um teste integrado
      // Dessa forma deixamos o back end testar somente o back, já que a responsabilidade de testar o back end é do back.

    })

    it('deve cadastrar um novo usuário', function () {

      signupPage.go()
      signupPage.form(this.bruno)
      signupPage.submit()
      signupPage.toast.shouldHaveText('Agora você se tornou um(a) Samurai, faça seu login para ver seus agendamentos!')

    })
  })

  context('quando email já existe', function () {
    const user = {
      name: 'Teste Araujo',
      email: 'testearaujo@samuraibs.com',
      is_provider: true,
      password: 'pwd123'
    }

    before(function () {
      cy.postUser(user)
    })

    it('não deve cadastrar o usuário', function () {

      signupPage.go()
      signupPage.form(user)
      signupPage.submit()
      signupPage.toast.shouldHaveText('Email já cadastrado para outro usuário.')

    })
  })

  context('quando email é incorreto', function () {
    const user = {
      name: 'Eliza Olsen',
      email: 'lisa.yahoo.com',
      password: 'pwd123'
    }

    it('deve exibir mensagem de alerta', function () {
      signupPage.go()
      signupPage.form(user)
      signupPage.submit()
      signupPage.alert.haveText('Informe um email válido')
    })
  })

  context('quando a senha tem menos de 6 caracteres', function () {

    const password = ['1', 'a2', 'ab3', 'abc4', 'abcd5']

    beforeEach(function () {
      signupPage.go()
    })

    password.forEach(function (p) {
      it('não deve cadastrar com a senha: ' + p, function () {
        const user = {
          name: 'Jason Friday',
          email: 'jason@gmail.com',
          password: p
        }
        signupPage.form(user)
        signupPage.submit()
      })
    })

    afterEach(function () {
      signupPage.alert.haveText('Pelo menos 6 caracteres')
    })
  })

  context('quando não preecho nenhum dos campos', function () {

    const alertMessages = [
      'Nome é obrigatório',
      'E-mail é obrigatório',
      'Senha é obrigatória'
    ]

    before(function(){
      signupPage.go()
      signupPage.submit()
    })

    alertMessages.forEach(function(alert){
      it('deve exibir ' + alert.toLowerCase(), function () {
        signupPage.alert.haveText(alert)
      })
    })

  })

})

