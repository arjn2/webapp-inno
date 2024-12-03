"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { WavyBackground } from "../../components/ui/wavy-background";
import { AuroraBackground } from "../../components/ui/aurora-background";

export default function About() {
  return (
    <AuroraBackground
      className="min-h-screen w-screen"
      backgroundFill="white"
      blur="5"
    >
      <div className="flex items-center justify-center min-h-screen  p-4">
        <div className="w-full md:w-1/2">
          <Card className="p-6">
            {/* <h1 className="text-2xl font-bold mb-4 text-center">About Our Website</h1> */}
            <p className="text-gray-700 text-center font-medium">
              The Innovation Club is a Pioneering group dedicated to fostering
              creativity, collaboration, and a culture of innovation among
              students. Our mission is to inspire and empower individuals to
              think beyond the ordinary, generate fresh ideas, and transform
              them into meaningful, real-world solutions. We offer a dynamic
              platform for members to explore their interests, work on
              collaborative projects, and gain practical experience in fields
              like technology, entrepreneurship, design, and beyond. Through an
              array of workshops, hackathons, guest lectures, and team-based
              projects, our members have the chance to learn from industry
              leaders, develop valuable skills, and bring their innovative ideas
              to fruition. 
             
            </p>
            <p className="text-gray-700 text-center font-medium"> 
                At the heart of the Innovation Club lies a vibrant
              community that celebrates curiosity and the relentless pursuit of
              knowledge. We believe that every idea has the potential to spark
              change, and every member holds the power to drive progress. Our
              club is not just a place to learn; it&apos;s a space to dream big,
              challenge conventions, and make an impact. Together, we strive to
              create an environment where imagination knows no bounds, and where
              each project undertaken is a step towards building a brighter,
              more innovative future.</p>
          </Card>
        </div>
      </div>
    </AuroraBackground>
  );
}
