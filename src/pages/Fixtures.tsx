
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

// Fixture data from the image
const fixturesData: FixtureDay[] = [
  {
    date: "April 28th",
    day: "Monday",
    fixtures: [
      { time: "9:00", teamA: "Eaglesvale 2XV", teamB: "Watershed 2XV" },
      { time: "10:30", teamA: "Goldridge 1XV", teamB: "Peterhouse 1XV" },
      { time: "11:40", teamA: "Watershed 1XV", teamB: "Midlands CC 1XV" },
      { time: "13:00", teamA: "Milton 1XV", teamB: "Wise Owl 1XV" },
      { time: "14:30", teamA: "Hillcrest 1XV", teamB: "Eaglesvale 1XV" },
      { time: "15:40", teamA: "Rydings 1XV", teamB: "Heritage 1XV" }
    ]
  },
  {
    date: "April 29th",
    day: "Tuesday",
    fixtures: [
      { time: "9:00", teamA: "Churchill 2XV", teamB: "Lomagundi 2XV" },
      { time: "10:30", teamA: "Falcon 2XV", teamB: "St Albans 2XV" },
      { time: "11:40", teamA: "Peterhouse 2XV", teamB: "St George's 2XV" },
      { time: "13:00", teamA: "St John's 2XV", teamB: "Prince Edward's 2XV" },
      { time: "14:30", teamA: "Lomagundi 1XV", teamB: "St Albans 1XV" },
      { time: "15:40", teamA: "St George's 1XV", teamB: "St Andrew's 1XV" }
    ]
  },
  {
    date: "April 30th",
    day: "Wednesday",
    fixtures: [
      { time: "10:30", teamA: "Watershed 2XV", teamB: "CBC 2XV" },
      { time: "11:40", teamA: "Heritage 2XV", teamB: "Midlands CC 2XV" },
      { time: "13:00", teamA: "Goldridge 1XV", teamB: "Hillcrest 1XV" },
      { time: "14:30", teamA: "Eaglesvale 1XV", teamB: "Heritage 1XV" },
      { time: "15:40", teamA: "Watershed 1XV", teamB: "Gateway 1XV" }
    ]
  },
  {
    date: "May 1st",
    day: "Thursday",
    fixtures: [
      { time: "9:00", teamA: "St George's 2XV", teamB: "St Albans 2XV" },
      { time: "10:30", teamA: "St George's 1XV", teamB: "Prince Edward's 1XV" },
      { time: "11:40", teamA: "CBC 1XV", teamB: "Falcon 1XV" },
      { time: "12:50", teamA: "Lomagundi 1XV", teamB: "Churchill 1XV" },
      { time: "13:50", teamA: "Peterhouse 1XV", teamB: "St Andrew's 1XV" },
      { time: "14:40", teamA: "St John's 1XV", teamB: "St Albans 1XV" },
      { time: "15:50", teamA: "ZIM Steelers", teamB: "Sharks U20" }
    ]
  },
  {
    date: "May 2nd",
    day: "Friday",
    fixtures: [
      { time: "9:00", teamA: "Milton 2XV", teamB: "Wise Owl 2XV" },
      { time: "10:30", teamA: "Eaglesvale 2XV", teamB: "CBC 2XV" },
      { time: "11:40", teamA: "Milton 1XV", teamB: "Lomagundi 2XV" },
      { time: "13:00", teamA: "Prince Edward 2XV", teamB: "Churchill 2XV" },
      { time: "14:30", teamA: "Rydings 1XV", teamB: "Wise Owl 1XV" },
      { time: "15:40", teamA: "Peterhouse 2XV", teamB: "Lomagundi 2XV" }
    ]
  },
  {
    date: "May 3rd",
    day: "Saturday",
    fixtures: [
      { time: "9:00", teamA: "St John's 2XV", teamB: "Churchill 2XV" },
      { time: "10:30", teamA: "CBC 1XV", teamB: "Peterhouse 1XV" },
      { time: "11:40", teamA: "Prince Edward 1XV", teamB: "Churchill 1XV" },
      { time: "13:00", teamA: "Falcon 1XV", teamB: "St George's 1XV" },
      { time: "14:30", teamA: "Peterhouse 1XV", teamB: "St Albans 1XV" },
      { time: "15:40", teamA: "St John's 1XV", teamB: "St Andrew's 1XV" }
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
    <div className="min-h-screen bg-gradient-to-b from-white to-[#F2FCE2] text-scrummy-navyBlue py-8 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center mb-4">
          <Link 
            to="/" 
            className="text-scrummy-navyBlue hover:text-scrummy-goldYellow transition-colors flex items-center gap-1 mb-6"
          >
            <ChevronLeft size={20} />
            <span>Back to Home</span>
          </Link>
        </div>

        <motion.h1 
          className="text-3xl md:text-5xl font-bold text-center mb-12 font-orbitron"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-scrummy-navyBlue">Rugby Fixtures</span>
          <span className="block text-scrummy-goldYellow">Derby Day 2025</span>
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
  );
};

export default Fixtures;
