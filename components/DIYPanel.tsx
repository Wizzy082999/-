
import React from 'react';
import { WeatherType, Decoration, DecorationType } from '../types';
import { CloudRain, CloudSnow, Sun, Moon, X, Plus, Minus } from 'lucide-react';
import { DECORATION_ASSETS, DECORATION_NAMES, AVAILABLE_DECORATIONS } from '../constants';

interface DIYPanelProps {
  isOpen: boolean;
  onClose: () => void;
  currentWeather: WeatherType;
  onWeatherChange: (w: WeatherType) => void;
  decorations: Decoration[];
  onAddDecoration: (type: DecorationType) => void;
  onRemoveDecoration: (type: DecorationType) => void;
  chapterTitle: string;
}

export const DIYPanel: React.FC<DIYPanelProps> = ({ 
  isOpen, 
  onClose, 
  currentWeather, 
  onWeatherChange,
  decorations,
  onAddDecoration,
  onRemoveDecoration,
  chapterTitle
}) => {
  if (!isOpen) return null;

  const weatherOptions: { type: WeatherType; icon: React.ReactNode; label: string }[] = [
    { type: 'snow', icon: <CloudSnow size={20} />, label: '下雪' },
    { type: 'rain', icon: <CloudRain size={20} />, label: '下雨' },
    { type: 'sunny', icon: <Sun size={20} />, label: '晴天' },
    { type: 'starry', icon: <Moon size={20} />, label: '星空' },
  ];

  // Helper to count existing decorations of each type
  const getCount = (type: DecorationType) => decorations.filter(d => d.type === type).length;

  return (
    <div className="fixed right-0 top-0 h-full w-80 bg-white/95 backdrop-blur-md text-gray-800 shadow-2xl z-[100] overflow-y-auto animate-slide-in border-l border-gray-200">
      <div className="p-6 pb-24"> {/* Added padding bottom for scroll */}
        <div className="flex justify-between items-center mb-6 border-b pb-4">
          <div>
            <h2 className="font-cute text-3xl text-christmas-red">DIY 场景布置</h2>
            <p className="text-xs text-gray-500 mt-1">当前: {chapterTitle}</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <X size={24} />
          </button>
        </div>

        {/* Weather Section */}
        <div className="mb-8">
          <h3 className="font-bold text-gray-600 mb-4 text-sm uppercase tracking-wider flex items-center gap-2">
            <Sun size={16} /> 天气 / 氛围
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {weatherOptions.map((option) => (
              <button
                key={option.type}
                onClick={() => onWeatherChange(option.type)}
                className={`flex flex-col items-center justify-center p-4 rounded-xl border transition-all duration-200 ${
                  currentWeather === option.type 
                    ? 'bg-christmas-gold text-white border-transparent shadow-md transform scale-105' 
                    : 'bg-gray-50 border-gray-200 hover:bg-gray-100 text-gray-600'
                }`}
              >
                {option.icon}
                <span className="mt-2 text-xs font-medium">{option.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Decorations Section */}
        <div>
          <h3 className="font-bold text-gray-600 mb-4 text-sm uppercase tracking-wider flex items-center gap-2">
            <span className="text-xl">🎄</span> 装饰物 (数量)
          </h3>
          <div className="space-y-3">
            {AVAILABLE_DECORATIONS.map((type) => {
                const count = getCount(type);
                return (
                  <div key={type} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl filter drop-shadow-sm">{DECORATION_ASSETS[type]}</span>
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-gray-700">{DECORATION_NAMES[type]}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3 bg-white rounded-lg p-1 border border-gray-200">
                        <button 
                            onClick={() => onRemoveDecoration(type)}
                            disabled={count === 0}
                            className={`p-1 rounded hover:bg-red-100 hover:text-red-600 transition-colors ${count === 0 ? 'text-gray-200 cursor-not-allowed' : 'text-gray-500'}`}
                        >
                            <Minus size={16} />
                        </button>
                        <span className={`w-6 text-center font-bold ${count > 0 ? 'text-christmas-red' : 'text-gray-300'}`}>
                            {count}
                        </span>
                        <button 
                            onClick={() => onAddDecoration(type)}
                            className="p-1 rounded hover:bg-green-100 hover:text-green-600 text-gray-500 transition-colors"
                        >
                            <Plus size={16} />
                        </button>
                    </div>
                  </div>
                );
            })}
          </div>
          
          <div className="mt-6 p-4 bg-blue-50 rounded-xl text-xs text-blue-600 border border-blue-100">
            <p className="font-bold mb-1">💡 小贴士:</p>
            <p>点击 “+” 号可以在画面中添加更多装饰。添加后，您可以直接拖拽画面上的装饰物来摆放它们的位置！</p>
          </div>
        </div>
      </div>
    </div>
  );
};
