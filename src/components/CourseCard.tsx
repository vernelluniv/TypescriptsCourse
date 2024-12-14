import React from 'react';
import { Clock, Users, PlayCircle } from 'lucide-react';

interface CourseCardProps {
  title: string;
  duration: string;
  students: number;
  lessons: number;
  image: string;
}

export function CourseCard({ title, duration, students, lessons, image }: CourseCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform hover:scale-105">
      <div className="h-48 overflow-hidden">
        <img src={image} alt={title} className="w-full h-full object-cover" />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
        <div className="flex items-center gap-4 text-gray-600 text-sm">
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{duration}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            <span>{students} students</span>
          </div>
          <div className="flex items-center gap-1">
            <PlayCircle className="w-4 h-4" />
            <span>{lessons} lessons</span>
          </div>
        </div>
      </div>
    </div>
  );
}