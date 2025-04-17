import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

// Define types for our fixtures data
type Fixture = {
  time: string;
  teamA: string;
  teamB: string;
};

type FixtureDay = {
  date: string;
  day: string;
  fixtures: Fixture[];
};

// Fixture data with all requested updates
const fixturesData: FixtureDay[] = [
  {
    date: "April 28th",
    day: "Monday",
    fixtures: [
      { time: "9:00", teamA: "EAGLESVALE 2XV", teamB: "WATERSHED 2XV" },
      { time: "10:20", teamA: "GOLDRIDGE 1XV", teamB: "GATEWAY 1XV" },
      { time: "11:40", teamA: "WATERSHED 1XV", teamB: "MIDLANDS CC 1XV" },
      { time: "13:00", teamA: "MILTON 1XV", teamB: "WISE OWL 1XV" },
      { time: "14:20", teamA: "HILLCREST 1XV", teamB: "EAGLESVALE 1XV" },
      { time: "15:40", teamA: "RYDINGS 1XV", teamB: "HERITAGE 1XV" }
    ]
  },
  {
    date: "April 29th",
    day: "Tuesday",
    fixtures: [
      { time: "9:00", teamA: "CHURCHILL 2XV", teamB: "LOMAGUNDI 2XV" },
      { time: "10:20", teamA: "FALCON 2XV", teamB: "ST ALBANS 2XV" },
      { time: "11:40", teamA: "PETERHOUSE 2XV", teamB: "ST GEORGE'S 2XV" },
      { time: "13:00", teamA: "ST JOHN'S 2XV", teamB: "PRINCE EDWARD'S 2XV" },
      { time: "14:20", teamA: "LOMAGUNDI 1XV", teamB: "ST ALBANS 1XV" },
      { time: "15:40", teamA: "ST GEORGE'S 1XV", teamB: "ST ANDREW'S 1XV" }
    ]
  },
  {
    date: "April 30th",
    day: "Wednesday",
    fixtures: [
      { time: "10:20", teamA: "WATERSHED 2XV", teamB: "CBC 2XV" },
      { time: "11:40", teamA: "RYDINGS 1XV", teamB: "MIDLANDS CC 1XV" },
      { time: "13:00", teamA: "GOLDRIDGE 1XV", teamB: "HILLCREST 1XV" },
      { time: "14:20", teamA: "EAGLESVALE 1XV", teamB: "HERITAGE 1XV" },
      { time: "15:40", teamA: "WATERSHED 1XV", teamB: "GATEWAY 1XV" }
    ]
  },
  {
    date: "May 1st",
    day: "Thursday",
    fixtures: [
      { time: "8:00", teamA: "ST GEORGE'S 2XV", teamB: "ST ALBANS 2XV" },
      { time: "9:20", teamA: "ST GEORGE'S 1XV", teamB: "PRINCE EDWARD 1XV" },
      { time: "10:40", teamA: "CBC 1XV", teamB: "FALCON 1XV" },
      { time: "12:00", teamA: "LOMAGUNDI 1XV", teamB: "CHURCHILL 1XV" },
      { time: "13:20", teamA: "PETERHOUSE 1XV", teamB: "ST ANDREW'S 1XV" },
      { time: "14:40", teamA: "ST JOHN'S 1XV", teamB: "ST ALBANS 1XV" },
      { time: "16:00", teamA: "ZIM STEELERS", teamB: "SHARKS U20" }
    ]
  },
  {
    date: "May 2nd",
    day: "Friday",
    fixtures: [
      { time: "9:00", teamA: "MILTON 2XV", teamB: "WISE OWL 2XV" },
      { time: "10:20", teamA: "EAGLESVALE 2XV", teamB: "CBC 2XV" },
      { time: "11:40", teamA: "MILTON 1XV", teamB: "LOMAGUNDI 2XV" },
      { time: "13:00", teamA: "PRINCE EDWARD 2XV", teamB: "CHURCHILL 2XV" },
      { time: "14:20", teamA: "RYDINGS 1XV", teamB: "WISE OWL 1XV" },
      { time: "15:40", teamA: "PETERHOUSE 2XV", teamB: "FALCON 2XV" }
    ]
  },
  {
    date: "May 3rd",
    day: "Saturday",
    fixtures: [
      { time: "9:00", teamA: "ST JOHNS 2XV", teamB: "ST ALBANS 2XV" },
      { time: "10:20", teamA: "CBC 1XV", teamB: "PETERHOUSE 1XV" },
      { time: "11:40", teamA: "PRINCE EDWARD 1XV", teamB: "CHURCHILL 1XV" },
      { time: "13:00", teamA: "LOMAGUNDI 1XV", teamB: "ST GEORGE'S 1XV" },
      { time: "14:20", teamA: "FALCON 1XV", teamB: "ST ALBANS 1XV" },
      { time: "15:40", teamA: "ST JOHN'S 1XV", teamB: "ST ANDREW'S 1XV" }
    ]
  }
];

