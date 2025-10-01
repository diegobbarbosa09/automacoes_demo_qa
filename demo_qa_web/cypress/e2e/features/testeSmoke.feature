Feature: Execução de testes de teste de fumaça no site Demo QA


  Scenario: Preencher e enviar formulário com sucesso
    Given que acesso o site Demo QA
    And escolho a opção "Forms" na página inicial
    And clico no submenu "Practice Form"
    When preencho todo o formulário com valores aleatórios
    And faço upload de um arquivo .txt válido
    And submeto o formulário
    Then devo ver que um popup foi aberto após o submit
    And fecho o popup


  Scenario: Abrir nova janela
    Given que acesso o site Demo QA
    And escolho a opção "Alerts, Frame & Windows" na página inicial
    And clico no submenu "Browser Windows"
    When clico no botão browser "New Window"
    Then devo ver que uma nova janela foi aberta
    And fecho a nova janela

@focus 
  Scenario: Criar, editar e deletar um registro na tabela
    Given que acesso o site Demo QA
    And escolho a opção "Elements" na página inicial
    And clico no submenu "Web Tables"
    When crio um novo registro com dados válidos
    And edito o registro criado
    Then devo ver o registro atualizado na tabela
    When deleto o registro criado
    Then não devo ver mais o registro na tabela

  
  Scenario: Criar e deletar múltiplos registros dinamicamente
    Given que acesso o site Demo QA
    And escolho a opção "Elements" na página inicial
    And clico no submenu "Web Tables"
    When crio 12 novos registros de forma dinâmica
    Then devo ver os 12 registros adicionados na tabela
    When deleto todos os registros criados
    Then não devo ver mais nenhum dos registros criados


  Scenario: Controlar a Progress Bar até 25% e resetar no 100%
    Given que acesso o site Demo QA
    And escolho a opção "Widgets" na página inicial
    And clico no submenu "Progress Bar"
    When clico no botão "Start"
    And paro a progress bar antes dos 25%
    Then devo validar que o valor da progress bar é menor ou igual a 25%
    When aperto o botão "Start" novamente
    And aguardo a progress bar chegar a 100%
    Then devo resetar a progress bar para o valor inicial



