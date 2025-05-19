
import React from "react";
import { ritualCards } from "./ritualData";
import RitualCard from "./RitualCard";

const RitualLibrary: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {ritualCards.map((ritual) => (
        <RitualCard
          key={ritual.id}
          id={ritual.id}
          title={ritual.title}
          description={ritual.description}
          icon={ritual.icon}
          color={ritual.color}
          difficulty={ritual.difficulty}
        />
      ))}
    </div>
  );
};

export default RitualLibrary;
