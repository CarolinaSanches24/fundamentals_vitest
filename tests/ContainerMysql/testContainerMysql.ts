import { GenericContainer, StartedTestContainer, Network, StartedNetwork } from "testcontainers";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import mysql from 'mysql2/promise';

describe("Connect MySQL", async () => {
  let mysqlContainer: StartedTestContainer | undefined;
  let network: StartedNetwork | undefined;
  let pool: mysql.Pool;

  beforeAll(async () => {
    network = await new Network().start();

    mysqlContainer = await new GenericContainer("mysql:8.0")
      .withName("test_mysql")
      .withExposedPorts(3306)
      .withEnvironment({"MYSQL_ROOT_PASSWORD":"password"})
      .withEnvironment({"MYSQL_DATABASE": "mydb"})
      .withEnvironment({"MYSQL_USER":"myuser"})
      .withEnvironment({"MYSQL_PASSWORD": "password"})
      .withNetworkMode(network.getName())
      .start();

    pool = mysql.createPool({
      host: mysqlContainer.getHost(),
      port: mysqlContainer.getMappedPort(3306),
      user: "myuser",
      password: "password",
      database: "mydb",
      waitForConnections: true,
      connectionLimit: 10,
      maxIdle: 10, 
      idleTimeout: 60000,
      queueLimit: 0,
      enableKeepAlive: true,
      keepAliveInitialDelay: 0,
    });
  });

  afterAll(async () => {
    if (pool) await pool.end();
    if (mysqlContainer) await mysqlContainer.stop();
    if (network) await network.stop();
  });

  it("deve se conectar ao MySQL", async () => {
    const connection = await pool.getConnection();
    try {
      await connection.query("CREATE TABLE IF NOT EXISTS test_table (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255))");
      await connection.query("INSERT INTO test_table (name) VALUES ('test')");
      const result = await connection.query("SELECT * FROM test_table");
      console.log(result)
    //   expect(rows.length).toBe(1);
    //   expect(rows[0].name).toBe("test");
    } finally {
      connection.release(); 
    }
  });
});