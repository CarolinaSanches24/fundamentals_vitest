## GenericContainer
Esta é uma classe que permite criar e configurar contêineres Docker de forma genérica. Você pode usá-la para iniciar contêineres com imagens específicas do Docker, configurar portas expostas, nomes, volumes, entre outras configurações.

## Network
Representa uma rede Docker. Você pode usá-la para criar uma rede Docker personalizada para conectar contêineres entre si.

# StartedNetwork
É uma instância de uma rede Docker que foi iniciada. Ela representa uma rede Docker ativa, pronta para ser usada para conectar contêineres.

# StartedTestContainer
É uma instância de um contêiner Docker que foi iniciada. Representa um contêiner Docker ativo, que está em execução e pronto para ser usado para testes.

# withName

Um método que define o nome do contêiner Docker.

# withExposedPorts
Um método que especifica as portas que o contêiner Docker deve expor para o host.

# withNetworkMode
Um método que define o modo de rede para o contêiner Docker, permitindo conectar o contêiner a uma rede específica ou ao host.

# getHost
Um método que retorna o endereço IP do host do contêiner Docker.
# getName
Um método que retorna o nome do contêiner Docker.
# getMappedPort
Um método que retorna a porta mapeada do contêiner Docker para o host.

# stop
Um método que para e remove o contêiner Docker.
# start 
Um método que inicia o contêiner Docker.