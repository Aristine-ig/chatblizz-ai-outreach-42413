import { ArrowLeft, BarChart3, Scale, ChefHat, Lightbulb } from 'lucide-react';
import { useState } from 'react';
import AnalyticsView from './AnalyticsView';
import WeightTracker from './WeightTracker';
import MealRecommendations from './MealRecommendations';
import HealthierAlternatives from './HealthierAlternatives';

interface ProgressViewProps {
  userId: string;
  onClose: () => void;
  userGoal?: string;
  remainingCalories?: number;
  remainingProtein?: number;
  remainingCarbs?: number;
  remainingFat?: number;
}

interface ProgressCard {
  id: string;
  title: string;
  description: string;
  icon: typeof BarChart3;
  bgColor: string;
  iconColor: string;
}

export default function ProgressView({ 
  userId, 
  onClose,
  userGoal = 'maintain',
  remainingCalories = 0,
  remainingProtein = 0,
  remainingCarbs = 0,
  remainingFat = 0
}: ProgressViewProps) {
  const [activeView, setActiveView] = useState<string | null>(null);
  const [selectedFood] = useState<any>({
    food_name: 'Sample Food',
    calories: 200,
    protein: 20,
    carbs: 30,
    fats: 10
  });

  const progressCards: ProgressCard[] = [
    {
      id: 'analytics',
      title: 'Analytics',
      description: 'View your nutrition trends and progress over time',
      icon: BarChart3,
      bgColor: 'bg-blue-500',
      iconColor: 'text-blue-500'
    },
    {
      id: 'weight',
      title: 'Weight Tracker',
      description: 'Track your weight changes and body composition',
      icon: Scale,
      bgColor: 'bg-purple-500',
      iconColor: 'text-purple-500'
    },
    {
      id: 'meals',
      title: 'AI Meal Suggestions',
      description: 'Get personalized meal recommendations based on your goals',
      icon: ChefHat,
      bgColor: 'bg-emerald-500',
      iconColor: 'text-emerald-500'
    },
    {
      id: 'alternatives',
      title: 'Healthier Alternatives',
      description: 'Discover better food options for your logged meals',
      icon: Lightbulb,
      bgColor: 'bg-orange-500',
      iconColor: 'text-orange-500'
    }
  ];

  const handleCardClick = (cardId: string) => {
    setActiveView(cardId);
  };

  if (activeView === 'analytics') {
    return <AnalyticsView userId={userId} onClose={() => setActiveView(null)} />;
  }

  if (activeView === 'weight') {
    return <WeightTracker userId={userId} onClose={() => setActiveView(null)} />;
  }

  if (activeView === 'meals') {
    return (
      <MealRecommendations
        remainingCalories={remainingCalories}
        remainingProtein={remainingProtein}
        remainingCarbs={remainingCarbs}
        remainingFats={remainingFat}
        goal={userGoal as 'cut' | 'bulk'}
        onClose={() => setActiveView(null)}
      />
    );
  }

  if (activeView === 'alternatives') {
    return (
      <HealthierAlternatives
        foodName={selectedFood.food_name}
        calories={selectedFood.calories}
        protein={selectedFood.protein}
        carbs={selectedFood.carbs}
        fats={selectedFood.fats}
        goal={userGoal as 'cut' | 'bulk'}
        onClose={() => setActiveView(null)}
      />
    );
  }

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-blue-50 via-white to-emerald-50 z-50 overflow-y-auto">
      <div className="min-h-screen p-4 sm:p-6">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/50 rounded-full transition-all"
            >
              <ArrowLeft className="w-6 h-6 text-gray-700" />
            </button>
            <h1 className="text-3xl font-bold text-emerald-600">Progress</h1>
          </div>

          {/* Progress Cards */}
          <div className="space-y-4">
            {progressCards.map((card) => {
              const Icon = card.icon;
              return (
                <button
                  key={card.id}
                  onClick={() => handleCardClick(card.id)}
                  className="w-full glass-effect rounded-2xl p-4 flex items-center gap-4 hover:shadow-xl transition-all group"
                >
                  <div className={`${card.bgColor} rounded-full p-3 group-hover:scale-110 transition-transform`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1 text-left">
                    <h3 className="text-lg font-semibold text-gray-800">{card.title}</h3>
                    <p className="text-sm text-gray-600">{card.description}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
