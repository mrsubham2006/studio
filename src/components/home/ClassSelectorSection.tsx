import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { GraduationCap } from "lucide-react";

const classes = [
  "Class 1st", "Class 2nd", "Class 3rd", "Class 4th", "Class 5th",
  "Class 6th", "Class 7th", "Class 8th", "Class 9th", "Class 10th",
  "Class 11th", "Class 12th", "Diploma", "B.Tech",
];

export default function ClassSelectorSection() {
  return (
    <section className="py-16 md:py-24 bg-card">
      <div className="container max-w-3xl mx-auto text-center">
        <GraduationCap className="mx-auto h-12 w-12 text-primary mb-4"/>
        <h2 className="text-3xl font-bold font-headline tracking-tighter sm:text-4xl md:text-5xl">
          Find Your Path to Success
        </h2>
        <p className="mt-4 text-muted-foreground md:text-xl">
          Select your class to discover AI-powered courses tailored just for you.
        </p>
        <div className="mt-8 max-w-md mx-auto">
          <Select>
            <SelectTrigger className="h-12 text-lg shadow-md">
              <SelectValue placeholder="Select your class" />
            </SelectTrigger>
            <SelectContent>
              {classes.map((c) => (
                <SelectItem key={c} value={c} className="text-lg">{c}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </section>
  );
}
