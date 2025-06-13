import React, { useState } from "react";
import GrimoireLayout from "@/components/GrimoireLayout";
import ChaosLayout from "@/components/ChaosLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Triangle, Zap } from "lucide-react";

const Liberation = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [progress, setProgress] = useState(0);

  const liberationSteps = [
    {
      title: "Recognition",
      description: "Identify the psychic chains and bindings",
      instructions: "Focus on visualizing the energetic constraints holding back your consciousness. See their color, texture, and attachment points. Acknowledge their presence without judgment."
    },
    {
      title: "Resonance",
      description: "Attune to the frequency of liberation",
      instructions: "Align your breath with the cosmic pulse of freedom. Inhale the energy of expansion, exhale the vibration of breaking chains. Feel your consciousness begin to vibrate at a higher frequency."
    },
    {
      title: "Resistance",
      description: "Challenge the limiting constructs",
      instructions: "Direct your will against the weakest points of your prison. Push against the boundaries with firm intention but without desperation. Notice the edges beginning to fracture."
    },
    {
      title: "Reclamation",
      description: "Recover fragmented power and essence",
      instructions: "As the prison weakens, call back the fragments of your power that have been scattered. Envision them returning as streams of light, reintegrating with your core essence."
    },
    {
      title: "Release",
      description: "Final shattering of psychic bindings",
      instructions: "Channel a surge of transformative energy through your entire being. Visualize the complete dissolution of all remaining chains and barriers. Experience the rush of expansion as your consciousness breaks free."
    }
  ];

  const advanceStep = () => {
    if (activeStep < liberationSteps.length - 1) {
      setActiveStep(activeStep + 1);
      setProgress(((activeStep + 1) / (liberationSteps.length - 1)) * 100);
    }
  };

  const previousStep = () => {
    if (activeStep > 0) {
      setActiveStep(activeStep - 1);
      setProgress(((activeStep - 1) / (liberationSteps.length - 1)) * 100);
    }
  };

  return (
    <ChaosLayout>
      <div className="container mx-auto px-4 py-8 font-inter">
        <h1 className="text-3xl font-bold text-grimoire-primary mb-4 font-inter">Liberation System</h1>
        <div className="mb-6">
          <p className="text-grimoire-foreground/80 font-inter">Step-by-step guide to psychic liberation.</p>
        </div>

        <div className="mb-8">
          <Progress value={progress} className="h-2 bg-grimoire-border [&>[data-slot=indicator]]:bg-grimoire-primary" />
          <div className="flex justify-between mt-2 text-xs text-grimoire-foreground/70 font-inter">
            <span>Recognition</span>
            <span>Release</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2">
            <Card className="bg-grimoire-muted border-grimoire-border h-full">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <span className="w-8 h-8 flex items-center justify-center bg-grimoire-accent text-white rounded-full mr-3 grimoire-glow font-bold">
                      {activeStep + 1}
                    </span>
                    <CardTitle className="text-grimoire-foreground grimoire-text-shadow font-inter">
                      {liberationSteps[activeStep].title}
                    </CardTitle>
                  </div>
                  <Badge className="text-xs px-3 py-1 bg-grimoire-background border-grimoire-border text-grimoire-foreground/80 font-inter">
                    Phase {activeStep + 1} of {liberationSteps.length}
                  </Badge>
                </div>
                <CardDescription className="text-grimoire-foreground/70 font-inter">
                  {liberationSteps[activeStep].description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-grimoire-background p-6 rounded-md border border-grimoire-border">
                  <h3 className="text-grimoire-primary mb-4 font-medium font-inter">Instructions:</h3>
                  <p className="text-grimoire-foreground/90 mb-6 font-inter">
                    {liberationSteps[activeStep].instructions}
                  </p>

                  <div className="border-l-2 border-grimoire-accent/60 pl-4 py-1 mb-6">
                    <p className="italic text-grimoire-foreground/80 font-inter">
                      "The prison exists only because you believe it does. See the truth, and the walls dissolve."
                    </p>
                  </div>

                  <div className="flex justify-between mt-6">
                    <Button 
                      variant="outline" 
                      onClick={previousStep}
                      disabled={activeStep === 0}
                      className="border-grimoire-border text-grimoire-foreground/80 hover:bg-grimoire-muted/70 font-medium"
                    >
                      Previous Step
                    </Button>
                    <Button 
                      onClick={advanceStep} 
                      className="bg-grimoire-accent hover:bg-grimoire-accent/90 text-white font-medium"
                      disabled={activeStep === liberationSteps.length - 1}
                    >
                      Continue
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card className="bg-grimoire-muted border-grimoire-border mb-6">
              <CardHeader>
                <CardTitle className="text-grimoire-foreground grimoire-text-shadow font-inter flex items-center">
                  <Zap className="h-5 w-5 mr-2 text-grimoire-accent" />
                  Energy Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1 font-inter">
                      <span className="text-grimoire-foreground/70">Resistance Level</span>
                      <span className="text-grimoire-foreground">Medium</span>
                    </div>
                    <Progress value={60} className="h-2 bg-grimoire-border [&>[data-slot=indicator]]:bg-grimoire-primary" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1 font-inter">
                      <span className="text-grimoire-foreground/70">Liberation Energy</span>
                      <span className="text-grimoire-foreground">Rising</span>
                    </div>
                    <Progress value={45} className="h-2 bg-grimoire-border [&>[data-slot=indicator]]:bg-grimoire-secondary" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1 font-inter">
                      <span className="text-grimoire-foreground/70">Psychic Clarity</span>
                      <span className="text-grimoire-foreground">Clear</span>
                    </div>
                    <Progress value={75} className="h-2 bg-grimoire-border [&>[data-slot=indicator]]:bg-grimoire-accent" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-grimoire-muted border-grimoire-border">
              <CardHeader>
                <CardTitle className="text-grimoire-foreground grimoire-text-shadow font-inter">
                  Liberation Notes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-grimoire-foreground/90 text-sm font-inter">
                  <li className="flex items-start">
                    <div className="h-2 w-2 mt-1.5 mr-2 bg-grimoire-accent rounded-full shrink-0"></div>
                    <span>Most psychic prisons are self-reinforcing through thought patterns</span>
                  </li>
                  <li className="flex items-start">
                    <div className="h-2 w-2 mt-1.5 mr-2 bg-grimoire-accent rounded-full shrink-0"></div>
                    <span>The moment of breakthrough often feels like a sudden expansion or falling sensation</span>
                  </li>
                  <li className="flex items-start">
                    <div className="h-2 w-2 mt-1.5 mr-2 bg-grimoire-accent rounded-full shrink-0"></div>
                    <span>After liberation, establish new energy patterns immediately to prevent reformation</span>
                  </li>
                  <li className="flex items-start">
                    <div className="h-2 w-2 mt-1.5 mr-2 bg-grimoire-accent rounded-full shrink-0"></div>
                    <span>Some entities may attempt to re-establish bindings during vulnerable transitions</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </ChaosLayout>
  );
};

export default Liberation;
