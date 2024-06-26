import {Redis} from 'ioredis';

export class RedisClient {
	private client: Redis;

	constructor(url: string) {
		const options = {
			host: url,
			port: 6379,
			tls: {
				requestCert: false,
			},
		};
		this.client = new Redis(url);
	}

	public async delete(key: string): Promise<number> {
		return this.client.del(key);
	}

	public async set(key: string, value: any, tokenExpiryTime?: number): Promise<string> {
		const reply = await this.client.set(key, value);
		if (tokenExpiryTime) await this.client.expire(key, tokenExpiryTime);
		return reply;
	}

	public async get(key: string): Promise<string | null > {
		return this.client.get(key);
	}
}
