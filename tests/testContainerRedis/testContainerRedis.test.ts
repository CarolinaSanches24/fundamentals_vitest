import { GenericContainer, Network, StartedNetwork, StartedTestContainer } from "testcontainers";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { RedisClient } from "../../api/services/redis/redisClient";

describe("Conexão ao Redis", async () => {
  let redisContainer: StartedTestContainer | undefined;
  let network: StartedNetwork | undefined;
  let redisClient: RedisClient;

  beforeAll(async () => {
    // Inicializa a rede Docker
    network = await new Network().start();

    // Inicializa o contêiner Redis usando Testcontainers
    redisContainer = await new GenericContainer("redis:latest")
      .withName("test_redis")
      .withExposedPorts(6379)
      .withNetworkMode(network.getName())
      .start();

    // Inicializa o cliente Redis
    const redisUrl = `redis://${redisContainer.getHost()}:${redisContainer.getMappedPort(6379)}`;
    redisClient = new RedisClient(redisUrl);
  });

  afterAll(async () => {
    // Para e remove o contêiner e a rede após os testes
    if (redisContainer) await redisContainer.stop();
    if (network) await network.stop();
  });

  it("deve se conectar ao Redis", async () => {
    await redisClient.set("key", "val");
    expect(await redisClient.get("key")).toBe("val");
  });
});