// Animation variants for staggered animations
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.1,
      staggerChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 100 },
  },
};

const Fixtures: React.FC = () => {
  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#70C0F9] to-[#29A1F6] text-scrummy-navyBlue">
      <div 
        className="absolute top-[-100px] left-0 w-full h-[300px] pointer-events-none opacity-[0.12] overflow-hidden"
        style={{
          backgroundImage: "url('/assets/logo.png')",
          backgroundSize: "80% auto",
          backgroundPosition: "center top",
          backgroundRepeat: "no-repeat",
        }}
      />

      <div className="relative z-10 py-24 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center mb-12">
            <Link 
              to="/" 
              className="text-white hover:text-scrummy-goldYellow transition-colors flex items-center gap-1"
            >
              <ChevronLeft size={20} />
              <span>Back to Home</span>
            </Link>
          </div>

          <motion.h1 
            className="text-3xl md:text-5xl font-bold text-center mb-24 font-orbitron"
            initial {{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-white">Derby Day 2025 </span>
            <span className="block text-scrummy-goldYellow">Rugby Fixtures</span>
          </motion.h1>

          <div className="space-y-12">
            {fixturesData.map((day, dayIndex) => (
              <div key={dayIndex} className="bg-white/60 backdrop-blur-sm rounded-xl p-4 md:p-6 shadow-md">
                <h2 className="text-xl md:text-2xl font-semibold mb-4 font-orbitron border-b border-scrummy-lightblue pb-2 flex flex-col md:flex-row md:items-end">
                  <span className="text-scrummy-navyBlue">{day.date}</span>
                  <span className="text-scrummy-goldYellow text-lg md:ml-3">
                    {day.day}
                  </span>
                </h2>

                <motion.div 
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {day.fixtures.map((fixture, fixtureIndex) => (
                    <motion.div
                      key={fixtureIndex}
                      variants={itemVariants}
                      whileHover={{ 
                        y: -5, 
                        transition: { duration: 0.2 },
                        boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)" 
                      }}
                    >
                      <Card className="h-full border-scrummy-lightblue bg-white/90 transition-all duration-300 hover:bg-white">
                        <CardContent className="p-4 flex flex-col">
                          <div className="text-lg font-bold text-scrummy-goldYellow bg-scrummy-navyBlue inline-flex rounded px-3 py-1 self-start mb-3">
                            {fixture.time}
                          </div>
                          <div className="space-y-2 text-center flex-grow flex flex-col justify-center">
                            <p className="font-medium text-scrummy-navyBlue">{fixture.teamA}</p>
                            <p className="text-scrummy-navyBlue/60 font-semibold">vs</p>
                            <p className="font-medium text-scrummy-navyBlue">{fixture.teamB}</p>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center text-sm text-scrummy-navyBlue/70">
            <p>St John's College • MUKURU Derby Day 2025</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Fixtures;
