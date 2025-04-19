'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const navItems = [
  { name: 'Map', href: '/', emoji: '🗺️' },
  { name: 'Forecasts', href: '/forecasts', emoji: '🌨️' },
  { name: 'Routes', href: '/routes', emoji: '🥾' },
  { name: 'About', href: '/about', emoji: 'ℹ️' },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-gray-200 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <h1 className="text-lg font-bold text-gray-800 tracking-tight">🧭 Boreas</h1>
        <ul className="flex space-x-6 text-sm font-medium text-gray-700">
          {navItems.map((item) => (
            <li key={item.name}>
              <Link
                href={item.href}
                className={cn(
                  'flex items-center space-x-1 transition-colors',
                  pathname === item.href
                    ? 'text-black font-semibold'
                    : 'hover:text-black text-gray-600'
                )}
              >
                <span>{item.emoji}</span>
                <span>{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
