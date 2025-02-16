const { createClient } = require('redis');

const client = createClient({
  username: 'default',
  password: 'pLjtK9iLdJVx1CfzempvI9CqeudP0R8B',
  socket: {
    host: 'redis-10265.c301.ap-south-1-1.ec2.redns.redis-cloud.com',
    port: 10265
  }
});

client.on('error', (err) => {
  console.error('❌ Redis Client Error:', err);
});


const connectRedis = async () => {
    try {
      if (!client.isOpen) {
        await client.connect();
        console.log('✅ Connected to Redis');
      }
    } catch (err) {
      console.error('❌ Redis Connection Error:', err);
    }
  };
  

  const pushtoQueue =async(queueName,pid)=>{
    await client.lPush(queueName, pid);
    console.log(`✅ Pushed PID ${pid} to queue ${queueName}`);
  }

  const popFromQueue = async (queueName) => {
    const pid = await client.rPop(queueName);
    console.log(`🗑️ Removed PID ${pid} from queue ${queueName}`);
    return pid;
  };

  const getQueue = async (queueName) => {
    const queue = await client.lRange(queueName, 0, -1);
    console.log(`📜 Queue ${queueName}:`, queue);
    return queue;
  };
  
  module.exports = { client, connectRedis , pushtoQueue  , popFromQueue  , getQueue};