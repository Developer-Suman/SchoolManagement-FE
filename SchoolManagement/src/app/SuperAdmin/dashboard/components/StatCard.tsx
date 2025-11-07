import { GraduationCap } from "lucide-react";
import { JSX } from "react";
type ICard = {
  cardHead: string;
  cardStats: string;
  cardIcon?: JSX.Element;
  cardStyle?: string;
  cardStatUnit?: string;
};
type Props = {
  cards: ICard[];
};
export default function StatCard({ cards }: Props) {
  return (
    <div className="relative ">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/10 to-purple-400/10"></div>
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(cyan 1px, transparent 1px), linear-gradient(90deg, cyan 1px, transparent 1px)`,
            backgroundSize: "50px 50px",
            opacity: 0.1,
          }}
        ></div>
      </div>
      <div className="relative z-10 flex flex-col sm:flex-row flex-wrap gap-6 ">
        {cards.map((card, index) => (
          <div
            className={`flex flex-row border justify-between items-center text-text bg-green-500/30 backdrop-blur-md rounded-2xl p-6 flex-1 min-w-[250px] shadow-lg hover:scale-105 transition-transform duration-300 ${card.cardStyle}`}
            key={index}
          >
            <div>
              <div className="text-sm ">
                {card?.cardHead || "Total Student"}
              </div>
              <div className="text-2xl font-bold ">
                <span className="text-sm mr-1 ">{card?.cardStatUnit}</span>
                {card?.cardStats || "2330"}
              </div>
            </div>
            {card?.cardIcon || (
              <GraduationCap className="text-green-400 text-4xl" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
