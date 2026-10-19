'use client';

import React from 'react';
import { GarmentSilhouette, ProductColor } from '@/types';

interface GarmentVisualProps {
  silhouette: GarmentSilhouette;
  activeColor?: ProductColor;
  viewMode?: 'full' | 'fabric-texture' | 'pallu-detail';
  className?: string;
  gender?: 'men' | 'women';
  isHovered?: boolean;
}

export const GarmentVisual: React.FC<GarmentVisualProps> = ({
  silhouette,
  activeColor,
  viewMode = 'full',
  className = '',
  gender = 'men',
  isHovered = false,
}) => {
  const mainHex = activeColor?.hex || (gender === 'men' ? '#17382F' : '#6B2838');
  const bgTone = activeColor?.bgTone || (gender === 'men' ? '#0f241e' : '#4a121f');

  // If viewing fabric texture close-up
  if (viewMode === 'fabric-texture') {
    return (
      <div
        className={`relative w-full h-full overflow-hidden flex items-center justify-center ${className}`}
        style={{
          backgroundColor: bgTone,
          backgroundImage: `
            radial-gradient(circle at 50% 50%, ${mainHex} 0%, ${bgTone} 100%),
            repeating-linear-gradient(45deg, rgba(212, 183, 121, 0.08) 0px, rgba(212, 183, 121, 0.08) 2px, transparent 2px, transparent 8px),
            repeating-linear-gradient(-45deg, rgba(255, 255, 255, 0.04) 0px, rgba(255, 255, 255, 0.04) 1px, transparent 1px, transparent 6px)
          `,
        }}
      >
        <svg
          viewBox="0 0 400 400"
          className="w-full h-full opacity-70 transition-transform duration-700 ease-out"
          style={{ transform: isHovered ? 'scale(1.08)' : 'scale(1)' }}
        >
          <defs>
            <pattern id="loomTexture" width="40" height="40" patternUnits="userSpaceOnUse">
              <path
                d="M 20 0 L 40 20 L 20 40 L 0 20 Z"
                fill="none"
                stroke="#D4B779"
                strokeWidth="1.2"
                strokeOpacity="0.35"
              />
              <circle cx="20" cy="20" r="3" fill="#D4B779" fillOpacity="0.4" />
              <line x1="0" y1="20" x2="40" y2="20" stroke="rgba(255,255,255,0.15)" strokeWidth="0.8" />
              <line x1="20" y1="0" x2="20" y2="40" stroke="rgba(255,255,255,0.15)" strokeWidth="0.8" />
            </pattern>
          </defs>
          <rect width="400" height="400" fill="url(#loomTexture)" />
          {/* Central gold seal */}
          <circle cx="200" cy="200" r="64" fill="none" stroke="#D4B779" strokeWidth="1" strokeDasharray="3 3" />
          <circle cx="200" cy="200" r="54" fill="none" stroke="#D4B779" strokeWidth="0.8" strokeOpacity="0.6" />
          <text
            x="200"
            y="196"
            textAnchor="middle"
            fill="#D4B779"
            fontSize="10"
            letterSpacing="2.5"
            fontFamily="var(--font-sans)"
            className="font-medium uppercase"
          >
            Handloom Weave
          </text>
          <text
            x="200"
            y="214"
            textAnchor="middle"
            fill="rgba(255,255,255,0.75)"
            fontSize="12"
            fontFamily="var(--font-serif)"
            className="italic"
          >
            Artisanal Texture
          </text>
        </svg>
      </div>
    );
  }

  // Render by Garment Silhouette
  return (
    <div
      className={`relative w-full h-full flex items-center justify-center overflow-hidden transition-all duration-500 ${className}`}
      style={{
        backgroundColor: gender === 'men' ? '#F7F4EC' : '#F7EFE6',
      }}
    >
      {/* Ambient background studio lighting & mannequin stand */}
      <div
        className="absolute inset-0 pointer-events-none opacity-60"
        style={{
          background: `radial-gradient(ellipse at 50% 35%, rgba(255,255,255,0.9) 0%, rgba(0,0,0,0.04) 75%)`,
        }}
      />

      {/* SVG Silhouette Renderer */}
      <svg
        viewBox="0 0 340 420"
        className="relative w-full h-full max-h-[92%] transition-transform duration-700 ease-out"
        style={{
          transform: isHovered ? 'scale(1.03) translateY(-2px)' : 'scale(1)',
          filter: 'drop-shadow(0 12px 24px rgba(0, 0, 0, 0.08))',
        }}
      >
        <defs>
          {/* Subtle fabric shading gradient */}
          <linearGradient id={`grad-body-${silhouette}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={mainHex} stopOpacity="0.92" />
            <stop offset="50%" stopColor={mainHex} stopOpacity="1" />
            <stop offset="100%" stopColor={bgTone} stopOpacity="0.95" />
          </linearGradient>

          {/* Gold zari thread gradient */}
          <linearGradient id="goldZari" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#E5CD94" />
            <stop offset="50%" stopColor="#D4B779" />
            <stop offset="100%" stopColor="#A88B46" />
          </linearGradient>

          {/* Mannequin wood/ivory stand */}
          <linearGradient id="woodStand" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#C9B6A1" />
            <stop offset="50%" stopColor="#DECFC0" />
            <stop offset="100%" stopColor="#B39E88" />
          </linearGradient>
        </defs>

        {/* ---------------- MEN'S SILHOUETTES ---------------- */}
        {silhouette === 'panjabi-straight' && (
          <g>
            {/* Mannequin neck topper (headless tailor bust) */}
            <path d="M 152 40 L 188 40 L 182 62 L 158 62 Z" fill="url(#woodStand)" />
            <ellipse cx="170" cy="40" rx="18" ry="5" fill="#A8947E" />

            {/* Panjabi Body */}
            <path
              d="M 125 72 
                 L 155 64 L 185 64 L 215 72 
                 L 242 125 L 226 132 L 208 95 
                 L 214 365 L 180 370 L 160 370 L 126 365 
                 L 132 95 L 114 132 L 98 125 Z"
              fill={`url(#grad-body-${silhouette})`}
            />

            {/* Mandarin Collar */}
            <path
              d="M 155 64 Q 170 69 185 64 L 185 75 Q 170 80 155 75 Z"
              fill={mainHex}
              stroke="rgba(0,0,0,0.25)"
              strokeWidth="0.8"
            />

            {/* Front Placket */}
            <rect x="166" y="75" width="8" height="110" fill={bgTone} opacity="0.6" />
            <line x1="170" y1="75" x2="170" y2="185" stroke="rgba(255,255,255,0.2)" strokeWidth="0.8" />

            {/* Metallic / shell buttons */}
            {[88, 108, 128, 148, 168].map((y) => (
              <circle key={y} cx="170" cy={y} r="2.2" fill="url(#goldZari)" stroke="#806227" strokeWidth="0.5" />
            ))}

            {/* Subtle side slit indicators */}
            <line x1="130" y1="270" x2="126" y2="365" stroke="rgba(0,0,0,0.2)" strokeWidth="1.2" />
            <line x1="210" y1="270" x2="214" y2="365" stroke="rgba(0,0,0,0.2)" strokeWidth="1.2" />
          </g>
        )}

        {silhouette === 'panjabi-embroidered' && (
          <g>
            {/* Mannequin neck topper */}
            <path d="M 152 40 L 188 40 L 182 62 L 158 62 Z" fill="url(#woodStand)" />
            <ellipse cx="170" cy="40" rx="18" ry="5" fill="#A8947E" />

            {/* Panjabi Body */}
            <path
              d="M 125 72 
                 L 155 64 L 185 64 L 215 72 
                 L 245 125 L 228 133 L 208 95 
                 L 215 370 L 170 375 L 125 370 
                 L 132 95 L 112 133 L 95 125 Z"
              fill={`url(#grad-body-${silhouette})`}
            />

            {/* Intricate Embroidered Chest Yoke */}
            <path
              d="M 148 64 Q 170 68 192 64 L 190 155 L 170 175 L 150 155 Z"
              fill="rgba(0,0,0,0.18)"
              stroke="url(#goldZari)"
              strokeWidth="0.9"
            />

            {/* Embroidered geometric patterns inside yoke */}
            <path
              d="M 160 85 L 170 75 L 180 85 L 170 95 Z
                 M 160 115 L 170 105 L 180 115 L 170 125 Z
                 M 160 145 L 170 135 L 180 145 L 170 155 Z"
              fill="none"
              stroke="url(#goldZari)"
              strokeWidth="1.1"
              strokeDasharray="2 1"
            />

            {/* Collar with gold zari rim */}
            <path
              d="M 154 64 Q 170 69 186 64 L 186 76 Q 170 81 154 76 Z"
              fill={bgTone}
              stroke="url(#goldZari)"
              strokeWidth="1.2"
            />

            {/* Gold Shank Buttons */}
            {[88, 108, 128, 148].map((y) => (
              <g key={y}>
                <circle cx="170" cy={y} r="2.8" fill="url(#goldZari)" />
                <circle cx="170" cy={y} r="1.2" fill="#5E4314" />
              </g>
            ))}

            {/* Cuff embroidery */}
            <rect x="96" y="121" width="16" height="5" fill="none" stroke="url(#goldZari)" strokeWidth="0.8" />
            <rect x="228" y="121" width="16" height="5" fill="none" stroke="url(#goldZari)" strokeWidth="0.8" />
          </g>
        )}

        {silhouette === 'kabli-suit' && (
          <g>
            {/* Mannequin neck */}
            <path d="M 152 40 L 188 40 L 182 62 L 158 62 Z" fill="url(#woodStand)" />
            <ellipse cx="170" cy="40" rx="18" ry="5" fill="#A8947E" />

            {/* Matching Shalwar peeking from bottom */}
            <path
              d="M 130 320 Q 145 390 152 410 L 166 410 L 170 340 L 174 410 L 188 410 Q 195 390 210 320 Z"
              fill={bgTone}
              opacity="0.85"
            />

            {/* Kabli Upper Kurta */}
            <path
              d="M 120 72 
                 L 155 64 L 185 64 L 220 72 
                 L 248 125 L 230 134 L 210 95 
                 L 216 335 L 170 340 L 124 335 
                 L 130 95 L 110 134 L 92 125 Z"
              fill={`url(#grad-body-${silhouette})`}
            />

            {/* Military Shoulder Epaulettes */}
            <path d="M 122 72 L 148 68 L 145 74 L 124 77 Z" fill="#D4B779" opacity="0.8" />
            <path d="M 218 72 L 192 68 L 195 74 L 216 77 Z" fill="#D4B779" opacity="0.8" />

            {/* Flap Chest Pockets */}
            <rect x="135" y="115" width="26" height="24" rx="2" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
            <path d="M 135 115 L 148 122 L 161 115 Z" fill={bgTone} stroke="rgba(255,255,255,0.25)" strokeWidth="0.8" />
            <circle cx="148" cy="120" r="1.5" fill="url(#goldZari)" />

            <rect x="179" y="115" width="26" height="24" rx="2" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
            <path d="M 179 115 L 192 122 L 205 115 Z" fill={bgTone} stroke="rgba(255,255,255,0.25)" strokeWidth="0.8" />
            <circle cx="192" cy="120" r="1.5" fill="url(#goldZari)" />

            {/* Clean Placket with Metallic Studs */}
            <line x1="170" y1="75" x2="170" y2="190" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
            {[84, 104, 150, 170].map((y) => (
              <circle key={y} cx="170" cy={y} r="2" fill="url(#goldZari)" />
            ))}
          </g>
        )}

        {silhouette === 'waistcoat-koti' && (
          <g>
            {/* Inner Panjabi Base */}
            <path d="M 152 40 L 188 40 L 182 62 L 158 62 Z" fill="url(#woodStand)" />
            <ellipse cx="170" cy="40" rx="18" ry="5" fill="#A8947E" />
            <path d="M 155 64 Q 170 69 185 64 L 185 82 Q 170 87 155 82 Z" fill="#F7F4EC" stroke="#C9B6A1" strokeWidth="0.8" />

            {/* Waistcoat Body */}
            <path
              d="M 132 80 
                 L 155 72 L 170 88 L 185 72 L 208 80 
                 L 218 140 L 204 148 L 196 110 
                 L 204 275 L 180 292 L 170 286 L 160 292 L 136 275 
                 L 144 110 L 136 148 L 122 140 Z"
              fill={`url(#grad-body-${silhouette})`}
            />

            {/* Brocade Damask Micro Pattern overlay */}
            <g opacity="0.35" stroke="url(#goldZari)" strokeWidth="0.7" fill="none">
              <circle cx="155" cy="130" r="8" />
              <circle cx="185" cy="130" r="8" />
              <circle cx="155" cy="180" r="8" />
              <circle cx="185" cy="180" r="8" />
              <circle cx="170" cy="220" r="10" />
            </g>

            {/* Welt pocket with pocket square */}
            <path d="M 142 126 L 148 118 L 154 126 Z" fill="#F7F4EC" />
            <rect x="138" y="125" width="22" height="4" fill={bgTone} rx="1" />

            {/* Center Buttons */}
            {[105, 130, 155, 180, 205].map((y) => (
              <circle key={y} cx="170" cy={y} r="2.8" fill="url(#goldZari)" stroke="#78591E" strokeWidth="0.6" />
            ))}
          </g>
        )}

        {silhouette === 'pajama' && (
          <g>
            {/* Drawstring and waistband */}
            <rect x="120" y="70" width="100" height="18" rx="3" fill={mainHex} opacity="0.9" />
            <path d="M 166 84 Q 170 96 164 104 M 174 84 Q 170 96 176 104" stroke="#D4B779" strokeWidth="1.5" fill="none" />

            {/* Tapered legs */}
            <path
              d="M 120 88 
                 L 115 340 L 138 342 L 165 190 
                 L 175 190 L 202 342 L 225 340 
                 L 220 88 Z"
              fill={`url(#grad-body-${silhouette})`}
            />

            {/* Pleat creases */}
            <line x1="140" y1="120" x2="128" y2="330" stroke="rgba(0,0,0,0.15)" strokeWidth="1" />
            <line x1="200" y1="120" x2="212" y2="330" stroke="rgba(0,0,0,0.15)" strokeWidth="1" />
          </g>
        )}

        {/* ---------------- WOMEN'S SILHOUETTES ---------------- */}
        {/* STRICTLY NO HUMAN / WOMEN'S FACES! Draped on ivory tailor bust or artistic flat-lay presentation */}
        {silhouette === 'saree-jamdani' && (
          <g>
            {/* Ivory headless tailor mannequin bust */}
            <path d="M 152 40 L 188 40 L 184 65 L 156 65 Z" fill="url(#woodStand)" />
            <ellipse cx="170" cy="40" rx="18" ry="5" fill="#DECFC0" />

            {/* Mannequin torso structure (strictly headless bust) */}
            <path
              d="M 146 65 Q 170 69 194 65 L 208 120 L 186 210 L 154 210 L 132 120 Z"
              fill="#F7EFE6"
              stroke="#DECFC0"
              strokeWidth="0.8"
            />

            {/* Saree Pleats Draped over shoulder (Pallu) */}
            <path
              d="M 134 110 
                 Q 150 90 178 78 
                 L 208 85 
                 Q 214 130 226 210 
                 L 242 360 
                 L 190 380 
                 L 165 250 
                 L 142 210 
                 Q 130 150 134 110 Z"
              fill={`url(#grad-body-${silhouette})`}
            />

            {/* Front pleated waist drape */}
            <path
              d="M 148 200 
                 Q 170 205 192 200 
                 L 202 385 
                 L 138 385 Z"
              fill={`url(#grad-body-${silhouette})`}
              opacity="0.95"
            />

            {/* Jamdani "Panna Hajar" Gold Geometric Weave Motifs across Pallu */}
            <g fill="none" stroke="url(#goldZari)" strokeWidth="0.9">
              {[
                [180, 110], [195, 125], [175, 140], [190, 155], [205, 170],
                [185, 190], [205, 210], [175, 240], [200, 270], [215, 310],
                [160, 290], [180, 330], [200, 350]
              ].map(([x, y], idx) => (
                <path
                  key={idx}
                  d={`M ${x} ${y - 4} L ${x + 4} ${y} L ${x} ${y + 4} L ${x - 4} ${y} Z`}
                />
              ))}
            </g>

            {/* Ornate Gold Zari Border (Paar) */}
            <path
              d="M 242 360 L 190 380 L 188 372 L 238 353 Z"
              fill="url(#goldZari)"
            />
            <path
              d="M 202 385 L 138 385 L 140 379 L 200 379 Z"
              fill="url(#goldZari)"
            />

            {/* Authentic Jamdani Muslin Translucency sheen */}
            <path
              d="M 178 78 Q 200 82 208 85 L 222 170 Q 190 160 178 78 Z"
              fill="#FFFFFF"
              opacity="0.12"
            />
          </g>
        )}

        {silhouette === 'saree-silk' && (
          <g>
            {/* Ivory headless tailor bust */}
            <path d="M 152 40 L 188 40 L 184 65 L 156 65 Z" fill="url(#woodStand)" />
            <ellipse cx="170" cy="40" rx="18" ry="5" fill="#DECFC0" />

            {/* Liquid Rajshahi Silk drape */}
            <path
              d="M 130 115 
                 Q 155 88 186 78 
                 L 214 86 
                 L 235 220 
                 L 248 375 
                 L 185 385 
                 L 155 250 
                 L 135 210 Z"
              fill={`url(#grad-body-${silhouette})`}
            />

            <path
              d="M 144 200 Q 170 205 196 200 L 206 385 L 134 385 Z"
              fill={`url(#grad-body-${silhouette})`}
            />

            {/* Liquid silk highlights */}
            <path
              d="M 186 78 Q 200 120 205 200 L 215 360 Q 205 200 196 79 Z"
              fill="rgba(255, 255, 255, 0.22)"
            />

            {/* Royal Kalga Paisley Zari Pallu */}
            <g stroke="url(#goldZari)" strokeWidth="1" fill="none">
              <path d="M 205 260 Q 220 250 225 270 Q 215 295 195 285 Z" />
              <path d="M 175 300 Q 190 290 195 310 Q 185 335 165 325 Z" />
              <circle cx="215" cy="272" r="2" fill="url(#goldZari)" />
            </g>

            {/* Zari Borders */}
            <rect x="134" y="377" width="72" height="8" fill="url(#goldZari)" />
            <line x1="134" y1="375" x2="206" y2="375" stroke="#FFFFFF" strokeWidth="0.8" opacity="0.6" />
          </g>
        )}

        {silhouette === 'saree-cotton' && (
          <g>
            {/* Mannequin stand */}
            <path d="M 152 40 L 188 40 L 184 65 L 156 65 Z" fill="url(#woodStand)" />
            <ellipse cx="170" cy="40" rx="18" ry="5" fill="#DECFC0" />

            {/* Cotton Saree Drape */}
            <path
              d="M 132 110 Q 155 88 184 80 L 210 88 L 230 220 L 244 370 L 190 380 L 160 250 L 138 210 Z"
              fill={`url(#grad-body-${silhouette})`}
            />

            <path
              d="M 146 200 Q 170 205 194 200 L 204 380 L 136 380 Z"
              fill={`url(#grad-body-${silhouette})`}
            />

            {/* Tangail Temple Border (Moirang Phee / Mandir Par) */}
            <g fill="#D4A038">
              {[140, 152, 164, 176, 188, 200].map((x) => (
                <polygon key={x} points={`${x},372 ${x + 6},362 ${x + 12},372`} />
              ))}
            </g>
            <rect x="136" y="372" width="68" height="8" fill="#5C6339" />
          </g>
        )}

        {silhouette === 'three-piece' && (
          <g>
            {/* Tailor bust */}
            <path d="M 152 40 L 188 40 L 184 65 L 156 65 Z" fill="url(#woodStand)" />
            <ellipse cx="170" cy="40" rx="18" ry="5" fill="#DECFC0" />

            {/* Silk cigarette trousers underneath */}
            <path d="M 148 290 L 140 385 L 158 385 L 166 290 Z" fill={bgTone} opacity="0.9" />
            <path d="M 174 290 L 182 385 L 200 385 L 192 290 Z" fill={bgTone} opacity="0.9" />

            {/* Kameez (Tunic) */}
            <path
              d="M 126 78 
                 L 154 68 L 186 68 L 214 78 
                 L 235 125 L 220 132 L 205 95 
                 L 212 315 L 170 320 L 128 315 
                 L 135 95 L 120 132 L 105 125 Z"
              fill={`url(#grad-body-${silhouette})`}
            />

            {/* Boat neckline with delicate embroidery */}
            <path
              d="M 154 68 Q 170 82 186 68"
              fill="none"
              stroke="url(#goldZari)"
              strokeWidth="2.5"
            />
            {/* Cut-dana neckline yoke */}
            <path
              d="M 158 75 Q 170 95 182 75 L 178 120 L 170 130 L 162 120 Z"
              fill="rgba(0,0,0,0.15)"
              stroke="url(#goldZari)"
              strokeWidth="0.8"
            />

            {/* Draped Sheer Organza Orna (Dupatta) across one shoulder */}
            <path
              d="M 126 78 
                 Q 115 130 110 210 
                 Q 105 290 102 360 
                 L 126 360 
                 Q 130 280 136 210 
                 L 135 95 Z"
              fill="#D7B6A5"
              opacity="0.75"
              stroke="url(#goldZari)"
              strokeWidth="0.8"
            />
            {/* Scalloped hem of Orna */}
            <path
              d="M 102 360 Q 108 365 114 360 Q 120 365 126 360"
              fill="none"
              stroke="url(#goldZari)"
              strokeWidth="1.2"
            />
          </g>
        )}

        {silhouette === 'kurti' && (
          <g>
            {/* Bust */}
            <path d="M 152 40 L 188 40 L 184 65 L 156 65 Z" fill="url(#woodStand)" />
            <ellipse cx="170" cy="40" rx="18" ry="5" fill="#DECFC0" />

            {/* A-Line Kurti */}
            <path
              d="M 128 76 
                 L 155 68 L 185 68 L 212 76 
                 L 232 122 L 218 128 L 204 96 
                 L 225 345 L 170 350 L 115 345 
                 L 136 96 L 122 128 L 108 122 Z"
              fill={`url(#grad-body-${silhouette})`}
            />

            {/* Mandarin V-Split Collar */}
            <path
              d="M 155 68 Q 170 76 185 68 L 183 85 L 170 98 L 157 85 Z"
              fill={bgTone}
              stroke="url(#goldZari)"
              strokeWidth="1"
            />

            {/* Nakshi Kantha running stitch detail on yoke */}
            <line x1="170" y1="98" x2="170" y2="160" stroke="url(#goldZari)" strokeWidth="1" strokeDasharray="3 2" />
            {[110, 126, 142].map((y) => (
              <circle key={y} cx="170" cy={y} r="2" fill="url(#goldZari)" />
            ))}

            {/* A-Line Flare Hem line */}
            <path d="M 115 345 Q 170 355 225 345" stroke="rgba(255,255,255,0.2)" strokeWidth="1" fill="none" />
          </g>
        )}

        {silhouette === 'saree-tant' && (
          <g>
            {/* Mannequin stand */}
            <path d="M 152 40 L 188 40 L 184 65 L 156 65 Z" fill="url(#woodStand)" />
            <ellipse cx="170" cy="40" rx="18" ry="5" fill="#DECFC0" />

            {/* Tangail Tant Saree Body Drape */}
            <path
              d="M 130 110 Q 155 86 186 78 L 212 86 L 232 215 L 246 370 L 188 382 L 158 250 L 136 210 Z"
              fill={`url(#grad-body-${silhouette})`}
            />

            <path
              d="M 144 200 Q 170 205 196 200 L 206 385 L 134 385 Z"
              fill={`url(#grad-body-${silhouette})`}
            />

            {/* Traditional Bold Red / Contrast Tant Border (Lal Par) */}
            <rect x="134" y="374" width="72" height="11" fill="#8B1E2F" />
            <rect x="134" y="370" width="72" height="2" fill="url(#goldZari)" />
            <rect x="134" y="386" width="72" height="2" fill="url(#goldZari)" />

            {/* Anchol geometric border */}
            <path
              d="M 232 215 L 246 370 L 236 370 L 222 215 Z"
              fill="#8B1E2F"
              opacity="0.9"
            />
            {/* Anchol tassels */}
            {[140, 152, 164, 176, 188, 200].map((x) => (
              <line key={x} x1={x} y1="388" x2={x} y2="398" stroke="#8B1E2F" strokeWidth="1.2" />
            ))}
          </g>
        )}

        {silhouette === 'salwar-kameez' && (
          <g>
            {/* Tailor bust */}
            <path d="M 152 40 L 188 40 L 184 65 L 156 65 Z" fill="url(#woodStand)" />
            <ellipse cx="170" cy="40" rx="18" ry="5" fill="#DECFC0" />

            {/* Pleated Shalwar Trousers underneath */}
            <path
              d="M 136 260 Q 128 340 142 388 L 156 388 Q 166 330 168 280 Q 172 330 182 388 L 196 388 Q 210 340 204 260 Z"
              fill={bgTone}
              opacity="0.92"
            />

            {/* Flared Kalidar Kameez */}
            <path
              d="M 126 76 
                 L 155 66 L 185 66 L 214 76 
                 L 236 122 L 220 128 L 204 96 
                 L 222 315 L 170 322 L 118 315 
                 L 136 96 L 120 128 L 104 122 Z"
              fill={`url(#grad-body-${silhouette})`}
            />

            {/* Ornate Embroidered V-Neckline */}
            <path
              d="M 155 66 Q 170 82 185 66 L 180 120 L 170 135 L 160 120 Z"
              fill="rgba(0,0,0,0.18)"
              stroke="url(#goldZari)"
              strokeWidth="1.2"
            />
            <circle cx="170" cy="95" r="2" fill="url(#goldZari)" />
            <circle cx="170" cy="112" r="2" fill="url(#goldZari)" />

            {/* Scalloped hem of kameez */}
            <path
              d="M 118 315 Q 131 320 144 315 Q 157 320 170 315 Q 183 320 196 315 Q 209 320 222 315"
              fill="none"
              stroke="url(#goldZari)"
              strokeWidth="1.5"
            />

            {/* Draped Chiffon Dupatta over left shoulder */}
            <path
              d="M 126 76 Q 112 130 108 210 Q 104 290 100 370 L 122 370 Q 128 290 134 210 L 136 96 Z"
              fill="#D7B6A5"
              opacity="0.8"
              stroke="url(#goldZari)"
              strokeWidth="0.8"
            />
          </g>
        )}

        {silhouette === 'lehenga' && (
          <g>
            {/* Tailor bust */}
            <path d="M 152 40 L 188 40 L 184 65 L 156 65 Z" fill="url(#woodStand)" />
            <ellipse cx="170" cy="40" rx="18" ry="5" fill="#DECFC0" />

            {/* Choli Blouse */}
            <path
              d="M 132 76 
                 L 155 66 L 185 66 L 208 76 
                 L 222 120 L 208 124 L 198 100 
                 L 194 150 L 170 154 L 146 150 
                 L 142 100 L 132 124 L 118 120 Z"
              fill={`url(#grad-body-${silhouette})`}
            />

            {/* Choli Sweetheart Neckline with Zardozi Work */}
            <path
              d="M 155 66 Q 170 82 185 66"
              fill="none"
              stroke="url(#goldZari)"
              strokeWidth="2"
            />
            <rect x="146" y="146" width="48" height="4" fill="url(#goldZari)" />

            {/* Midriff separation space (traditional lehenga silhouette) */}
            <rect x="150" y="154" width="40" height="10" fill="#F7EFE6" opacity="0.6" />

            {/* Grand Flared Kalidar Lehenga Skirt */}
            <path
              d="M 146 164 
                 L 194 164 
                 Q 210 240 248 385 
                 L 170 395 
                 L 92 385 
                 Q 130 240 146 164 Z"
              fill={`url(#grad-body-${silhouette})`}
            />

            {/* Kali Flared Pleat Lines */}
            {[116, 138, 170, 202, 224].map((x, i) => (
              <line
                key={i}
                x1={146 + i * 12}
                y1="164"
                x2={x}
                y2="370"
                stroke="rgba(0,0,0,0.15)"
                strokeWidth="1"
              />
            ))}

            {/* Heavy Gold Zari Border on Lehenga Hem */}
            <path
              d="M 92 385 Q 170 398 248 385 L 244 365 Q 170 378 96 365 Z"
              fill="url(#goldZari)"
            />

            {/* Embroidered floral medallions along skirt hem */}
            {[115, 142, 170, 198, 225].map((x, idx) => (
              <circle
                key={idx}
                cx={x}
                cy="350"
                r="4.5"
                fill="none"
                stroke="url(#goldZari)"
                strokeWidth="1"
              />
            ))}

            {/* Draped Sheer Organza Dupatta across chest and over shoulder */}
            <path
              d="M 132 76 
                 Q 148 110 180 145 
                 L 215 220 
                 L 230 380 
                 L 218 380 
                 L 190 220 
                 Q 160 140 132 76 Z"
              fill="#D7B6A5"
              opacity="0.65"
              stroke="url(#goldZari)"
              strokeWidth="0.8"
            />
          </g>
        )}

        {silhouette === 'hijab' && (
          <g>
            {/* Elegant drape presentation on stand */}
            <path d="M 152 60 L 188 60 L 184 85 L 156 85 Z" fill="url(#woodStand)" opacity="0.8" />

            {/* Folded & Cascading Modal Chiffon Hijab */}
            <path
              d="M 130 90 
                 Q 170 70 210 90 
                 Q 235 150 230 240 
                 L 215 350 
                 Q 170 365 125 350 
                 L 110 240 
                 Q 105 150 130 90 Z"
              fill={`url(#grad-body-${silhouette})`}
            />

            {/* Elegant cascading wrap layers */}
            <path
              d="M 135 105 Q 170 145 205 105 Q 218 190 190 280 Q 155 260 135 220 Z"
              fill="rgba(0,0,0,0.12)"
            />

            <path
              d="M 140 120 Q 170 170 200 120"
              fill="none"
              stroke="rgba(255,255,255,0.25)"
              strokeWidth="1"
            />

            {/* Micro crinkle texture lines */}
            {[170, 200, 230, 260, 290, 320].map((y) => (
              <path
                key={y}
                d={`M ${130 + (y % 10)} ${y} Q ${170} ${y + 8} ${210 - (y % 10)} ${y}`}
                fill="none"
                stroke="rgba(255,255,255,0.12)"
                strokeWidth="0.8"
              />
            ))}
          </g>
        )}

        {silhouette === 'dupatta-orna' && (
          <g>
            {/* Folded Pashmina Orna on velvet hanger */}
            <path d="M 120 70 Q 170 50 220 70" stroke="url(#goldZari)" strokeWidth="3" fill="none" />
            <circle cx="170" cy="56" r="6" stroke="url(#goldZari)" strokeWidth="2" fill="none" />

            {/* Folded Shawl Fabric drape */}
            <rect x="110" y="72" width="120" height="280" rx="4" fill={`url(#grad-body-${silhouette})`} />

            {/* Ornate Weave Border */}
            <rect x="110" y="310" width="120" height="26" fill="rgba(0,0,0,0.25)" />
            <rect x="110" y="310" width="120" height="3" fill="url(#goldZari)" />
            <rect x="110" y="333" width="120" height="3" fill="url(#goldZari)" />

            {/* Woven Medallions on Border */}
            {[125, 145, 170, 195, 215].map((x) => (
              <circle key={x} cx={x} cy="322" r="4" fill="none" stroke="url(#goldZari)" strokeWidth="0.9" />
            ))}

            {/* Hand-twisted fringe tassels */}
            {[116, 128, 140, 152, 164, 176, 188, 200, 212, 224].map((x) => (
              <line key={x} x1={x} y1="336" x2={x} y2="354" stroke="url(#goldZari)" strokeWidth="1.2" />
            ))}
          </g>
        )}
      </svg>

      {/* Subtle brand watermark & texture pill */}
      <div className="absolute bottom-3 right-3 text-[10px] tracking-widest uppercase font-serif text-stone-500/80 pointer-events-none select-none">
        ISMAIL FASHION
      </div>
    </div>
  );
};
