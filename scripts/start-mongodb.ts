import { MongoMemoryReplSet } from 'mongodb-memory-server';
import { execSync } from 'child_process';
import fs from 'fs';

async function startMongo() {
  console.log('🚀 Starting MongoDB Replica Set (this may take 30-60s on first run)...\n');
  
  const replSet = await MongoMemoryReplSet.create({
    replSet: {
      dbName: 'data-analogy',
      count: 1,
    },
  });

  // Wait for the replica set to be ready
  console.log('⏳ Waiting for replica set to initialize...');
  await replSet.waitUntilRunning();
  
  const uri = replSet.getUri('data-analogy');
  console.log(`\n✅ MongoDB Replica Set running!`);
  console.log(`📊 Connection string: ${uri}`);
  
  // Write the URI to .env for the dev server to use
  fs.writeFileSync('.env', `DATABASE_URL="${uri}"\n`);
  console.log('📝 Updated .env with MongoDB URI');
  
  // Push the schema
  console.log('\n📦 Pushing schema to MongoDB...');
  try {
    execSync('npx prisma db push --skip-generate', {
      stdio: 'pipe',
      env: { ...process.env, DATABASE_URL: uri },
    });
    console.log('✅ Schema pushed successfully');
  } catch (error) {
    console.error('❌ Failed to push schema');
    await replSet.stop();
    process.exit(1);
  }
  
  // Seed the database
  console.log('\n🌱 Seeding database...');
  try {
    execSync('bun run prisma/seed.ts', {
      stdio: 'pipe',
      env: { ...process.env, DATABASE_URL: uri },
    });
    console.log('✅ Database seeded successfully');
  } catch (error) {
    console.error('❌ Failed to seed database');
    await replSet.stop();
    process.exit(1);
  }
  
  console.log('\n🎉 MongoDB is fully ready!');
  console.log(`\n💡 Now run: bun run dev`);
  console.log(`📊 URI: ${uri}`);
  
  // Keep the process alive
  process.on('SIGINT', async () => {
    console.log('\n🛑 Shutting down MongoDB...');
    await replSet.stop();
    process.exit(0);
  });
  
  console.log('\n⏳ MongoDB server is running in background... Press Ctrl+C to stop.');
}

startMongo().catch((err) => {
  console.error('Failed to start MongoDB:', err);
  process.exit(1);
});
