import { GenericContainer, Network, StartedNetwork, StartedTestContainer } from "testcontainers";
import { afterAll, beforeAll, describe, it } from "vitest";

describe("Connect Mysql", async ()=>{
    let mysqlContainer: StartedTestContainer | undefined;
    let network: StartedNetwork | undefined;

    beforeAll(async () => {
    
        network = await new Network().start();
    
    
        mysqlContainer = await new GenericContainer("mysql:8")
          .withName("test_mysql")
          .withExposedPorts(6379)
          .withNetworkMode(network.getName())
          .start();
    
      
    
      afterAll(async () => {
        if (mysqlContainer) await mysqlContainer.stop();
        if (network) await network.stop();
      });
    
      it("should connect mysql", async () => {
      
      });
    });
});