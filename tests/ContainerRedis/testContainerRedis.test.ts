import { GenericContainer, Network, StartedNetwork, StartedTestContainer } from "testcontainers";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { RedisClient } from "../../api/services/redis/redisClient";

describe("Connect Redis", async () => {
  let redisContainer: StartedTestContainer | undefined;
  let network: StartedNetwork | undefined;
  let redisClient: RedisClient;

  beforeAll(async () => {
    
    network = await new Network().start();


    redisContainer = await new GenericContainer("redis:alpine")
      .withName("test_redis")
      .withExposedPorts(6379)
      .withNetworkMode(network.getName())
      .start();

    
    const redisUrl = `redis://${redisContainer.getHost()}:${redisContainer.getMappedPort(6379)}`;
    redisClient = new RedisClient(redisUrl);
  });

  afterAll(async () => {
    if (redisContainer) await redisContainer.stop();
    if (network) await network.stop();
  });

  it("deve se conectar ao Redis", async () => {
    await redisClient.set("key", "val");
    expect(await redisClient.get("key")).toBe("val");
  });
});