neonConfig.webSocketConstructor = WebSocket;
const connectionString = `${process.env.DATABASE_URL}`;

const pool = new Pool({ connectionString });
const adapter = new PrismaNeon(pool);
export const db = new PrismaClient({ adapter });
