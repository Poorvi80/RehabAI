// Seed script to add sample exercises to database
require("dotenv").config();
const mongoose = require("mongoose");
const Exercise = require("./models/Exercise");

const sampleExercises = [
  {
    name: "Bicep Curls",
    description: "Build arm strength with controlled bicep curls",
    targetArea: "Arms",
    difficulty: "Beginner"
  },
  {
    name: "Squats",
    description: "Strengthen legs and core with bodyweight squats",
    targetArea: "Legs",
    difficulty: "Beginner"
  },
  {
    name: "Push-ups",
    description: "Build chest, shoulders, and triceps strength",
    targetArea: "Chest",
    difficulty: "Intermediate"
  },
  {
    name: "Shoulder Press",
    description: "Strengthen shoulders and upper body",
    targetArea: "Shoulders",
    difficulty: "Intermediate"
  },
  {
    name: "Lunges",
    description: "Build leg strength and balance",
    targetArea: "Legs",
    difficulty: "Intermediate"
  },
  {
    name: "Planks",
    description: "Build core strength and stability",
    targetArea: "Core",
    difficulty: "Beginner"
  },
  {
    name: "Deadlifts",
    description: "Full body exercise for strength",
    targetArea: "Full Body",
    difficulty: "Advanced"
  },
  {
    name: "Arm Raises",
    description: "Strengthen shoulders with lateral arm raises",
    targetArea: "Shoulders",
    difficulty: "Beginner"
  },
  {
    name: "Knee Flexion",
    description: "Rehabilitation exercise for knee mobility",
    targetArea: "Legs",
    difficulty: "Beginner"
  },
  {
    name: "Neck Stretch",
    description: "Mobility exercise for neck",
    targetArea: "Neck",
    difficulty: "Beginner"
  }
];

async function seedExercises() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");

    // Clear existing exercises
    await Exercise.deleteMany({});
    console.log("Cleared existing exercises");

    // Insert sample exercises
    const inserted = await Exercise.insertMany(sampleExercises);
    console.log(`✅ Added ${inserted.length} sample exercises`);
    console.log("Exercises:");
    inserted.forEach((ex, i) => {
      console.log(`  ${i + 1}. ${ex.name} (${ex.difficulty})`);
    });

    await mongoose.connection.close();
    console.log("✅ Database seeded successfully!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding database:", error.message);
    process.exit(1);
  }
}

seedExercises();
